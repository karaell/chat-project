export function renderTime(data) {
    let date;
    
    if (!data) {
        date = new Date();
    } else {
        date = new Date(data);
    }

    const hour = date.getHours();
    const min = '0' + date.getMinutes();

    return hour + ':' + min.slice(-2);
}
