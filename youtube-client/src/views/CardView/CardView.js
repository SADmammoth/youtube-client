export default class CardDisplay {
  constructor() {

  }

  returnHTML(clip, count) {
    if (!this.clip && !clip) {
      throw new Error(`TypeError: unable to render not Clip object`);
    }
    this.clip = clip;
    const card = document.createElement('div');
    card.setAttribute('draggable', 'false');
    card.setAttribute('class', 'card');
    card.innerHTML = `<span>${count}</span>
                      <img class='thumb' src= '${this.clip.thumbUrl}'
                      <h2 class='title'>${this.clip.title}</h2>
                      <h3 class='author'>${this.clip.author}</h3>
                      <span>${this.clip.viewCount}</span>
                      <p class='desc'>${this.clip.desc}</p>`
    return card;
  }
}
