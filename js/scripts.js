let allBtns = document.querySelectorAll('button');
const secSpan = document.querySelector('#secs');
const tenthSpan = document.querySelector('#tenths');
const minSpan = document.querySelector('#mins');
const lapInfo = document.querySelector('#lapInfo');
let mins = '00';
let secs = '00';
let tenths = '00';
let tenthInterval;
let lapTimesClicked = [];
let lapTimesConverted = [];

function toggleHiddenUnhidden () {
  allBtns.forEach((btn) => {
    btn.classList.toggle('hide');
  });
}

function start () {
  toggleHiddenUnhidden();
  tenthInterval = setInterval(timer, 10);
}

function stop () {
  toggleHiddenUnhidden();
   clearInterval(tenthInterval);
}

function lap () {
  let lapTime = `${secs}.${tenths}`;
  
  lapTimesClicked.unshift(lapTime);
  
  if (lapTimesClicked[1]) {
    let prevLapTime = lapTimesClicked[1];
    lapTime = (lapTime - prevLapTime).toFixed(2);

    lapTimesConverted.unshift(lapTime);
  } else {
    lapTimesConverted.push(lapTime);
  }

  lapInfo.innerHTML = lapTimesConverted.map(lapTime => {
    // fastest lap, longest lap, neither
    if( lapTime == Math.min(...lapTimesConverted)) {
      return `<li class="green white-text">${lapTime}</li>`;
    } else if (lapTime == Math.max(...lapTimesConverted))  {
      return `<li class="red white-text">${lapTime}</li>`;
    } else {
      return `<li>${lapTime}</li>`;
    } 
  }).join('');
}

function reset () {
  secs = '00';
  tenths = '00';
  mins = '00';
  secSpan.innerHTML = secs;
  tenthSpan.innerHTML = tenths;
  minSpan.innerHTML = mins;
  lapInfo.innerHTML = '';
  lapTimesClicked = [];
  lapTimesConverted = [];
}

function timer () {
  tenths++;
  
  if (tenths <= 9) {
    tenths = `0${tenths}`;
    tenthSpan.innerHTML = tenths;
  } else {
    tenthSpan.innerHTML = tenths;
  }
  
  if (tenths > 99) {
    tenths = '00';
    tenthSpan.innerHTML = tenths;
    secs++;
    secSpan.innerHTML = `0${secs}`;
  }
  
  // not seconds with a leading 0
  if (secs > 9) {
    secSpan.innerHTML = secs;
  }
  
  if (secs > 59) {
    secs = '00';
    secSpan.innerHTML = secs;
    mins++;
    minSpan.innerHTML = `0${mins}`;
  }
}

const util = {
  start,
  stop,
  lap,
  reset
}

allBtns.forEach(function(btn) {
  btn.addEventListener('click', (e) => {
    let btnFunc = e.target.innerHTML;
    util[btnFunc]();
  });
});