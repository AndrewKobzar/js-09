import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const secEl = document.querySelector('span[data-seconds]');
const minEl = document.querySelector('span[data-minutes]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');

const btnEl = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const inputEl = document.querySelector('#datetime-picker');

btnEl.classList.add('disabled');
let userDate = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

const pad = value => {
    return String(value).padStart(2, '0');
};


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      userDate = new Date();
    } else {
      btnEl.disabled = false;
      btnEl.classList.remove('disabled');
      userDate = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.isActive = false;
    this.timerId = null;
    btnEl.disabled = true;
  }
  timerStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const components = convertMs(deltaTime);

      secEl.textContent = components.seconds;
      minEl.textContent = components.minutes;
      hoursEl.textContent = components.hours;
      daysEl.textContent = components.days;
      if (deltaTime <= 0) {
        this.stop();
        timerDiv.innerHTML = 'Time is over!';
      }
    }, 1000);
  }
  timerStop() {
    clearInterval(this.timerId);
  }
}

const timer = new Timer();
flatpickr(inputEl, options);
btnEl.addEventListener('click', () => timer.timerStart());
