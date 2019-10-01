package br.unipampa.acg.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ProcessManagement
{
    public static long startProcess (String ... command)
    {
        try {
            System. out.println ("Executando comando: " + command [0] + " " + command [1] + " " + command [2] + " " + command [3] + " " + command [4] + " " + command [5] + " " + command [6] + " " + command [7] + " " + command [8] + " " + command [9]);
            Runtime run = Runtime.getRuntime();
            Process pr = run.exec(command);
            
            //String line;
            //BufferedReader br = new BufferedReader (new InputStreamReader (pr. getInputStream ()));
            //while ((line = br. readLine ()) != null)
            //    System. out. println (line);
            
            return 0;// pr.pid();
        } catch (IOException ex) {
            Logger.getLogger(ProcessManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return -1;
    }
    
    public static void killProcess (long pid)
    {
        try {
            new ProcessBuilder (new String [] {"kill", "-9", String. valueOf (pid)}). start ();
            //try {
            //    new ProcessBuilder (new String [] {System. getenv ("TAESA_PROJECT_ROOT") + "\\taskkill.exe", "/F", "/PID", String. valueOf (pid)}). start ();
            //} catch (IOException ex) {
            //    Logger.getLogger(ProcessManagement.class.getName()).log(Level.SEVERE, null, ex);
            //}
        } catch (IOException ex) {
            Logger.getLogger(ProcessManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static long restartProcess (long pid, String ... params)
    {
        killProcess (pid);
        return startProcess (params);
    }
}
