
let drag_desktop = function drag() {
  if (drag.dragDir === 'right') {
    if ((drag.last_i - drag.overflowSize - drag.property) === 0) {
      drag.load_prev();
      return;
    }
  }
  else {
    if ((drag.last_i - drag.property) === 0) {
      drag.load_next();
      return;
    }
  }
  if (drag.dragFlag) {

    if (drag.prevX) {
      moveslider(drag.slider);
      if (Math.abs(getRealProp() - drag.property) >= 1) {
        if (drag.dragDir === 'left') {

          drag.property++;
          assignProp(drag.property);
          drag.prevX = event.screenX;
        } else {
          drag.property--;
          assignProp(drag.property);
          drag.prevX = event.screenX;
        }

      } else if ((getRealProp() - drag.property) < 0 && drag.dragDir === 'left') {
        toggleDirection();
        drag.prevX = event.screenX;
      }
      if ((getRealProp() - drag.property) > 0 && drag.dragDir === 'right') {
        toggleDirection();
        drag.prevX = event.screenX;
      }
      addtoProp((- event.screenX + drag.prevX) / 4000);
    } else { drag.prevX = event.screenX; }
  }
}

let drag_mobile = function drag() {
  if (drag.dragDir === 'right') {
    if ((drag.last_i - drag.overflowSize - drag.property) === 0) {
      drag.load_prev();
      return;
    }
  }
  else {
    if ((drag.last_i - drag.property) === 0) {
      drag.load_next();
      return;
    }
  }
  if (drag.dragFlag) {

    if (drag.prevX) {

      moveslider(drag.slider);
      if (Math.abs(getRealProp() - drag.property) >= 1) {
        if (drag.dragDir === 'left') {

          drag.property++;
          assignProp(drag.property);
          drag.prevX = event.touches[0].pageX;
        } else {
          drag.property--;
          assignProp(drag.property);
          drag.prevX = event.touches[0].pageX;
        }

      } else if ((getRealProp() - drag.property) < 0 && drag.dragDir === 'left') {
        toggleDirection();
        drag.prevX = event.touches[0].pageX;
      }
      if ((getRealProp() - drag.property) > 0 && drag.dragDir === 'right') {
        toggleDirection();
        drag.prevX = event.touches[0].pageX;
      }
      addtoProp((-event.touches[0].pageX + drag.prevX) / 100);
    } else { drag.prevX = event.touches[0].pageX; }
  }
}

export function getRealProp() {
  return parseFloat(getComputedStyle(document.body).getPropertyValue(drag.propertyName));
}

export function assignProp(i) {
  document.body.style.setProperty(drag.propertyName, i);
}

export function addtoProp(val) {
  document.body.style.setProperty(drag.propertyName, getRealProp() + val);
}


function toggleDirection() {
  if (drag.dragDir === 'right') {
    drag.dragDir = 'left';
  }
  if (drag.dragDir === 'left') {
    drag.dragDir = 'right';
  }
}

export function moveslider(slider) {
  let first = parseInt(getComputedStyle(slider.children[0]).getPropertyValue('--i')) - 2;
  if (getComputedStyle(document.body).getPropertyValue('--i') === '1') {
    first = -1;
    slider.children[0].style.display = 'none';
    slider.children[1].style.display = null;
  }
  if (getComputedStyle(document.body).getPropertyValue('--i') === '2') {
    first = 0;
    slider.children[0].style.display = null;
    slider.children[1].style.display = null;
  }
  if (getComputedStyle(document.body).getPropertyValue('--i') === '0') {
    first = -2;
    slider.children[0].style.display = 'none';
    slider.children[1].style.display = 'none';
  } else {
    if (document.getElementsByClassName('slider-main')[0]) document.getElementsByClassName('slider-main')[0].classList.remove('slider-main');
    slider.children[parseInt(getComputedStyle(document.body).getPropertyValue('--i')) - first].setAttribute('class', 'slider-main');
  }


}

export let drag = (window.matchMedia("(hover: hover").matches) ? drag_desktop : drag_mobile;

