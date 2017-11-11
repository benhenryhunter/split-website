import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, IndexLink } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';
import Home from 'material-ui/svg-icons/action/home';
import Build from 'material-ui/svg-icons/action/build';
import Face from 'material-ui/svg-icons/action/face';
import Feedback from 'material-ui/svg-icons/action/feedback';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/maps/local-phone';
import Menu from 'material-ui/svg-icons/navigation/menu';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class TopBar extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }

    // goHome() {
    //     if (window.location.pathname == '/') {
    //         this.props.handler.homeScroll()
    //     } else {
    //         window.location.href = '/'
    //     }
    // }
    func(){
        console.log("clicked")
    }
    render() {
        if (window.innerWidth < 1031) {
            return (
                <div>
                    <Drawer 
                        open={this.props.drawer.open}
                        containerStyle={{position: 'fixed'}}
                        openSecondary={true}
                        onRequestChange={this.props.drawer.handler}
                        docked={false}
                    >
                        <ListItem
                          primaryText="Home"
                          leftIcon={<Home color="rgba(30, 144, 255, 0.87)"/>}
                          value={1}      
                         />
                        <ListItem
                          primaryText="About"
                          leftIcon={<Face color="rgba(164, 30, 255, 0.87)"/>}
                          value={2}     
                        />  
                        <ListItem
                          primaryText="Services"
                          leftIcon={<Build color="rgba(255, 129, 30, 0.87)"/>}
                          value={3}
                        />
                        <ListItem
                          primaryText="Testimonials"
                          leftIcon={<Feedback color="rgba(10, 10, 10, 0.87)"/>}
                          value={3}      
                        />  
                        <ListItem
                          primaryText="Contact Us"
                          leftIcon={<Email color="rgba(255, 30, 0, 0.87)"/>}
                          value={3}    
                        />
                    </Drawer>
                    <AppBar
                        iconElementLeft={<a href='/'><img style={{cursor: 'pointer'}} width='50px' src="/images/CartoonMe.png"/></a>}
                        onRightIconButtonTouchTap={this.props.drawer.handler}
                        iconElementRight={<Menu style={{fill:'black', marginTop:'30%', height: '40px', width: '40px'}}/>}
                        iconStyleRight={{marginRight: '0px', marginTop: '0px'}}
                        style={{position:'fixed',backgroundColor: '#fff', textAlign: 'center'}}
                    />
              </div>
            )
        } else {
            return(
                <AppBar
                    iconElementRight={
                        <div className='navigation-options'>
                            <FlatButton style={{color:'white'}} primary={true} label='HOME' onTouchTap={this.func}/>       
                            <FlatButton style={{color:'white'}} primary={true} label='SERVICES' onTouchTap={this.func}/>  
                            <FlatButton style={{color:'white'}} primary={true} label='TESTIMONIALS' onTouchTap={this.func}/>   
                            <FlatButton style={{color:'white'}} primary={true} label='CONTACT US' onTouchTap={this.func}/>  
                        </div>
                    }
                    iconElementLeft={<img style={{cursor: 'pointer'}} width='50px' src="/images/CartoonMe.png"/>}
                    onLeftIconButtonTouchTap={this.props.click}
                    style={{position:"fixed"}}
                    className="TopBar"
                    showMenuIconButton={true}
                />
                )
            }
    }
};


export default TopBar;