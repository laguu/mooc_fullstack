import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      drawFlag: false
    }
    console.log('constructor')
  }

  componentDidMount() { // get all countries from API
    console.log("did mount")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response)
        this.setState({ countries: response.data })
      })

  }

  handleFilterChange = (event) => { // change country filter
    this.setState({ filter: event.target.value })
  }

  handleClick = (event) => {
    console.log('handle click')
    this.setState({ filter: event.target.value })
    console.log('click handled')
  }


  render() {
    console.log('render')

    const shownNames = this.state.countries.filter(
      country => country.name
        .toLowerCase()
        .indexOf(this.state.filter.toLowerCase()) > -1)

    console.log(shownNames)

    if (shownNames.length === 1) {
      return (
        <div>
          <FilterForm filter={this.state.filter} handler={this.handleFilterChange} />
          {shownNames.map(country =>
            <div>
              <h2>{country.name}</h2>
              <p>capital: {country.capital}</p>
              <p>population: {country.population}</p>
              <img src={country.flag} height={200} />
            </div>
          )}
        </div>
      )
    } else if (shownNames.length > 10) {
      return (
        <div>
          <FilterForm filter={this.state.filter} handler={this.handleFilterChange} />
          <p>too many maches, specify another filter</p>
        </div>
      )
    } else {

      return (
        <div>
          <FilterForm filter={this.state.filter} handler={this.handleFilterChange} />
          {shownNames.map((country, index) =>
            <div onClick={() => this.setState({ filter: country.name })}><p>{country.name}</p></div>)}
        </div>
      )
    }
  }
}

const FilterForm = (props) => {
  return (
    <p>rajaa näytettäviä: <input value={props.filter} onChange={props.handler} /></p>
  )
}

export default App

