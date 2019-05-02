/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
let currentTool = 'none';
let currentColor = '#c4c4c4c';
let movingFigure = null;
const movingFigure_atStart = {};

function onloadFunc() {
  document.addEventListener('keydown', shortcuts, false);
}

function shortcuts() {
  switch (event.key) {
    case 'b': changeTool('bucket', document.getElementById('bucket-tool')); break;
    case 'p': changeTool('pipette', document.getElementById('pipette-tool')); break;
    case 't': changeTool('transform', document.getElementById('transform-tool')); break;
    case 'm': changeTool('move', document.getElementById('move-tool')); break;
    default: break;
  }
}

function changeTool(name, btn) {
  event.stopPropagation();
  document.removeEventListener('click', pick, false);
  switch (name) {
    case ('transform'): foreachClass(i => i.style.cursor = "url('./assets/cursors/exchange-alt.svg'), pointer", '.figure'); break;
    case ('bucket'): foreachClass(i => i.style.cursor = "url('./assets/cursors/fill-drip.svg'), pointer", '.figure'); break;
    case ('pipette'): document.addEventListener('click', pick, false); foreachClass(i => i.style.cursor = "url('./assets/cursors/eye-dropper.svg') -10 -10, pointer", '.figure', '.color'); break;
    case ('move'): foreachClass(i => i.style.cursor = "url('./assets/cursors/arrows-alt.svg'), pointer", '.figure'); break;
    case ('none'): break;
    default: throw new Error(`Unknown tool ${name}`);
  }

  if (name === currentTool) {
    foreachClass(i => i.style.cursor = 'default', '.figure', '.color');
    btn.classList.remove('active-btn');
    currentTool = 'none';
    return;
  }

  if (name !== currentTool && currentTool !== 'none') {
    document.querySelector('.active-btn').classList.remove('active-btn');
  }

  if (name !== 'none') {
    btn.classList.add('active-btn');
  }
  currentTool = name;
}


function pick(fig) {
  changeColor(getComputedStyle(fig.target).backgroundColor);
  document.removeEventListener('click', pick, false);
  changeTool('none');
}

function foreachClass(callback, ...args) {
  args.forEach(i => Array.from(document.querySelectorAll(i)).forEach(callback));
}

function setMovingFigure(fig) {
  if (currentTool === 'move') {
    movingFigure = fig;
    movingFigure_atStart.left = fig.style.left;
    movingFigure_atStart.top = fig.style.top;
    movingFigure.style.zIndex = '9999';
    document.body.ondragstart = function () {
      return false;
    };
    event.target.addEventListener('mousemove', () => trackMouse(movingFigure));
    event.target.addEventListener('mouseup', () => ((event.button === 0) ? stopTracking(fig) : false));
  }
}

function rollback() {
  movingFigure.style.left = movingFigure_atStart.left;
  movingFigure.style.top = movingFigure_atStart.top;
  return movingFigure;
}

function onClickFig(figure) {
  event.stopPropagation();
  event.preventDefault();
  switch (currentTool) {
    case 'transform': figure.classList.toggle('circle'); break;
    case 'bucket': figure.style.backgroundColor = currentColor; break;
    case 'pipette': figure.addEventListener('click', pick, false); break;
    case 'move': break;
    case 'none': break;
    default: throw new Error(`Unknown tool ${currentTool}`);
  }
}

function changeColor(color) {
  if (color) {
    const currColorBtn = document.getElementById('color_picker');
    const prevColorBtn = document.getElementById('previous-color').querySelector('.color');
    prevColorBtn.style.backgroundColor = currentColor;
    currColorBtn.value = RGBtoHEX(color);
    currentColor = color;
  }
}

function swap(fig1, fig2) {
  const buf = {};
  buf.left = fig1.getBoundingClientRect().left;
  buf.top = fig1.getBoundingClientRect().top;
  fig1.style.left = `${parseInt(fig1.style.left, 10) + fig2.getBoundingClientRect().left - fig1.getBoundingClientRect().left}px`;
  fig1.style.top = `${parseInt(fig1.style.top, 10) + fig2.getBoundingClientRect().top - fig1.getBoundingClientRect().top}px`;
  fig2.style.left = `${parseInt(fig2.style.left, 10) + buf.left - fig2.getBoundingClientRect().left}px`;
  fig2.style.top = `${parseInt(fig2.style.top, 10) + buf.top - fig2.getBoundingClientRect().top}px`;
}

function trackMouse(fig) {
  if (movingFigure !== null) {
    event.stopPropagation();
    event.preventDefault();
    if (Number.isNaN(fig.style.left) || !fig.style.left) {
      fig.style.left = 0; fig.style.top = 0;
    }
    fig.style.left = `${parseInt(fig.style.left, 10) + event.clientX - parseInt(fig.getBoundingClientRect().width, 10) / 2
  - fig.getBoundingClientRect().left}px`;
    fig.style.top = `${parseInt(fig.style.top, 10) + event.clientY - parseInt(fig.getBoundingClientRect().height, 10) / 2
  - fig.getBoundingClientRect().top}px`;

  }
}

function stopTracking(fig) {
  function findDroppable(event) {
    movingFigure.style.display = 'none';
    const elem = document.elementFromPoint(event.clientX, event.clientY);
    movingFigure.style.display = 'block';
    return (elem.classList.contains('figure')) ? elem: movingFigure;
  }
  const el = findDroppable(event);
  if (el !== movingFigure) {
    swap(rollback(), el);
    movingFigure.style.zIndex = '2';
    movingFigure = null;
    return;
  }

  fig.style.left = `${parseInt(fig.style.left, 10) + event.clientX - parseInt(fig.getBoundingClientRect().width, 10) / 2
  - fig.getBoundingClientRect().left}px`;
  fig.style.top = `${parseInt(fig.style.top, 10) + event.clientY - parseInt(fig.getBoundingClientRect().height, 10) / 2
  - fig.getBoundingClientRect().top}px`;
  movingFigure.style.zIndex = '2';
  movingFigure = null;
}

function RGBtoHEX(str) {
  if (str.match(/#[0-9a-fA-F]{6}/)) {
    return str;
  }
  const sf = String(str);
  let rgb = sf.replace(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)\)/, '$1 $2 $3');
  rgb = rgb.split(' ');
  function toHex(x) {
    return (`0${parseInt(x, 10).toString(16)}`).slice(-2);
  }
  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
}

function save() {
  let string = '';
  foreachClass(i => string += `${getComputedStyle(i).backgroundColor}~${i.classList}~${getComputedStyle(i).left}~${getComputedStyle(i).top}~`, '.figure');
  sessionStorage.setItem('figures', string);
  string = '';
  foreachClass(i => string += `${getComputedStyle(i).backgroundColor}~`, '.color');
  sessionStorage.setItem('colors', string);
  sessionStorage.setItem('color_picker', document.getElementById('color_picker').value);
}

function load() {
  let saved = sessionStorage.getItem('figures').split('~');
  foreachClass((x, i, arr) => { x.style.backgroundColor = saved[i * 4]; arr[i].classList = Array.from(saved[i * 4 + 1].split(',')); arr[i].style.left = saved[i * 4 + 2]; arr[i].style.top = saved[i * 4 + 3]; }, '.figure');
  saved = sessionStorage.getItem('colors').split('~');
  foreachClass((x, i, arr) => { x.style.backgroundColor = saved[i]; });
  changeColor(sessionStorage.getItem('color_picker'));
}
