import { useState } from 'react'
import './App.css'
import {useForm} from "react-hook-form"

function App() {

  const {register,handleSubmit,
  
  formState :{errors}
  
  } = useForm()

  const [submitted,setSubmitted] = useState(false)
  const [field,setField] = useState()
  const [visible,setVisible] = useState(false)


  const onSubmit = (data) => {
    setField(data)
    setSubmitted(true)
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      <h1>React Forms Library</h1>
      <div id='form'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-field'>    
            {submitted ? <h1 id='success'>Registered Successfully</h1> : null }
                <input type="text" placeholder='First name' {...register("firstName",{required: "First name is required"})} />
              <p>{errors.firstName?.message}</p>
            </div>
            <div className='input-field'>
                <input type="text" placeholder='Last name' {...register("lastName",{required: "Last name is required"})} />
                <p>{errors.lastName?.message}</p>
            </div>
            <div className='input-field'>
                <input type="text" placeholder='Email' {...register("Email",{required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email"
              }
              })} />

              <p>{errors.Email?.message}</p>

            </div>
            <div className='input-field'>
                <input type={visible ? "text" : "password"} placeholder='Password' {...register("Password",{required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters"
                },
                maxLength: {
                  value: 20,
                  message: "Password must be less than 20 characters"
                }

              })}/>
                <span onClick={handleVisible}>Show</span>
                <p>{errors.Password?.message}</p>
            </div>
            <button type='submit'>Submit</button>
          </form>
      </div>
              {submitted ? 

          <div id='user-details'>
              <h3>Username : {field.firstName} {field.lastName}</h3>
              <h3>Email: {field.Email}</h3>
          </div> : null
            }
    </>
  )
}

export default App
