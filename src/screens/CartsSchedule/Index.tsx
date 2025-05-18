import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { NavigationProp } from "@react-navigation/native";
import CartsScheduleHours from "./components/CartScheduleHours";
import { Context as CartsScheduleContext } from "../../contexts/CartsScheduleContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { months, weekdays } from "../../../defaultData";
import NotFound from "../../commonComponents/NotFound";
import Loading from "../../commonComponents/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { addCartAssignmentToCalendar } from "./helpers/calendar";
import TopMenu from "../../commonComponents/TopMenu";
import IconLink from "../../commonComponents/IconLink";
import HeaderRight from "../../commonComponents/HeaderRight";
import useLocaLization from "../../hooks/useLocalization";
import { cartScheduleTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { convertTo12HourRange } from "./helpers/time";

interface CartsScheduleIndexScreenProps {
  navigation: NavigationProp<any>;
  route: {
    params: {
      date: string;
    };
  };
}

const CartsScheduleIndexScreen: React.FC<CartsScheduleIndexScreenProps> = ({
  navigation,
  route,
}) => {
  const cartScheduleTranslate = useLocaLization(cartScheduleTranslations);
  const mainTranslate = useLocaLization(mainTranslations);
  const filters = [mainTranslate.t("all"), mainTranslate.t("myAssignments")];
  const [currentFilter, setCurrentFilter] = useState<string>(mainTranslate.t("all"));
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(
    route.params?.date ? new Date(route.params.date) : new Date()
  );
  const { state, loadCartDayInfo, loadPreacherHours } =
    useContext(CartsScheduleContext);
  const startDate = selectedStartDate
    ? selectedStartDate.toLocaleDateString("pl-Pl")
    : "";
  const preachersContext = useContext(PreachersContext);
  const authContext = useContext(AuthContext);
  const settingsContext = useContext(SettingsContext);

  const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

  const onDateChange = (date: Date) => {
    setSelectedStartDate(date);
  };

  useEffect(() => {
    currentFilter === mainTranslate.t("all")
      ? loadCartDayInfo(startDate)
      : loadPreacherHours();
    preachersContext.loadAllPreachers();


    const unsubscribe = navigation.addListener("focus", () => {
      currentFilter === mainTranslate.t("all")
        ? loadCartDayInfo(startDate)
        : loadPreacherHours();
    });

    return unsubscribe;
  }, [selectedStartDate, route.params?.date, currentFilter, refreshing]);

  if (state.isLoading || preachersContext.state.isLoading) {
    return <Loading />;
  }

  navigation.setOptions({
    headerRight: () => (
      <HeaderRight>
        <TouchableOpacity
          onPress={onRefresh}
        >
          <MaterialCommunityIcons name="refresh" size={30} color={"white"} />
        </TouchableOpacity>
        {!state.cartDay && <TouchableOpacity
              onPress={() => navigation.navigate("Carts Day New", {date: selectedStartDate})}
            >
              <MaterialCommunityIcons name="plus" size={30} color={"white"} />
            </TouchableOpacity>}
            
            {state.cartDay && (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Carts Day Edit", {
                      cartDay: state.cartDay,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={28}
                    color={"white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Carts Day Delete Confirm", {
                      cartDay: state.cartDay,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={28}
                    color={"white"}
                  />
                </TouchableOpacity>
              </>
            )}
      </HeaderRight>
    ),
  });

  return (
    <ScrollView stickyHeaderIndices={[0]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {currentFilter === mainTranslate.t("all") && <View style={[styles.titleContainer, { backgroundColor: settingsContext.state.mainColor}]}>
            <>
              <Text style={[styles.chosenDate, { color: 'white', fontSize: 21 + settingsContext.state.fontIncrement }]}>{startDate}</Text>
              {state.cartDay && <Text style={[styles.place, { color: 'white', fontSize: 17 + settingsContext.state.fontIncrement }]}>{state.cartDay?.place}</Text>}
            </>
            
        </View>}
      {authContext.state.whoIsLoggedIn !== "admin" && (
       <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />
      )}
      <View style={styles.container}>
        {currentFilter === mainTranslate.t("all") ? (
          <>
            <CalendarPicker
              startFromMonday={true}
              selectedDayColor={`${settingsContext.state.mainColor}60`}
              todayBackgroundColor={`${settingsContext.state.mainColor}30`}
              months={months}
              weekdays={weekdays}
              selectMonthTitle={months[selectedStartDate.getMonth()] + ' ' + selectedStartDate.getFullYear()}
              previousTitle={cartScheduleTranslate.t("previous")}
              nextTitle={cartScheduleTranslate.t("next")}
              selectedStartDate={selectedStartDate}
              onDateChange={onDateChange}
              nextTitleStyle={{ fontSize: 16 + settingsContext.state.fontIncrement }}
              previousTitleStyle={{ fontSize: 16 + settingsContext.state.fontIncrement }}
              monthTitleStyle={{ fontSize: 18 + settingsContext.state.fontIncrement }}
              yearTitleStyle={{ fontSize: 18 + settingsContext.state.fontIncrement }}
              selectedDayTextStyle={{ fontSize: 14 + settingsContext.state.fontIncrement }}
              textStyle={{ fontSize: 14 + settingsContext.state.fontIncrement }}
            />
            <View style={styles.resultContainer}>
              {Boolean(state.cartDay) ? (
                ""
              ) : (
                <NotFound title={cartScheduleTranslate.t("noEntry")} />
              )}
              {state.cartDay && (
                <FlatList
                  keyExtractor={(hour) => hour._id}
                  data={state.cartDay?.hours}
                  renderItem={({ item }) => (
                    <CartsScheduleHours
                      hour={item}
                      preachers={preachersContext.state.allPreachers!}
                      day={startDate}
                      refresh={onRefresh}
                    />
                  )}
                  contentContainerStyle={{ marginBottom: 50 }}
                  scrollEnabled={false}
                />
              )}
            </View>
          </>
        ) : (
          <>
            {state.cartHours?.length !== 0 ? (
              <FlatList
                keyExtractor={(hour) => hour._id}
                data={state.cartHours}
                renderItem={({ item }) => <>
                  <Text style={[styles.myDate, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{item.cartDay.date} - {settingsContext.state.format12h ? convertTo12HourRange(item.timeDescription) : item.timeDescription} - {item.cartDay.place}</Text>
                  <IconLink 
                        onPress={() => addCartAssignmentToCalendar(item.cartDay.date, item.timeDescription, item.cartDay.place)}
                        iconName="calendar-month-outline"
                        description={mainTranslate.t("addToCalendar")}
                        isCentered={true}
                    />
                
                </>}
                scrollEnabled={false}
              />
            ) : (
              <NotFound title={cartScheduleTranslate.t("noAssignments")} />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  month: {
    fontSize: 17,
    fontFamily: "MontserratRegular",
  },
  resultContainer: {
    marginTop: 20,
  },
  titleContainer: { 
    display: "flex",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15, 
    paddingVertical: 7, 
  },
  myDate: {
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    marginVertical: 10
  },
  chosenDate: {
    color: "#1F8AAD",
    fontSize: 25,
    fontFamily: "PoppinsSemiBold",
  },
  place: {
    color: "#1F8AAD",
    fontSize: 17,
    fontFamily: "PoppinsRegular",
  },
});

export default CartsScheduleIndexScreen;
