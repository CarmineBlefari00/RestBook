package com.restbook.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Recensione {
private String utente,ristorante,voto,recensione;
private byte[] immagine;
private int id_recensione;
public int getId_recensione() {
	return id_recensione;
}
private void setId_recensione(int id_recensione) {
	this.id_recensione = id_recensione;
}
public String getUtente() {
	return utente;
}
public void setUtente(String utente) {
	this.utente = utente;
}
public String getRistorante() {
	return ristorante;
}
public void setRistorante(String ristorante) {
	this.ristorante = ristorante;
}
public String getVoto() {
	return voto;
}
public void setVoto(String voto) {
	this.voto = voto;
}
public String getRecensione() {
	return recensione;
}
public void setRecensione(String recensione) {
	this.recensione = recensione;
}
public byte[] getImmagine() {
	return immagine;
}
public void setImmagine(byte[] immagine) {
	this.immagine = immagine;
}
public static Recensione parseFromDB(ResultSet rs) throws SQLException {
    Recensione recensione=new Recensione();
    recensione.setUtente(rs.getString("utente"));
    recensione.setRistorante(rs.getString("ristorante"));
    recensione.setVoto(rs.getString("voto"));
    recensione.setRecensione(rs.getString("recensione"));
    if (rs.getBytes("immagine") != null) {
    	recensione.setImmagine(rs.getBytes("immagine"));
    }
    return recensione;
}

}
