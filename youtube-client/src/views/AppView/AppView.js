import CardView from '../CardView'

export default class AppView {
  constructor(data, overflowCount) {
    this.data = data;
    this.overflowCount = overflowCount;
  }

  renderDocument(app) {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    function find() { app.find(this.value); }
    input.addEventListener('change', find);
    document.body.appendChild(input);
    let content = document.createElement('ul');
    content.setAttribute('id', 'content');
    document.body.addEventListener('dragstart', () => false);
    function drag() {
      if (drag.flag) {
        if (drag.prevX) {
          if ((drag.prevX - event.screenX) > 5) {
            drag.dir = 'left';
            console.log((drag.prevX - event.screenX) / window.screen.width);


          } else if ((drag.prevX - event.screenX) < -5) {
            drag.dir = 'right';
          }
          if (drag.dir !== 'right' || geti() !== 0) {
            if ((geti() - drag.i) === 1) {
              drag.prevX = event.screenX;
              drag.i++;
              console.log('drag.i', drag.i);
              assigntoi(drag.i);
            } else {
              assigntoi(geti() + (((drag.prevX - event.screenX)) / (450)));
            }
          }

        } else { drag.prevX = event.screenX; }
      }
    }
    content.addEventListener('mousemove', drag);
    drag.flag = false;
    drag.i = 0;
    content.addEventListener('mousedown', () => { event.preventDefault(); console.log(3); if (event.button === 0) { drag.flag = true } });
    document.body.addEventListener('mouseup', () => {
      if (drag.flag) {
        console.log(9); if (event.button === 0) {
          drag.flag = false; drag.prevX = 0;
          if (drag.dir === 'right' && geti() !== 0) { assigntoi(geti() - 1); } else {
            assigntoi(geti() + 1);
          }
        }
      }
    });

    document.body.appendChild(content);
    function geti() {
      return parseInt(getComputedStyle(content).getPropertyValue('--i'));
    }

    function assigntoi(i) {
      content.style.setProperty('--i', i);
    }
  }

  removeOverflow() {
    const content = document.getElementById('content');
    let child;
    for (let i = 0; i < this.overflowCount; i++) {
      child = content.children[0];
      content.removeChild(child);
    }
  }

  renderCards() {
    const cardView = new CardView();
    const content = document.getElementById('content');
    content.innerHTML += this.data.map((item, i) => { if (item.count + 1 === this.overflowCount * 2) { this.overflowFlag = true; } return `<li>${cardView.returnHTML(item, i).outerHTML}</li>` }).join('');

    let N = content.children.length;
    content.style.setProperty('--n', N);
  }
}
