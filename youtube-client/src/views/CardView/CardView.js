export default class CardDisplay {
  constructor() {

  }

  returnHTML(clip) {
    this.clip = clip;
    const card = document.createElement('div');
    card.setAttribute('draggable', 'false');
    card.setAttribute('class', 'card');
    card.innerHTML = `<h2 class='title'><a href='https://www.youtube.com/watch?v=${this.clip.videoId}'>${this.clip.title}</a></h2>
                      <a href='https://www.youtube.com/watch?v=${this.clip.videoId}'>
                      <img width='320' height='180' class='thumb' src= '${this.clip.thumbUrl}'
                      </a>
                      <h3 class='author'>${this.clip.author}</h3>
<<<<<<< HEAD
                      <span class='views'><i>\uf06e</i>${this.clip.viewCount}</span>
=======
                      <span>${this.clip.viewCount}</span>
>>>>>>> 181ba34... feat: interactive slider; minor styles
                      <p class='desc'>${this.clip.desc}</p>`
    return card;
  }
}
