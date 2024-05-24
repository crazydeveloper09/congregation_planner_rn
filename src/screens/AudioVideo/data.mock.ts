export interface AudioVideo {
    videoOperator: string;
    audioOperator?: string;
    microphone1Operator: string;
    microphone2Operator?: string;
    meeting: string;
    month: string;
}

export interface Ordinal {
    hallway1: string;
    hallway2?: string;
    parking?: string;
    auditorium: string;
    meeting: string;
    month: string;
}

export const audioVideo: AudioVideo[] = [
    {
        videoOperator: 'Test',
        audioOperator: 'Test #1',
        microphone1Operator: 'Test #2',
        microphone2Operator: 'Test #3',
        meeting: '21.04.2024',
        month: 'Kwiecień 2024'
    },
    {
        videoOperator: 'Test #1',
        microphone1Operator: 'Test #5',
        microphone2Operator: 'Test #6',
        meeting: '24.04.2024',
        month: 'Kwiecień 2024'
    },
    {
        videoOperator: 'Test #7',
        audioOperator: 'Test #8',
        microphone1Operator: 'Test #9',
        meeting: '08.05.2024',
        month: 'Maj 2024'
    },
]

export const ordinals: Ordinal[] = [
    {
        hallway1: 'Test',
        hallway2: 'Test #1',
        parking: 'Test #2',
        auditorium: 'Test #3',
        meeting: '21.04.2024',
        month: 'Kwiecień 2024'
    },
    {
        hallway1: 'Test #1',
        parking: 'Test #5',
        auditorium: 'Test #6',
        meeting: '24.04.2024',
        month: 'Kwiecień 2024'
    },
    {
        hallway1: 'Test #7',
        hallway2: 'Test #8',
        auditorium: 'Test #9',
        meeting: '08.05.2024',
        month: 'Maj 2024'
    },
]