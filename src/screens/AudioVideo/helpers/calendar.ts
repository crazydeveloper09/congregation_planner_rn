import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';

export const addAudioVideoAssignmentToCalendar = async (date: Date, topic: string, location: string, isSecondOrdinal?: boolean) => {
    const calendars = await Calendar.getCalendarsAsync();


    const generateStartDate = new Date(date);
    if(topic === "Operator wideo" || topic === "Operator audio" || topic === "Porządkowy" || topic === "Porządkowy parking") {
        generateStartDate.setMinutes(generateStartDate.getMinutes() - 30)
    }
    if(topic === "Porządkowy 2") {
        generateStartDate.setMinutes(generateStartDate.getMinutes() + 45)
    }

    const generateEndDate = new Date(date);
    if(topic === "Porządkowy" && isSecondOrdinal){
        generateEndDate.setHours(generateStartDate.getHours() + 1)
        generateEndDate.setMinutes(generateStartDate.getMinutes() + 15)
    }
    generateEndDate.setHours(generateEndDate.getHours() + 2)

    try {
        await Calendar.createEventAsync(calendars[0].id, { startDate: generateStartDate, endDate: generateEndDate, location, title: topic })
        showMessage({
            type: 'success',
            message: 'Poprawnie dodano wydarzenie z kalendarza'
        })
    } catch(error) {
        showMessage({
            type: 'danger',
            message: String(error)
        })
    }
}