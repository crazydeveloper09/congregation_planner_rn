import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';
import useLocaLization from '../../../hooks/useLocalization';
import { mainTranslations } from '../../../../localization';
import { ministryMeetingsTranslations } from '../translations';

export const addMinistryMeetingAssignmentToCalendar = async (date: Date, location: string, topic: string) => {
    const calendars = await Calendar.getCalendarsAsync();
    const mainTranslate = useLocaLization(mainTranslations)
    const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations)
    
    const generateEndDate = new Date(date);
    generateEndDate.setMinutes(generateEndDate.getMinutes() + 15)

    try {
        await Calendar.createEventAsync(calendars[0].id, { startDate: date, endDate: generateEndDate, location, title: `${ministryMeetingTranslate.t("calendarEventTitle")} ${topic ? topic: ''} ` })
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