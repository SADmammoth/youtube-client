export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  async getVideoIds() {
    console.log(0);
    const { searchUrl } = this.state;
    let data = await fetch(searchUrl).then((res) => res.json());
    console.log(data);
    return data;
  }

  async getVideos() {
    console.log(1);
    const { videosUrl } = this.state;
    console.log(videosUrl);
    let videos = await fetch(videosUrl).then((res) => res.json()).then(res => Array.from(res.items));
    console.log(videos);
    return videos;
  }
}
