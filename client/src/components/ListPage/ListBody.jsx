import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ListItem from '../ListPage/ListItem.jsx';

function renderList(list){
	if (list.length > 0 ) {
		return list.map((item, index) => (
			<ListItem key={index} info={item} number={index + 1}/>
		))
	} else {
		return [];
	}
}


const ListBody = ({list}) => (

	<div>
		{renderList(list)}
	</div>
);

export default ListBody;
