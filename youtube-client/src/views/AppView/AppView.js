export default class AppView {
  constructor(data) {
    this.data = data;
  }

  renderDocument(app) {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    function find() { app.find(this.value); }
    input.addEventListener('change', find);
    document.body.appendChild(input);
  }

  render() {
    const content = document.createElement('ul');
    console.log(this.data);
    content.innerHTML = this.data.map(item => `<li>${item.snippet.title}</li>`).join('');
    document.body.appendChild(content);
  }
}
