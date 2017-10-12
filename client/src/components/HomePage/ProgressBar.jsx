import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, IndexLink } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {cyanA200} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MobileSelectableList from '../HomePage/MobileSelectableList.jsx';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import ReactDOM from 'react-dom';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class ProgressBar extends React.Component {
	constructor(props, context) {
	    super(props, context);
	}

	 render() {
		return(
			<div className="meter">
			  <span style={{width: this.props.state.progress}}></span>
			</div>
		)
	}

}

export default ProgressBar;