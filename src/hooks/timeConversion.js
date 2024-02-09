export function convertTo24HourFormat(timeString) {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);

    // Convert to 24-hour format if necessary
    if (period === "PM" && hour !== 12) {
        hour += 12;
    } else if (period === "AM" && hour === 12) {
        hour = 0;
    }

    // Format the time in 24-hour format
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes}`;

    return formattedTime;
}

export function convertTimeTo12HourFormat(e) {
    const inputTime = e;
    const time = new Date();
    const [hours, minutes] = inputTime.split(':');
    time.setHours(parseInt(hours, 10));
    time.setMinutes(parseInt(minutes, 10));
    const timeString = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return timeString;
}