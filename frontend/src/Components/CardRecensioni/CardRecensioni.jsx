import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './CardRecensioni.css';
import '../../Pages/Ristorante/Restaurant';
import {IonIcon} from '@ionic/react';
import {star} from 'ionicons/icons';

export default function ActionAreaCard() {
  return (
    <div className='card'>
        <Card sx={{ maxWidth: "70%"}}>
          <CardActionArea>
            <CardContent style={{backgroundColor: '#272B30', color: '#c5cfdb'}}>
                <IonIcon icon={star}> </IonIcon>
                <IonIcon icon={star}> </IonIcon>
                <IonIcon icon={star}> </IonIcon>
                <IonIcon icon={star}> </IonIcon>
                <IonIcon icon={star}> </IonIcon>
              <Typography variant="body2" color="text.secondary" style={{backgroundColor: '#272B30', color: '#c5cfdb', border: 'black'}}>
                Una varietà di prodotti per soddisfare tutte le vostre richieste. 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </div>
  );
}
