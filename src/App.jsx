import 'bootstrap/dist/css/bootstrap.css'
import { useState, useRef } from 'react'

var id = 1

function App() {
  const [all, setAll] = useState([])
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const [newName, setNewName] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [NameErrorMessage, setNameErrorMessage] = useState('');

  const add = () => {
    if (/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      setAll([...all, {
        id: id++,
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
      }])
      nameRef.current.value = null
      emailRef.current.value = null
      phoneRef.current.value = null
      setErrorMessage('');
    }
    else {
      setErrorMessage('Email is not valid');
    }
  }

  const deletePerson = (id) => {
    setAll((preState) =>
      preState.filter((person) => person.id != id)
    )
  }

  const updatePerson = (id) => {
    if (newName != '') {
      setAll(all.map((person) => person.id == id ? { ...person, name: newName } : person))
      setNewName('')
      setNameErrorMessage('')
    }
    else {
      setNameErrorMessage('Invalid name')
    }
  }


  return (
    <>
      <div className='form-group w-100 d-flex flex-column'>
        <input className="form-control m-3 w-75" type="text" name="" id="" ref={nameRef} placeholder='name' />
        <input className="form-control m-3 w-75" type="email" name="" id="" ref={emailRef} placeholder='email' />
        <p className='m-3 mt-0 text-danger'> {errorMessage} </p>
        <input className="form-control m-3 w-75" type="number" name="" id="" ref={phoneRef} placeholder='phone' />
        <button className="btn btn-primary m-2 btn-lg mx-auto w-50" onClick={() => { add() }}>Save</button>
      </div>
      <hr />

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              all.map((person, index) =>
                <tr key={index}>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td>{person.phone}</td>
                  <td><button className='btn' onClick={() => { deletePerson(person.id) }}>✕</button></td>
                  <td><button className='btn' onClick={() => { updatePerson(person.id) }}>✎</button></td>
                  <td><input type="text" name="" onChange={() => { setNewName(event.target.value) }} /></td>
                </tr>
              )
            }
          </tbody>
        </table>
        <p className='text-center fs-3 text-danger'> {NameErrorMessage} </p>
      </div>
    </>
  )
}

export default App