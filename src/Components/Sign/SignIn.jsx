import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [datas, setDatas] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios("http://localhost:8081/Users")
        .then(res => {
            setDatas(res.data)
        })
    }, [])

    // console.log(datas);

    const onSubmit = (data) => {
        datas.forEach(user => {
            if (+user.password === +data.password) {
                localStorage.setItem("userId", user.id)
                navigate("/")
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <h1>Log in to your account</h1>
            <div className='mb-[10px]'>
            <p className='text-start w-[80%] text-[14px]'>Login:</p>
                <input 
                    type="text" 
                    className='border-[1px] rounded-[4px] w-[80%] px-[5px]'
                    placeholder='login'
                    {...register('name', { required: 'Name is required' })} 
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className='mb-[10px]'>
                <p className='text-start w-[80%] text-[14px]'>Password:</p>
                <input 
                    type="password" 
                    className='border-[1px] rounded-[4px] w-[80%] px-[5px]'
                    placeholder='password'
                    {...register('password', { 
                        required: 'password is required',
                    })} 
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">Login</button>

        </form>
    );
};

export default Login;
