import Clip from './Clip.js'

export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  async getVideoIds() {
    const { searchUrl } = this.state;
    let data = await fetch(searchUrl).then((res) => res.json());
    if (data.error && data.error.errors[0].reason === 'quotaExceeded') {
      alert("error '403': quota for API expired");
    }
    return data;
  }

  async getVideos() {
    const { videosUrl } = this.state;
    let videos = await fetch(videosUrl).then((res) => res.json()).then(res => Array.from(res.items));
    return new Promise((resolve) => resolve(videos.map((vid, i) => new Clip(vid, i + this.state.resultsCount))));
  }
}
