package com.restbook.dao;

import java.util.ArrayList;

import com.restbook.model.Recensione;

public abstract class RecensioneDao {
	public abstract Recensione getRecensione(String Utente,String Ristorante);
	public abstract ArrayList<Recensione> getRecensioniRistorante(String Ristorante);
	public abstract boolean DeleteRecensione(String Utente,String Ristorante);
	public abstract boolean insertRecensione(Recensione recensione);
	
	
}
