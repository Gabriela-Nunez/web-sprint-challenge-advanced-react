import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states


const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialY = 2
const initialX = 2


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
      x: initialX,
      y: initialY,
      steps: initialSteps,
      xy: initialIndex,
      message: initialMessage,
      formValues: initialEmail
  })


  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return(`(${state.x},${state.y})`)
  }
 


 function reset() {
    // Use this helper to reset all states to their initial values.
   setState({
    x: initialX,
    y: initialY,
    steps: initialSteps,
    message: initialMessage,
    xy: initialIndex,
    formValues: initialEmail
   })  
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    

    if(direction === 'left'){
      if(state.x - 1 === 0){
        return ({"x": state.x, "y":state.y})
      }
      return ({"x": state.x - 1, "y":state.y,"xy":state.xy -1,"steps": state.steps + 1})
    }
    if(direction === 'right'){
      if(state.x + 1 === 4){
        return ({"x": state.x, "y":state.y})
      }
      return ({"x": state.x + 1, "y":state.y,"xy":state.xy + 1,"steps": state.steps + 1})
    }
    if(direction === 'up'){
      if(state.y - 1 === 0){
        return ({"x": state.x, "y":state.y})
      }
      return ({"x": state.x, "y":state.y - 1,"xy":state.xy - 3,"steps": state.steps + 1})
    }
    if(direction === 'down'){
      if(state.y + 1 === 4){
        return ({"x": state.x, "y":state.y})
      }
      return ({"x": state.x, "y":state.y + 1,"xy":state.xy + 3,"steps": state.steps + 1})
    }
  }

  
  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let nextMove = getNextIndex(evt.target.id)
    if (`(${nextMove.x},${nextMove.y})` === getXY()){
      return setState({message: `You can't go ${evt.target.id}`})
    }
    setState({ ...state,
      message: initialMessage,
      x: nextMove.x,
      y: nextMove.y,
      steps: nextMove.steps,
      xy: nextMove.xy})
  }
 
  

  function onChange(evt) {
    // You will need th[is to update the value of the input.
    const { value } = evt.target
    setState({ ...state, formValues: value })
    
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post('http://localhost:9000/api/result', {email: state.formValues, steps: state.steps, x: state.x, y: state.y})
      .then(res => {
        setState({
          ...state,
          message: res.data.message,
          formValues: '',
          x: 2,
          y: 2,
          steps: 0
        })
      })
      .catch(err => {
        setState({...state, message: err.response.data.message})
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY()}</h3>
        <h3 id="steps">You moved {state.steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.xy ? ' active' : ''}`}>
              {idx === state.xy ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(evt) => move(evt)} id="left">LEFT</button>
        <button onClick={(evt) => move(evt)} id="up">UP</button>
        <button onClick={(evt) => move(evt)} id="right">RIGHT</button>
        <button onClick={(evt) => move(evt)}id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={state.formValues} id="email" type="email" placeholder="type email"></input>
        <input  id="submit" type="submit"></input>
      </form>
    </div>
  )
}
