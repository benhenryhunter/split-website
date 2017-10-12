import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    marginTop:"50px",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    title: 'Coin Information1',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information1',
  },
  {
    title: 'Coin Information2',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information2',
  },
  {
    title: 'Coin Information3',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information3',
  },
  {
    title: 'Coin Information4',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information4',
  },
  {
    title: 'Coin Information5',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information5',
  },
  {
    title: 'Coin Information6',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information6',
  },
  {
    title: 'Coin Information7',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information7',
  },
  {
    title: 'Coin Information8',
    textBody: 'blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah blahblahblahblahblah ',
    author: 'Coin Information8',
  },
];

/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */
class CarouselSection extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      width:"350px"
    }
  }
  componentWillMount() {
    if(window.innerWidth < 600) {
      this.setState({
        width:"80vw"
      })
    } else {
      this.setState({
        width:"350px"
      })
    }
  }
  render() {
      return (
          <div style={styles.root}>
          <h2 style={{color:"white"}}>Slider containing information about this</h2>
            <GridList style={styles.gridList} cellHeight={300} cols={1}>
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  titleStyle={styles.titleStyle}
                  style={{minWidth:this.state.width, marginLeft:"10px",marginRight:"10px"}}
                >
                <p style={{backgroundColor: 'white', width:"100%", height:"252px"}}>{tile.textBody}</p>
                </GridTile>
              ))}
            </GridList>
          </div>
        )
  }

}

export default CarouselSection;