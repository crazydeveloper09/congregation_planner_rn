import { IPreacher } from "../../contexts/interfaces";

export interface MinistryMeeting {
    _id: string;
    hour: string;
    month: string;
    date: Date;
    place: string;
    topic?: string;
    lead: IPreacher;
}