import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';

export const addMeetingAssignmentToCalendar = async (date: Date, topic: string, location: string) => {
    const calendars = await Calendar.getCalendarsAsync();

    const generateEndDate = new Date(date);
    generateEndDate.setHours(generateEndDate.getHours() + 2)
 
    try {
        await Calendar.createEventAsync(calendars[0].id, { startDate: date, endDate: generateEndDate, location, title: topic })
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