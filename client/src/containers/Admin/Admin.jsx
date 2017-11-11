import React, { PropTypes } from 'react';
import GraphicDesign from '../GraphicDesign/GraphicDesign.jsx';
import TopBar from '../../components/HomePage/TopBar.jsx';
import TileList from '../../components/Admin/TileList.jsx';
import Video from '../Video/Video.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';




class HomePage extends React.Component {



  /**
   * Class constructor.
   */
   constructor(props, context) {
    super(props, context);
    this.state = {
      open:false,
      tiles:[]
    };
    this.NewTile = this.NewTile.bind(this)
  }

  componentWillMount() {
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

      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
      }
    });
    xhr.send();
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

  closeWalkIn() {
    this.setState({
      open:false
    })
  }

  NewTile(){
    this.setState({
      open:true
    })
    console.log(this.state.open);
  }


  render() {
    return (
      <div className='admin' style={this.state.bodyStyle}>
        <TileList tiles={this.state.tiles}/>
        <Dialog
          open={this.state.open}
          contentStyle={{width: '90%', height: '100%'}}
          bodyStyle={{overflowY: 'auto', maxHeight: 'none', padding: 0}}
          modal={false}
          onRequestClose={this.closeWalkIn.bind(this)}
          autoDetectWindowHeight={false}
          style={{position: 'absolute', paddingTop: 0, height: '100vh'}}
          repositionOnUpdate={false}
        >
          <p>stuff</p>
        </Dialog>
        <RaisedButton 
          primary
          label='New Tile'
          onTouchTap={this.NewTile} />
      </div>
    );
  }
}

export default HomePage;