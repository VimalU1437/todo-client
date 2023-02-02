
import './App.css';
import{BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './component/login/login';
import Register from './component/register/register';
import Todo from './component/todo/todo';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path='/todo' element={<Todo/> } />
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
