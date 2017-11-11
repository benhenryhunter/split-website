import React, { PropTypes } from 'react';




class Video extends React.Component {



  /**
   * Class constructor.
   */
   constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.randomizeImages = this.randomizeImages.bind(this)
  }

  componentWillMount() {
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML = "<meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><link type='text/css' rel='stylesheet' href='/css/style.css'>";
    document.getElementsByTagName('head')[0].innerHTML = headHTML;
    this.randomizeImages()
  }

  getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  randomizeImages(){

    var allImages = [];

    for (var i = 0; i < 50; i++) {
      var width = this.getRandomSize(200, 400);
      var height =  this.getRandomSize(200, 400);
      allImages[i] = 'https://placekitten.com/'+width+'/'+height;
    }

    this.setState({
      images: allImages
    })
  }

  /**
   * Render the component.
   */
  componentDidMount() {
    if (parseInt(window.innerWidth) < 1031 || parseInt(document.documentElement.clientWidth) < 1031 || parseInt(document.body.clientWidth) < 1031) {
      this.setState({
        dialogWidth: '80%',
        dialogTop: '-50px'
      })
    }
  }

  render() {
    return (
        <video className="video" height="100%" width="100%" loop autoPlay>
          <source src="/video/WebsiteVideo.mp4"/>
        </video>
    );
  }
}

export default Video;