import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTS from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAQMXBUXp-5zQ7NmShic_-2pJCoRappjPY';


// create a new component. This is component should produce
//some HTML
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
     };

    this.videoSearch('surfboard');
}
  videoSearch(term){
    YTS({key:API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 9000)
  }
  render(){
    return (
      <div>
    <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
    <VideoDetail video={this.state.selectedVideo}/>
    <VideoList
    onVideoSelect={selectedVideo=>this.setState({selectedVideo}) }
    videos = {this.state.videos} />
    </div>
  );
  }

}

//Take this compoenet's generated HTML and put it
// on the page (in the DOM)
ReactDom.render(<App/>, document.querySelector('.container'));
