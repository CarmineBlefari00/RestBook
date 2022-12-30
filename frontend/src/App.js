import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from './Components/AppBar/AppBar.jsx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Footer from './Components/Footer/Footer';
import './Components/MyRoutes';
import MyRoutes from './Components/MyRoutes';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { address } from './assets/globalVar';

const checkLoginAddress = `http://${address}:8080/checkLogin`;
const logoutLink = `http://${address}:8080/logout`;
const getClienteUrl = `http://${address}:8080/getCliente`;
const getRistoratoreUrl = `http://${address}:8080/getRistoratore`;
const allRestaurantsUrl= `http://${address}:8080/getRistoranti`; 

export default function App(props) {

  const [accessToken, setAccessToken] = useState(localStorage.getItem("Auth Token"));
  const [userLogged, setUserLogged] = useState({});
  const [cliente, setCliente] = useState({});
  const [ristoratore, setRistoratore] = useState({});
  const [allRestaurant, setAllRestaurant] = useState([]);
    

  const parseResponseCliente = res => {
      if(res.status === 200) {
        res.json().then(result => setCliente(result['cliente']));
      }
      else {
          console.log("Errore durante caricamento dati cliente");
              res.json().then(result => console.log(result));
      }
  }

  const opzioniCliente = {
      method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Authorization': accessToken
        }
    };

    const parseResponseRistoratore = res => {
      if(res.status === 200) {
        res.json().then(result => setRistoratore(result['ristoratore']));
      }
      else {
          console.log("Errore durante caricamento dati ristoratore");
              res.json().then(result => console.log(result));
      }
  }

  const opzioniRistoratore = {
      method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Authorization': accessToken
        }
    };

  //provo a vedere se il mio token per il login è valido
  const fetchData = () => {
    if(accessToken === "")
        setUserLogged({});
    else {
        fetch(checkLoginAddress, req_options)
          .then(res => parseResult(res)); 
         
    }
  }

  useEffect(() => {
        if(accessToken === null)
            setAccessToken("");   
    }, []);

  useEffect(() => {
    fetchData()

    fetch(getClienteUrl, opzioniCliente)
      .then(res => parseResponseCliente(res));

    fetch(getRistoratoreUrl, opzioniRistoratore)
      .then(res => parseResponseRistoratore(res));

    fetch(allRestaurantsUrl)
        .then((res) => res.json())
        .then((result) => setAllRestaurant(result),
              (error) => console.log("Error fetching all restaurant"));

  }, [accessToken]);

    //useEffect(fetchData, [accessToken]);

    const req_options = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Authorization': accessToken
        }
    };

  //controllo la risposta del server dopo il tentativo di login
  const parseResult = res => { 
    if(res.status === 200) {
          res.json().then(result => setUserLogged(result['user']));
      }
      else if(res.status === 5000 && accessToken != "") {
          //In questo caso il token non nullo che ho salvato non è valido e devo rifare l'accesso
          setUserLogged({});
          saveToken("");
      }
      else {
          console.log("Errore durante il login da app js:")
          res.json().then((val) => console.log(val));
          setUserLogged({});
          saveToken("");
      }
  }

  const saveToken = (token) => {
      localStorage.setItem("Auth Token", token);
      setAccessToken(token);
  } 


  const logoutOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Authorization': accessToken
    }
  }

  const doLogout = () => {
      fetch(logoutLink, logoutOptions);
        setUserLogged({});
        saveToken("");
  }

  return (
    <BrowserRouter>
      <div className='app'>
        <AppBar accessToken={accessToken} setAccessToken={saveToken} setUserLogged={setUserLogged} userLogged={userLogged} doLogout={doLogout}/> 
        <MyRoutes accessToken={accessToken} setAccessToken={saveToken} doLogout={doLogout}
                  userLogged={userLogged} fetchProfile={fetchData} cliente={cliente} ristoratore={ristoratore} allRestaurant={allRestaurant}/>
        <div className='footer'>
            <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
}

