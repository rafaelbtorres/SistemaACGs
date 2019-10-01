package br.unipampa.acg.utils;

import br.unipampa.acg.domain.ManageableProcess;
import br.unipampa.acg.domain.Acg;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class DatabaseConnection
{
    //... Singleton Configuration.
    private DatabaseConnection () {}
    private static DatabaseConnection instance = new DatabaseConnection ();
    public  static DatabaseConnection instance () { return instance; }
    
    //... Manage Open Sessions.
    List <Session> sessions = new ArrayList <> ();
    
    //... Database Connection Methods.
    private SessionFactory sf;
    
    public void connect (String hibCfg)
    {
        Logger. getLogger ("org.hibernate"). setLevel (Level.ALL);
        
        Configuration cfg = new Configuration ();
        cfg. configure (hibCfg);
        cfg. addAnnotatedClass (ManageableProcess. class);
        cfg. addAnnotatedClass (Acg. class);
        this. sf = cfg. buildSessionFactory (new StandardServiceRegistryBuilder (). applySettings (cfg. getProperties ()). build ());
    }
    
    public Session openSession ()
    {
        Session session = this. sf. openSession ();
        this. sessions. add (session);
        return session;
    }
    
    public void closeSession (Session session)
    {
        this. sessions. remove (session);
        session. close ();
    }
    
    public void closeSessions ()
    {
        this. sessions. forEach (
            (session) ->
            {
                session. close ();
            }
        );
        this. sessions = new ArrayList <> ();
    }
    
    public void close () { this. sf. close (); }
}
