import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './EventTable.css';
import '../../Pages/Ristorante/Restaurant';


export default function EventTable() {
  return (
    <div className='card'>
        <Card sx={{ maxWidth: "100%" }} style={{borderRadius:"20px", height:"110px"}}>
            <CardContent style={{backgroundColor: '#272B30', color: '#c5cfdb', height:"110px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  Tavolo per 2 persone
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{backgroundColor: '#272B30', color: '#c5cfdb', border: 'black', marginTop:"15px"}}>
                  Una varietà di prodotti per soddisfare tutte le vostre richieste. 
                </Typography>
              </div>
              <button type="submit" className="buttonPrenota"  style={{backgroundColor: "#854D27", border:"none", color:"white", borderRadius:"5px"}}>
                PRENOTA
              </button>
            </CardContent>

        </Card>
    </div>
  );
}
