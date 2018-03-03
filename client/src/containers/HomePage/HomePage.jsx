import React, { PropTypes } from 'react';
import GraphicDesign from '../GraphicDesign/GraphicDesign.jsx';
import TopBar from '../../components/HomePage/TopBar.jsx';
import Video from '../Video/Video.jsx';
import RaisedButton from 'material-ui/RaisedButton';




class HomePage extends React.Component {



  /**
   * Class constructor.
   */
   constructor(props, context) {
    super(props, context);
    this.state = {
      buttonStyle:{
        transform:"scale(1)",
      },
      graphicDesign: {
          width:"50%",
          maxHeight:"100vh",
          overflowY:"hidden",
          backgroundColor:"rgb(38, 81, 128)",
          display:"inline-block"
      },
      video: {
        width:"50%",
        height:"100vh",
        overflowY:"hidden",
        backgroundColor:"rgba(128, 197, 186, .2)",
        display:"inline-block"
      },
      GDBtn:{
        position:"absolute",
        top:"60%",
        left:"70%"
      },
      VBtn:{
        position:"absolute",
        top:"60%",
        left:"20%"
      },
      toggleButtonStyle:{
        position:"fixed",
        bottom:"15px",
        right:"15px",
        display:"none"
      },
      videoTitle: {
        "position":"absolute",
        "top":"50%",
        "right":"0",
        "left":"0",
        "margin":"auto",
        "textAlign":"center"
      },
      graphicTitle: {
        "position":"absolute",
        "top":"50%",
        "right":"0",
        "left":"0",
        "margin":"auto",
        "textAlign":"center"
      },
      topBarDisplay:"none",
      toggleText:"STUFF",
      graphicLight:"#58a59a",
      graphicHover:false,
      videoLight:"#182C51",
      videoHover:false,
      rotateInt:0,
      rotate:"rotate(0)",
      reverse:"rotate(0)",
      rotateInt2:0,
      length:"scale(1,1)",
      lengthInt:0.0,
      up:true,
      moveLeftBool:true,
      moveLeft:"translateX(0px)",
      moveLeftInt:0,
      lengthInt:1,
      rotatePen:"rotate(0)",
      rotatePenInt:0,
      penLeft:false
    };
    this.selectVideo = this.selectVideo.bind(this)
    this.selectGraphicDesign = this.selectGraphicDesign.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.clickHome = this.clickHome.bind(this)
    this.hideSidebar = this.hideSidebar.bind(this)
    this.changeGraphicFill = this.changeGraphicFill.bind(this)
    this.changeVideoFill = this.changeVideoFill.bind(this)
    this.setRotate = this.setRotate.bind(this)
    this.changeLineLength = this.changeLineLength.bind(this)
    this.changeXPosition = this.changeXPosition.bind(this)
    this.rotatePen =this.rotatePen.bind(this)
  }

  clickHome(){
    this.setState({
      graphicDesign: {
          width:"50%",
          maxHeight:"100vh",
          overflowY:"hidden",
          backgroundColor:"rgb(38, 81, 128)",
          display:"inline-block"
        },
      video: {
        width:"50%",
        height:"100vh",
        overflowY:"hidden",
        backgroundColor:"rgba(128, 197, 186, .2)",
        display:"inline-block"
      },
      GDBtn:{
        position:"absolute",
        top:"60%",
        left:"70%"
      },
      VBtn:{
        position:"absolute",
        top:"60%",
        left:"20%"
      },
      toggleButtonStyle:{
        position:"fixed",
        bottom:"15px",
        right:"15px",
        display:"none"
      },
      videoTitle: {
        "position":"absolute",
        "top":"50%",
        "right":"0",
        "left":"0",
        "margin":"auto",
        "textAlign":"center"
      },
      graphicTitle: {
        "position":"absolute",
        "top":"50%",
        "right":"0",
        "left":"0",
        "margin":"auto",
        "textAlign":"center"
      },
      topBarDisplay:"none",
      toggleText:"STUFF",
      overlayDisplay:"block",
      logoDisplay:"block",
      graphicHover:false
    })
  }

  componentWillMount() {
    // var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    // headHTML = "<meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><link type='text/css' rel='stylesheet' href='/css/style.css'>";
    // document.getElementsByTagName('head')[0].innerHTML = headHTML;
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

  hideSidebar() {
      if (this.state.openDrawer == true) {
        this.setState({openDrawer: false})
      } else {
        this.setState({openDrawer: true})
      }
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
    this.setRotate()
    // setInterval(this.setRotate,100)
    // setInterval(this.rotatePen,100)
    if(window.innerWidth < 800){
      this.setState({
        buttonStyle:{
          transform:"scale(.7)"
        }
      })
    }
    // setInterval(this.changeLineLength,10)
    // setInterval(this.changeXPosition,8)

  }

  setRotate(){
    var i = this.state.rotateInt
    var y = this.state.rotateInt2
    this.setState({
      rotate:"rotate("+JSON.stringify(i)+")",
      reverse:"rotate("+JSON.stringify(y)+")",
      rotateInt:i+10,
      rotateInt2:y+5
    })
  }

  rotatePen(){
    var i = this.state.rotatePenInt
    if(this.state.penLeft == true){
      if(i >= 35){
        this.setState({
          penLeft:false
        })
      }
      this.setState({
          rotatePen:"rotate("+JSON.stringify(i)+")",
          rotatePenInt:i+5
        })
    } else {
      if(i <= -35){
        this.setState({
          penLeft:true
        })
      }
      this.setState({
          rotatePen:"rotate("+JSON.stringify(i)+")",
          rotatePenInt:i-5
        })
    }
    
  }

  changeLineLength(){
    var i = this.state.lengthInt
    if(this.state.up == true){
      if(i >= 1.0){
        this.setState({
          up:false
        })
      }
      this.setState({
        length: "scale("+JSON.stringify(i)+", 1)",
        lengthInt:i+0.0105
      })
    } else {
      if(i <= 0){
        this.setState({
          up:true
        })
      }
      this.setState({
        length: "scale("+JSON.stringify(i)+", 1)",
        lengthInt:i-0.0105
      })
    }
    
  }

  changeXPosition(){
    var i = this.state.moveLeftInt
    if(this.state.moveLeftBool == true){
      if(i < 0){
        this.setState({
          moveLeftBool:false
        })
      }
      this.setState({
          moveLeft:"translateX(-"+JSON.stringify(i)+"px)",
          moveLeftInt:i-1.6
        })
    } else {
      if(i >= 180){
        this.setState({
          moveLeftBool:true
        })
      }
      this.setState({
          moveLeft:"translateX(-"+JSON.stringify(i)+"px)",
          moveLeftInt:i+1.6
      })
    }
  }

  selectGraphicDesign(){
    this.setState({
      videoTitle:{
        "display":"none"
      },
      graphicTitle:{
        "display":"none"
      },
      graphicDesign:{
        "transition": "width 200ms 0ms",
        "width": "100vw",
        "height":"100vh",
        "marginTop": "64px",
        "backgroundColor":"rgb(38, 81, 128)",
      },
      video:{
        "transition": "width 200ms 0ms",
        "width": "0",
        "height":"0"
      },
      toggleButtonStyle:{
        position:"fixed",
        bottom:"15px",
        right:"15px",
      },
      toggleText:"View Video",
      overlayDisplay:"none",
      logoDisplay:"none",
      topBarDisplay:"block",
      toggleGraphic:{
        display:"none"
      },
      toggleVideo:{
        display:"block"
      }
    })
  }

  selectVideo(){
    this.setState({
      videoTitle:{
        "display":"none"
      },
      graphicTitle:{
        "display":"none"
      },
      graphicDesign:{
        "transition": "width 200ms 0ms",
        "width": "0",
        "height":"0"
      },
      video:{
        "transition": "width 200ms 0ms",
        "width": "100vw",
        "height":"100vh"
      },
      toggleButtonStyle:{
        position:"fixed",
        bottom:"15px",
        right:"15px",
      },
      toggleText:"View Graphic Design",
      overlayDisplay:"none",
      logoDisplay:"none",
      topBarDisplay:"block",
      toggleGraphic:{
        display:"block"
      },
      toggleVideo:{
        display:"none"
      }
    })
  }

  changeGraphicFill(){
    if(this.state.graphicHover) {
      this.setState({
        graphicLight:"#58a59a",
        graphicHover:false
      })
    } else {
      this.setState({
        graphicLight:"#4a8a81",
        graphicHover:true
      })
    }
    
  }

  changeVideoFill(){
    if(this.state.videoHover) {
      this.setState({
        videoLight:"#182C51",
        videoHover:false
      })
    } else {
      this.setState({
        videoLight:"#2e5294",
        videoHover:true
      })
    }
  }

  handleToggle(){
    var text = this.state.toggleText
    if(text == "View Graphic Design"){
      this.selectGraphicDesign()
    } else {
      this.selectVideo()
    }
  }

  hideSidebar() {
    if (this.state.openDrawer == true) {
      this.setState({openDrawer: false})
    } else {
      this.setState({openDrawer: true})
    }
  }


  render() {
    return (
      <div className='body' style={this.state.bodyStyle}>
          <div style={{display:this.state.topBarDisplay}}>
            <TopBar click={this.clickHome} drawer={{open:this.state.openDrawer, handler:this.hideSidebar}}/>
          </div>
        <div className="logo" style={{display:this.state.logoDisplay}}>
          <img width="200px" src="/images/CartoonMe.png"/>
        </div>
        <div id="video" style={this.state.video}>
          <Video />
          <div className="video-overlay" style={{display:this.state.overlayDisplay}}>
          </div>
          <div style={this.state.videoTitle}>
            <svg style={this.state.buttonStyle} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="200px" height="200px" viewBox="0 0 500 500" enableBackground="new 0 0 500 500" cursor="pointer" onClick={this.selectVideo} onMouseEnter={this.changeVideoFill} onMouseLeave={this.changeVideoFill}>
            <g id="Layer_2">
            </g>
            <g>
              <circle fill={this.state.videoLight} cx="250" cy="249.99" r="240.935"/>
              <path fill="#FFFFFF" d="M389.668,320.081c0,4.664-6.756,8.444-15.105,8.444h-28.969c-8.35,0-15.115-3.78-15.115-8.444v-51.37
                c0-4.664,6.766-8.441,15.115-8.441h28.969c8.35,0,15.105,3.777,15.105,8.441V320.081z"/>
              <path fill="#6AC6B9" d="M341.831,351.747c0,4.663-3.784,8.446-8.441,8.446H126.505c-4.665,0-8.445-3.783-8.445-8.444V240.658
                c0-4.664,3.78-8.444,8.445-8.444l206.885-0.002c4.657,0,8.441,3.783,8.441,8.446V351.747z"/>
              <path fill="#6AC6B9" d="M341.831,351.747c0,4.663-1.89,8.446-4.222,8.446H232.76c0-17.602,0-106.961,0-127.979l104.85-0.002
                c2.332,0,4.222,3.783,4.222,8.446V351.747z"/>
              <polygon fill="#6AC6B9" points="436.125,348.23 376.311,328.525 376.311,260.27 435.423,236.345   "/>
              <rect x="102.576" y="253.23" fill="#FFFFFF" width="15.483" height="23.926"/>
              <path fill="#6AC6B9" d="M102.576,245.491c0,0,12.668,25.333,0,37.999H84.984c0,0,3.521-19.002-21.109-30.26
                C63.875,253.23,65.984,243.378,102.576,245.491z"/>
              <g id="g1" transform={this.state.reverse} style={{transformOrigin:"center"}}>
                <circle fill="#6AC6B9" cx="296.155" cy="158.891" r="78.111"/>
                <g>
                  <path fill="#FFFFFF" d="M275.048,106.218c0,0,21.109-13.856,42.222,0l-21.112,36.139L275.048,106.218z"/>
                  <path fill="#FFFFFF" d="M317.27,213.383c0,0-21.112,13.861-42.222,0l21.109-36.132L317.27,213.383z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M239.202,150.374c0,0-1.444-25.214,21.116-36.563l20.729,36.352L239.202,150.374z"/>
                  <path fill="#FFFFFF" d="M353.116,167.41c0.616,10.771,0.83,25.524-21.118,36.563l-20.731-36.354L353.116,167.41z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M353.327,151.909c0,0,2.122-25.162-20.123-37.114l-21.706,35.778L353.327,151.909z"/>
                  <path fill="#FFFFFF" d="M238.987,165.873c0,0-2.117,25.163,20.127,37.118l21.702-35.785L238.987,165.873z"/>
                </g>
                <path fill="#223971" d="M305.381,160.298c0,4.706-3.816,8.519-8.52,8.519c-4.709,0-8.521-3.813-8.521-8.519
                  s3.813-8.522,8.521-8.522C301.564,151.776,305.381,155.592,305.381,160.298z"/>
              </g>
              <g id="g2" transform={this.state.rotate} style={{transformOrigin:"center"}}>
                <path fill="#6AC6B9" d="M223.946,178.042c0,33.712-27.325,61.04-61.031,61.04c-33.714,0-61.04-27.331-61.04-61.04
                  c0-33.71,27.326-61.035,61.04-61.035C196.621,117.006,223.946,144.334,223.946,178.042z"/>
                <g>
                  <path fill="#FFFFFF" d="M145.656,134.947c0,0,17.258-11.331,34.507,0l-17.249,29.535L145.656,134.947z"/>
                  <path fill="#FFFFFF" d="M180.164,222.542c0,0-17.249,11.326-34.507,0l17.258-29.535L180.164,222.542z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M116.358,171.034c0,0-1.183-20.607,17.257-29.883l16.944,29.714L116.358,171.034z"/>
                  <path fill="#FFFFFF" d="M209.467,184.964c0,0,1.178,20.607-17.262,29.881l-16.943-29.711L209.467,184.964z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M209.639,172.292c0,0,1.734-20.571-16.448-30.34l-17.743,29.247L209.639,172.292z"/>
                  <path fill="#FFFFFF" d="M116.186,183.706c0,0-1.739,20.568,16.448,30.34l17.738-29.249L116.186,183.706z"/>
                </g>
                <path fill="#223971" d="M168.656,179.26c0,2.837-2.3,5.142-5.133,5.142c-2.842,0-5.142-2.304-5.142-5.142
                  c0-2.838,2.3-5.138,5.142-5.138C166.356,174.122,168.656,176.423,168.656,179.26z"/>
              </g>
              <g>
                <text transform="matrix(1 0 0 1 184.999 436.5684)" fill="#FFFFFF" fontFamily="'LatoLatinBlack-Regular'" fontSize="47.7675">Video</text>
              </g>
            </g>
            </svg>

          </div>
        </div>
        <div id="graphic" style={this.state.graphicDesign}>
          <GraphicDesign />
          <div className="graphic-overlay" style={{display:this.state.overlayDisplay}}>
          </div>
          <div style={this.state.graphicTitle}>
            <svg style={this.state.buttonStyle} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="200px"
               height="200px" viewBox="0 0 500 500" enableBackground="new 0 0 500 500" cursor="pointer" onClick={this.selectGraphicDesign} onMouseEnter={this.changeGraphicFill} onMouseLeave={this.changeGraphicFill}>
            <g id="Layer_2">
            </g>
            <g id="Layer_1">
              <g>
                <circle fill={this.state.graphicLight} cx="250" cy="249.989" r="240.935"/>
                <g transform={this.state.rotatePen} style={{transformOrigin:"center"}}>
                  <path fill="#FFFFFF" d="M291.617,68.409c-1.01-1.085-2.421-1.694-3.897-1.682l-77.509,0.55c-1.464,0.006-2.86,0.627-3.847,1.714
                    c-0.988,1.075-1.487,2.521-1.365,3.979l7.121,43.77c0.229,2.75,2.533,4.858,5.289,4.835l61.099-0.43
                    c2.732-0.022,4.995-2.124,5.213-4.843l9.287-43.888C293.123,70.944,292.62,69.487,291.617,68.409z"/>
                  <path fill="#223971" d="M283.666,115.026l-72.205,0.518l-13.413,89.99c-0.162,1.081,0.022,2.19,0.52,3.162l46.749,90.419
                    l-2.461-104.984c-5.357-2.075-9.182-7.247-9.223-13.323c-0.055-7.936,6.35-14.44,14.293-14.499
                    c7.936-0.053,14.439,6.36,14.494,14.296c0.041,6.076-5.885,11.307-11.211,13.451l-0.442,110.793l47.114-96.857
                    c0.482-0.983,0.646-2.089,0.471-3.17L283.666,115.026z"/>
                  <path fill="#FFFFFF" d="M210.211,67.277c-1.464,0.006-2.86,0.627-3.847,1.714c-0.988,1.075-1.487,2.521-1.365,3.979l7.121,43.77
                      c0.229,2.75,2.533,4.858,5.289,4.835l30.196-0.208l0.346-54.359L210.211,67.277z"/>
                <path fill="#223971" d="M211.461,115.543l-13.413,89.99c-0.162,1.081,0.022,2.19,0.52,3.162l48.204,96.224l-1.742-110.789
                  c-5.353-2.075-11.355-7.247-11.396-13.323c-0.055-7.936,6.35-14.44,14.293-14.499l-0.361-51.025L211.461,115.543L211.461,115.543z
                  "/>
                  </g>
                <path style={{transformOrigin:"left", transform:this.state.length}} fill="#FFFFFF" d="M325.164,330.844l-151.691,1.073c-2.913,0.022-5.286-2.318-5.304-5.226
                  c-0.018-2.909,2.318-5.286,5.231-5.304l151.69-1.077c2.913-0.022,5.282,2.318,5.304,5.23
                  C330.412,328.448,328.076,330.821,325.164,330.844z"/>
                <g>
                  <g>
                    <path fill="#223971" d="M173.301,307.337l-28.088,0.203c-2.917,0.014-5.253,2.395-5.235,5.304l0.201,28.09
                      c0.02,2.908,2.395,5.254,5.306,5.228l28.088-0.199c2.912-0.018,5.253-2.396,5.23-5.304l-0.198-28.093
                      C178.582,309.66,176.207,307.319,173.301,307.337z"/>
                    <path style={{transformOrigin:"left", transform:this.state.moveLeft}} fill="#223971" d="M353.08,306.065l-28.088,0.199c-2.913,0.018-5.25,2.395-5.227,5.3l0.193,28.096
                      c0.023,2.906,2.398,5.246,5.305,5.228l28.092-0.201c2.912-0.023,5.249-2.392,5.23-5.304l-0.203-28.089
                      C358.365,308.388,355.994,306.039,353.08,306.065z"/>
                  </g>
                </g>
                <g>
                  <text transform="matrix(1 0 0 1 163.5313 408.8604)"><tspan x="0" y="0" fill="#FFFFFF" fontFamily="'LatoLatinBlack-Regular'" fontSize="47.7675">Graphic</tspan><tspan x="9.601" y="43.614" fill="#FFFFFF" fontFamily="'LatoLatinBlack-Regular'" fontSize="47.7675">Design</tspan></text>
                </g>
              </g>
            </g>
            </svg>

          </div>
        </div>
        
        <div style={this.state.toggleButtonStyle}>
          <div style={this.state.toggleVideo}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="100px" height="100px" viewBox="0 0 500 500" enableBackground="new 0 0 500 500" cursor="pointer" onClick={this.selectVideo} onMouseEnter={this.changeVideoFill} onMouseLeave={this.changeVideoFill}>
            <g id="Layer_2">
            </g>
            <g>
              <circle fill={this.state.videoLight} cx="250" cy="249.99" r="240.935"/>
              <path fill="#FFFFFF" d="M389.668,320.081c0,4.664-6.756,8.444-15.105,8.444h-28.969c-8.35,0-15.115-3.78-15.115-8.444v-51.37
                c0-4.664,6.766-8.441,15.115-8.441h28.969c8.35,0,15.105,3.777,15.105,8.441V320.081z"/>
              <path fill="#6AC6B9" d="M341.831,351.747c0,4.663-3.784,8.446-8.441,8.446H126.505c-4.665,0-8.445-3.783-8.445-8.444V240.658
                c0-4.664,3.78-8.444,8.445-8.444l206.885-0.002c4.657,0,8.441,3.783,8.441,8.446V351.747z"/>
              <path fill="#6AC6B9" d="M341.831,351.747c0,4.663-1.89,8.446-4.222,8.446H232.76c0-17.602,0-106.961,0-127.979l104.85-0.002
                c2.332,0,4.222,3.783,4.222,8.446V351.747z"/>
              <polygon fill="#6AC6B9" points="436.125,348.23 376.311,328.525 376.311,260.27 435.423,236.345   "/>
              <rect x="102.576" y="253.23" fill="#FFFFFF" width="15.483" height="23.926"/>
              <path fill="#6AC6B9" d="M102.576,245.491c0,0,12.668,25.333,0,37.999H84.984c0,0,3.521-19.002-21.109-30.26
                C63.875,253.23,65.984,243.378,102.576,245.491z"/>
              <g transform={this.state.reverse} style={{transformOrigin:"center"}}>
                <circle fill="#6AC6B9" cx="296.155" cy="158.891" r="78.111"/>
                <g>
                  <path fill="#FFFFFF" d="M275.048,106.218c0,0,21.109-13.856,42.222,0l-21.112,36.139L275.048,106.218z"/>
                  <path fill="#FFFFFF" d="M317.27,213.383c0,0-21.112,13.861-42.222,0l21.109-36.132L317.27,213.383z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M239.202,150.374c0,0-1.444-25.214,21.116-36.563l20.729,36.352L239.202,150.374z"/>
                  <path fill="#FFFFFF" d="M353.116,167.41c0.616,10.771,0.83,25.524-21.118,36.563l-20.731-36.354L353.116,167.41z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M353.327,151.909c0,0,2.122-25.162-20.123-37.114l-21.706,35.778L353.327,151.909z"/>
                  <path fill="#FFFFFF" d="M238.987,165.873c0,0-2.117,25.163,20.127,37.118l21.702-35.785L238.987,165.873z"/>
                </g>
                <path fill="#223971" d="M305.381,160.298c0,4.706-3.816,8.519-8.52,8.519c-4.709,0-8.521-3.813-8.521-8.519
                  s3.813-8.522,8.521-8.522C301.564,151.776,305.381,155.592,305.381,160.298z"/>
              </g>
              <g  transform={this.state.rotate} style={{transformOrigin:"center"}}>
                <path fill="#6AC6B9" d="M223.946,178.042c0,33.712-27.325,61.04-61.031,61.04c-33.714,0-61.04-27.331-61.04-61.04
                  c0-33.71,27.326-61.035,61.04-61.035C196.621,117.006,223.946,144.334,223.946,178.042z"/>
                <g>
                  <path fill="#FFFFFF" d="M145.656,134.947c0,0,17.258-11.331,34.507,0l-17.249,29.535L145.656,134.947z"/>
                  <path fill="#FFFFFF" d="M180.164,222.542c0,0-17.249,11.326-34.507,0l17.258-29.535L180.164,222.542z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M116.358,171.034c0,0-1.183-20.607,17.257-29.883l16.944,29.714L116.358,171.034z"/>
                  <path fill="#FFFFFF" d="M209.467,184.964c0,0,1.178,20.607-17.262,29.881l-16.943-29.711L209.467,184.964z"/>
                </g>
                <g>
                  <path fill="#FFFFFF" d="M209.639,172.292c0,0,1.734-20.571-16.448-30.34l-17.743,29.247L209.639,172.292z"/>
                  <path fill="#FFFFFF" d="M116.186,183.706c0,0-1.739,20.568,16.448,30.34l17.738-29.249L116.186,183.706z"/>
                </g>
                <path fill="#223971" d="M168.656,179.26c0,2.837-2.3,5.142-5.133,5.142c-2.842,0-5.142-2.304-5.142-5.142
                  c0-2.838,2.3-5.138,5.142-5.138C166.356,174.122,168.656,176.423,168.656,179.26z"/>
              </g>
              <g>
                <text transform="matrix(1 0 0 1 184.999 436.5684)" fill="#FFFFFF" fontFamily="'LatoLatinBlack-Regular'" fontSize="47.7675"></text>
              </g>
            </g>
            </svg>
          </div>
          <div style={this.state.toggleGraphic}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px"
               height="100px" viewBox="0 0 500 500" enableBackground="new 0 0 500 500" cursor="pointer" onClick={this.selectGraphicDesign} onMouseEnter={this.changeGraphicFill} onMouseLeave={this.changeGraphicFill}>
            <g id="Layer_2">
            </g>
            <g id="Layer_1">
              <g>
                <circle fill={this.state.graphicLight} cx="250" cy="249.989" r="240.935"/>
                <g transform={this.state.rotatePen} style={{transformOrigin:"center"}}>
                  <path fill="#FFFFFF" d="M291.617,68.409c-1.01-1.085-2.421-1.694-3.897-1.682l-77.509,0.55c-1.464,0.006-2.86,0.627-3.847,1.714
                    c-0.988,1.075-1.487,2.521-1.365,3.979l7.121,43.77c0.229,2.75,2.533,4.858,5.289,4.835l61.099-0.43
                    c2.732-0.022,4.995-2.124,5.213-4.843l9.287-43.888C293.123,70.944,292.62,69.487,291.617,68.409z"/>
                  <path fill="#223971" d="M283.666,115.026l-72.205,0.518l-13.413,89.99c-0.162,1.081,0.022,2.19,0.52,3.162l46.749,90.419
                    l-2.461-104.984c-5.357-2.075-9.182-7.247-9.223-13.323c-0.055-7.936,6.35-14.44,14.293-14.499
                    c7.936-0.053,14.439,6.36,14.494,14.296c0.041,6.076-5.885,11.307-11.211,13.451l-0.442,110.793l47.114-96.857
                    c0.482-0.983,0.646-2.089,0.471-3.17L283.666,115.026z"/>
                  <path fill="#FFFFFF" d="M210.211,67.277c-1.464,0.006-2.86,0.627-3.847,1.714c-0.988,1.075-1.487,2.521-1.365,3.979l7.121,43.77
                      c0.229,2.75,2.533,4.858,5.289,4.835l30.196-0.208l0.346-54.359L210.211,67.277z"/>
                <path fill="#223971" d="M211.461,115.543l-13.413,89.99c-0.162,1.081,0.022,2.19,0.52,3.162l48.204,96.224l-1.742-110.789
                  c-5.353-2.075-11.355-7.247-11.396-13.323c-0.055-7.936,6.35-14.44,14.293-14.499l-0.361-51.025L211.461,115.543L211.461,115.543z
                  "/>
                  </g>
                <path fill="#FFFFFF" d="M325.164,330.844l-151.691,1.073c-2.913,0.022-5.286-2.318-5.304-5.226
                  c-0.018-2.909,2.318-5.286,5.231-5.304l151.69-1.077c2.913-0.022,5.282,2.318,5.304,5.23
                  C330.412,328.448,328.076,330.821,325.164,330.844z"/>
                <g>
                  <g>
                    <path fill="#223971" d="M173.301,307.337l-28.088,0.203c-2.917,0.014-5.253,2.395-5.235,5.304l0.201,28.09
                      c0.02,2.908,2.395,5.254,5.306,5.228l28.088-0.199c2.912-0.018,5.253-2.396,5.23-5.304l-0.198-28.093
                      C178.582,309.66,176.207,307.319,173.301,307.337z"/>
                    <path fill="#223971" d="M353.08,306.065l-28.088,0.199c-2.913,0.018-5.25,2.395-5.227,5.3l0.193,28.096
                      c0.023,2.906,2.398,5.246,5.305,5.228l28.092-0.201c2.912-0.023,5.249-2.392,5.23-5.304l-0.203-28.089
                      C358.365,308.388,355.994,306.039,353.08,306.065z"/>
                  </g>
                </g>
                <g>
                  <text transform="matrix(1 0 0 1 163.5313 408.8604)"><tspan x="0" y="0" fill="#FFFFFF" fontFamily="'LatoLatinBlack-Regular'" fontSize="47.7675"></tspan><tspan x="9.601" y="43.614" fill="#FFFFFF" fontFamily="'LatoLatinBlack-Regular'" fontSize="47.7675"></tspan></text>
                </g>
              </g>
            </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;