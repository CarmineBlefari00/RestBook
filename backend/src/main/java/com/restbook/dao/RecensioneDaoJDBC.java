package com.restbook.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.restbook.model.Recensione;
import com.restbook.model.Ristoratore;

public class RecensioneDaoJDBC extends RecensioneDao{
	private static RecensioneDaoJDBC instance = null;
	 private RecensioneDaoJDBC(){}

	    public static RecensioneDaoJDBC getInstance() {
	        if(instance == null)
	            instance = new RecensioneDaoJDBC();

	        return instance;
	    }

	@Override
	public Recensione getRecensione(String Utente, String Ristorante) {
		String q="select * from Recensione where utente=? and ristorante=? ";
		Recensione recensione= new Recensione();
		try {
		PreparedStatement stm = DBConnection.getInstance().getConnection().prepareStatement(q);
        stm.setString(1, Utente);
        stm.setString(2, Ristorante);
        ResultSet rs = stm.executeQuery();
        if(rs.next()) {
             recensione= Recensione.parseFromDB(rs);
        }
        else {
        	return null;
        }
        rs.close();
        stm.close();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
        return recensione;
	}

	@Override
	public boolean DeleteRecensione(String Utente, String Ristorante) {
		String q="DELETE  from Recensione where utente=? and ristorante=? ";
		try {
		PreparedStatement stm = DBConnection.getInstance().getConnection().prepareStatement(q);
        stm.setString(1, Utente);
        stm.setString(2, Ristorante);
        stm.execute();
        stm.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
        return true;
	}

	@Override
	public boolean insertRecensione(Recensione recensione) {
		String q="insert into recensione values(?,?,?,?,?)";
		try {
		PreparedStatement stm = DBConnection.getInstance().getConnection().prepareStatement(q);
        stm.setString(1, recensione.getUtente());
        stm.setString(2, recensione.getRistorante());
        stm.setString(3, recensione.getVoto());
        stm.setString(4, recensione.getRecensione());
        stm.setBytes(5, recensione.getImmagine());
        stm.executeUpdate();
        stm.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
        return true;
	}

	@Override
	public ArrayList<Recensione> getRecensioniRistorante(String Ristorante) {
		String q="select * from Recensione where ristorante=? ";
		ArrayList<Recensione> recensioni= new ArrayList();
		try {
		PreparedStatement stm = DBConnection.getInstance().getConnection().prepareStatement(q);
        stm.setString(1, Ristorante);
        ResultSet rs = stm.executeQuery();
        while(rs.next()) {
        	Recensione rec=new Recensione();
             rec= Recensione.parseFromDB(rs);
             recensioni.add(rec);
        }
        rs.close();
        stm.close();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
        return recensioni;
	}

	

}
