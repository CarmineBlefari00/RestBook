import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./ProfiloCliente.css";
import { address } from "../../assets/globalVar";
import { useState } from 'react';
import scaleImage from './ImageConverter.js';
import Select from 'react-select';
import { AddressAutofill } from '@mapbox/search-js-react';

const updateAvatarUrl = `http://${address}:8080/updateUserAvatar`;
const updateProfileUrl = `http://${address}:8080/updateUserEmail`;
const updatePasswordUrl = `http://${address}:8080/updateUserPassword`;
const updateNumeroUrl = `http://${address}:8080/updateNumeroCliente`;
const updateIndirizzoUrl = `http://${address}:8080/updateIndirizzoCliente`;
const updateIntolleranzeUrl = `http://${address}:8080/updateIntolleranzeCliente`;
const resetAvatarUrl = `http://${address}:8080/resetUserAvatar`;

const intolleranzeTesto = [
    { value: 'Lattosio', label: 'Lattosio' },
    { value: 'Glutine', label: 'Glutine' },
    { value: 'Nickel', label: 'Nickel' },
    { value: 'Favismo', label: 'Favismo' },
  ]

function isEmptyObject(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)){
            return false;
        }
    }

    return true;
}

const NameAndImage = (props) => {
    const [image, setImage] = useState(null);
    const [dropdownImageActive, setDropdownImageActive] = useState(false);
    const inputImage = useRef(null);
    
    //se cambia l'immagine, la posto al backend
    useEffect(() => {
        if(image !== null)
            updateAvatar();

    }, [image]);

    const onChangeImage = () => {
        inputImage.current.click();
    }

    const handleOnChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            convertToBase64(e.target.files[0]);
        }
        setDropdownImageActive(false);
    }

    const convertToBase64 = (file) => {
        scaleImage(file, setImage, () => props.showError("Impossibile caricare l'immagine, per favore riprova!", "form"));
    }

    const getProfilePic = () => {
        if(props.user.avatar === null)
            return require("../../Images/avatar.png");
        else
            return "data:image/png;base64," + props.user.avatar;
    }

    const updateAvataroptions = {
        method: 'POST',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'image': image
        })
    }

    const updateAvatar = () => {
        fetch(updateAvatarUrl, updateAvataroptions)
            .then(res => {
                if(res.status === 200) {
                    console.log("Immagine profilo cambiata con successo!");
                    props.fetchProfile();
                }
            });
    }

    const resetAvatar = () => {
        fetch(resetAvatarUrl, resetAvatarOptions)
            .then(res => {
                if(res.status === 200) {
                    console.log("Immagine profilo rimossa con successo!");
                    props.fetchProfile();
                }
            });
    }

    const resetAvatarOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        }
    }

    const onDeleteImage = () => {
        resetAvatar();
        setDropdownImageActive(false);
    }

  
    return (
        <div className='name-image-container'>
            <ul className='name-image-list'>
                <div className='image-pencil-container' >
                    <input type="file" ref={inputImage} style = {{display: 'none'}} onChange={(e) => handleOnChange(e)} />
                    <img src={getProfilePic()} className='account-image' />
                    <img src={require("../../Images/edit.png")} className='pencil' onClick={() => setDropdownImageActive(!dropdownImageActive)}/>
                </div>
                <div className='usernameAndTipologia'>
                    <p className='account-big-name'>{props.user.username}</p>
                    <p className='account-small-tipologia'>{props.user.tipologiaUtente}</p>
                </div>
                {dropdownImageActive === true && (
                    <div className='dropdown-edit-image'>
                        <ul className='dropdown-edit-image-list'>
                            <p className='dropdown-edit-image-item' onClick={onChangeImage} >Cambia immagine</p>
                            <p className='dropdown-edit-image-item' onClick={onDeleteImage}> Cancella immagine</p>
                        </ul>
                    </div>
                )}
            </ul>
        </div>
    );
}

const AccountInfo = (props) => {
    const [emailEditable, setEmailEditable] = useState(false);
    const [emailInputField, setEmailInputField] = useState(props.user.email);
    const [numeroEditable, setNumeroEditable] = useState(false);
    const [numeroInputField, setNumeroInputField] = useState(props.cliente.numero);
    const [indirizzoEditable, setIndirizzoEditable] = useState(false);
    const [indirizzoInputField, setIndirizzoInputField] = useState(props.cliente.indirizzo);
    const [intolleranzeEditable, setIntolleranzeEditable] = useState(false);
    const [intolleranzeInputField, setIntolleranzeInputField] = useState([]);
   
    useEffect(() => {   
        if(props.user && props.user.email != undefined)
            setEmailInputField(props.user.email);
        if(props.cliente && props.cliente.numero != undefined)
            setNumeroInputField(props.cliente.numero);
        if(props.cliente && props.cliente.indirizzo != undefined)
            setIndirizzoInputField(props.cliente.indirizzo);
        if(props.cliente && props.cliente.intolleranze != undefined)
            setIntolleranzeInputField(props.cliente.intolleranze);
    }, [props.user, props.cliente]);

    const isCharacterALetter = (char) => {
        return (/[a-zA-Z]/).test(char)
    }

    const checkEmailConstraints = (ev) => {
        const key = ev.key;
        const total = ev.target.value;

        if(key === " ") {
            ev.preventDefault();
            return;
        }

        if(key === '@'){
            if(total.includes("@")) {
                ev.preventDefault();
                return;
            }
        }

        if(isNaN(key) && !isCharacterALetter(key) && key !== '@' && key !== '.'){
            ev.preventDefault();
            return;
        }
    }

    const checkAccountInfoConstraints = () => {
        if(emailInputField === "") {
            props.showError("Errore! Campo email vuoto", "form");
            return false;
        }

        return true;
    }

    const checkEmail = (mail) => {
        return mail.match(/^[a-zA-Z0-9\\.]+@[a-z]+[\\.]{1}[a-z]+$/);
    }

    const checkNumero = (numero) => {
        return numero.match(/^(([+]|00)39)?((3[1-6][0-9]))(\d{7})$/);
    }

    const updateOptions = {
        method: 'POST',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            'email': emailInputField
        })
    }

    const updateInfoOptions = {
        method: 'POST',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'numero': numeroInputField
        })
    }

    const updateIndirizzoOptions = {
        method: 'POST',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'indirizzo': indirizzoInputField
        })
    }

    const updateIntolleranzeOptions = {
        method: 'POST',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'intolleranze': intolleranzeInputField
        })
    }

    const parseResponse = res => {
        if(res.status === 200) {
            props.showError("Email aggiornata con successo!", 'form');
            props.fetchProfile();
        }
        if(res.status === 5020) 
            props.showError("Email non valida, per favore riprova", 'form');
        if(res.status === 500)
            props.showError("Errore server! Per favore riprova più tardi", 'form');
    }

    const parseResponseNumero = res => {
        if(res.status === 200) {
            props.showError("Numero aggiornato con successo!", 'form');
            props.fetchProfile();
        }
        if(res.status === 5020) 
            props.showError("Numero non valido, per favore riprova", 'form');
        if(res.status === 500)
            props.showError("Errore server! Per favore riprova più tardi", 'form');
    }

    const parseResponseIntolleranze = res => {
        if(res.status === 200) {
            props.showError("Intolleranze aggiornate con successo!", 'form');
            props.fetchProfile();
        }
        if(res.status === 5020) 
            props.showError("Numero non valido, per favore riprova", 'form');
        if(res.status === 500)
            props.showError("Errore server! Per favore riprova più tardi", 'form');
    }

    const parseResponseIndirizzo = res => {
        if(res.status === 200) {
            props.showError("Indirizzo aggiornato con successo!", 'form');
            props.fetchProfile();
        }
        if(res.status === 5020) 
            props.showError("Indirizzo non valido, per favore riprova", 'form');
        if(res.status === 500)
            props.showError("Errore server! Per favore riprova più tardi", 'form');
    }

    const updateProfileInfo = () => {
        if(checkAccountInfoConstraints() === false)
            return;
        if(!checkEmail(emailInputField)) {
            props.showError("Errore! l'email non è valida, per favore riprova", 'form');
            return
        }    

        setEmailEditable(false);

        fetch(updateProfileUrl, updateOptions)
            .then(res => parseResponse(res));
    }

    const updateNumero = () => {   
        if(numeroInputField === "") {
            props.showError("Errore! Campo numero vuoto", "form");
            return;
        }
        
        if(!checkNumero(numeroInputField)) {
            props.showError("Errore! il numero non è valido, per favore riprova", 'form');
            return
        }   

        setNumeroEditable(false);
        fetch(updateNumeroUrl, updateInfoOptions)
            .then(res => parseResponseNumero(res));
       
    }

    const updateIntolleranze = () => {   
        if(intolleranzeInputField === "") {
            props.showError("Errore! Campo intolleranze vuoto", "form");
            return;
        }
    
        setIntolleranzeEditable(false);
        fetch(updateIntolleranzeUrl, updateIntolleranzeOptions)
            .then(res => parseResponseIntolleranze(res));
       
    }

    const updateIndirizzo = () => {   
        if(indirizzoInputField === "") {
            props.showError("Errore! Campo indirizzo vuoto", "form");
            return;
        }

        setIndirizzoEditable(false);
        fetch(updateIndirizzoUrl, updateIndirizzoOptions)
            .then(res => parseResponseIndirizzo(res));
       
    }

    function refreshPage(){
        window.location.reload(true);
    }

    const handleSelect = (e) => {
        setIntolleranzeInputField(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(intolleranzeInputField)
    }

    return (
        <div className='paper-black-account-settings'>
            <div className='properties-container'>
                <div className='property-container'>
                    <p className='property-title'>Nome</p>
                    <p className='property-content'> {props.user.nome} </p>
                </div>

                <div className='property-container'>
                    <p className='property-title'>Email</p>
                    <ul className="property-list">
                        {emailEditable  
                            ? <input type="text" className='property-content-editable' value={emailInputField} onChange={(e)=>setEmailInputField(e.target.value)} onKeyPress={(ev) => checkEmailConstraints(ev)} /> 
                            : <p className='property-content'> {emailInputField} </p>
                        }
                        <div className="property-spacer" />
                        {!props.user.googleUser && (
                            <p className="edit-button" onClick={() => setEmailEditable(!emailEditable)}>{emailEditable ? 'Cancella' : 'Modifica'}</p>
                        )}
                    </ul>
                </div>

                <div className='property-container'>
                    <p className='property-title'>Numero</p>
                    <ul className="property-list">
                        {numeroEditable  
                            ? <input type="text" className='property-content-editable' value={numeroInputField} onChange={(e)=>setNumeroInputField(e.target.value)}/> 
                            : <p className='property-content'> {numeroInputField} </p>
                        }
                        <div className="property-spacer" />
                        
                        <p className="edit-button" onClick={() => setNumeroEditable(!numeroEditable)}>{numeroEditable ? 'Cancella' : 'Modifica'}</p>
                        
                    </ul>
                </div>

              <div className='property-container'>
                    <p className='property-title'>Indirizzo</p>
                    
                    <ul className="property-list">
                    
                        {indirizzoEditable     
                            ? <div style={{width:"100%"}}> 
                                 <form>
                                    <AddressAutofill accessToken='pk.eyJ1IjoibWF0dGVvc3BvcnRlbGxpIiwiYSI6ImNsYXYyeXFxZzAxdWkzdm4xZXA4MjVnb3MifQ.DcpAqyz3eiVyF69ebTEyUA'> 
                                        <input name="address" className='property-content-editable' autoComplete="address-line1"  value={indirizzoInputField} onChange={(e) => setIndirizzoInputField(e.target.value)}/> 
                                    </AddressAutofill> 
                                 </form>
                               </div>
                            : <p className='property-content'> {indirizzoInputField} </p>
                        }
                    
                        <div className="property-spacer" />
                        <p className="edit-button" onClick={() => setIndirizzoEditable(!indirizzoEditable)}> {indirizzoEditable ? 'Cancella' : 'Modifica'} </p>

                    </ul>
                 
                </div>  

                <div className='property-container'>
                    <p className='property-title'>Intolleranze alimentari</p>
                    <ul className="property-list">
                        {intolleranzeEditable  
                            ? <Select id="intolleranze" className='property-content-editable' isMulti options={intolleranzeTesto} onChange={handleSelect} value={intolleranzeTesto.filter(obj => intolleranzeInputField.includes(obj.value))} placeholder="Tipologia intolleranze..."/>
                            : <p className='property-content'> {intolleranzeInputField} </p>
                        }
                        <div className="property-spacer" />
                        <p className="edit-button" onClick={() => setIntolleranzeEditable(!intolleranzeEditable)}>{intolleranzeEditable ? 'Cancella' : 'Modifica'}</p>
                    </ul>
                </div>

                <div className='property-container'>
                    <p className='property-title'>Password</p>
                    <ul className="property-list">
                        <input type="password" defaultValue={"cryptoview"} className='password-content'/>
                        <div className="property-spacer" />
                        {!props.user.googleUser && (
                            <p className='edit-button' onClick={props.enablePasswordEdit}> Modifica </p>
                        )}
                    </ul>
                    {props.passwordEditable === true &&
                        <EditPasswordPopup 
                            disablePasswordEdit={props.disablePasswordEdit} 
                            popupErrorLabelActive={props.popupErrorLabelActive}
                            getErrorLabelClassname = {props.getErrorLabelClassname}
                            showError = {props.showError}
                            errorMessage = {props.errorMessage}
                            accessToken = {props.accessToken}
                            showResultPopup={props.showResultPopup}
                        />
                    }
                </div>
            </div>

            {emailEditable === true &&(
                <div className='save-button' onClick={() => updateProfileInfo()} > Salva </div>
            )}
            {numeroEditable === true &&(
                <div className='save-button' onClick={() => {updateNumero(); refreshPage();}} > Salva </div>
            )}
            {indirizzoEditable === true &&(
                <div className='save-button' onClick={() => {updateIndirizzo(); refreshPage();}} > Salva </div>
            )}
            {intolleranzeEditable === true &&(
                <div className='save-button' onClick={() => {updateIntolleranze(); refreshPage();}} > Salva </div>
            )}

            {props.formErrorLabelActive === true && (
                <div className={props.getErrorLabelClassname()}>
                    <p>{props.errorMessage}</p>
                </div>
            )}
       
        </div>
        
    );
}

const EditPasswordPopup = (props) => {

    const [oldPasswordInputField, setOldPasswordInputField] = useState("");
    const [newPasswordInputField, setNewPasswordInputField] = useState("");
    const [confirmNewPasswordInputField, setConfirmNewPasswordInputField] = useState("");

    const checkPasswordConstraints = () => {

        if(oldPasswordInputField === "" || newPasswordInputField === "" || confirmNewPasswordInputField === "") {
            props.showError("Errore! Alcuni campi sono vuoti", "popup");
            return false;
        }

        if(newPasswordInputField !== confirmNewPasswordInputField) {
            props.showError("La nuova password non corrisponde", "popup");
            return false;
        }

        if(!newPasswordInputField.match(/^(?=.*\d)(?=.*[@.?#$%^&+=!])(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
        {
            props.showError("Errore! Per favore controlla i campi e riprova", "popup");
            return false;
        }
    
        return true;
    }

    const updateOptions = {
        method: 'POST',
        headers: {
            'Authorization': props.accessToken,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            'old_password':  oldPasswordInputField,
            'new_password': newPasswordInputField
        })
    }

    const parsePasswordResponse = res => {
        if(res.status === 200) {
            props.showError("Password aggiornata con successo!", 'form');
            props.disablePasswordEdit();
        }
        if(res.status === 5020) 
            props.showError("Errore! Caratteri password non validi, per favore riprova", 'popup');
        if(res.status === 500)
            props.showError("Errore server! per favore riprova più tardi", 'popup');
        if(res.status === 401)
            props.showError("Errore! La vecchia password non corrisponde, per favore riprova", 'popup');
    }

    const handleConfirmPassword = () => {
        if(checkPasswordConstraints() === false)
            return;
        
        fetch(updatePasswordUrl, updateOptions)
            .then(res => parsePasswordResponse(res));
    }

    return (
        <div className="background-blurrer">
            <div className='edit-password-popup'>
                <ul className='edit-password-list'> 

                    <div className='edit-password-label-field-wrapper'>
                        <ul className='edit-password-label-field'>
                            <p className='password-label'>Vecchia password</p>
                            <input type="password" className='password-content-editable' onChange={(e)=> setOldPasswordInputField(e.target.value)}/>
                        </ul>
                    </div>

                    <div className='edit-password-label-field-wrapper'>
                        <ul className='edit-password-label-field'>
                            <p className='password-label'>Nuova password</p>
                            <input type="password" className='password-content-editable' onChange={(e)=> setNewPasswordInputField(e.target.value)}/>
                        </ul>
                    </div>

                    <div className='edit-password-label-field-wrapper'>
                        <ul className='edit-password-label-field'>
                            <p className='password-label'>Conferma nuova password</p>
                            <input type="password" className='password-content-editable' onChange={(e)=> setConfirmNewPasswordInputField(e.target.value)}/>
                        </ul>
                    </div>
                </ul>
                <p className='popup-confirm popup-btn' onClick={()=>handleConfirmPassword()} > Conferma password</p>
                <p className='popup-cancel popup-btn' onClick={props.disablePasswordEdit}> Cancella </p>

                {props.popupErrorLabelActive === true && (
                    <div className={props.getErrorLabelClassname()}>
                        <p>{props.errorMessage}</p>
                    </div>
                )}

            </div>
        </div>
    );
}

const ProfiloCliente = (props) => {
    const navigate = useNavigate();
    const [passwordEditable, setPasswordEditable] = useState(false);
    const [formErrorLabelActive, setFormErrorLabelActive] = useState(false);
    const [popupErrorLabelActive, setPopupErrorLabelActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
        
        if(props.accessToken === "" && isEmptyObject(props.userLogged))
            navigate("/login");

    }, [props.userLogged]);

    const enablePasswordEdit = () => {
        setPasswordEditable(true);
    }

    const disablePasswordEdit = () => {
        setPasswordEditable(false);
    }

    const getErrorLabelClassname = () => {
        if(formErrorLabelActive || popupErrorLabelActive)
            return "error-label label-active";
        else
            return "error-label";
    }

    const showError = (msg, label) => {
        if(label === "form") {
            setFormErrorLabelActive(true);
            setErrorMessage(msg);
            setTimeout(() => {setFormErrorLabelActive(false); setErrorMessage("")}, 3500);
        }
        else if(label === "popup") {
            setPopupErrorLabelActive(true);
            setErrorMessage(msg);
            setTimeout(() => {setPopupErrorLabelActive(false); setErrorMessage("")}, 3500);
        } 
    }

    return(
        <div className="profile">
            <div className='paper-gray-account-settings'>
                <div className='paper-black-container'>
                    <div className='account-settings-wrapper'>
                        <NameAndImage
                           user={props.userLogged}
                           accessToken={props.accessToken}
                           fetchProfile={props.fetchProfile}
                           showError = {showError}
                           showResultPopup={props.showResultPopup}
                        />
                        
                        <AccountInfo 
                            user={props.userLogged}
                            cliente={props.cliente}
                            passwordEditable={passwordEditable}
                            enablePasswordEdit={enablePasswordEdit}
                            disablePasswordEdit = {disablePasswordEdit}
                            accessToken={props.accessToken}
                            fetchProfile={props.fetchProfile}
                            showResultPopup={props.showResultPopup}

                            formErrorLabelActive = {formErrorLabelActive}
                            popupErrorLabelActive = {popupErrorLabelActive}
                            getErrorLabelClassname = {getErrorLabelClassname}
                            showError = {showError}
                            errorMessage = {errorMessage}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfiloCliente;
