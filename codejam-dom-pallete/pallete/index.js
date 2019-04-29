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
let move = null;

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
  switch (name) {
    case ('transform'): foreachClass(i => i.style.cursor = "url('./assets/cursors/exchange-alt.svg'), pointer", '.figure'); break;
    case ('bucket'): foreachClass(i => i.style.cursor = "url('./assets/cursors/fill-drip.svg'), pointer", '.figure'); break;
    case ('pipette'): foreachClass(i => i.style.cursor = "url('./assets/cursors/eye-dropper.svg') -10 -10, pointer", '.figure', '.color'); break;
    case ('move'): document.addEventListener('click', func, false); foreachClass(i => i.style.cursor = "url('./assets/cursors/arrows-alt.svg'), pointer", '.figure'); break;
    case ('swap'): document.addEventListener('click', func, false); foreachClass(i => i.style.cursor = "url('./assets/cursors/arrows-alt.svg'), pointer", '.figure'); break;
    default: throw new Error('Unknown tool');
  }

  if (name === currentTool) {
    foreachClass(i=> i.style.cursor = 'default', '.figure', '.color');
    btn.classList.remove('active-btn');
    currentTool = 'none';
    return;
  }

  currentTool = name;
  if (document.getElementsByClassName('active-btn').length !== 0)
  { document.getElementsByClassName('active-btn')[0].classList.remove('active-btn'); }
  if (name !== 'none')
  { btn.classList.add('active-btn'); }
  const pick = function (fig) {
    changeColor(fig.target.style.backgroundColor);
    document.removeEventListener('click', pick, false);
    changeTool('none');
  };
  if (name === 'pipette') {
    document.addEventListener('click', pick, false);
  }
  else {
    document.removeEventListener('click', pick, false);
  }
}

function foreachClass(callback, ...args) {
  args.forEach(i => Array.from(document.querySelectorAll(i)).forEach(callback));

}

function func() {
  if (move) {
    stopTracking(move);
  }
}

function onClickFig(figure) {
  event.stopPropagation();
  event.preventDefault();
  switch (currentTool) {
    case 'transform': figure.classList.toggle('circle'); break;
    case 'bucket': figure.style.backgroundColor = currentColor; break;
    case 'move': moveFig(figure); break;
    case 'swap': moveFig(figure); break;
    default: throw new Error('Unknown tool');
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

function moveFig(figure) {
  if (move === null) {
    move = figure;
    figure.style.zIndex = '3';
  }
  else {
    figure.style.zIndex = '2';
    if (currentTool === 'swap' && figure !== move) {
      swap(figure, move);
      move = null;
      return;
    }
    move = null;
    stopTracking(figure);
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
  if (currentTool === 'move' && move) {
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
  document.removeEventListener('click', func, false);
  fig.style.left = `${parseInt(fig.style.left, 10) + event.clientX - parseInt(fig.getBoundingClientRect().width, 10) / 2
  - fig.getBoundingClientRect().left}px`;
  fig.style.top = `${parseInt(fig.style.top, 10) + event.clientY - parseInt(fig.getBoundingClientRect().height, 10) / 2
  - fig.getBoundingClientRect().top}px`;

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
