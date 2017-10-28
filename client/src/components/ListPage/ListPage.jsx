import React, { PropTypes } from 'react';
import HeaderSection from '../../components/HomePage/HeaderSection.jsx';
import TokenInformation from '../../components/HomePage/TokenInformation.jsx';
import Countdown from '../../components/HomePage/Countdown.jsx';
import TopBar from '../../components/HomePage/TopBar.jsx';
import ProgressBar from '../../components/HomePage/ProgressBar.jsx';
import CarouselSection from '../../components/HomePage/CarouselSection.jsx';
import ContactSection from '../../components/HomePage/ContactSection.jsx';
import ListHeader from '../../components/ListPage/ListHeader.jsx';
import ListBody from '../../components/ListPage/ListBody.jsx';




class ListPage extends React.Component {



  /**
   * Class constructor.
   */
   constructor(props, context) {
    super(props, context);
    this.state = {
      signUp: false,
      logIn: false,
      openDrawer: false,
      media: {
        artist: "FRANK MASELLI",
        duration:"38 minutes, 18 seconds",
        src:"/audio/wgwpodcast.mp3",
        title:"Intro to White Glove Workshops"
      },
      dialogWidth: '50%',
      dialogTop: '0px',
      progress:'72%',
      coin1:"$1,235.12",
      coin2:"123512",
      coin3:"123512",
      coin4:"123512",
    };
  }

  componentWillMount() {
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML = "<meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><link type='text/css' rel='stylesheet' href='/css/style.css'><meta property='og:url' content=" + this.getUrl() + " /><meta property='og:type' content='website' /><meta property='og:title' content=" + this.getTitle() + " /><meta property='og:description' content=" + this.getDescription() + " /><meta property='og:image' content=" + this.getImage() + " />";
    document.getElementsByTagName('head')[0].innerHTML = headHTML;
  }

  getUrl(){
    return "this"
  }

  getImage(){
    return "this"
  }

  getTitle(){
    return "this"
  }

  getDescription(){
    return "this"
  }

  scrollToServices() {
      if (this.state.openDrawer == true) {
          this.setState({
          openDrawer: false
        })
      }
    const thing = ReactDOM.findDOMNode(this.refs.services)
    animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, thing.offsetTop, 500, true)
  }
  scrollToAbout() {
       if (this.state.openDrawer == true) {
          this.setState({
          openDrawer: false
        })
      }
    const thing = ReactDOM.findDOMNode(this.refs.about)
    if (parseInt(window.innerWidth) < 1031 || parseInt(document.documentElement.clientWidth) < 1031 || parseInt(document.body.clientWidth) < 1031) {
      animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, thing.offsetTop-170, 500, true)
    } else {
      animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, thing.offsetTop, 500, true)
    }
  }  

scrollToTestimonials() {
      if (this.state.openDrawer == true) {
          this.setState({
          openDrawer: false
        })
      }
    const thing = ReactDOM.findDOMNode(this.refs.testimonials)
    animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, thing.offsetTop, 500, true)
  }

  scrollToContact() {
      if (this.state.openDrawer == true) {
          this.setState({
          openDrawer: false
        })
      }
    const thing = ReactDOM.findDOMNode(this.refs.contact)
    animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, thing.offsetTop, 500, true)
  }

  scrollToHome() {
    if (this.state.openDrawer == true) {
      this.setState({
          openDrawer: false
        })
    }
    const thing = ReactDOM.findDOMNode(this.refs.home)
    animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, thing.offsetTop, 500, true)
  }  


  openSignUp() {
    this.setState({signUp: true});
  }

  openLogIn() {
    this.setState({logIn: true});
  }

  onLogIn() {
    this.setState({
      logIn: true,
      signUp: false
    })
  }

  onSignUp() {
    this.setState({
      logIn: false,
      signUp: true
    })
  }

  closeLogIn() {
    this.setState({logIn: false});
  }

  closeSignUp() {
    this.setState({signUp: false});
  }

  hideSidebar() {
      if (this.state.openDrawer == true) {
        this.setState({openDrawer: false})
      } else {
        this.setState({openDrawer: true})
      }
  }

  closeLogIn() {
    this.setState({logIn: false});
  }

  closeSignUp() {
    this.setState({signUp: false});
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
    console.log("article to get: " + this.getParameterByName("q"))
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



  render() {
    return (
      <div>
        <ListHeader info={{user:{Avatar:"/images/avatar.jpg", Rating:"1", DisplayName:"Twinki"}, title:"10 Things You Didn't Know About Guanacos", subtitle:"Stuff", image:"/images/Guanaco.jpg"}}/>
        <ListBody list={[{Number:"1", Image:"/images/avatar.jpg", Header:"reason1", Body:"This is a cute picture of my beautiful girlfriend Des.  She knows about guanacos"},{Number:"2", Image:"/images/avatar.jpg", Header:"reason2", Body:"This is a cute picture of my beautiful girlfriend Des.  She knows about guanacos"}]}/>
      </div>
    );
  }
}

export default ListPage;