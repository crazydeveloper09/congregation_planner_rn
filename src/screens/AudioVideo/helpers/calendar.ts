import * as Calendar from 'expo-calendar';
import { showMessage } from 'react-native-flash-message';
import useLocaLization from '../../../hooks/useLocalization';
import { mainTranslations } from '../../../../localization';
import { audioVideoTranslations } from '../translations';
import { attendantTranslations } from '../Attendants/translations';

export const addAudioVideoAssignmentToCalendar = async (date: Date, topic: string, location: string, isSecondOrdinal?: boolean) => {
    const calendars = await Calendar.getCalendarsAsync();
    const mainTranslate = useLocaLization(mainTranslations)
    const audioVideoTranslate = useLocaLization(audioVideoTranslations)
    const attendantTranslate = useLocaLization(attendantTranslations)

    const generateStartDate = new Date(date);
    if(topic === audioVideoTranslate.t("videoOperatorLabel") || topic === audioVideoTranslate.t("audioOperatorLabel") || topic === attendantTranslate.t("hallwayLabel") || topic === attendantTranslate.t("parkingLabel")) {
        generateStartDate.setMinutes(generateStartDate.getMinutes() - 30)
    }
    if(topic === attendantTranslate.t("hallway2Label")) {
        generateStartDate.setMinutes(generateStartDate.getMinutes() + 45)
    }

    const generateEndDate = new Date(date);
    if(topic === attendantTranslate.t("hallwayLabel") && isSecondOrdinal){
        generateEndDate.setHours(generateStartDate.getHours() + 1)
        generateEndDate.setMinutes(generateStartDate.getMinutes() + 15)
    }
    generateEndDate.setHours(generateEndDate.getHours() + 2)

    const events = await Calendar.getEventsAsync([calendars[0].id], generateStartDate, generateEndDate);
    
    if(events.length === 0){
        try {
            await Calendar.createEventAsync(calendars[0].id, { startDate: generateStartDate, endDate: generateEndDate, location, title: topic })
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
    } else {
        showMessage({
            type: "danger",
            message: mainTranslate.t("alreadyAddedEvent")
        })
    }
}