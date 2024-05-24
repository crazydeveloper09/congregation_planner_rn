import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';

export const addMinistryMeetingAssignmentToCalendar = async (date: Date, location: string, topic: string) => {
    const calendars = await Calendar.getCalendarsAsync();

    const generateEndDate = new Date(date);
    generateEndDate.setMinutes(generateEndDate.getMinutes() + 15)

    try {
        await Calendar.createEventAsync(calendars[0].id, { startDate: date, endDate: generateEndDate, location, title: `Prowadzenie zbiórki ${topic ? topic: ''} ` })
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