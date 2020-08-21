import React from 'react'

const Form = (props) => {
    const {values, submit, update, inputChange, checkboxChange, errors, disabled} = props
   
    const onInputChange = event =>{
        const {name, value} =event.target
        inputChange(name, value)
        update(name, value)
    }
    
    const onCheckboxChange = event => {
        const {name, checked} = event.target
        checkboxChange(name, checked)
    }

    const onSubmit = event =>{
        event.preventDefault();
        submit()
    }
   
   
    return (
        <form onSubmit={onSubmit} >
           <div className='errors'>
              <div>{errors.name}</div>
              <div>{errors.email}</div>
              <div>{errors.password}</div>
              <div>{errors.terms}</div>
    </div> 
            <label htmlFor="nameInput">
                Name: <input
                 id="nameInput"
                 value={values.name} 
                 name="name" 
                 type="text"
                 onChange={onInputChange}/>
            </label>
            <br/>
            <label htmlFor="emailInput">
                Email: <input
                id="emailInput"
                name="email"
                value={values.email} 
                type="text" 
                onChange={onInputChange}/>
            </label>
            <br/>
            <label htmlFor="passwordInput">
                Password: <input 
                id="passwordInput"
                value={values.password} 
                onChange={onInputChange} 
                name="password" 
                type="password"/>
            </label>
            <br/>
            <label htmlFor="termsInput">
                Terms of Service: <input 
                id="termsInput"
                checked={values.terms} 
                name="terms"  
                onChange={onCheckboxChange} 
                type="checkbox"/>
            </label>
             <br/>
            <button disabled={disabled} >Submit</button>
          
        </form>
         
    )
}

export default Form
