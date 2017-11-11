import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12,
};


const TileListItem = ({tile}) => (
	<div className="tileItem">
		<div className="ItemHeader">
			<h2>{tile.Title}</h2>
		</div>
		<div className="ItemImage">
			<img width="60px" height="60px" src={tile.Image}/>
		</div>
		<div className="ItemBody">
			{tile.Description}
		</div>
	</div>
);

export default TileListItem;
