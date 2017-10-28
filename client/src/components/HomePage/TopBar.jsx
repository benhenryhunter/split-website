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
class TopBar extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }

    goHome() {
        if (window.location.pathname == '/') {
            this.props.handler.homeScroll()
        } else {
            window.location.href = '/'
        }
    }
    render() {
        if (this.props.handler.width < 1031) {
            return (
                <div>
                    <Drawer open={this.props.handler.open}
                containerStyle={{position: 'fixed'}}
                openSecondary={true}
                onRequestChange={this.props.handler.hideSidebar}
                docked={false}
                containerClassName="SideBar"
                >
                  <MobileSelectableList handlers={this.props.handler} home={()=>{this.goHome()}}/>
                </Drawer>
                <AppBar
                iconElementLeft={<img style={{cursor: 'pointer'}} width='200px' src="/images/ARC-LogoWhite.png"/>}
                onLeftIconButtonTouchTap={() => {this.goHome()}}
                onRightIconButtonTouchTap={this.props.handler.hideSidebar}
                iconElementRight={
                    <Menu style={{fill:'white', marginTop:'30%', height: '40px', width: '40px'}}/>                    
                }
                iconStyleRight={{marginRight: '0px', marginTop: '0px'}}
                style={{position:'fixed', textAlign: 'center'}}
                className="TopBar"
                />
              </div>
            )
        } else {
            return(
                <AppBar
                    iconElementRight={
                        <div className='navigation-options'>
                            <FlatButton style={{color:'white'}} primary={true} label='HOME' onTouchTap={() => {this.goHome()}}/>       
                            <FlatButton style={{color:'white'}} primary={true} label='SERVICES' onTouchTap={this.props.handler.serviceScroll}/>  
                            <FlatButton style={{color:'white'}} primary={true} label='TESTIMONIALS' onTouchTap={this.props.handler.testimonialScroll}/>   
                            <FlatButton style={{color:'white'}} primary={true} label='CONTACT US' onTouchTap={this.props.handler.contactScroll}/>  
                        </div>
                    }
                    iconElementLeft={<img style={{cursor: 'pointer'}} width='200px' src="/images/ARC-LogoWhite.png"/>}
                    onLeftIconButtonTouchTap={() => {this.goHome()}}
                    style={{position:"fixed"}}
                    className="TopBar"
                    showMenuIconButton={true}
                />
            )
        }
    }
};

TopBar.propTypes = {
  handler: PropTypes.object.isRequired
};

export default TopBar;