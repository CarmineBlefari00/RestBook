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
import CardRecensioni from '../../Components/CardRecensioni/CardRecensioni'; 
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from 'react-select';
import { useLocation} from "react-router-dom";
import { address } from '../../assets/globalVar';

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

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGVvc3BvcnRlbGxpIiwiYSI6ImNsYXYzMmJqbDAxdXQzcm1wZjBkbW53ZHcifQ.4xFih1yVT6FkB5q3f-cJKQ';
const Restaurant = (props) => {

    const [startDate, setStartDate] = useState(new Date());

    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(16.24157048264637);
    const [lat, setLat] = useState(39.35334881289762);
    const [zoom, setZoom] = useState(12.5);

    const location = useLocation();
    const usernameRistoratore = location.state;

    const [ristorante, setRistorante] = useState({});

    useEffect(() => {
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

  function apriMenu(){
    window.open(ristorante.linkMenu)
  }

  return (
    
    <div>
        <div class="infoRestaurant">
          <div class="column-1 boxInfoRestaurant">
            <img src={image} className="image" alt="imageRestaurant"></img>
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
                <OwlCarousel className="owl-theme" {...options}
                  items={3}      
                  nav  
                  margin={-120}>
                  <CardRecensioni /> <CardRecensioni /> <CardRecensioni /> <CardRecensioni /><CardRecensioni /> <CardRecensioni /> <CardRecensioni /> <CardRecensioni /> 
                </OwlCarousel>
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
                      <Select id="starRecensione" options={starRecensione} placeholder="Valuta..." className="selectStar"/>
                        <textarea className="corpoRecensione" placeholder="Scrivi la tua recensione qui..."></textarea>
                    </div>
                </div>
                <div className="invioMessaggio">
                    <button className="inviaRecensione" type="submit" style={{backgroundColor: "#854D27", border:"none", width:"200px"}}>Invia</button>
                </div>
            </div>
        </div>
      </div>

  )
}

export default Restaurant;