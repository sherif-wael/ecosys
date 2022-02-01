function getTimeFromSeconds(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes }
}

function getTimeStringFromSeconds(seconds){
    const { hours, minutes } = getTimeFromSeconds(seconds);
    let str = "";

    if(hours){
        str += `${hours} ${hours > 1 ? "hours" : "hour"} `;
    }

    if(minutes){
        str += `${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
    }

    return str;
}

// Where time is "HH:MM" 24h format;
function getDateStringFromTime(time){
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return date.toString();
}

// Returns time in "HH:MM" 24h format 
function getTimeFromDateString(dateString){
    const date = new Date(dateString);
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// Receives time in "HH:MM" 24h format
// Returns time in "HH:MM PM | AM" format
function convertTimeToAmPmFormat(time){
    const [hours, mins] = time.split(":").map(v => Number(v));
    const str = n => String(n).padStart(2, "0");
    const h = (hours % 12) || 12;
    const ampm = hours < 12 || hours === 24 ? "AM" : "PM";
    return `${str(h)}:${str(mins)}${ampm}`;    
}

export {
    getTimeFromSeconds,
    getTimeStringFromSeconds,
    getDateStringFromTime,
    getTimeFromDateString,
    convertTimeToAmPmFormat
}