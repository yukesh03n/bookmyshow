import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from "react-redux"
import store from './redux/store';
import Profile from './pages/Profile';
import Partner from './pages/Partner';
import Admin from './pages/Admin';
import SingleMovie from './pages/Home/SingleMovie';
import BookShow from './pages/Home/BookShow';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path='/partner' element={<ProtectedRoute><Partner /></ProtectedRoute>}></Route>
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <SingleMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
            <ProtectedRoute>
            <BookShow />
            </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
