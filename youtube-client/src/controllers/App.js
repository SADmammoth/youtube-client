import AppModel from '../models/AppModel.js';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.state = {
      count: 0,
      APIkey: "AIzaSyBIayyyQFMCPmqrGVScDr5kZskIogkeco0",
      queue: '',
      nextPage: '',
      videoIds: []
    };
  }

  async createSearchURL() {
    this.state.searchUrl = `https://www.googleapis.com/youtube/v3/search?part=id&pageToken=${this.state.nextPage}&type=video&maxResults=5&key=${this.state.APIkey}&q=${this.state.queue}`;
  }

  async createVideoUrl() {
    this.state.videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${this.state.APIkey}&id=${this.state.videoIds.join(',')}`;
  }

  async find(queue) {
    this.state.queue = queue;
    this.renderNext().then(() => this.renderNext());
  }

  async renderNext() {
    const model = new AppModel(this.state);
    this.createSearchURL();
    let res = await model.getVideoIds();
    this.state.nextPage = res.nextPageToken;
    this.state.videoIds = res.items.map(e => e.id.videoId);
    this.createVideoUrl();
    const data = await model.getVideos();
    const view = new AppView(data);
    view.render();
  }

  start() {
    const view = new AppView();
    view.renderDocument(this);
  }
}
