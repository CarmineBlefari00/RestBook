package com.restbook.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Ristoratore {

    private String usernameRistoratore;
    private String nome;
    private String descrizione;
    private String indirizzo;
    private String numero;
    private String intolleranze;
    private String linkMenu;
    private byte[] fileMenu;
    private byte[] copertina;
    public byte[] getCopertina() {
        return copertina;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCopertina(byte[] copertina) {
        this.copertina = copertina;
    }
    public byte[] getFileMenu() {
        return fileMenu;
    }
    public void setFileMenu(byte[] fileMenu) {
        this.fileMenu = fileMenu;
    }
    public String getLinkMenu() {
        return linkMenu;
    }
    public void setLinkMenu(String linkMenu) {
        this.linkMenu = linkMenu;
    }
    public String getIntolleranze() {
        return intolleranze;
    }
    public void setIntolleranze(String intolleranze) {
        this.intolleranze = intolleranze;
    }
    public String getNumero() {
        return numero;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public String getIndirizzo() {
        return indirizzo;
    }
    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }
    public String getDescrizione() {
        return descrizione;
    }
    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
    public String getUsernameRistoratore() {
        return usernameRistoratore;
    }
    public void setUsernameRistoratore(String usernameRistoratore) {
        this.usernameRistoratore = usernameRistoratore;
    }
    public static Ristoratore parseFromDB(ResultSet rs) throws SQLException {
        Ristoratore ristoratore = new Ristoratore();
        ristoratore.setUsernameRistoratore(rs.getString("username_ristoratore"));
        ristoratore.setDescrizione(rs.getString("descrizione"));
        ristoratore.setIndirizzo(rs.getString("indirizzo"));
        ristoratore.setNumero(rs.getString("numero"));
        ristoratore.setIntolleranze(rs.getString("intolleranze"));
        ristoratore.setLinkMenu(rs.getString("link_menu"));
        ristoratore.setFileMenu(rs.getBytes("file_menu"));
        ristoratore.setCopertina(rs.getBytes("copertina"));
        ristoratore.setNome(rs.getString("nome"));
        return ristoratore;
    }

}
