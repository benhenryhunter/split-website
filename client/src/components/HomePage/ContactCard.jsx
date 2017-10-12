import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

 const style = {
    margin: 5
};
class ContactCard extends React.Component {
    
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
        return (
                <div className="contact-card" style={this.props.style}>
                    <Avatar src={this.props.image} size={120} style={style}/>
                    <p className="name">{this.props.name}</p>
                    <p className="title">{this.props.title}</p>
                    <p className="text">{this.props.text}</p>
                </div>
            )
    }
}

export default ContactCard;