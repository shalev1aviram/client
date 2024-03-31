import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './Routes/AppRoutes'
import { useState, useEffect } from 'react'
import flyContext from './Components/context/flyContext'


function App() {
  const [flyData, setflyData] = useState({})

  useEffect(() => {
    console.log("flyData: ", flyData)
  }, [flyData])


  return (
    <flyContext.Provider value={{
      flyData,
      setflyData
    }}>

        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>

    </flyContext.Provider>
  )
}

export default App
