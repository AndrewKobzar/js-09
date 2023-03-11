
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let time = null;
btnStart.disabled = false;
btnStop.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function updateBackgroundColor (){
    body.style.backgroundColor =  getRandomHexColor();
}  

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick(){
    time = setInterval(updateBackgroundColor, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
};

btnStop.addEventListener('click', onBtnStopClick);

function onBtnStopClick(){
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(time);
};
