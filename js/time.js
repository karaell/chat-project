export function renderTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    return hour + ':' + min;
}