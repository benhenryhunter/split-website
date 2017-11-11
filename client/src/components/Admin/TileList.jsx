import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TileListItem from './TileListItem.jsx';

function renderList(tiles){
  if (tiles.length > 0 ) {
    return tiles.map((tile, index) => (
      <TileListItem key={index} tile={tile}/>
    ))
  } else {
    return [];
  }
}


const TileList = ({tiles}) => (

  <div className="tile-list">
    {renderList(tiles)}
  </div>
);

export default TileList;
