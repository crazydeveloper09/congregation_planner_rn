export interface MeetingAssignment {
    topic: string,
    participant: string,
    reader?: string,
    type: string
}
export interface Meeting {
    date: string;
    type: string;
    month: string;
    lead: string;
    beginSong: number,
    beginPrayer: string, 
    assignments: MeetingAssignment[],
    midSong: number,
    endSong: number,
    endPrayer: string,
}

export const meetings: Meeting[] = [
    {
        date: '21.04.2024',
        month: 'Kwiecień 2024',
        type: 'Zebranie w weekend',
        lead: 'Test',
        beginSong: 55,
        beginPrayer: 'Test',
        assignments: [
            {
                topic: 'Jak okazywać śmiałość?',
                participant: 'Test #1',
                type: 'Wykład biblijny'
            },
            {
                topic: '"Wysławiajcie imię Jehowy"',
                participant: 'Test #2',
                type: 'Studium Strażnicy',
                reader: 'Test #3'
            },
        ],
        midSong: 87,
        endSong: 121,
        endPrayer: 'Test #2',
    },
    {
        date: '24.04.2024',
        month: 'Kwiecień 2024',
        type: 'Zebranie w tygodniu',
        lead: 'Test #4',
        beginSong: 103,
        beginPrayer: 'Test #4',
        assignments: [
            {
                topic: 'Dlaczego przyznawać się do poważnego grzechu?',
                participant: 'Test #5',
                type: 'Skarby ze Słowa Bożego'
            },
            {
                topic: 'Wyszukujemy duchowe skarby',
                participant: 'Test #6',
                type: 'Skarby ze Słowa Bożego'
            },
            {
                topic: 'Czytanie Biblii',
                participant: 'Test #7',
                type: 'Skarby ze Słowa Bożego'
            },
            {
                topic: 'Pokora - co zrobił Paweł',
                participant: 'Test #8',
                type: 'Ulepszajmy swoją służbę'
            },
            {
                topic: 'Pokora naśladuj Pawła',
                participant: 'Test #9',
                type: 'Ulepszajmy swoją służbę'
            },
            {
                topic: 'Potrzeby zboru',
                participant: 'Test #10',
                type: 'Chrześcijański tryb życia'
            },
            {
                topic: 'Zborowe studium Biblii',
                participant: 'Test #11',
                type: 'Chrześcijański tryb życia',
                reader: 'Test #12'
            },
        ],
        midSong: 87,
        endSong: 121,
        endPrayer: 'Test #11',
    },
    {
        date: '08.05.2024',
        month: 'Maj 2024',
        type: 'Zebranie w tygodniu',
        lead: 'Test #12',
        beginSong: 87,
        beginPrayer: 'Test #13',
        assignments: [
            {
                topic: '„Nie denerwuj się z powodu złych ludzi”',
                participant: 'Test #14',
                type: 'Skarby ze Słowa Bożego'
            },
            {
                topic: 'Wyszukujemy duchowe skarby',
                participant: 'Test #15',
                type: 'Skarby ze Słowa Bożego'
            },
            {
                topic: 'Czytanie Biblii',
                participant: 'Test #16',
                type: 'Skarby ze Słowa Bożego'
            },
            {
                topic: 'Rozpoczynanie rozmowy',
                participant: 'Test #17',
                type: 'Ulepszajmy swoją służbę'
            },
            {
                topic: 'Podtrzymywanie zainteresowania',
                participant: 'Test #18',
                type: 'Ulepszajmy swoją służbę'
            },
            {
                topic: 'Przemówienie',
                participant: 'Test #19',
                type: 'Ulepszajmy swoją służbę'
            },
            {
                topic: 'Czy jesteś przygotowany na „czas udręki”?',
                participant: 'Test #20',
                type: 'Chrześcijański tryb życia'
            },
            {
                topic: 'Zborowe studium Biblii',
                participant: 'Test #21',
                type: 'Chrześcijański tryb życia',
                reader: 'Test #22'
            },
        ],
        midSong: 33,
        endSong: 57,
        endPrayer: 'Test #21',
    }
]