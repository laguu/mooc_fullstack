import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.otsikko}</h1>
    </div>
  )
}


const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.teksti}</button>
    </div>
  )
}

const Statistics = ({arvot}) => {

  if (arvot[0]===0 && arvot[1]===0 && arvot[2]===0) {
    return(
      <div>
        <p>ei yhtään palautetta annettu</p>
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <Statistic teksti="hyva" arvo={arvot[0]}/>
          <Statistic teksti="neutraali" arvo={arvot[1]}/>
          <Statistic teksti="huono" arvo={arvot[2]}/>
          <Statistic teksti="keskiarvo" arvo={arvot[3]}/>
          <Statistic teksti="positiivisia" arvo={arvot[4]}/>
        </tbody>
      </table>
    </div>
  )

}

const Statistic = ({teksti, arvo}) => {
  return(
      <tr>
        <td>{teksti}</td>
        <td>{arvo}</td>
      </tr>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  lisaa = (arvosana) => {
    return () => {
      this.setState({ [arvosana]: this.state[arvosana]+1  })
    }
  }

  render() {
    const keskiarvo = () => ((this.state.hyva-this.state.huono) / (this.state.hyva+this.state.neutraali+this.state.huono)).toPrecision(1)
    
    const positiivisia = () => {
      return (this.state.hyva / (this.state.hyva+this.state.neutraali+this.state.huono) *100).toPrecision(3) +" %"
    }
    
    return (
      <div>
        <Otsikko otsikko="anna palautetta" />
        <Button teksti="hyvä" handleClick={this.lisaa("hyva")} />
        <Button teksti="neutraali" handleClick={this.lisaa("neutraali")} />
        <Button teksti="huono" handleClick={this.lisaa("huono")} />
        <Otsikko otsikko="statistiikka" />
        <Statistics arvot={[this.state.hyva,this.state.neutraali,this.state.huono,keskiarvo(),positiivisia()]}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


