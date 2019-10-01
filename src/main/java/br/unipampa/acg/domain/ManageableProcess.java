package br.unipampa.acg.domain;

import br.unipampa.acg.utils.ProcessManagement;
import com.fasterxml.jackson.annotation.JsonView;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import br.unipampa.acg.utils.View;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter @Setter
public abstract class ManageableProcess implements Serializable
{
    @Id
    @GeneratedValue (strategy = GenerationType. IDENTITY)
    @JsonView (View. Standard. class)
    private long id;
    protected long process = -1;
    
    public abstract String [] getCommand ();
    
    public void start ()
    {
        long pid;
        if ((pid = this. getProcess ()) != -1)      // Se outro processo estiver
            ProcessManagement. killProcess (pid);   // executando, finaliza ele.
        
        this. setProcess (ProcessManagement. startProcess (this. getCommand ()));
    }
    
    public void kill ()
    {
        long pid;
        if ((pid = this. getProcess ()) != -1)
            ProcessManagement. killProcess (pid);
        
        this. setProcess (-1);
    }
}
