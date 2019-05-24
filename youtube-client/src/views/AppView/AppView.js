import CardView from '../CardView'
import { drag, moveslider, assignProp } from './Drag.js'
export default class AppView {
  constructor(data, overflowCount, last_i, load_prev, load_next, endflag) {
    this.data = data || new Array(overflowCount).fill(0);
    this.overflowCount = overflowCount;
    this.last_i = last_i;
    this.load_prev = load_prev;
    this.load_next = load_next;
    this.endflag = endflag;
  }


  renderDocument(app) {
    document.title = 'RSS Youtube client';
    let slider = document.createElement('div');
    slider.setAttribute('class', 'slider');
    let checkbox;
    for (let i = 0; i < 5; i++) {

      checkbox = document.createElement('input');
      if (i === 2) {
        checkbox.setAttribute('checked', 'true');
        checkbox.setAttribute('class', 'slider-main');
      }
      checkbox.setAttribute('type', 'radio');
      checkbox.setAttribute('name', 'page');
      slider.appendChild(checkbox);
      checkbox.addEventListener('click', () => {
        if (event.target.classList.contains('slider-main')) {
          return;
        }
        document.body.style.setProperty('--i', eval(getComputedStyle(event.target, '::before').getPropertyValue('--n').replace(/.*([0-9] [-+] [0-9]).*/, '$1')));
        moveslider(slider);
      })
      checkbox.style.display = 'none';
      slider.appendChild(checkbox);
    }

    slider.children[0].style.display = 'none';
    slider.children[1].style.display = 'none';



    document.body.appendChild(slider);
    let searchbox = document.createElement('div');
    let label = document.createElement('label');
    label.setAttribute('for', 'search');
    label.innerText = '\uf002'
    searchbox.setAttribute('class', 'searchbox');
    let input = document.createElement('input')
    input.setAttribute('id', 'search');
    input.setAttribute('type', 'search');
    function find() { app.find(this.value); }
    input.addEventListener('change', find);

    searchbox.appendChild(input);
    searchbox.appendChild(label);
    document.body.appendChild(searchbox);
    let content = document.createElement('ul');
    content.setAttribute('id', 'content');

    drag.slider = slider;
    drag.content = content;
    drag.propertyName = '--i';
    drag.dragDir = 'left';
    drag.dragFlag = false;
    drag.property = 0;
    drag.prevX = undefined;
    drag.last_i = this.last_i;
    drag.load_prev = this.load_prev;
    drag.load_next = this.load_next;
    drag.overflowCount = this.overflowCount;

    document.body.addEventListener('dragstart', () => false);
    content.addEventListener('mousemove', drag);
    content.addEventListener('touchmove', drag);
    content.addEventListener('mousedown', () => { event.preventDefault(); if (event.button === 0) { drag.dragFlag = true } });
    content.addEventListener('touchstart', () => { event.preventDefault(); drag.dragFlag = true; });
    document.body.appendChild(content);
    document.body.addEventListener('touchend', () => {
      if (drag.dragFlag) {
        drag.dragDir = 'left';
        drag.dragFlag = false; drag.prevX = 0;
        assignProp(drag.property);

      }
    });

    document.body.addEventListener('mouseup', () => {
      if (drag.dragDir === 'right') {
        if ((drag.last_i - drag.overflowCount - drag.property) === 0) {
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
        drag.dragDir = 'left';
        if (event.button === 0) {
          drag.dragFlag = false; drag.prevX = 0;
          assignProp(drag.property);
        }
      }
    });
  }

  removeOverflow() {
    const content = document.getElementById('content');
    let child;
    for (let i = 0; i < this.overflowCount; i++) {
      child = content.children[0];
      content.removeChild(child);
    }
  }

  render_consistent() {
    if (!this.endflag) {
      let slider = document.getElementsByClassName('slider')[0];
      slider.children[2].style.display = null;
      slider.children[3].style.display = null;
      slider.children[4].style.display = null;
      const cardView = new CardView();
      const content = document.getElementById('content');
      content.innerHTML += this.data.map(
        (item) => {
          if (item.count + 1 === this.overflowCount * 2) { this.overflowFlag = true; }
          return `<li>${cardView.returnHTML(item).outerHTML}</li>`
        }).join('');
    }
  }
  async renderW_Ooverflow() {
    this.render_consistent();
    return new Promise((resolve) => resolve(true));
  }

  async renderCards() {
    this.render_consistent()
    if (this.overflowFlag) {
      this.removeOverflow();
    }
    return new Promise((resolve) => resolve(true));
  }

  clear() {
    let content = document.getElementById('content');
    content.innerHTML = '';
  }

}
