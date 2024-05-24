import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { NavigationProp } from "@react-navigation/native";
import CartsScheduleHours from "./components/CartScheduleHours";
import { Context as CartsScheduleContext } from "../../contexts/CartsScheduleContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { months } from "../../../defaultData";
import NotFound from "../../commonComponents/NotFound";
import Loading from "../../commonComponents/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { addCartAssignmentToCalendar } from "./helpers/calendar";
import TopMenu from "../../commonComponents/TopMenu";
import IconLink from "../../commonComponents/IconLink";
import HeaderRight from "../../commonComponents/HeaderRight";

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
  const filters = ["Wszystkie", "Moje przydziały"];
  const [currentFilter, setCurrentFilter] = useState<string>("Wszystkie");
  const [isScrolledDate, setIsScrolledDate] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(-1);
  const scrollViewRef = useRef<ScrollView>(null)
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

  const onDateChange = (date: Date) => {
    setSelectedStartDate(date);
  };

  useEffect(() => {
    if (scrollPosition >= 441) {
      setIsScrolledDate(true);
    }
    if (scrollPosition <= 441) {
      setIsScrolledDate(false);
    }
  }, [scrollPosition]);

  const getScrollPosition = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrollPosition(y);
  };

  useEffect(() => {
    currentFilter === "Wszystkie"
      ? loadCartDayInfo(route.params?.date || startDate)
      : loadPreacherHours();
    preachersContext.loadAllPreachers();

    const unsubscribe = navigation.addListener("focus", () => {
      currentFilter === "Wszystkie"
        ? loadCartDayInfo(route.params?.date || startDate)
        : loadPreacherHours();
    });

    return unsubscribe;
  }, [selectedStartDate, route.params?.date, currentFilter]);

  if (state.isLoading || preachersContext.state.isLoading) {
    return <Loading />;
  }

  if (
    (preachersContext.state.preacher &&
      preachersContext.state.preacher.roles?.includes(
        "can_edit_cartSchedule"
      )) ||
    authContext.state.whoIsLoggedIn === "admin" && currentFilter !== "Moje przydziały"
  ) {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <TouchableOpacity
            onPress={() => navigation.navigate("Carts Day New")}
          >
            <MaterialCommunityIcons name="plus" size={30} color={"white"} />
          </TouchableOpacity>
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
  }

  return (
    <ScrollView onScroll={getScrollPosition} scrollEventThrottle={16} stickyHeaderIndices={[0]} ref={scrollViewRef}>
      {currentFilter === "Wszystkie" && isScrolledDate && <View style={{ paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#1f8aad' }}>
            <Text style={[styles.chosenDate, { color: 'white', fontSize: 21 }]}>{startDate}</Text>
            <Text style={[styles.place, { color: 'white' }]}>{state.cartDay?.place}</Text>
        </View>}
      {authContext.state.whoIsLoggedIn !== "admin" && (
       <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />
      )}
      <View style={styles.container}>
        {currentFilter === "Wszystkie" ? (
          <>
            <CalendarPicker
              startFromMonday={true}
              selectedDayColor="#97D7ED"
              todayBackgroundColor="#CBEBF6"
              months={months}
              weekdays={["Pon", "Wt", "Śro", "Czw", "Pt", "Sob", "Nd"]}
              previousTitle="Poprzedni"
              nextTitle="Następny"
              selectedStartDate={selectedStartDate}
              onDateChange={onDateChange}
            />
            <View style={styles.resultContainer}>
              <Text style={styles.chosenDate}>{startDate}</Text>
              <Text style={styles.place}>{state.cartDay?.place}</Text>
              {Boolean(state.cartDay) ? (
                ""
              ) : (
                <NotFound title="Nie dodano wózka dla tego dnia" />
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
                  <Text style={styles.myDate}>{item.cartDay.date} - {item.timeDescription} - {item.cartDay.place}</Text>
                  <IconLink 
                        onPress={() => addCartAssignmentToCalendar(item.cartDay.date, item.timeDescription, item.cartDay.place)}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
                
                </>}
                scrollEnabled={false}
              />
            ) : (
              <NotFound title="Nie zapisano Cię na żadną godzinę" />
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
