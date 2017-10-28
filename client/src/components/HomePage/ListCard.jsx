import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ListCard = (info) => (
  <Card>
    <CardHeader
      title={info.user.DisplayName}
      subtitle={info.user.Rating}
      avatar={info.user.avatar}
    />
    <CardMedia
      overlay={<CardTitle title={info.title} subtitle={info.subtitle} />}
    >
      <img src={info.image} alt="" />
    </CardMedia>
    <CardActions>
      <FlatButton label="Open" />
      <FlatButton label="Share" />
    </CardActions>
  </Card>
);

export default ListCard;