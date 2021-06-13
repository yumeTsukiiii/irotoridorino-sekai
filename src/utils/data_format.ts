export const simpleFormatDate = (date: Date) => {
    return [
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ].map(it => it.toString().padStart(2, '0')).join('/')
}

export const simpleFormatTime = (date: Date) => {
    return [
        date.getHours(),
        date.getMinutes()
    ].map(it => it.toString().padStart(2, '0')).join(':')
}
