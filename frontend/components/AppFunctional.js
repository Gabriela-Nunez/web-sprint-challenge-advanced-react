import React, { useState } from 'react'

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
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [idx, setIdx] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);



  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return(`(${x},${y})`)
  }
 


  const reset = () => {
    // Use this helper to reset all states to their initial values.
   useState({
     initialMessage: '',
     initialEmail: '',
     initialSteps: 0,
     initialIndex: 4, // the index the "B" is at
     initialY: 2,
     initialX: 2,
   })


    
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
       if(direction === 'left') {
      if(x - 1 === 0) {
        return ({'x': x, 'y': y})
      }
      return ({
        'x': x - 1, 
        'y': y, 
        'idx': idx - 1,
        'steps': steps + 1
      })
    }
    if(direction === 'right') {
      if(x + 1 === 4) {
        return ({
          'x': x + 1,
          'y': y,
          'idx': idx + 1,
          'steps': this.state.steps + 1
        })
      }
      if(direction === 'up') {
        if(y - 1 === 0) {
          return ({
            'x': x,
            'y': y - 1,
            'idx': idx -3,
            'steps': steps + 1
          })
        }
        if(direction === 'down') {
          if(y + 1 === 4) {
            return ({
              'x': x,
              'y': y + 1,
              'idx': idx + 3,
              'steps': steps + 1
            })
          }
      }
      }
    }

  }

  // console.log(getNextIndex('left'));
  
  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let nextMove = getNextIndex(evt.target.id);
    if (`(${nextMove.x},${nextMove.y})` === getXY()){
      return setMessage({message: `You can't go ${evt.target.id}`})
    }
    setMessage({message: initialMessage})
    setX({x: nextMove.x})
    setY({y: nextMove.y})
    setSteps({steps: nextMove.steps})
    setIdx({ idx: nextMove.idx})
    
  }
 
  

  function onChange(evt) {
    // You will need th[is to update the value of the input.
    setEmail({email: evt.target.value})
    
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    // axios.post('http://localhost:9000/api/result', {email: this.state.email})
    //   .then(res => {
    //     console.log(res)
        // this.setState({
        //   ...this.state,
        //   message: res.data.message,
    //       email: ''
    //     })
    //   })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={(evt) => move(evt)} id="left">LEFT</button>
        <button onClick={(evt) => move(evt)} id="up">UP</button>
        <button onClick={(evt) => move(evt)} id="right">RIGHT</button>
        <button onClick={(evt) => move(evt)}id="down">DOWN</button>
        <button onClick={() => reset} id="reset">reset</button>
      </div>
      <form>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input  id="submit" type="submit"></input>
      </form>
    </div>
  )
}
