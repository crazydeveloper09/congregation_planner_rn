export const countDaysFromNow = (date: string) => {
    return Math.round(Math.abs((new Date() as unknown as number) - (new Date(date) as unknown as number)) / 86400000);
}

export const changeColorForDates = (date: string) => {
     if((countDaysFromNow(date)) < 31){ 
        return 'black'
     } else if(countDaysFromNow(date) <= 62){ 
        return '#007bff'
     } else if(countDaysFromNow(date) <= 93){ 
        return '#ffc107'
     } else if(countDaysFromNow(date) <= 124){ 
        return '#fd7e14'
     } else if(countDaysFromNow(date) >= 124){ 
        return '#dc3545'
     } 
}