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
window.addEventListener('load', function (event) {
  resizeAnimate();

  var div_list = document.querySelectorAll('[id^="animatetext"]'); // returns NodeList
  var div_array = [...div_list]; // converts NodeList to Array
  div_array.forEach(div => {
    startSetTimeoutAnimation(div.id);
    startAnimFrameAnimation(div.id);
  });
});

window.addEventListener('resize', function (event) {
  resizeAnimate();
});

function resizeAnimate() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  //for zoom detection
  px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;


  if (px_ratio <= 1.25) {
     px_ratio = 1;
  }

  let resizeAnimate = document.getElementById('animate').style;
  resizeAnimate.height = height / px_ratio + 'px';
}

function startSetTimeoutAnimation(id) {
  const refreshRate = 1000 / 60;
  const maxXPosition = 1280;
  const startPosition = -500;

  let rect = document.getElementById(id);
  
  let speedX = parseFloat(rect.getAttribute("speed"));
  let positionX = -400;

  window.setInterval(() => {
    positionX = positionX + speedX;
    if (positionX > maxXPosition || positionX < startPosition) {
      speedX = speedX * -1;
      letter = rect.textContent == rect.getAttribute("fowardletter") ? rect.getAttribute("reverseletter") : rect.getAttribute("fowardletter");
      rect.textContent = letter;
    }

    rect.setAttribute('startOffset', positionX);
  }, refreshRate)
}

function startAnimFrameAnimation(id) {
  const refreshRate = 1000 / 60;
  const maxXPosition = 1280;
  const startPosition = -500;
  let rect = document.getElementById(id);
  
  
  let speedX = parseFloat(rect.getAttribute("speed"));
  let positionX = 0;

  function step() {
    positionX = positionX + speedX;
    if (positionX > maxXPosition || positionX < startPosition) {
      speedX = speedX * -1;
      letter = rect.textContent == rect.getAttribute("fowardletter") ? rect.getAttribute("reverseletter") : rect.getAttribute("fowardletter");
      rect.textContent = letter;
    }
    
    rect.setAttribute('startOffset', positionX);
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

function startAnimText(id, rate) {
  const refreshRate = rate;
  const letter = Array('A','B');

  let i = 0;
  let text = document.getElementById(id);

  window.setInterval(() => {
    
    text.textContent = letter[i];
    if (i < letter.length - 1) {
      i++;
    } else {
      i = 0;
    }
  }, refreshRate);
}

// window.addEventListener("scroll", function(){
//   let header = document.querySelector("header");
//   header.classList.toggle("sticky", window.scrollY > 90);

//   console.log(window.scrollY);
// })
