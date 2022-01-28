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
let lapTimes = [];

// hide or show buttons when clicking start or stop
function toggleHiddenUnhidden() {
  allBtns.forEach((btn) => {
    btn.classList.toggle('hide');
  });
}

// start the interval
function start() {
  toggleHiddenUnhidden();
  // tenthInterval = setInterval(timer, 10);
  tenthInterval = setInterval(timer, 1);
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

  lapTimes.unshift(`${lapMins}:${lapSecs}.${lapTenths}`);

  console.log('converted lap* times ',lapMins, lapSecs, lapTenths);
  console.log('prevLap ', prevLap);
  console.log('lapTimes ', lapTimes);

  lapInfo.innerHTML = lapTimes.map((lapTime, index) => {
    return `<li>
              <span>Lap ${lapTimes.length - index}</span>
              <span>${lapTime}</span>
            </li>`;
  }).join('');

  // let lapTime = `${mins}${secs}.${tenths}`;

  // lapTimesClicked.unshift(lapTime);

  // if (lapTimesClicked[1]) {
  //   let prevLapTime = lapTimesClicked[1];
  //   lapTimeConverted = (lapTime - prevLapTime).toFixed(2);

  //   lapTimesConverted.unshift(lapTimeConverted);
  // } else {
  //   lapTimesConverted.push(parseFloat(lapTime));
  // }

  // lapInfo.innerHTML = lapTimesConverted.map(lapTime => {
  //   if( lapTime == Math.min(...lapTimesConverted)) {
  //     return `<li class="green white-text">${lapTime}</li>`;
  //   } else if (lapTime == Math.max(...lapTimesConverted))  {
  //     return `<li class="red white-text">${lapTime}</li>`;
  //   } else {
  //     return `<li>${lapTime}</li>`;
  //   } 
  // }).join('');
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
  prevLap
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
