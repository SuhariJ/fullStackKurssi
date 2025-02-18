import numberService from './services/numbersservices'
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

const Persons = ({personsToShow, onClick}) =>(
  <>
  {personsToShow.map(
    person => <Person key={person.id} person={person} onClick={onClick}/>
    )}
  </>
)

const Person = ({person, onClick}) =>{
  return(
    <>
      <p>{person.name} {person.number} <button onClick={() => onClick(person.id)}>delete</button></p>
    </>
)}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Jani-Petteri')
  const [newNumber, setNewNumber] = useState('+358 ')
  const [filter, setNewFilter] = useState('')
  const [showAll, setAll] = useState(true)

  //Ihmiset jotka näkyy Numbers otsikon alla
  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter))

  // Funktiot jotka kutsutaan kun kirjoitetaan syötekenttiin
  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangeNumber = (event) => setNewNumber(event.target.value)
  const handleChangeFilter = (event) => { 
    const newValue = event.target.value
    setNewFilter(newValue)
    setAll(newValue == '')
  }

  useEffect(() =>{
    numberService
    .getFromServer()
    .then(data => {
      setPersons(data)
    })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()
    const nimiLoytyy = persons.some(person => person.name.toLowerCase() == newName.toLowerCase())
    const numeroLoytyy = persons.some(person => person.number == newNumber)

    if(numeroLoytyy) {
      window.alert(`${newNumber} on jo jollain henkilöllä???`)
      return
    }

    if(nimiLoytyy) {
      const vaihdetaanko = window.confirm(`${newName} on jo puhelinluettelossa, vaihdetaanko uusi numero vanhan tilalle?`)
      if(vaihdetaanko){
        const person = persons.find(p => p.name.toLowerCase() == newName.toLowerCase())
        const changedPerson = {...person, number: newNumber}
        
        numberService
          .change(person.id, changedPerson)
          .then(data => setPersons(persons.map(p => p.id !== person.id ? p : data)))
      }
      return
    }

    console.log("tääl ollaan")
      const personObject = {
        name: newName,
        number: newNumber
      }
      numberService
        .addToServer(personObject)
        .then( data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        }).catch( error => {
          console.log('Serveri pois päältä?: \n', error)
        })
  }

  const deletePerson = id => {
    console.log("klikattu")
    const poistetaanko = window.confirm(`Delete ${persons.find(p => p.id === id).name}`)
    if(poistetaanko){ 
       numberService.deleteFromServer(id)
        .then(data => setPersons(persons.filter(p => p.id !== data.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleChangeFilter}/>
      <h2>add a new</h2>
      <Form onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handleChangeName} onChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onClick={deletePerson}/>
    </div>
  )

}

export default App