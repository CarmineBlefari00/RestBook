import React ,  { useRef, useEffect, useState } from "react";
import './Restaurant.css'
import image from '../../Images/Hops.jpg';
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventTable from '../../Components/EventTable/EventTable'
import {IonIcon} from '@ionic/react';
import {heart, heartOutline} from 'ionicons/icons';
import scaleImage from '../ProfiloRistoratore/ImageConverter.js';
import CardRecensioni from '../../Components/CardRecensioni/CardRecensioni'; 
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from 'react-select';
import { useLocation} from "react-router-dom";
import { address } from '../../assets/globalVar';
import Rating from '@mui/material/Rating';
import { Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import axios from 'axios';

//Owl Carousel Settings
const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  autoplay: false,
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      200: {
          items: 1,
      },
      600:{
          items: 1,
      },
      700: {
          items: 2,
      },
      1080: {
          items: 1,
      },
      1500:{
        items: 2,
      },
      1920: {
        items: 2,
    }
  },
};

const starRecensione = [
  { value: '1', label: '1 stella' },
  { value: '2', label: '2 stelle' },
  { value: '3', label: '3 stelle' },
  { value: '4', label: '4 stelle' },
  { value: '5', label: '5 stelle' },
]

const getRistoratoreUrl = `http://${address}:8080/getRistoranteFromUsername`;
const sendRecensioneUrl = `http://${address}:8080/createRecensione`;
const getRecensioniUrl = `http://${address}:8080/getRecensioni`;

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGVvc3BvcnRlbGxpIiwiYSI6ImNsYXYzMmJqbDAxdXQzcm1wZjBkbW53ZHcifQ.4xFih1yVT6FkB5q3f-cJKQ';
const Restaurant = (props) => {

    const [startDate, setStartDate] = useState(new Date());

    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(16.24157048264637);
    const [lat, setLat] = useState(39.35334881289762);
    const [zoom, setZoom] = useState(12.5);

    const location = useLocation();
    const usernameRistoratore = location.state[0];
    const nomeRistorante = location.state[1];
    const [image, setImage] = useState(null);
    const [dropdownImageActive, setDropdownImageActive] = useState(false);
    const inputImage = useRef(null);
    const [testoRecensione,setTestoRecensione]= useState(false);
    const [ristorante, setRistorante] = useState({});
    const [voto,setVoto]=useState(false);
    const [recensioni, setRecensioni] = useState([]);
    const [errorLabelActive, setErrorLabelActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmLabelActive, setConfirmLabelActive] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    useEffect(() => {

      console.log(nomeRistorante);
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/matteosportelli/clav4qklj005m14nkhjdwekur',
        center: [lng, lat],
        zoom: zoom
      });

      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });

      return () => map.remove();

     
    }, []);
    
    const rendiPreferito = event =>{
      document.getElementById("cuore").style.display="none";
      document.getElementById("cuorePieno").style.display="block";
      event.preventDefault();
    }

    const eliminaPreferito = event =>{
      document.getElementById("cuore").style.display="block";
      document.getElementById("cuorePieno").style.display="none";
      event.preventDefault();
    }

  const parseResponseRistoratore = res => {
    if(res.status === 200) {
      res.json().then(result => setRistorante(result['ristoratore']));
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
            'Authorization': usernameRistoratore
        }
    };

useEffect(() => {
    fetch(getRistoratoreUrl, opzioniRistoratore)
      .then(res => parseResponseRistoratore(res));
    
  }, []);  
  const onChangeImage = () => {
    inputImage.current.click();
}

  function apriMenu(){
    window.open(ristorante.linkMenu)
  }
  function setValue(val){
    setVoto(val);
  }

//-------------------
//Error Handling
const showError = (msg) => {
  setErrorLabelActive(true);
  setErrorMessage(msg);
  setTimeout(() => {setErrorLabelActive(false); setErrorMessage("")}, 3500);
}
const showConfirm = (msg) => {
  setConfirmLabelActive(true);
  setConfirmMessage(msg);
  setTimeout(() => {setConfirmLabelActive(false); setConfirmMessage("")}, 3500);
}
const getErrorLabelClassname = () => {
  if(errorLabelActive)
      return "error-label label-active";
  else
      return "error-label";
}
const getConfirmLabelClassname = () => {
  if(confirmLabelActive)
      return "error-label label-active";
  else
      return "error-label";
}
//-------------------------------------------------------------
//RECENSIONI

const handleOnChange = (e) => {  //SALVATAGGIO IMMAGINE RECENSIONE
  if(e.target.files && e.target.files[0]) {
      convertToBase64(e.target.files[0]);
  }
  setDropdownImageActive(false);
}

const convertToBase64 = (file) => { // PARSING IMMAGINE
  scaleImage(file, setImage, () => props.showError("Impossibile caricare l'immagine, per favore riprova!", "form"));
}

const insertRecensioneoptions = { // JSON DA INVIARE A BACKEND
  method : 'POST',
  headers: { 
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'utente': props.userLogged.username,
    'ristorante': nomeRistorante,
    'recensione' : testoRecensione,
    'voto': voto.toString(),
    'immagine' : image,
}),
}
function getImage(){
  if (image==null){
    return null;
  }
  else{
    return image;
  }
}
useEffect(() => { //FUNZIONE CHE RICHIAMA LA VISUALIZZAZIONE DELLE RECENSIONI
  // N.B. SE IL RISTORANTE NON VIENE CARICATO QUESTA FUNZIONE DA PROBLEMI E RITORNA NULL
 //console.log(ristorante?.nome);
 getRecensioni()
}, []);

const getRecensionioptions = { //JSON DA INVIARE A BACKEND PER OTTENERE RECENSIONI RISTORANTE
  method : 'POST',
  headers: { 
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'ristorante': nomeRistorante
}),
}
  const getRecensioni = () => {
   fetch(getRecensioniUrl, getRecensionioptions)
      .then((res) => {
          if(res.status === 200) {
            res.json().then(result => setRecensioni(result));
          }
      });
}
function getText  (testo) {
  setTestoRecensione(testo);
}
const getProfilePic = (im) => {
  if(im === null)
      return require("../../Images/avatar.png");
  else
      return "data:image/png;base64," + im;
}

const aggiungiRecensione = () => {
  fetch(sendRecensioneUrl, insertRecensioneoptions)
      .then(res => {
          if(res.status === 200) {
              console.log("recensione correttamente pubblicata");
              props.fetchProfile();
              setTestoRecensione("");
              setValue(2);
              showConfirm("la recensione è stata correttamente pubblicata");
          }
          else
           showError("Qualcosa è andato storto nella pubblicazione della recensione, ricontrolla i campi inseriti");
      });
}




  return (
    
    <div>
        <div class="infoRestaurant">
          <div class="column-1 boxInfoRestaurant">
            <img src={image} className="image" alt="Restaurant"></img>
          </div>
          <div class="column-2 box2">

            <button className="heartButton" onClick={rendiPreferito}> <IonIcon id="cuore" className="heart1" icon={heartOutline}> </IonIcon> </button>
            <button className="heartButton" onClick={eliminaPreferito}> <IonIcon id="cuorePieno" className="heart2" icon={heart} style={{display:"none"}}> </IonIcon> </button>
            
            <p className="titleRestaurant"> <b> {ristorante.nome} </b></p>
            <p className="descriptionRestaurantTitle"> <b> <i> Chi siamo? </i> </b> </p>
            <p className="descriptionRestaurant"> {ristorante.descrizione} </p>
            <div className="contatti">
              <p> <b>CONTATTI: </b></p>
                <div className="contatti2">
                  <p className="telefono" id="telefono">Telefono: {ristorante.numero}</p>
                  <p className="indirizzo" id="indirizzo"> Indirizzo: {ristorante.indirizzo}</p>
                    <div className='map-container' ref={mapContainerRef} />
                </div>
            </div>
          </div>

          <div class="column-2 box2">
            <p className="titleRestaurant"> <b>Strumenti </b></p>

            <div className="strumenti">
              <button className="buttonMenu" onClick={apriMenu}> Apri menù </button>
              <label className="intolleranzeLabel"> Intolleranze: </label>
              <p style={{marginTop:"10px"}}> {ristorante.intolleranze}</p>
              <div className="cardRecensioni">
                <label style={{color:"black"}}> Recensioni </label>
                <div className='item-container'>
                  {recensioni.length != 0 && (
                <OwlCarousel className="owl-theme" {...options}
                  items={3}      
                  nav  
                  margin={-120}> 
                   {recensioni?.map((recensione) => (
                    
                    <CardRecensioni testo={recensione.recensione} userLogged={props.userLogged.username} ristoratore={usernameRistoratore} voto={recensione.voto} immagine={getProfilePic(recensione?.immagine)} utente={recensione.utente} ristorante={recensione.ristorante}/>
                    
                    ))}
                    
                </OwlCarousel>
                )}
                </div>
              </div>
            </div>
          </div>
      </div>

        <div className="body">
          <div className="calendario"> 
            <h2 className="prenota"> Prenota il tuo tavolo: </h2>
            <DatePicker className="dataPicker" selected={startDate} onChange={(date=Date) => setStartDate(date)} />
          </div>
            <EventTable/>
            <EventTable/>
            <EventTable/>
            <EventTable/>
            <EventTable/>
        </div>
        <div className="recensioniContainer">
        
          <label className="recensioni"> Aggiugi una recensione </label>
            <div className="contactForm">
                <div className="messaggio">
                    <div className="textArea">
                    <Typography component="legend"></Typography>
                        <Rating
                          name="size-large"
                          value={voto}
                          size="large"
                          onChange={(newValue)=>{
                            setValue(newValue.target.value);
                          }
                        }
                        />
                        <textarea className="corpoRecensione" onChange={(e) => getText(e.target.value)} placeholder="Scrivi la tua recensione qui..."></textarea>
                        <br></br>
                        <input type="file" ref={inputImage} accept=".jpg, .png, .jpeg" style={{backgroundColor: "#854D27", border:"none", width:"400px",borderRadius:"5px"  }} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>
                {errorLabelActive === true && (
                <div className={getErrorLabelClassname()}>
                    <p style={{backgroundColor: "#C41E3A",borderRadius:"5px",width:"400px"}}>{errorMessage}</p>
                </div>
            )}
            {confirmLabelActive === true && (
                <div className={getConfirmLabelClassname()}>
                    <p style={{backgroundColor: "#008000",borderRadius:"5px",width:"400px"}}>{confirmMessage}</p>
                </div>
            )}
                <div className="invioMessaggio">
                    <button className="inviaRecensione" onClick={aggiungiRecensione} type="submit" style={{backgroundColor: "#854D27", border:"none", width:"200px"}}>Invia</button>
                </div>
            </div>
        </div>
      </div>

  )
}

export default Restaurant;