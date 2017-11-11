import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ListItem from '../ListPage/ListItem.jsx';


const GraphicDesignTile = ({key, image, text, click}) => (

	<div key={key} className="imgCont">
		<img src={image}/>
		<div className="overlay" onTouchTap={click}>
			<p className="text">{text}</p>
		</div>
	</div>
);

export default GraphicDesignTile;