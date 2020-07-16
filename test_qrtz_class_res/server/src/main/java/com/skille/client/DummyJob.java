package com.skille.client;


import org.quartz.*;

public class DummyJob implements InterruptableJob {

    public void execute(JobExecutionContext context) throws JobExecutionException {
        System.out.println("Hello");
        try {
            Thread.sleep(50000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("done");
    }

    public void interrupt() throws UnableToInterruptJobException {
        System.out.println("exited");
    }
}