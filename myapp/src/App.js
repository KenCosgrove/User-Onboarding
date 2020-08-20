import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form'
import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'
import User from './User'
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
  role: '',
  civil: '',
}
const initialDisabled = true


function App() {

  const [user, setUser] = useState([])
  const [formData, setFormData] = useState(initialData)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  

  useEffect(() => {
    formSchema.isValid(formData).then(valid => {
     
      setDisabled(!valid);
    });
  }, [formData]);


 const submit = ()=>{
 
  console.log("submitted!");
  axios
    .post("https://reqres.in/api/users", formData)
    .then(res => {
      setUser(res.data); // get just the form data from the REST api
      console.log("success", res);
     
    })
    .catch(err => console.log(err.response));
  
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
       <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default App;
