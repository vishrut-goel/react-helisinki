import { useState, useEffect } from 'react'
import Filter from './Filter'
import Form from './Form'
import personsService from './services/persons'
import Persons from './Persons'
import Notification from './Notification'
import ErrorMessage from './errorMessage'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filteredList, setFilteredList] = useState([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFilteredList(response.data)
      })
  }, [])

  const handleSubmit = (newPerson) => {

    if (persons.findIndex((p) => p.name === newPerson.name) != -1) {
      alert(`${newPerson.name} is already in the phonebook, replace old number with a new one`);

      const personId = (persons.find(p => p.name === newPerson.name).id)
      const updatedPerson = { name: newPerson.name, number: newPerson.number }
      personsService
        .update(personId, updatedPerson)
        .then(response => {
          // Update the persons state by making a copy of the existing state
          const updatedPersons = persons.map(person => {
            if (person.id === personId) {
              // Modify the relevant object
              return { ...person, ...updatedPerson }
            }
            return person
          })
          setPersons(updatedPersons)
          setFilteredList(updatedPersons)
        })
        .then(() => {
          setNotification(`Updated ${updatedPerson.name}`)
          setTimeout(() => {
            setNotification('')
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Information of ${updatedPerson.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        })
      setNewPerson({ name: '', number: '' })
      return;
    }

    const nameObj = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1
    }

    personsService
      .create(nameObj)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setFilteredList(persons.concat(response.data))
        setNewPerson({ name: '', number: '' })
      })
      .then(() => {
        setNotification(`Added ${nameObj.name}`)
        setTimeout(() => {
          setNotification('')
        }, 5000)
      })
      .catch(error => {
        console.log(error.response)
        setErrorMessage(`${error.response.data}`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

  const handleChange = (name, value) => {
    setNewPerson({ ...newPerson, [name]: value })
  }

  const filterBySearch = (query) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredList(filteredPersons)
  }

  const handleDeleteClick = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
      setPersons(
        persons.filter((person) => {
          return person.id !== id;
        }))
      setFilteredList(
        filteredList.filter((person) => {
          return person.id !== id;
        }))
      console.log('deleted')
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter onSearch={filterBySearch} />
      <h2>Add New</h2>
      <Form newPerson={newPerson} onTextChange={handleChange} onFormSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredList} onDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App