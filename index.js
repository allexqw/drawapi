/* eslint-disable no-console */
/* eslint-disable no-undef */
const color = {
  previous: '',
  current: '',
};
let str = '';
let city = 'Grodno';
function init() {
  document.getElementById('previous').value = localStorage.getItem(color.previous);
  document.getElementById('current').value = localStorage.getItem(color.current);
  const div = document.createElement('div');
  const canvas = document.createElement('canvas');
  const pageload = document.createElement('div');
  const load = document.createElement('button');
  const bw = document.createElement('button');
  const search = document.createElement('input');

  div.id = 'canvas__element';
  canvas.id = 'canvas';
  pageload.id = 'pageLoad';
  load.id = 'load';
  bw.id = 'bw';
  search.id = 'search';
  load.type = 'button';
  bw.type = 'button';
  search.type = 'input';
  load.innerHTML = 'load';
  bw.innerHTML = 'B&W';
  document.getElementById('container').appendChild(div);
  document.getElementById('canvas__element').appendChild(canvas);
  document.getElementById('canvas__element').appendChild(pageload);

  document.getElementById('pageLoad').appendChild(load);
  document.getElementById('pageLoad').appendChild(search);
  document.getElementById('pageLoad').appendChild(bw);
  div.appendChild(canvas);
  canvas.width = 512;
  canvas.height = 512;
  ctx = canvas.getContext('2d');
}

function pageLoad() {
  const img = new Image();
  img.src = str;
  console.log('one');
  img.onload = function() {
    console.log('to');
    img.width = 512;
    ctx.drawImage(img, 0, 0);
  };
  pencil();
}
function colorSave() {
  localStorage.setItem(color.previous, document.getElementById('previous').value);
  localStorage.setItem(color.current, document.getElementById('current').value);
}

function eraser() {
  document.getElementById('eraser').style.background = '#aaa';
  document.getElementById('pencil').style.background = '';
  document.getElementById('bucket').style.background = '';
  document.getElementById('chooseColor').style.background = '';

  canvas.onmousedown = function(event) {
    canvas.onmousemove = function(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.clearRect(x, y, 32, 32);
    };
    canvas.onmouseup = function(event) {
      canvas.onmousemove = null;
    };
    colorSave();
  };
}

function bucket() {

  document.getElementById('bucket').style.background = '#aaa';
  document.getElementById('eraser').style.background = '';
  document.getElementById('pencil').style.background = '';
  document.getElementById('chooseColor').style.background = '';

  canvas.onmousedown = function(event) {
    // color.current = localStorage.getItem(color.curent);
    ctx.fillStyle = document.getElementById('current').value;
    ctx.fillRect(0, 0, 512, 512);
    ctx.fill();
    colorSave();
  };
}

function fetchqw() {
  city = document.getElementById('search').value;
  let i = 'https://api.unsplash.com/photos/random?query=town,'+ city +'&client_id=334b7450f776bc69c26851ec36e15fbb49a315da739c64375024b2646e8a2a7e';
  fetch(i)
    .then(response => response.json())
    .then(object => {
      str = object.urls.small;
      console.log(str);
      pageLoad();
    });
}

function pencil() {
  document.getElementById('pencil').style.background = '#aaa';
  document.getElementById('eraser').style.background = '';
  document.getElementById('bucket').style.background = '';
  document.getElementById('chooseColor').style.background = '';
  // localStorage.setItem(color.current, document.getElementById('current').value);
  canvas.onmousedown = function(event) {
    color.current = document.getElementById('current').value;
    canvas.onmousemove = function(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.fillStyle = color.current;
      ctx.fillRect(x, y, 32, 32);
      ctx.fill();
      colorSave();
    };
    canvas.onmouseup = function(event) {
      canvas.onmousemove = null;
    };
  };
}
function chooseColor() {
  document.getElementById('pencil').style.background = '';
  document.getElementById('eraser').style.background = '';
  document.getElementById('bucket').style.background = '';
  document.getElementById('chooseColor').style.background = '#aaa';
}
function colorFunction() {
  document.getElementById('previous').value = document.getElementById('current').value;
}


addEventListener ('keydown', (e) => {
  switch (e.keyCode) {
    case 80:
      pencil();
      break;
    case 66:
      bucket();
      break;
    case 67:
      eraser();
      break;
    default:
  }
});

init();
pencil();
bucket();
eraser();
chooseColor();
colorFunction();
document.getElementById('load').addEventListener('click', fetchqw);
