import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';


const iconStyles = {
  margin: 12,
  color:"#fff",
};

const paperStyle = {
  height: 100,
  width: "100%",
  margin: 20,
  backgroundColor:"#000",
  color:"white",
  textAlign: 'center',
  display: 'inline-block'
}


class TokenInformation extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }

    render () {
		return (
			<div style={{'marginTop':"25%",'textAlign':'center', 'padding':'5%', color:'white',border: "white", borderStyle: "solid", borderLeft: "0px", borderRight:"0px"}}>
				<h1>TOTAL FUNDS RAISED</h1>
				<div className="coins">
					<div className="coin-col">
					  <Paper style={paperStyle}>
					  		<p>Total Funds Raised</p>
					        <p className="coin-text">{this.props.state.coin1}</p>
					    </Paper>
					</div>

					<div className="coin-col">
					  <Paper style={paperStyle}>
					  		<FontIcon className="fa fa-btc" style={iconStyles}></FontIcon>
					      <p className="coin-text">{this.props.state.coin2}</p>
					    </Paper>
					</div>


					<div className="coin-col">
					  <Paper style={paperStyle}>
					  		<FontIcon className="fa fa-yen" style={iconStyles}></FontIcon>
					      <p className="coin-text">{this.props.state.coin3}</p>
					    </Paper>
					</div>

					<div className="coin-col">
					  <Paper style={paperStyle}>
					  		<FontIcon className="fa fa-gg" style={iconStyles}></FontIcon>
					      <p className="coin-text">{this.props.state.coin4}</p>
					    </Paper>
					</div>
				</div>
			</div>
		)
	}
}

export default TokenInformation;
