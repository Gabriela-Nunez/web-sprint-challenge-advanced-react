import React from 'react';
import axios from 'axios';


const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state= {
      x: initialX,
      y: initialY,
      steps: initialSteps,
      xy: initialIndex,
      message: initialMessage,
      formValues: ''
    }
    
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    return(`(${this.state.x},${this.state.y})`)
    
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  reset = () => {
    this.setState({
      x: initialX,
      y: initialY,
      steps: initialSteps,
      message: initialMessage,
      xy: initialIndex,
      formValues: ''
    })
  }

  getNextIndex = (direction) => {
    if(direction === 'left'){
      if(this.state.x - 1 === 0){
        return ({"x": this.state.x, "y":this.state.y})
      }
      return ({"x": this.state.x - 1, "y":this.state.y,"xy":this.state.xy -1,"steps": this.state.steps + 1})
    }
    if(direction === 'right'){
      if(this.state.x + 1 === 4){
        return ({"x": this.state.x, "y":this.state.y})
      }
      return ({"x": this.state.x + 1, "y":this.state.y,"xy":this.state.xy + 1,"steps": this.state.steps + 1})
    }
    if(direction === 'up'){
      if(this.state.y - 1 === 0){
        return ({"x": this.state.x, "y":this.state.y})
      }
      return ({"x": this.state.x, "y":this.state.y - 1,"xy":this.state.xy - 3,"steps": this.state.steps + 1})
    }
    if(direction === 'down'){
      if(this.state.y + 1 === 4){
        return ({"x": this.state.x, "y":this.state.y})
      }
      return ({"x": this.state.x, "y":this.state.y + 1,"xy":this.state.xy + 3,"steps": this.state.steps + 1})
    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    let nextMove = this.getNextIndex(evt.target.id)
    if (`(${nextMove.x},${nextMove.y})` === this.getXY()){
      return this.setState({message: `You can't go ${evt.target.id}`})
    }
    this.setState({...this.state,
      message: initialMessage,
      x: nextMove.x,
      y: nextMove.y,
      steps: nextMove.steps,
      xy: nextMove.xy})
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target
    this.setState({ ...this.state, formValues: value })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post('http://localhost:9000/api/result', {email: this.state.formValues, steps: this.state.steps, x: this.state.x, y: this.state.y})
      .then(res => {
        this.setState({
          ...this.state,
          message: res.data.message,
          formValues: ''
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXY()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={(evt) => this.move(evt)} id="left">LEFT</button>
          <button onClick={(evt) => this.move(evt)} id="up">UP</button>
          <button onClick={(evt) => this.move(evt)} id="right">RIGHT</button>
          <button onClick={(evt) => this.move(evt)} id="down">DOWN</button>
          <button  onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input  value={this.state.formValues} onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}


