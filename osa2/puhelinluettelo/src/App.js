import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()

    let exists = false
    this.state.persons.forEach(person => {
      if (person.name === this.state.newName) exists = true
    })

    if (exists) return

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const persons = this.state.persons.concat(personObject)
    this.setState({
      persons,
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {


    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterForm filter={this.state.filter} handler={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <AddPersonForm
          submitHandler={this.addPerson}
          field1={this.state.newName}
          field2={this.state.newNumber}
          handler1={this.handleNameChange}
          handler2={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <Numbers persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

const FilterForm = (props) => {
  return (
    <div>
      <p>rajaa näytettäviä <input value={props.filter} onChange={props.handler} /></p>
    </div>
  )
}

const AddPersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.submitHandler}>
        <p>nimi: <input value={props.field1} onChange={props.handler1} /></p>
        <p>numero: <input value={props.field2} onChange={props.handler2} /></p>
        <button type="submit">lisää</button>
      </form>
    </div>
  )
}

const Numbers = (props) => {
  
  const shownNames = () => {
    return props.persons.filter(
      person => person.name
        .toLowerCase()
        .indexOf(props.filter.toLowerCase()) > -1)
  }

  return (
    <table>
      <tbody>
        {shownNames().map((person, index) => <Person person={person} key={index} />)}
      </tbody>
    </table>

  )
}

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
    </tr>
  )
}


export default App
