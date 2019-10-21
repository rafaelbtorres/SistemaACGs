package br.unipampa.acg.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;

import br.unipampa.acg.utils.DatabaseConnection;

public class Dao <T>
{
    private Session session = null;
    
    public Dao ()
    {
        this. session = DatabaseConnection. instance (). openSession ();
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

    public void update (T obj)
    {
        if (session != null)
        {
            session. update(obj);
        }
    }
}
