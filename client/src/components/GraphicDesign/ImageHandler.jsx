import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ListItem from '../ListPage/ListItem.jsx';
import StepperForm from '../../containers/General/StepperForm.jsx';


function renderList(list){
  var items = [
    {
      Text:"Additional Notes",
      Content:<div><img src={list.Image}/></div>,
      Completed: false
    }
  ]
  if (list.AdditionalImages.length > 1 ) {
    list.AdditionalImages.forEach(function(item,i){
      items.push({
          Text:"Additional Notes",
          Content:<div><img src={item}/></div>,
          Completed: false
        })
    })
    return items
        
  } else {
    return [];
  }
}





const ImageHandler = ({tile}) => (
  <StepperForm Steps={renderList(tile)}/>
);

export default ImageHandler;


