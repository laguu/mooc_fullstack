import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: []
    }
  }


  mostvoted = () => {
    let max=0
    let points = [...this.state.points]
   
    for (let i=0;i<points.length;i++){
      if (points[i]>points[max]) max = i
    }
    return max
    
  }
  
  
  vote = () => {
      let points = [...this.state.points]
      if (points[this.state.selected] !== undefined){
        points[this.state.selected] = points[this.state.selected]+1
      } else {
        points[this.state.selected] = 1;
      }

      this.setState({points})
  }

  render() {

    return (
      <div>
        <div><p>{this.props.anecdotes[this.state.selected]}</p></div>
        <div><p>has {this.state.points[this.state.selected]} votes</p></div>
        <button onClick={this.vote}>vote</button>
        <button onClick={() => this.setState({ selected: Math.floor(Math.random()*anecdotes.length) })}>next anecdote</button>
        <h1>anecdote with most votes:</h1>
        <div><p>{this.props.anecdotes[this.mostvoted()]}</p></div>
        <div><p>has {this.state.points[this.mostvoted()]} votes</p></div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)