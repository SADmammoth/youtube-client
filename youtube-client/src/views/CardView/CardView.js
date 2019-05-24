export default class CardDisplay {
  constructor() {

  }

  returnHTML(clip) {
    this.clip = clip;
    const card = document.createElement('div');
    card.setAttribute('draggable', 'false');
    card.setAttribute('class', 'card');
    card.innerHTML = `<a href='https://www.youtube.com/watch?v=${this.clip.videoId}'>
                      <img width='320' height='180' class='thumb' src= '${this.clip.thumbUrl}'>
                      </a>
                      <a href='https://www.youtube.com/watch?v=${this.clip.videoId}'><h2 class='title'>${this.clip.title}</h2></a>
                      <h3 class='author'>${this.clip.author}</h3>
                      <div class='stats'>
                      <span><i>\uf06e</i>${this.clip.viewCount}</span>
                      <span><i>\uf784</i>${this.clip.date.toLocaleDateString()}</span>
                      </div>
                      <p class='desc'>${this.clip.desc}</p>`
    return card;
  }
}
