import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepButton, StepContent, } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const getStyles = () => {
  return {
    root: {
      width: '100%',
      overflowX:'visible',
      margin: 'auto',
    },
    content: {
      margin: '0 16px',
    },
    actions: {
      marginTop: 12,
    },
    backButton: {
      marginRight: 12,
    },
  };
};

/*

code to reset the stepper
<p>
  <a
    href="#"
    onClick={(event) => {
      event.preventDefault();
      this.setState({stepIndex: 0, visited: []});
    }}
  >
    Click here
  </a> to reset the example.
</p>

*/

class StepperForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stepIndex: 0,
      visited: [],
      primary: true,
      secondary: false,
      nextText: "Next",
      transitionDuration:450
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.updateStep = this.updateStep.bind(this)
    this.validateAll = this.validateAll.bind(this)
    this.changeText = this.changeText.bind(this)
  }

  componentWillMount() {
    const {stepIndex, visited} = this.state;
    this.setState({visited: visited.concat(stepIndex)});
  }

  componentWillUpdate(nextProps, nextState) {
    const {stepIndex, visited} = nextState;
    if (visited.indexOf(stepIndex) === -1) {
      this.setState({visited: visited.concat(stepIndex)});
    }
  }

  handleNext(){
    const {stepIndex} = this.state;
    if (stepIndex < this.props.Steps.length - 1) {
      this.setState({stepIndex: stepIndex + 1, transitionDuration: 450});
      // this.props.handlers.visitCompleted(this.props.Steps[stepIndex + 1].Text)
    }
    this.validateAll(stepIndex + 1)
  };

  validateAll(index){
    var validAll = true
    for(var i = 0; i < this.props.Steps.length - 1; i++){
      if(!this.props.Steps[i].Completed){
        validAll = false
      }
    }
    this.changeText(index, validAll)
  }

  changeText(index, bool){
    if(index > this.props.Steps.length - 1) {
      if (bool && this.state.nextText == "Submit"){
          this.setState({
            nextText: (<CircularProgress size={30}/>),
            primary:false,
            secondary:false
          })
          this.props.handlers.submitForm()
        } else {
          this.setState({
            nextText: "Submit",
            primary:false,
            secondary:true
          })
        }
    } else if(index == this.props.Steps.length - 1) {
      if(bool && this.state.nextText != "Submit"){
        this.setState({
          nextText: "Submit",
          primary:true,
          secondary:false
        })
      } else if (bool && this.state.nextText == "Submit"){
        this.setState({
          nextText: "Submit",
          primary:true,
          secondary:false
        })
      } else {
          this.setState({
            nextText: "Submit",
            primary:false,
            secondary:true
          })
        }
    } else {
      this.setState({
        nextText: "Next",
        primary:true,
        secondary:false
      })
    }
  }

  handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    } else if(stepIndex == 0) {
      this.setState({stepIndex: 0}); 
    }
    this.validateAll(stepIndex - 1)
  };

  getStepContent(stepIndex) {
    if(stepIndex == -1){
      return ""
    }
    return this.props.Steps[stepIndex].Content
  }
  updateStep(index){
    var hold = index
    var transitionDuration = 450
    if(index == this.state.stepIndex){
      index = -1
    }
    if(this.state.stepIndex == -1){
      transitionDuration = 225
    }
    this.setState({stepIndex: index, transitionDuration: transitionDuration})
    // this.props.handlers.visitCompleted(this.props.Steps[hold].Text)
    this.validateAll(hold)
  }

  render() {
    const {stepIndex, visited} = this.state;
    const styles = getStyles();
    if (window.innerWidth > 800){
      return (
        <div style={styles.root}>
          
          <Stepper linear={false} orientation='horizontal'>
            {this.props.Steps.map((element, index) => (
              <Step key={index} completed={element.Completed} active={stepIndex === index}>
                <StepButton onClick={()=>this.updateStep(index)}>
                  {element.Text}
                </StepButton>
             
              </Step>
            ))}
          </Stepper>
          {this.getStepContent(stepIndex)}
          <div style={styles.actions}>
              <center>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={styles.backButton}
                />
                <RaisedButton
                  label={this.state.nextText}
                  primary={this.state.primary}
                  secondary={this.state.secondary}
                  onClick={this.handleNext}
                />
              </center>
          </div>

        </div>
      );
    } else {
      return (
        <div style={styles.root}>
          
          <Stepper linear={false} orientation='vertical'>
            {this.props.Steps.map((element, index) => (
              <Step key={index} completed={element.Completed} active={stepIndex === index}>
                <StepButton onClick={()=>this.updateStep(index)}>
                  {element.Text}
                </StepButton>
                <StepContent transitionDuration={this.state.transitionDuration}>
                {this.getStepContent(stepIndex)}
                <div style={styles.actions}>
                    <center>
                      <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={styles.backButton}
                      />
                      <RaisedButton
                        label={this.state.nextText}
                        primary={this.state.primary}
                        secondary={this.state.secondary}
                        onClick={this.handleNext}
                      />
                    </center>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

        </div>
      );
    }
  }
}

StepperForm.propTypes = {
  Steps:PropTypes.array.isRequired
}

export default StepperForm;