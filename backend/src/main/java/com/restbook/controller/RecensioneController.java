package com.restbook.controller;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.restbook.dao.RecensioneDao;
import com.restbook.dao.RecensioneDaoJDBC;
import com.restbook.dao.RistoratoreDaoJDBC;
import com.restbook.dao.UserDaoJDBC;
import com.restbook.model.Recensione;
import com.restbook.model.Ristoratore;
import com.restbook.model.User;

@RestController
@CrossOrigin(origins = {"*"})
public class RecensioneController {
	
	

  @PostMapping("/createRecensione")
  public JSONObject createRecensione(@RequestBody JSONObject body, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
      JSONObject resp = new JSONObject();
      try {

          String utente = (String) body.get("utente");
          String ristorante = (String) body.get("ristorante");
          Recensione recensione= RecensioneDaoJDBC.getInstance().getRecensione(utente, ristorante);
          if(recensione != null) {
              response.setStatus(Protocol.CLIENTE_ALREADY_EXISTS);
              resp.put("msg", "Recensione già esistente");
              return resp;
          } else {
              Recensione newRecensione = new Recensione();
              newRecensione.setUtente(utente);
              newRecensione.setRistorante(ristorante);
              newRecensione.setRecensione((String) body.get("recensione"));
              newRecensione.setVoto((String) body.get("voto"));
              String immagine= (String) body.get("immagine");
              byte[] img = Base64.getDecoder().decode(immagine.split(",")[1].getBytes("UTF-8"));
              newRecensione.setImmagine(img);
              RecensioneDaoJDBC.getInstance().insertRecensione(newRecensione);
              response.setStatus(Protocol.OK);
              resp.put("msg", "Ristoratore creato con successo");

              return resp;
          }


      } catch (IllegalArgumentException | NullPointerException e2) {
          response.setStatus(Protocol.INVALID_DATA);
          resp.put("msg", "the portfolio name is not valid");

          return resp;
      }
      
	  
  }
  @PostMapping("/getRecensioni")
  public List<Recensione> getRecensioni(@RequestBody JSONObject body, HttpServletRequest request, HttpServletResponse response) throws SQLException {
      List <Recensione> list = RecensioneDaoJDBC.getInstance().getRecensioniRistorante((String) body.get("ristorante"));
      System.out.println(list.size());
      return list;
  }
  @PostMapping("/deleteRecensione")
  public JSONObject deleteRecensione(@RequestBody JSONObject body, HttpServletRequest request, HttpServletResponse response) throws SQLException {
      RecensioneDaoJDBC.getInstance().DeleteRecensione((String) body.get("utente"),(String) body.get("ristorante"));
      JSONObject resp = new JSONObject();
      response.setStatus(Protocol.OK);
      resp.put("msg", "Recensione eleminata con successo");
      return resp;
  }
}
