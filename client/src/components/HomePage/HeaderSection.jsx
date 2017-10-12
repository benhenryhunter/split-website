import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12,
};


const HeaderSection = ({handler}) => (

	<div className='header'>
		<div className='header-logo'>
			<img src='/images/ARC-LogoWhite.png'/>
		</div>
		<div className='header-buttons'>
			<div className='left-buttons'>
			  <RaisedButton label="Primary" primary={true} style={style} />
			  <RaisedButton label="Secondary" secondary={true} style={style} />
			 </div>
			<div className='right-buttons'>
				<RaisedButton label="Primary" primary={true} style={style} />
				<RaisedButton label="Secondary" secondary={true} style={style} />
			</div>
		</div>
	</div>
);

export default HeaderSection;
