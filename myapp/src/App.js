import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form'
import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'
import User from './User'

const initialData = [
{
  name: '',
  email: '',
  password: '',
  terms: false,
}
]
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialDisabled = true
const users = []

function App() {

  const [user, setUser] = useState([])
  const [formData, setFormData] = useState(initialData)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  
 const submit = ()=>{
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      terms: formData.terms,
    }
    setUser([...user, newUser])
    setFormData( { name: '',
    email: '',
    password: '',
    terms: false,})
  } 
  const checkboxChange = (name, isChecked) =>{
    setFormData({
      ...formData,
      terms:{
        ...formData.terms,
        [name]: isChecked
      }
    })}
  const inputChange = (name, value) => {
  
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    }

    useEffect(() => {
           formSchema.isValid(formData)
        .then(valid => {
          setDisabled(!valid);
        })
    }, [formData])


  return (
    <div className="App">
      <Form 
      values={formData} 
      inputChange={inputChange} 
      checkboxChange={checkboxChange}
      disabled = {disabled}
      errors = {formErrors}
      submit={submit} />
    </div>
  );
}

export default App;
