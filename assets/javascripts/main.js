// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// Volume calculation

function calculateResult(e) {
  e.preventDefault();
  const lenghtInput = document.getElementById('lenght');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  let resultOutput = document.getElementById('volume');
  // validate input data type and calculate result

  lenghtInput.addEventListener('input', () => {
    // alert( lenghtInput.value + ' Need calculate volume');
    document.getElementById('lenghtInput').innerHTML = lenghtInput.value + 'cm';
    document.querySelectorAll('.front, .back').forEach(function (element) {
      element.style.width = lenghtInput.value + 'px';
    });

    resultOutput.innerHTML =
      Math.trunc((lenghtInput.value * widthInput.value * heightInput.value) / 1000) + ' Litres';
  });

  widthInput.addEventListener('input', () => {
    // alert( lenghtInput.value + ' Need calculate volume');
    document.getElementById('widthInput').innerHTML = widthInput.value + 'cm';

    document.querySelectorAll('.sideLeft, .sideRight').forEach(function (element) {
      element.style.width = widthInput.value + 'px';
    });

    document.querySelectorAll('.back').forEach(function (element) {
      const styelNewLeft = parseInt(widthInput.value);
      element.style.left = styelNewLeft + 'px';
    });

    resultOutput.innerHTML =
      Math.trunc((lenghtInput.value * widthInput.value * heightInput.value) / 1000) + ' Litres';
  });

  heightInput.addEventListener('input', () => {
    // alert( lenghtInput.value + ' Need calculate volume');
    document.getElementById('heightInput').innerHTML = heightInput.value + 'cm';

    document.querySelectorAll('.front, .back, .sideLeft, .sideRight').forEach(function (element) {
      element.style.height = heightInput.value + 'px';
    });

    resultOutput.innerHTML =
      Math.trunc((lenghtInput.value * widthInput.value * heightInput.value) / 1000) + ' Litres';
  });
}

window.onload = () => {
  startSetTimeoutAnimation();
  startAnimFrameAnimation();
};

function startSetTimeoutAnimation() {
  const refreshRate = 1000 / 60;
  const maxXPosition = 400;

  const text = document.getElementById('animatetext');
  
  // text.getAttribute('startOffset') = 90;


  console.log(document.getElementById('animatetext').getAttribute('startOffset'));

  // let rect = document.getElementById('animatetext');
  // let speedX = 1;
  // let positionX = 0;

  // window.setInterval(() => {
  //   positionX = positionX + speedX;
  //   if (positionX > maxXPosition || positionX < 0) {
  //     speedX = speedX * (-1);
  //   }
  //   rect.startOffset = positionX + 'px';
  // }, refreshRate);
}

function startAnimFrameAnimation() {
  // const refreshRate = 1000 / 60;
  // const maxXPosition = 400;
  // let rect = document.getElementById('animatetext');
  // let speedX = 1;
  // let positionX = 0;

  // function step() {
  //   positionX = positionX + speedX;
  //   if (positionX > maxXPosition || positionX < 0) {
  //     speedX = speedX * (-1);
  //   }
  //   rect.rect.startOffset = positionX + 'px';
  //   window.requestAnimationFrame(step);
  // }

  // window.requestAnimationFrame(step);
}

