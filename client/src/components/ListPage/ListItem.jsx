import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12,
};


const ListItem = ({info, number}) => (
	<div id={"listNumber" + number}>
		<div className="ItemHeader">
			<h2>{number})</h2>
			<h3>{info.Header}</h3>
		</div>
		<div className="ItemImage">
			<img width="100%" src={info.Image}/>
		</div>
		<div className="ItemBody">
			{info.Body}
		</div>
		<SocialBar />
	</div>
);

export default ListItem;
