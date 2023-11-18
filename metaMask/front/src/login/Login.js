import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useCheckLOginMutation } from './loginApi';

const Login = () => {

    const navigate = useNavigate()
    const [handleLogin] = useCheckLOginMutation()
    // handle password type and icons
    const [icon, setIcon] = useState(false)
    // validation using with useForm() hook
    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid').trim(),
        password: Yup.string().required('Password is required').trim()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),

    });

    async function loginCheck(data) {
        try {
            const response = await handleLogin(data)
            if (response.error) {
                const errorMessage = response.error.data.message
                return toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER
            });

            const token = response.data.token
            localStorage.setItem('token', token)

            navigate('/dashBoard')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='my-4' >
            <form onSubmit={handleSubmit(loginCheck)}>
                <div style={{ minHeight: '80vh' }} className=' container d-grid justify-content-center align-content-center' >
                    <div>
                        <h2 className=' text-center rounded bg-dark text-white my-5  p-2 loginHead'>Login Form</h2>
                        <div className="">
                            <label className='form-label' htmlFor=''>Email</label>
                            <input
                                name="email"
                                type="email"
                                {...register('email')}
                                className={`form-control mb-3 ${errors?.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors?.email?.message}</div>
                        </div>
                        <div className="invalid-feedback">{errors?.email?.message}</div>
                        <div>
                            <label htmlFor="password" className='form-label '>Password</label>
                            <div className="input-group mb-3">
                                <input
                                    type={icon ? 'text' : 'password'}
                                    className={`form-control ${errors?.password ? 'is-invalid' : ''
                                        }`}
                                    name='password'
                                    {...register('password')}
                                />

                                <span onClick={() => setIcon(!icon)} className="input-group-text" id="basic-addon1">{icon ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>

                                <div className="invalid-feedback">{errors?.password?.message}</div>
                            </div>

                        </div>
                        <div className=' d-grid '>
                            <button type="submit" className='btn btn-success'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login