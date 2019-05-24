export default class LoaderView {
  constructor() {
    this.imgUrl = '../../../assets/images/loader.gif';
  }

  render() {
    const content = document.getElementById('content');
    content.style.background = 'none';
    const loader = document.createElement('img');
    loader.setAttribute('src', this.imgUrl);
    loader.setAttribute('id', 'loader');
    loader.setAttribute('alt', 'loader');
    content.appendChild(loader);
  }

  stop() {
    const loader = document.getElementById('loader');
    loader.parentNode.removeChild(loader);
  }
}
