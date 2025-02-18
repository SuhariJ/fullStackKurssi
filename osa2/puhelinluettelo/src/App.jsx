import numberService from './services/numbersservices'
import Notification from './components/Notification'
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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  //Alustetaan henkilöt
  useEffect(() =>{
    numberService
    .getFromServer()
    .then(data => {
      setPersons(data)
    })
  }, [])

  //Lisätään henkilö luetteloon
  const addPerson = (event) =>{
    event.preventDefault()
    const nimiLoytyy = persons.some(person => person.name.toLowerCase() == newName.toLowerCase())
    const numeroLoytyy = persons.some(person => person.number == newNumber)

    // Jos Numero on jo jollain, niin poistutaan metodista
    if(numeroLoytyy) {
      window.alert(`${newNumber} on jo jollain henkilöllä???`)
      return
    }

    //Jos nimi on jollain, niin kysytään haluaako päivittää numeron uudempaan
    if(nimiLoytyy) {
      const vaihdetaanko = window.confirm(`${newName} on jo puhelinluettelossa, vaihdetaanko uusi numero vanhan tilalle?`)
      if(vaihdetaanko){
        const person = persons.find(p => p.name.toLowerCase() == newName.toLowerCase())
        const changedPerson = {...person, number: newNumber}
        
        numberService
          .change(person.id, changedPerson)
          .then(data => {
            setPersons(persons.map(p => p.id !== person.id ? p : data))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Number changed`)
            setTimeout(() => {
            setSuccessMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`Information of ${person.name} has already been deleted from server`)
            setPersons(persons.filter(p => p.id !== person.id))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
          )
      }
      return
    }

    // Lisätään henkilö ja Numero
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
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch( error => {
          console.log('Serveri pois päältä?: \n', error)
        })
  }

  //Poistetaan henkilö luettelosta
  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    const poistetaanko = window.confirm(`Delete ${person.name}`)
    if(poistetaanko){ 
       numberService.deleteFromServer(id)
        .then(data => setPersons(persons.filter(p => p.id !== data.id)))
        setSuccessMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} vari='green'/>
      <Notification message={errorMessage} vari='red'/>
      <Filter value={filter} onChange={handleChangeFilter}/>
      <h2>add a new</h2>
      <Form onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handleChangeName} onChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onClick={deletePerson}/>
    </div>
  )

}

export default App