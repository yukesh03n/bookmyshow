import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import {Provider} from "react-redux"
import store from './redux/store';
import Admin from './pages/Admin';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
