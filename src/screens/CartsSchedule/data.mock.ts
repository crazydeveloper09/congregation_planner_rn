export interface CartsScheduleHour {
    name: string,
    preacher1: string,
    preacher2: string,
}

export interface CartsScheduleDay {
    date: string,
    place: string,
    hours: CartsScheduleHour[]
}

interface CartsSchedule {
    [key: string]: {
        days: CartsScheduleDay[]
    }
}

export const cartsSchedule: CartsSchedule = {
    'Kwiecień': {
        days: [
                {
                date: '19.04.2024',
                place: 'Dworzec PKP',
                hours: [
                    {
                        name: '11:00 - 12:00',
                        preacher1: 'Test',
                        preacher2: 'Test #2'
                    },
                    {
                        name: '12:00 - 13:00',
                        preacher1: 'Test #3',
                        preacher2: 'Test #4'
                    },
                    {
                        name: '13:00 - 14:00',
                        preacher1: 'Test #5',
                        preacher2: 'Test #6'
                    },
                ]
            },
            {
                date: '23.04.2024',
                place: 'Biblioteka',
                hours: [
                    {
                        name: '08:00 - 09:00',
                        preacher1: 'Test #6',
                        preacher2: 'Test #7'
                    },
                    {
                        name: '09:00 - 10:00',
                        preacher1: 'Test #8',
                        preacher2: 'Test #9'
                    },
                    {
                        name: '10:00 - 11:00',
                        preacher1: 'Test #10',
                        preacher2: 'Test #11'
                    },
                ]
            }
        ]
    }
} 