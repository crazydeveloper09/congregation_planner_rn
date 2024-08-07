import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';
import useLocaLization from '../../../hooks/useLocalization';
import { mainTranslations } from '../../../../localization';

export const addMeetingAssignmentToCalendar = async (date: Date, topic: string, location: string) => {
    const calendars = await Calendar.getCalendarsAsync();
    const mainTranslate = useLocaLization(mainTranslations)
    
    const generateEndDate = new Date(date);
    generateEndDate.setHours(generateEndDate.getHours() + 2)
 
    try {
        await Calendar.createEventAsync(calendars[0].id, { startDate: date, endDate: generateEndDate, location, title: topic })
        showMessage({
            type: 'success',
            message: mainTranslate.t("successfullyAddedEventMessage")
        })
    } catch(error) {
        showMessage({
            type: 'danger',
            message: String(error)
        })
    }
}