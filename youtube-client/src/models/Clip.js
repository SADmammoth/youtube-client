export default class Clip {
  constructor(response_object, count) {
    this.parse(response_object, count);
  }

  parse(response_object, count) {
    this.res = response_object;

    this.videoId = this.res.id;
    this.title = this.res.snippet.title;
    this.desc = (this.res.snippet.description == '' || this.res.snippet.description == ' ') ? 'No description' : this.res.snippet.description;
    this.thumbUrl = this.res.snippet.thumbnails.medium.url;
    this.date = new Date(this.res.snippet.publishedAt);
    this.viewCount = this.res.statistics.viewCount;
    this.author = this.res.snippet.channelTitle;
    this.count = count;
  }
}
