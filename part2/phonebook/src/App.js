import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [ResultToShow , setNewShow]= useState([{name:"" , number:"" , id: 0}])
  
  function handleNameChange(event){
    setNewName(event.target.value)
  }
  function handleNumberChange(event){
    setNewNumber(event.target.value)
  }
  //Use Regexp to search result for both first and last name
  function handleFilter(event){
    let result
    //if the input field isnt empty we do the filter otherwise set the result to show back to empty (Avoid showing unnecessary results)
    if(event.target.value){
      //regular experssion for insetitive search
      const regexp = new RegExp(event.target.value , "gi")
      result = persons.filter(person => person.name.match(regexp))
      if(result.length < 1) result = [{name:"" , number:"" , id: 0}]
      setNewShow(result)
    }
    else{
      result = [{name:"" , number:"" , id: 0}]
      setNewShow(result)
    }
    return
  }
  //add new person to the person
  function addNewPerson(event){
    //prevent reloading
    event.preventDefault()
    //if duplicate then we dont add the person to the phonebook
    let isDuplicate = false;
    //check if person already exist
    persons.forEach(person => {
      if(person.name === newName){
        alert(`${newName} already added to this phonebook`)
        isDuplicate = true
        return
      }
    })
    //if duplicate then exit the function
    if(isDuplicate) return
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    //avoid mutate state directly
    setPersons(persons.concat(person))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Type to search</p>
      <Filter results={ResultToShow}/>
      <input onChange={handleFilter}></input>
      <h2>Add a New</h2>
      <form onSubmit={addNewPerson}>
        <div>
        <PersonForm text="name" func={handleNameChange}/>
        <PersonForm text="Tel no" func={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <Person key={person.name} person={person}/>)}</div>
    </div>
  )
}

export default App