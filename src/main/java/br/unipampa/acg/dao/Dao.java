package br.unipampa.acg.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;

import br.unipampa.acg.utils.DatabaseConnection;

import java.sql.PreparedStatement;
import java.util.List;
import org.hibernate.Query;
public class Dao <T>
{
    private Session session = null;
    private Transaction tx;
    
    public Dao ()
    {
        this. session = DatabaseConnection. instance (). openSession ();
    }
    
    public <T> List<T> loadAllData(Class<T> type) {
        
        Query qry = session.createQuery("from Solicitacao s");
        List l = qry.list();
        
        
        return l;
    }
    
    public void close ()
    {
        this. session. close ();
    }
    
    public void persist (T obj)
    {
        if (session != null)
        {
            Transaction tr = session. beginTransaction ();
            session. persist (obj);
            tr. commit ();
        }
    }
    
    public void save (T obj)
    {
        if (session != null)
        {
            Transaction tr = session. beginTransaction ();
            session. merge (obj);
            tr. commit ();
        }
    }
    
    
       public void delete (T obj)
    {
        if (session != null)
        {
            Transaction tr = session. beginTransaction ();
            session. delete(obj);
            tr. commit ();
        }
    }
    
    
    public <T> T load (Class <T> type, long id)
    {
        T obj = null;
        if (session != null)
        {
            obj = session. load (type, id);
        }
        return obj;
    }

    public void oldupdate (T obj)
    {
        if (session != null)
        {
            Transaction tr = session. beginTransaction ();
            session. update(obj);
            tr. commit ();
        }
    }
    public void update(T obj){
        try {
            session.update(obj);
            tx.commit();
        } catch (NullPointerException e) {
            System.out.println(e);;
        }
    }
}
