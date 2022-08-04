import { useState ,useEffect } from 'react'
import React from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import NumberServices from "./services/number"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [ResultToShow , setNewShow]= useState([{name:"" , number:"" , id: 0}])
  const [errorMessage , setErrorMessage] = useState({message:"" , status:""})
  useEffect(() => {
    NumberServices.getNumber()
                  .then(numbers => {
                    setPersons(numbers)
                  })
                  .catch(err => {
                    const message = {
                      message:"Can't load resource from database , Connection to server lost",
                      status:"fail"
                    }
                    setErrorMessage(message)
                    setTimeout(() => {setErrorMessage(null)}, 7000)
                  })
  },[])

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

  function handleDelete(id){
    //store the obj in deletobj
    const deleteobj = persons.filter(person => person.id === id)
    if(deleteobj === undefined) {
      const message = {
        message:"Can't Delete Person , maybe record already deleted ? Try reload",
        status:"fail"
    }
      setErrorMessage(message)
      setTimeout(() => {setErrorMessage(null)}, 7000)
    }
    //Promt a message to user and if user decide to delete , delete the entry 
    if (window.confirm(`Delete ${deleteobj[0].name} ??`)) {
      NumberServices.deleteNumber(id).then(response => console.log(response)).catch(err => {
        const message = {
          message:"Can't Delete Person , maybe record already deleted ? Try reload",
          status:"fail"
        }
        setErrorMessage(message)
        setTimeout(() => {setErrorMessage(null)}, 7000)
      })
      const message = {
        message:`${deleteobj[0].name} deleted`,
        status:"success"
      }
      setErrorMessage(message)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      const result = persons.filter(person => person.id !== id)
      setPersons(result)
    }
    return
  }

  //add new person to the person
  async function addNewPerson(event){
    let duplicatePerson
    //prevent reloading
    event.preventDefault()
    //if duplicate then we dont add the person to the phonebook
    let isDuplicate = false;
    //check if person already exist
    persons.forEach(person => {
      if(person.name === newName){
        duplicatePerson = person
        isDuplicate = true
        return
      }
    })
    //if duplifcate then ask user if they want to replace it, yes = replace , no = end handler
    if(isDuplicate) {
      if (window.confirm(`${duplicatePerson.name} is already exist , replace the old number with the new one?`)){
        const newObj = {
          ...duplicatePerson,
          number: newNumber
        }
        let end = false
        await NumberServices.updateNumber(duplicatePerson.id ,newObj).catch(err => {
          
          const message = {
            message:"Can't Update Person",
            status:"fail"
          }
          setErrorMessage(message)
          setTimeout(() => {setErrorMessage(null)}, 7000)
          end = true
        })
        if(end) return
        setPersons(persons.map(person => person.id !== duplicatePerson.id ? person : newObj))
        const message = {
          message:`${duplicatePerson.name} info updated`,
          status:"success"
        }
        setErrorMessage(message)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
      return
    }
    else{
      //my id generation is using random numner beacuse if The id is based on length + 1 when user delete a second last element , user can't add another person again
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }

      // prevent same id added twice in db after user delete some record
      persons.forEach(element => {
        if(element.id === person.id)
        person.id += 1
      })
      //avoid mutate state directly
      let end = false;
      await NumberServices.saveNumber(person).catch((error) => {
        console.log(error)
        const message = {
          message:"Validation error/internal server error see console",
          status:"fail"
        }
        setErrorMessage(message)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        end = true;
      })
      if(end) return
      const message = {
        message:`${person.name} added`,
        status:"success"
      }
      setErrorMessage(message)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setPersons(persons.concat(person))
      return
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <div>{persons.map(person => <Person key={person.name} person={person} func={() => handleDelete(person.id)}/>)}</div>
    </div>
  )
}

export default App