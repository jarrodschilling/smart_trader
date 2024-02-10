import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from './views/Dashboard'
import AddTrade from './views/AddTrade'
import CurrentPortfolio from './views/CurrentPortfolio'
import EquityCurve from './views/EquityCurve'
import ToDo from './views/ToDo'
import TradeLedger from './views/TradeLedger'
import TradeStats from './views/TradeStats'
import UpdateTrade from './views/UpdateTrade'
import NavBar from './components/NavBar'

import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/add' element={<AddTrade />} />
          <Route path='/current' element={<CurrentPortfolio />} />
          <Route path='/equitycurve' element={<EquityCurve />} />
          <Route path='/todo' element={<ToDo />} />
          <Route path='/ledger' element={<TradeLedger />} />
          <Route path='/stats' element={<TradeStats />} />
          <Route path='/update' element={<UpdateTrade />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
