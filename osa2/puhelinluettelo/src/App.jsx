import axios from 'axios'
import { useState, useEffect } from 'react'

const Filter = ({value, onChange}) => (
  <div>
    filter shown with: <input value={value} onChange={onChange}/>
  </div>
) 

const Form = ({onSubmit, valueName, valueNumber, onChangeName, onChangeNumber}) => (
  <form onSubmit={onSubmit}>
        <div>
          name: <input value={valueName} onChange={onChangeName}/>
        </div>
        <div>
          number: <input value={valueNumber} onChange={onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = ({personsToShow}) =>(
  <>
  {personsToShow.map(
    person => <Person key={person.name} person={person}/>
    )}
  </>
)

const Person = ({person}) =>(
  <p>{person.name} {person.number}</p>
)


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Jani-Petteri')
  const [newNumber, setNewNumber] = useState('+358 ')
  const [filter, setNewFilter] = useState('')
  const [showAll, setAll] = useState(true)

  useEffect(() =>{
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter))

  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangeNumber = (event) => setNewNumber(event.target.value)
  const handleChangeFilter = (event) => { 
    const newValue = event.target.value
    setNewFilter(newValue)
    setAll(newValue == '')
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const voikoLisataNimi = persons.some(person => person.name == newName)
    const voikoLisataNumero = persons.some(person => person.number == newNumber)

    if(voikoLisataNimi) {
      window.alert(`${newName} on jo lisätty`)
      return
    }
    if(voikoLisataNumero) {
      window.alert(`${newNumber} on jo jollain henkilöllä???`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    axios.post("http://localhost:3001/persons", personObject)
      .then( response => response.data)
      .then( data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      }).catch( error => {
        console.log('Serveri pois päältä?: \n', error)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleChangeFilter}/>
      <h2>add a new</h2>
      <Form onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handleChangeName} onChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App