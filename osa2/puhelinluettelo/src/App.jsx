import { useState } from 'react'

const Person = ({name, number}) =>(
  <p>{name} {number}</p>
)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('Jani-Petteri')
  const [newNumber, setNewNumber] = useState('+358 ')
  const [filter, setNewFilter] = useState('')


  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangeNumber = (event) => setNewNumber(event.target.value)
  const handleChangeFilter = (event) => setNewFilter(event.target.value)

  
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('040-')
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input value={filter} onChange={handleChangeFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )

}

export default App