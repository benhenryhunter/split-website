import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import ContactCard from '../HomePage/ContactCard.jsx';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

 const contacts = [
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"33%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"33%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"33%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"25%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"25%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"25%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"25%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"50%", padding:"20px"}
        },
        {
            "image":"/images/bryan.jpeg",
            "name":"Bryan Wisk",
            "title":"Data guy",
            "text":"Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy Interesting facts about Bryan: He is a data guy",
            "style":{width:"50%", padding:"20px"}
        },
    ]
class ContactSection extends React.Component {
    
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
            <div className="contact-section">
            {contacts.map((contact) => (
              <ContactCard image={contact.image} text={contact.text} name={contact.name} title={contact.title} style={contact.style}/>
            ))}
            </div>
            )
    }
}

export default ContactSection;