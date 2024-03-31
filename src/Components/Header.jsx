import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
    return (
        <div className='select-none'>
            <header className='h-25'>
                <nav className=' bg-slate-700 bg-blend-darken bg-cover bg-center p-4 d-flex justify-content-end'>
                    <div className='p-4 d-flex ms-auto'>
                        <Link className='text-white mx-3' to="/visual">VISUAL</Link>
                        <Link className='text-white mx-3' to="/text">TEXT</Link>
                    </div>
                </nav>
            </header>
            <div className='px-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Header