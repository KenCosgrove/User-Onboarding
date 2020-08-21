import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form'
import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'

///initial states
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
  password: '',
}
const initialDisabled = true


function App() {
// states
  const [user, setUser] = useState([])
  const [formData, setFormData] = useState(initialData)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  

  useEffect(() => {
    formSchema.isValid(formData).then(valid => {
      setDisabled(!valid);
    });
  }, [formData]);

const postNewUser = newUser =>{
  axios
  .post("https://reqres.in/api/users", newUser)
  .then(res => {
    setUser([...user, res.data]); 
    console.log("success", res);
    console.log(user)
   }) 
  .catch(err => console.log("error"))
  .finally(() => {
    setFormData(
      { name: '',
        email: '',
        password: '',
        terms: false,}
         )
  })
  console.log("submitted!");
}
const update = (inputName, inputData)=>
  setFormData({...formData, [inputName]: inputData})
  

 const submit = ()=>{
  const newUser = {
    name: formData.name,
    email: formData.email,
  }
 postNewUser(newUser)
      } 

  const checkboxChange = (name, isChecked) =>{
    setFormData({
      ...formData, [name]: isChecked
      })
    }
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

  return (
    <div className="App">
      <Form 
      update={update}
      values={formData} 
      inputChange={inputChange} 
      checkboxChange={checkboxChange}
      disabled = {disabled}
      errors = {formErrors}
      submit={submit} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
       
    </div>
  );
}

export default App;
