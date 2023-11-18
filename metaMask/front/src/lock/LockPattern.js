import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PatternLock from 'react-pattern-lock';
import { useNavigate } from 'react-router-dom';
import { useCheckLOginMutation } from '../login/loginApi';
import { toast } from 'react-toastify';

const LockPattern = () => {
    const [handleLogin] = useCheckLOginMutation();
    const [pattern, setPattern] = useState([]);
    const navigate = useNavigate();

    // Define Yup schema for validation
    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid').trim(),
        password: Yup.string().required('Password is required').trim(),
    });

    // Setup useForm hook with Yup resolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    async function loginCheck(data) {
        try {
            const response = await handleLogin(data);
            if (response.error) {
                const errorMessage = response.error.data.message;
                // Handle error
                toast.error(errorMessage)
            } else {
                if (!arraysEqual(pattern, [0, 3, 6, 7])) {
                    return toast.error("Pattern Is Invalid")
                }
                const token = response.data.token;
                const getUserId = response.data.userId;
                localStorage.setItem('loggedUser', JSON.stringify({ token, getUserId }));
                const success = response.data.message;
                toast.success(success)
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err.message);
            // You can handle errors here if necessary
        }
    }



    const handlePatternComplete = (value) => {
        // Do something with the completed pattern (e.g., store it in state)
        setPattern(value.map(Number));
    };

    // Function to compare arrays
    function arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit(loginCheck)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        {...register('email')}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        {...register('password')}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <PatternLock
                    width={300}
                    pointSize={15}
                    size={3}
                    path={pattern}
                    onChange={(val) => handlePatternComplete(val)}
                    onFinish={() => {
                        // Handle pattern completion if needed
                    }}
                    className="bg-danger" // Add your custom class
                />
                <button type="button" onClick={() => setPattern('')} className='btn btn-dark'>Reset</button>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LockPattern;

