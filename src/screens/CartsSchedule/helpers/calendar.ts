import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';
import useLocaLization from '../../../hooks/useLocalization';
import { mainTranslations } from '../../../../localization';

export const addCartAssignmentToCalendar = async (date: string, time: string, location: string) => {
    const calendars = await Calendar.getCalendarsAsync();
    const mainTranslate = useLocaLization(mainTranslations)

    const [startHour, endHour] = time.split(' - ');
    const [day, month, year] = date.split('.')

    const generateStartDate = new Date(`${year}-${month}-${day}`);
    generateStartDate.setHours(Number(startHour.slice(0, startHour.length === 4 ? 1 : 2)))
    const generateEndDate = new Date(`${year}-${month}-${day}`);
    generateEndDate.setHours(Number(endHour.slice(0, endHour.length === 4 ? 1 : 2)))
 
    try {
        await Calendar.createEventAsync(calendars[0].id, { startDate: generateStartDate, endDate: generateEndDate, location, title: "Wózek" })
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