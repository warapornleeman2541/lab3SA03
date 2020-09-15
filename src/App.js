import React from 'react';
import Event from './Event';
import Check from './Check';
import './App.css';
import Start from './Start'
import _ from 'lodash';
import profile from './profile.jpg'

const message = 'Apple'
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    counter: 1,
    guess: [],
    completed: false,
    check: 0
  }
}

class App extends React.Component {
  state = {
    show: false,
    give_up: false
  }
  state = prepareStateFromWord(message);
  click = (value) => {
    let guess = [...this.state.guess, value]
    this.setState({ guess })
    if (guess.length === this.state.chars.length) {
      if (guess.join('').toString() === this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], counter: this.state.counter + 1 })
      }
    }
  }
  show_name = () => {
    this.setState({
      show: !this.state.show
    })
    console.log(this.state.show) // check
  }

  reset = () => {
    this.setState({ check: this.state.check + 1, completed: false })
  }
  give_ups = () => {
    this.setState({
      give_up: !this.state.give_up
    })
  }
  render() {
    let check = this.state.completed === false ? '' : <button className="button" onClick={this.reset}><h1>Play Again</h1></button>;
    let ans = this.state.completed === false ? '' : <h3 className="ans">This word is {message}</h3>;
    let checks = this.state.completed === false ? '' : <h1 className="win">You Win</h1>;
    //let count_end = this.state.counter > 5 ? "Game Over" : "Counter : " + this.state.counter;

    return (
      <div>
        <div>
          <Start />
        </div>
        <div className="first">
          <div className="second">
            <div className="profile-area"><img className="profile" src={profile}></img></div>
            <div className="center-box">
              <div className="center-text">
                <div className="text1"><h1 className="text">LAB:3SA03 ? 6035512059</h1></div>
                <div className="click">
                  <div className="button-a">
                    <button className="button-show" onClick={this.show_name}>{this.state.show === false ? 'Show my name' : 'Hide my name'}</button>
                  </div>
                  <div className="box-myname">
                    <div></div>
                    <h3 className="text">{this.state.show === true ? 'Arim Cheberahim' : '...'}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {
                Array.from(this.state.chars).map((x, y) => (
                  <Event
                    value={x}
                    key={y}
                    click={this.click}
                    number={this.state.counter}
                    check={this.state.check}
                  />
                ))
              }
              <div className="box">
                <h1 className="text">Choose</h1>
                <h1 className="text">You can play 5 Round</h1>
                {
                  Array.from(this.state.guess).map((x, y) => (
                    <Event
                      value={x}
                      key={y}
                      click={this.click}
                    />
                  ))
                }
                <div>
                  {/* <h1 className="text">{this.count_end}</h1> */}
                  <Check check_count={this.state.counter} />
                </div>
                <div className="button-area">
                  {check}
                  {ans}
                  {checks}
                </div>
              </div>
            </div>
            <div className="center-text">
              <button className="button-show" onClick={this.give_ups}>Hint</button>
              <h3>{this.state.give_up === true ? 'Ans:Fruit' : ''}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
