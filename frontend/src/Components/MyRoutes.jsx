import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Accedi/Login';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/Registrazione/SignUp';
import Restaurant from '../Pages/Ristorante/Restaurant';
import ProfiloCliente from '../Pages/ProfiloCliente/ProfiloCliente';
import ProfiloRistoratore from '../Pages/ProfiloRistoratore/ProfiloRistoratore';
import PasswordDimenticata from '../Pages/PasswordDimenticata/PasswordDimenticata';

export default function MyRoutes(props) {
    return (
        <Routes>
            <Route path="/" exact element={<Home accessToken={props.accessToken} allRestaurant={props.allRestaurant} />} />
            <Route path="/login" exact element={<Login setAccessToken={props.setAccessToken}/>} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/restaurant" exact element={<Restaurant fetchProfile={props.fetchProfile} ristoratore={props.ristoratore} userLogged={props.userLogged} />}  />
            <Route path="/CardRecensioni" exact element={<Restaurant fetchProfile={props.fetchProfile} ristoratore={props.ristoratore} userLogged={props.userLogged} />}  />
            <Route path="/profilo" exact element={<ProfiloCliente userLogged={props.userLogged} setAccessToken={props.setAccessToken}
                                                    accessToken={props.accessToken} fetchProfile={props.fetchProfile} doLogout={props.doLogout} cliente={props.cliente}/>} />
            <Route path="/profiloRistoratore" exact element={<ProfiloRistoratore userLogged={props.userLogged} setAccessToken={props.setAccessToken}
                                                    accessToken={props.accessToken} fetchProfile={props.fetchProfile} doLogout={props.doLogout} ristoratore={props.ristoratore}/>} />
            <Route path="/passwordDimenticata" exact element={<PasswordDimenticata userLogged={props.userLogged} setAccessToken={props.setAccessToken}
                                                    accessToken={props.accessToken} fetchProfile={props.fetchProfile} doLogout={props.doLogout} />} />
            
        </Routes>
    )
}