import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='text-center'>
            <nav>
                <nav className="navbar navbar-expand-lg bg-primary">
                    <div className="container-fluid">
                        <button className="navbar-brand btn" type='button'>Navbar</button>
                        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto">
                                <li className='nav-item'>
                                    <button onClick={() => navigate('/register')} type='button' className="btn btn-dark">Register</button>
                                </li>
                                <li className='nav-item'>
                                    <button onClick={() => navigate('/login')} type='button' className="btn btn-warning ms-4">Login</button>
                                </li>
                                <li className='nav-item'>
                                    <button onClick={() => navigate('/metaConnect')} type='button' className="btn btn-dark ms-4">MetaConnect</button>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>

            </nav>
        </div>
    )
}

export default Header