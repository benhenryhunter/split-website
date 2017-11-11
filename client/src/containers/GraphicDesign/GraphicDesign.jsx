import React, { PropTypes } from 'react';
import GraphicDesignTile from '../../components/GraphicDesign/GraphicDesignTile.jsx';
import Dialog from 'material-ui/Dialog';
import GraphicDesignOverlay from '../../components/GraphicDesign/GraphicDesignOverlay.jsx';


const images = [
  "/images/annualreport_website.jpg",
  "/images/Business-Card_1.jpg",
  "/images/Camera.jpg",
  "/images/chippkidd.jpg",
  "/images/EngineeringCenterBrochures_website.jpeg",
  "/images/HammerLogo.jpg",
  "/images/Hat.jpg",
  "/images/inclinelogo_large.png",
  "/images/JenYoga_withoutlines.jpg",
  "/images/lamour_instagram.jpg",
  "/images/LamourFacebook.jpg",
  "/images/MedWell_Postcard(1).jpg",
  "/images/painting2.jpg",
  "/images/SaulBass1.jpg",
  "/images/Tshirts-PPT.jpg",
]

class GraphicDesign extends React.Component {


  randomOrder(array){
    for (var i = array.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  /**
   * Class constructor.
   */
   constructor(props, context) {
    super(props, context);
    this.state = {
      tiles: [],
      open:false,
      tileSelected:{}
    };
    this.randomizeImages = this.randomizeImages.bind(this)
    this.hoverIn = this.hoverIn.bind(this)
    this.hoverOut = this.hoverOut.bind(this)
    this.clickTile = this.clickTile.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  componentWillMount() {
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML = "<meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><link type='text/css' rel='stylesheet' href='/css/style.css'>";
    document.getElementsByTagName('head')[0].innerHTML = headHTML;
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/items/');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr)
        var tiles = xhr.response.items
        this.setState({
          tiles
        });
        this.randomizeImages()

      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
      }
    });
    xhr.send();
  }

  getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  randomizeImages(){

    var styles = [];
    var tiles = this.randomOrder(this.state.tiles)

    this.setState({
      tiles: tiles
    })
  }

  hoverIn(id){
    console.log("mouseIn: " + id)
    var obj = {}
    obj["overlay"+id] = {
          objectFit:"fill",
          opacity: "1",
          transition: ".5s ease",
          backgroundColor: "#008CBA",

    }
    this.setState(obj)
  }

  hoverOut(id){
    console.log("mouseOut: " + id)
    var obj = {}
    obj["overlay"+id] = {
          objectFit:"fill",
          opacity: "0",
          transition: ".5s ease",
          backgroundColor: "#008CBA",
    }
    this.setState(obj)
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

  clickTile(tile){
    this.setState({
      tileSelected: tile,
      open:true
    })
  }

  closeDialog(){
    this.setState({
      open:false
    })
  }

  render() {
    return (
      <div id="graphic-design" style={{backgroundColor:"rgb(38, 81, 128)",}}>
    { this.state.tiles.map((tile,key)=>{
        return(
          <GraphicDesignTile key={key} image={tile.Image} text={tile.Description} click={()=>{this.clickTile(tile)}}/>
          )
      })}
    <Dialog 
      open={this.state.open}
      contentStyle={{width: '90%', height: '100%'}}
      bodyStyle={{overflowY: 'auto', maxHeight: 'none', padding: 0}}
      modal={false}
      onRequestClose={this.closeDialog.bind(this)}
      autoDetectWindowHeight={false}
      style={{paddingTop: 0, height: '100vh'}}
      repositionOnUpdate={true}
      >
      <GraphicDesignOverlay tile={this.state.tileSelected}/>
    </Dialog>
      </div>
    );
  }
}

export default GraphicDesign;