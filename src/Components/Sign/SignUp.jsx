import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { States } from '../../App';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState(null)

    const { state, setState } = useContext(States);

    const onSubmit = (data) => {
      // Логика для обработки данных регистрации
      setUser(data)
    };

    
    useEffect(() => {
        if (user) {
            
            axios.post("http://localhost:8081/Users", {...user, favorites: []})
            .then(res => console.log(res.data))

            setState(true)
        }

    }, [user])
    
    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>register to enter</h1>
      <div>
      <p className='text-start w-[80%] text-[14px]'>Name:</p>
        <input 
          type="text" 
          placeholder='name'
          className='border-[1px] rounded-[4px] w-[80%] px-[5px]'
          {...register('name', { required: 'Name is required' })} 
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
      <p className='text-start w-[80%] text-[14px]'>Emaile:</p>
        <input 
          type="email" 
          placeholder='email'
          className='border-[1px] rounded-[4px] w-[80%] px-[5px]'
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address'
            }
          })} 
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
      <p className='text-start w-[80%] text-[14px]'>Password:</p>
        <input 
          type="password" 
          placeholder='password'
          className='border-[1px] rounded-[4px] w-[80%] px-[5px]'
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          })} 
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
    </>
    )
}

export default SignUp
