package com.restbook.controller;

public class Protocol {

    public static final int OK = 200;
    public static final int SERVER_ERROR = 500;
    public static final int INVALID_TOKEN = 5000;
    //è per quendo le credenziali non rispettano regex, min length ecc..
    public static final int INVALID_CREDENTIALS = 403;
    public static final int INCOMPLETE_GOOGLE_LOGIN = 450;
    //la combinazione user/pass è sbagliata
    public static final int WRONG_CREDENTIALS = 401;
    public static final int USER_ALREADY_EXISTS = 409;
    public static final int USERAME_ALREADY_EXISTS = 410;
    public static final int PORTFOLIO_DOESNT_EXISTS = 5010;
    public static final int INVALID_DATA = 5020;
    public static final int TRANSACTION_ERROR = 5030;
    public static final int REMOVE_CRIPTO_ERROR = 5040;
    public static final int CLIENTE_ALREADY_EXISTS = 5050;

    //Preferences
    public static final int NO_PREFERENCES_FOUND = 6001;

    //Alerts
    public static final int ALERT_NOT_EXISTENT = 7001;
    public static final int NO_ALERTS_FOUND = 7002;

    //Tipologia
    public static final int CLIENTE = 201;
    public static final int RISTORATORE = 202;
    public static final int AMMINISTRATORE = 203;

}
