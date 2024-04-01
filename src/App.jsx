import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './Routes/AppRoutes'
import { useState, useEffect } from 'react'
import flyContext from './Components/context/flyContext'


function App() {
  // **State for Fly Data**
  const [flyData, setflyData] = useState({})

  // **Log Fly Data Changes (for Debugging)**
  useEffect(() => {
    console.log("flyData: ", flyData)
  }, [flyData])


  return (
    <flyContext.Provider value={{ // Provide flyData and setflyData to context
      flyData,
      setflyData
    }}>

      <BrowserRouter>
        <AppRoutes /> {/* Render routing configuration */}
      </BrowserRouter>

    </flyContext.Provider>
  )
}

export default App
