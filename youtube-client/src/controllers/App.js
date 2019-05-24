import AppModel from '../models/AppModel.js';
import AppView from '../views/AppView';
import LoaderView from '../views/LoaderView';

export default class App {
  constructor() {

    this.state = {
      count: 0,
      APIkey: "AIzaSyBIayyyQFMCPmqrGVScDr5kZskIogkeco0",
      queue: '',
      nextPage: '',
      prevPage: '',
      pageSize: 15,
      last_i: 0,
      videoIds: [],
      endflag: false
    };
  }

  async createSearchURL() {
    this.state.searchUrl = `https://www.googleapis.com/youtube/v3/search?part=id&pageToken=${this.state.nextPage}&type=video&maxResults=${this.state.pageSize}&key=${this.state.APIkey}&q=${this.state.queue}`;
  }

  async createVideoUrl() {
    this.state.videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${this.state.APIkey}&id=${this.state.videoIds.join(',')}`;
  }

  async find(queue) {
    this.state.queue = queue;
<<<<<<< HEAD
    const view = new AppView();
    view.clear();
=======
>>>>>>> 181ba34... feat: interactive slider; minor styles
    this.renderNext();
  }

  async renderNext() {
    const model = new AppModel(this.state);
    const loader = new LoaderView();
    loader.render();
    console.log(this);
    this.createSearchURL();
    this.createVideoUrl();
    model.getVideoIds().then((res) => {
      if (!res.items) {
        return;
      }
      this.state.videoIds.push(res);
      this.state.nextPage = res.nextPageToken;
      this.state.prevPage = res.prevPageToken;
      this.state.videoIds = res.items.map(e => e.id.videoId);
      this.createVideoUrl();
      return model.getVideos();
    }).then((res) => {
      this.state.clips = res;
      if (!this.state.last_i && !this.state.nextPage) {
        this.state.endflag = true;
      }
      this.state.last_i += this.state.pageSize - 1;

      const view = new AppView(this.state.clips, this.state.pageSize, this.state.last_i, this.loadPrevivious, this.renderNext, this.state.endflag);
      view.renderCards().then(() => loader.stop());
    });

  }

  loadPrevivious() {
    this.state.nextPage = this.state.prevPage;
    this.state.last_i -= this.state.pageSize - 1;
    this.renderNext();
  }

  start() {
    this.state.last_i += this.state.pageSize - 1;
    const view = new AppView(this.state.clips, this.state.pageSize, this.state.last_i, this.loadPrevivious.bind(this), this.renderNext.bind(this));
    view.renderDocument(this);
  }
}
