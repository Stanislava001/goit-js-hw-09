import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DELAY = 1000;
const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button'),
  timerBox: document.querySelector('.timer'),
  value: document.querySelectorAll('.value'),
  daysLeft: document.querySelector('.value[data-days]'),
  hoursLeft: document.querySelector('.value[data-hours]'),
  minutesLeft: document.querySelector('.value[data-minutes]'),
  secondsLeft: document.querySelector('.value[data-seconds]'),
};
refs.timerBox.classList.add('timer-container');
refs.value.forEach(value => {
  value.style.fontSize = '40px';
});

let chosenDate = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
   if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
    refs.startBtn.disabled = false;
    console.log(chosenDate);
},
}
flatpickr('input#datetime-picker', options);


refs.startBtn.addEventListener('click', onTimerStart);
function onTimerStart(e) {
  
  const intervalId = setInterval(() => {
      const currentTime = chosenDate - Date.now();
      const timeLeft = convertMs(currentTime);
      console.log(timeLeft);
      refs.daysLeft.textContent = timeLeft.days;
      refs.hoursLeft.textContent = timeLeft.hours;
      refs.minutesLeft.textContent = timeLeft.minutes;
      refs.secondsLeft.textContent = timeLeft.seconds;

      if (currentTime < 0) {
        clearInterval(intervalId);
        return
      }
    }, DELAY);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

