import './App.css';
import Frontpage from './frontpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './compounds/home';
import { HelmetProvider } from 'react-helmet-async';
import Fan from './compounds/fan';
import Config from './config/config';
import Wifi from './config/wifi';
import Tank from './compounds/tank';
import { Tankconfig } from './config/tankconfig';
import { Motorview } from './compounds/motor';
import { Motorconfig } from './config/motorconfig';
import Delete from './alert message/delete';
import { Room } from './compounds/room';
import Auth from './scrvices/auth/authitication';

function App() {
    const isAuthenticated = Auth();

    return (
        <Router>
            <HelmetProvider>
                {isAuthenticated ? (
                    <AuthenticatedRoutes />
                ) : (
                    <Routes>
                        <Route path="/" element={<Frontpage />} />
                    </Routes>
                )}
            </HelmetProvider>
        </Router>
    );
}

function AuthenticatedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Frontpage />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/fan' element={<Fan />}></Route>
            <Route path='/tank' element={<Tank />}></Route>
            <Route path='/motor' element={<Motorview />}></Route>
            <Route path='/motor/delete/:id' element={<Delete />}></Route>
            <Route path='/room' element={<Room />}></Route>
            <Route path='/room/edite/:id' element={<Room />}></Route>
            <Route path=':controll/config' element={<Config />}></Route>
            <Route path=':controll/tankconfig' element={<Tankconfig />}></Route>
            <Route path=':controll/motorconfig' element={<Motorconfig />}></Route>
            <Route path=':controll/config/wifi' element={<Wifi />}></Route>
        </Routes>
    );
}

export default App;
