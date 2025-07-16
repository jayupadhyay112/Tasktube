import Home from './component/Home'
import Ytube from './component/Ytube'
import Navbar from './component/Navbar'
import MainPage  from './component/MainPage'
import Signup from './component/signup'
import Login from './component/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ChatAI from './component/ChatAI'
import ProfilePopover from './component/ProfilePopover';
function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Ytube' element={<Ytube/>}/>
      <Route path='/Signup'element={<Signup/>}/>
      <Route path='/Login'element={<Login/>}/>
      <Route path='/ChatAI'element={<ChatAI/>}/>
     </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
