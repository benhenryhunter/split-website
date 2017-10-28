import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12,
};


const SocialBar = ({info}) => (
	<div class="fb-share-button" 
	    data-href={info.url}>
  	</div>
);

export default SocialBar;
