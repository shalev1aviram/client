import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Header from '../Components/Header'
import SetFlight from '../Components/SetFlight'
import Text from '../Components/Text'

const AppRoutes = () => {
    return (
        <Routes>
                <Route path='/visual' element={<Home />} />
                <Route path='/text' element={<Text />} />
                <Route path='/' element={<SetFlight/>} />
            <Route path='/' element={<Header />}>
                <Route path='*' element={<p className='text-gray-300 text-3xl text-center bg-black w-fit m-auto rounded-md p-1 px-2 select-none mt-8'>404 not found</p>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes