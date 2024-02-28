const clockEl = document.getElementById('clock');
const listOfAlarms = document.getElementById('alarms');

// function to pre-append zeros in 12 hr time format
function addZero(val) {
    return val < 10 ? `0${val}` : val;
}

// function to format time in 12 hours clock settings
function twelveHourFormatting(hour) {
    return hour = hour % 12 || 12;
}

// to display current time
function clockTime() {
    const time = new Date();
    let hh = time.getHours();
    const mm = time.getMinutes();
    const ss = time.getSeconds();
    let ampm = '';

    if (hh >= 12) {
        ampm = 'PM';
    } else {
        ampm = 'AM';
    }

    hh = twelveHourFormatting(hh);

    const digiClock = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')} ${ampm}`;
    clockEl.textContent = digiClock;

    return time.toLocaleTimeString('en-US', {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",

    });
}

// to set alarm and add alarm time to the list
function setAlarm() {
    document.querySelector('.clock-icon-container').classList.remove('animate__animated', 'animate__bounce', 'animate__repeat-3');
    const time = document.getElementById('alarm-time').value;
    let [hrs, mins, secs] = time.split(':');
    let timeOfTheDay;

    if (hrs > 12) {
        timeOfTheDay = 'PM';
    } else {
        timeOfTheDay = 'AM';
    }

    hrs = twelveHourFormatting(hrs);

    const alarmTime = `${addZero(hrs)}:${mins}:${secs} ${timeOfTheDay}`;

    const listItem = document.createElement('div');
    listItem.classList.add('display-alarm');
    listItem.innerHTML = `
    <span id="time">${alarmTime}</span>
    <i class="bi bi-x-square btn-color" onclick="deleteAlarm(this)"></i>`;
    listOfAlarms.appendChild(listItem);

    //timeout to check alarm time

    setInterval(() => {
    
        if (alarmTime === clockTime()) {
           
            alert(`Alarm !! Alarm !! The time is ${alarmTime}`);
            document.querySelector('.clock-icon-container').classList.add('animate__animated', 'animate__bounce', 'animate__repeat-3');
        }
    }, 1000);

    document.getElementById('alarm-time').value = '';
}

// to delete alarm
function deleteAlarm(btn) {
    let alarmContainer = btn.parentElement;
    alarmContainer.remove();
}

// button event to call setAlarm
document.getElementById('set-alarm-btn').addEventListener('click', function () {
    setAlarm();
});

// to update clock every second
setInterval(clockTime, 1000);

// initial clock display
clockTime();