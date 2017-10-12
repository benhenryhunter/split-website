import React, {Component, PropTypes} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Home from 'material-ui/svg-icons/action/home';
import Build from 'material-ui/svg-icons/action/build';
import Face from 'material-ui/svg-icons/action/face';
import Feedback from 'material-ui/svg-icons/action/feedback';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/maps/local-phone';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {cyanA200} from 'material-ui/styles/colors';
import { Link, IndexLink } from 'react-router';

let SelectableList = makeSelectable(List);

const listStyle = {
  color:'white'
}

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
        selectableOpen: false
      });
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index
      });
    };

    handleSidebar() {
    	this.setState({selectableOpen: !this.state.selectableOpen});
  	};

    render() {
      return (
        <ComposedComponent
          style={{color:'white'}}
          onChange={this.handleRequestChange.bind(this)}
        >
       	<ListItem
        style={listStyle}
	      primaryText="Home"
	      leftIcon={<Home color="rgba(30, 144, 255, 0.87)"/>}
	      value={1}
	      onClick={this.props.home}	      
	    />
        <ListItem
        style={listStyle}
	      primaryText="Services"
	      leftIcon={<Build color="rgba(30, 144, 255, 0.87)"/>}
	      value={3}
	      onClick={this.props.handler.serviceScroll}
	    />
        <ListItem
        style={listStyle}
        primaryText="Testimonials"
        leftIcon={<Feedback color="rgba(30, 144, 255, 0.87)"/>}
        value={3}
        onClick={this.props.handler.testimonialScroll}        
      />  
        <ListItem
        style={listStyle}
        primaryText="Contact Us"
        leftIcon={<Email color="rgba(30, 144, 255, 0.87)"/>}
        value={3}
        onClick={this.props.handler.contactScroll}        
      />
        </ComposedComponent>
      );
    }
  };
  	SelectableList.propTypes = {
    	children: PropTypes.node.isRequired,
    	defaultValue: PropTypes.number.isRequired,
    	handler: PropTypes.object.isRequired,
      home:  PropTypes.func.isRequired
	}
}

SelectableList = wrapState(SelectableList);

const ListSelectable = ({handlers, home}) => (
    <SelectableList defaultValue={2} handler={handlers} home={home}/>
);

export default ListSelectable;

