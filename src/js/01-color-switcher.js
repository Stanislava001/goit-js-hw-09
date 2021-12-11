const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
}

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  const intervalId = setInterval(function getRandomHexColor() {
    refs.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
   if(refs.btnStart.disabled === false) {
     clearInterval(intervalId);
     return;
   }
  }, 1000);
}

function onBtnStopClick(e) {
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
}

