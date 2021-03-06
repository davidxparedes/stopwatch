let allBtns = document.querySelectorAll('button');
const secSpan = document.querySelector('#secs');
const tenthSpan = document.querySelector('#tenths');
const minSpan = document.querySelector('#mins');
const lapInfo = document.querySelector('#lapInfo');
let mins = '00';
let secs = '00';
let tenths = '00';
let tenthInterval;
let prevLap = {mins: '00', secs: '00', tenths: '00' };
let prevLaps = [];
let lapTimesNoPunctuation = [];

function toggleHiddenUnhidden() {
  allBtns.forEach((btn) => {
    btn.classList.toggle('hide');
  });
}

function start() {
  toggleHiddenUnhidden();
  tenthInterval = setInterval(timer, 10);
}

function timer() {
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

    if (secs <= 9) {
      secs = `0${secs}`;
      secSpan.innerHTML = secs;
    } else {
      secSpan.innerHTML = secs;
    }
  }
  
  if (secs > 59) {
    secs = '00';
    secSpan.innerHTML = secs;
    mins++;
    minSpan.innerHTML = `0${mins}`;

    if (mins <= 9) {
      mins = `0${mins}`;
      minSpan.innerHTMl = mins;
    } else {
      minSpan.innerHTML = mins;
    }
  }

  // reset and stop when timer reaches 59 mins, 59 seconds and 99 tenths
  if (mins === 59 && secs === 59 && tenths === 99) {
    clearInterval(tenthInterval);
    reset();
    toggleHiddenUnhidden();
  }
}

function lap() {
  let lapMins = mins - prevLap.mins;
  let lapSecs = secs - prevLap.secs;
  let lapTenths = tenths - prevLap.tenths;

  if (lapMins < 0) {
    lapMins = lapMins + 60;
  }

  if (lapMins <= 9) {
    lapMins = `0${lapMins}`;
  }

  if (lapSecs < 0) {
    lapSecs = lapSecs + 60;
  }

  if (lapSecs <= 9) {
    lapSecs = `0${lapSecs}`;
  }

  if (lapTenths < 0) {
    lapTenths = lapTenths + 100;
  }

  if (lapTenths < 9) {
    lapTenths = `0${lapTenths}`;
  }

  prevLap = {
    mins,
    secs,
    tenths
  }

  prevLaps.unshift({mins: `${lapMins}`, secs: `${lapSecs}`, tenths: `${lapTenths}`});

  lapInfo.innerHTML = prevLaps.map((lapTime, index) => {
    
    let lapTimeNoPunctuation = `${lapTime.mins}${lapTime.secs}${lapTime.tenths}`;

    lapTimesNoPunctuation.unshift(lapTimeNoPunctuation);
   
    if( lapTimeNoPunctuation == Math.min(...lapTimesNoPunctuation)) {
      return `<li class="green white-text">
                <span>Lap ${prevLaps.length - index}</span>
                <span>${lapTime.mins}:${lapTime.secs}.${lapTime.tenths}</span>
              </li>`;
    } else if (lapTimeNoPunctuation == Math.max(...lapTimesNoPunctuation))  {
      return `<li class="red white-text">
                <span>Lap ${prevLaps.length - index}</span>
                <span>${lapTime.mins}:${lapTime.secs}.${lapTime.tenths}</span>
              </li>`;
    } else {
      return `<li>
                <span>Lap ${prevLaps.length - index}</span>
                <span>${lapTime.mins}:${lapTime.secs}.${lapTime.tenths}</span>
              </li>`;
    } 
  }).join('');
}

function stop() {
  toggleHiddenUnhidden();
  clearInterval(tenthInterval);
}

function reset() {
  secs = '00';
  tenths = '00';
  mins = '00';
  secSpan.innerHTML = secs;
  tenthSpan.innerHTML = tenths;
  minSpan.innerHTML = mins;
  lapInfo.innerHTML = '';
  prevLap = {mins: '00', secs: '00', tenths: '00' };
  prevLaps = [];
  lapTimesNoPunctuation = []
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
