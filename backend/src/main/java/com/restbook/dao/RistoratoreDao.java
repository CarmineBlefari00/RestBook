package com.restbook.dao;

import com.restbook.model.Ristoratore;

import java.sql.SQLException;
import java.util.List;

public abstract  class RistoratoreDao implements Dao<Ristoratore> {

    public abstract List<Ristoratore> getAll() throws SQLException;
    public abstract void save(Ristoratore obj) throws SQLException;
    public abstract Ristoratore get(String usernameRistoratore) throws SQLException;
    public abstract void updateDescrizioneRistorante(Ristoratore ristorante, String descrizione) throws SQLException;
    public abstract void updateIndirizzoRistorante(Ristoratore ristorante, String indirizzo) throws SQLException;
    public abstract void updateNumeroRistorante(Ristoratore ristorante, String numero) throws SQLException;
    public abstract void updateIntolleranzeRistoratore(Ristoratore ristoratore, String intolleranze) throws SQLException;
    public abstract void updateLinkMenuRistorante(Ristoratore ristorante, String linkMenu) throws SQLException;
    public abstract void updateFileMenu(byte[] fileMenu, Ristoratore ristorante) throws SQLException;
    public abstract void updateCopertinaRistorante(byte[] copertina, Ristoratore ristorante) throws SQLException;

}
