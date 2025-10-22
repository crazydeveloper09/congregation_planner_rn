import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform,
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
import { useResponsive } from "../../hooks/useResponsive";
import Modification from "./components/Modification";

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
  const [currentFilter, setCurrentFilter] = useState<string>(
    mainTranslate.t("all")
  );
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(
    route.params?.date ? new Date(route.params.date) : new Date()
  );
  const { state, loadCartDayInfo, loadPreacherHours } =
    useContext(CartsScheduleContext);
  const startDate = selectedStartDate
    ? selectedStartDate.toLocaleDateString("pl-Pl")
    : "";
  const { isDesktop } = useResponsive();
  const preachersContext = useContext(PreachersContext);
  const authContext = useContext(AuthContext);
  const settingsContext = useContext(SettingsContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onDateChange = (date: Date) => {
    setSelectedStartDate(date);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <TouchableOpacity onPress={onRefresh}>
            <MaterialCommunityIcons name="refresh" size={30} color={"white"} />
          </TouchableOpacity>
        </HeaderRight>
      ),
    });
  }, [navigation, onRefresh]);

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

  const cartDays = Array.isArray(state.cartDay)
    ? state.cartDay
    : state.cartDay
    ? [state.cartDay]
    : [];
  const currentCartDay = cartDays[selectedPlaceIndex];

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {currentFilter === mainTranslate.t("all") && (
        <View
          style={[
            styles.titleContainer,
            { backgroundColor: settingsContext.state.mainColor },
          ]}
        >
          <>
            <Text
              style={[
                styles.chosenDate,
                {
                  color: "white",
                  fontSize: 21 + settingsContext.state.fontIncrement,
                },
              ]}
            >
              {selectedStartDate.toLocaleDateString()}
            </Text>

            {cartDays.length > 1 ? (
              // 🔹 Jeśli jest kilka miejsc, pokaż przełącznik
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cartDays.map((day, index) => (
                  <TouchableOpacity
                    key={day._id || index}
                    onPress={() => setSelectedPlaceIndex(index)}
                    style={{ marginRight: 10, marginBottom: 7 }}
                  >
                    <Text
                      style={[
                        styles.place,
                        {
                          color:
                            index === selectedPlaceIndex
                              ? "white"
                              : "rgba(255,255,255,0.6)",

                          ...(index === selectedPlaceIndex
                            ? {
                                borderBottomColor: "white",
                                borderBottomWidth: 2,
                              }
                            : {}),
                          fontSize: 17 + settingsContext.state.fontIncrement,
                        },
                      ]}
                    >
                      {day.place}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              currentCartDay && (
                <Text
                  style={[
                    styles.place,
                    {
                      color: "white",
                      fontSize: 17 + settingsContext.state.fontIncrement,
                    },
                  ]}
                >
                  {currentCartDay.place}
                </Text>
              )
            )}
          </>
        </View>
      )}

      {authContext.state.whoIsLoggedIn !== "admin" && (
        <TopMenu
          state={currentFilter}
          data={filters}
          updateState={setCurrentFilter}
        />
      )}
      <View
        style={[
          styles.container,
          isDesktop && { width: "50%", marginHorizontal: "auto" },
        ]}
      >
        {currentFilter === mainTranslate.t("all") ? (
          <>
            <CalendarPicker
              startFromMonday={true}
              selectedDayColor={`${settingsContext.state.mainColor}60`}
              todayBackgroundColor={`${settingsContext.state.mainColor}30`}
              months={months}
              weekdays={weekdays}
              selectMonthTitle={
                months[selectedStartDate.getMonth()] +
                " " +
                selectedStartDate.getFullYear()
              }
              previousTitle={"←"}
              nextTitle={"→"}
              selectedStartDate={selectedStartDate}
              onDateChange={onDateChange}
              nextTitleStyle={{
                fontSize: 20 + settingsContext.state.fontIncrement,
              }}
              previousTitleStyle={{
                fontSize: 20 + settingsContext.state.fontIncrement,
              }}
              monthTitleStyle={{
                fontSize: 18 + settingsContext.state.fontIncrement,
              }}
              yearTitleStyle={{
                fontSize: 18 + settingsContext.state.fontIncrement,
              }}
              selectedDayTextStyle={{
                fontSize: 14 + settingsContext.state.fontIncrement,
              }}
              textStyle={{ fontSize: 14 + settingsContext.state.fontIncrement }}
            />
            <View style={styles.resultContainer}>
              {currentCartDay ? (
                <>
                  <FlatList
                    keyExtractor={(hour) => hour._id}
                    data={currentCartDay.hours}
                    renderItem={({ item }) => (
                      <CartsScheduleHours
                        hour={item}
                        preachers={preachersContext.state.allPreachers!}
                        day={currentCartDay}
                        dayItems={cartDays.length}
                        refresh={onRefresh}
                      />
                    )}
                    contentContainerStyle={{ marginBottom: 50 }}
                    scrollEnabled={false}
                  />
                </>
              ) : (
                <NotFound title={cartScheduleTranslate.t("noEntry")} />
              )}
              {(authContext.state.whoIsLoggedIn === "admin" || preachersContext.state?.preacher?.roles.includes("can_edit_cartSchedule")) && <Modification
                date={selectedStartDate.toISOString()}
                cartDay={currentCartDay}
                dayItems={cartDays.length}
              />}
            </View>
          </>
        ) : (
          <>
            {state.cartHours?.length !== 0 ? (
              <FlatList
                keyExtractor={(hour) => hour._id}
                data={state.cartHours}
                renderItem={({ item }) => (
                  <>
                    <Text
                      style={[
                        styles.myDate,
                        { fontSize: 18 + settingsContext.state.fontIncrement },
                      ]}
                    >
                      {item.cartDay.date} -{" "}
                      {settingsContext.state.format12h
                        ? convertTo12HourRange(item.timeDescription)
                        : item.timeDescription}{" "}
                      - {item.cartDay.place}
                    </Text>
                    <IconLink
                      onPress={() =>
                        addCartAssignmentToCalendar(
                          item.cartDay.date,
                          item.timeDescription,
                          item.cartDay.place
                        )
                      }
                      iconName="calendar-month-outline"
                      description={mainTranslate.t("addToCalendar")}
                      isCentered={true}
                    />
                  </>
                )}
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: Platform.OS === "web" ? "center": "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  myDate: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginVertical: 10,
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
