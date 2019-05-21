import CardView from '../CardView'

export default class AppView {
  constructor(data, overflowCount) {
    this.data = Array(20).fill(0);
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
    content.addEventListener('mousemove', drag);
    content.addEventListener('touchmove', swipe);
    drag.flag = false;
    drag.i = 0;
    drag.dir = 'left';
    function swipe() {
      function toggle() {
        if (drag.dir === 'right') {
          drag.dir = 'left';
        }
        if (drag.dir === 'left') {
          drag.dir = 'right';
        }
      }
      console.log(drag.prevX);
      if (drag.flag) {
        if (drag.prevX) {
          console.log(drag.i, geti(), event.touches[0].pageX - drag.prevX);
          if (Math.abs(geti() - drag.i) >= 1) {
            if (drag.dir === 'left') {
              drag.i++;
              assigntoi(drag.i);
              drag.prevX = event.touches[0].pageX;
            } else {
              drag.i--;
              assigntoi(drag.i);
              drag.prevX = event.touches[0].pageX;
            }

          } else if ((geti() - drag.i) < 0 && drag.dir === 'left') {
            console.log('-');

            toggle();
            drag.prevX = event.touches[0].pageX;
          }
          if ((geti() - drag.i) > 0 && drag.dir === 'right') {
            toggle();
            drag.prevX = event.touches[0].pageX;
          }
          addtoi((-event.touches[0].pageX + drag.prevX) / 10000);
        } else { drag.prevX = event.touches[0].pageX; }
      }
    }

    function drag() {
      function toggle() {
        if (drag.dir === 'right') {
          drag.dir = 'left';
        }
        if (drag.dir === 'left') {
          drag.dir = 'right';
        }
      }
      if (drag.flag) {
        if (drag.prevX) {
          console.log(drag.i, geti(), event.screenX - drag.prevX);
          if (Math.abs(geti() - drag.i) >= 1) {
            if (drag.dir === 'left') {
              drag.i++;
              assigntoi(drag.i);
              drag.prevX = event.screenX;
            } else {
              drag.i--;
              assigntoi(drag.i);
              drag.prevX = event.screenX;
            }

          } else if ((geti() - drag.i) < 0 && drag.dir === 'left') {
            console.log('-');

            toggle();
            drag.prevX = event.screenX;
          }
          if ((geti() - drag.i) > 0 && drag.dir === 'right') {
            toggle();
            drag.prevX = event.screenX;
          }
          addtoi((-event.screenX + drag.prevX) / 10000);
        }
      } else { drag.prevX = event.screenX; }
    }

    function geti() {
      return parseFloat(getComputedStyle(content).getPropertyValue('--i'));
    }

    function assigntoi(i) {
      content.style.setProperty('--i', i);
    }
    function addtoi(val) {
      content.style.setProperty('--i', geti() + val);
    }
    content.addEventListener('mousedown', () => { event.preventDefault(); console.log(3); if (event.button === 0) { drag.flag = true } });
    content.addEventListener('touchstart', () => { event.preventDefault(); console.log(3); drag.flag = true });

    document.body.addEventListener('touchend', () => {
      if (drag.flag) {
        drag.dir = 'left';
        drag.flag = false; drag.prevX = 0;
        assigntoi(drag.i);

      }
    });
    document.body.addEventListener('mouseup', () => {
      if (drag.flag) {
        drag.dir = 'left';
        console.log(9); if (event.button === 0) {
          drag.flag = false; drag.prevX = 0;
          assigntoi(drag.i);
        }
      }
    });

    document.body.appendChild(content);

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
