export interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page?: number | undefined;
    totalPages: number;
    offset: number;
    prevPage?: number | null | undefined;
    nextPage?: number | null | undefined;
    pagingCounter: number;
    meta?: any;
    [customLabel: string]: T[] | number | boolean | null | undefined;
}

export interface IPreacher {
    _id: string;
    name: string;
    congregation: ICongregation,
    link: string,
    roles: string[]
}

export interface ICongregation {
    _id: string;
    username: string;
    password: string;
    territoryServantEmail: string;
    ministryOverseerEmail: string;
    verificationNumber: number;
    verificationExpires: Date;
    verificated: boolean;
    territories: ITerritory[];
    preachers: IPreacher[];
    mainCity: string;
    mainCityLatitude: number;
    mainCityLongitude: number;
}

export interface ITerritory {
    _id: string;
    city: string;
    street: string;
    lastWorked: string;
    number: number;
    beginNumber: number;
    endNumber: number;
    kind: string;
    preacher: IPreacher;
    congregation: ICongregation;
    history: ICheckout[];
    type: string;
    taken: string;
    description: string;
    isPhysicalCard: boolean;
    longitude: number;
    latitude: number;
    location: string;
}

export interface IMinistryGroup {
    _id: string;
    name: string;
    preachers: IPreacher[];
    overseer: IPreacher;
    congregation: ICongregation;
}

export interface IMinistryMeeting {
    _id: string;
    name: string;
    place: string;
    date: Date;
    hour: string;
    month: string;
    topic?: string;
    lead: IPreacher;
    congregation: ICongregation;
}

export interface IMeetingAssignment {
    _id: string,
    topic: string,
    participant: IPreacher,
    reader?: IPreacher,
    type: string,
    otherParticipant: string,
    meeting: IMeeting
}
export interface IMeeting {
    _id: string;
    date: string;
    type: string;
    month: string;
    lead: IPreacher;
    beginSong: number,
    beginPrayer: IPreacher, 
    assignments: IMeetingAssignment[],
    otherEndPrayer: string,
    midSong: number,
    endSong: number,
    endPrayer: IPreacher,
    audioVideo: IAudioVideo,
    ordinal: IOrdinal,
    cleaningGroup: IMinistryGroup
}

export interface IAudioVideo {
    _id: string;
    videoOperator: IPreacher;
    audioOperator?: IPreacher;
    microphone1Operator: IPreacher;
    microphone2Operator?: IPreacher;
    meeting: IMeeting;
}

export interface IOrdinal {
    _id: string;
    hallway1: IPreacher;
    hallway2?: IPreacher;
    parking?: IPreacher;
    auditorium: IPreacher;
    meeting: IMeeting;
}

export interface ICartHour {
    _id: string;
    timeDescription: string,
    preacher1: IPreacher,
    preacher2: IPreacher,
    otherPreacher1: string;
    otherPreacher2: string;
    congregation: ICongregation;
    cartDay: ICartDay;
}

export interface ICartDay {
    _id: string;
    date: string,
    place: string,
    hours: ICartHour[],
    congregation: ICongregation;
}



export interface ICheckout {
    _id: string;
    date: Date;
    record: ITerritory;
    preacher: IPreacher;
    passedBackDate: Date;
    takenDate: Date;
    serviceYear: number;
}

export interface IActivity {
    ipAddress: string;
    platform: string;
    userAgent: string;
    applicationType: string;
    date: Date;
    congregation: ICongregation
}