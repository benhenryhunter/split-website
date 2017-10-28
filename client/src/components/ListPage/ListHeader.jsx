import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ListHeader = ({info}) => (
	<div>
	  <Card>
	    <CardMedia>
	      <img src={info.image} alt="" />
	    </CardMedia>
	    <CardHeader
	      title={info.title}
	      textStyle={{paddingRight:0,maxWidth: "80%"}}
	      subtitle={info.user.DisplayName}
	      avatar={info.user.Avatar}
	      >
	    </CardHeader>
	  </Card>
  	</div>
);

export default ListHeader;