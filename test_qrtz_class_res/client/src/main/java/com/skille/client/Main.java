package com.skille.client;

import com.mscripts.jobhandlerquartz.jobs.CleanUp;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

import java.util.Scanner;

import static org.quartz.TriggerBuilder.newTrigger;


public class Main {
    public static void main(String[] args) {
        Scheduler scheduler = null;
        Scanner scanner = new Scanner(System.in);
        try {
            scheduler = new StdSchedulerFactory().getScheduler();
            scheduler.start();
            System.out.println("Start");
            scanner.nextLine();
            System.out.println(scheduler.getSchedulerName());
            scheduler.scheduleJob(JobBuilder.newJob(CleanUp.class).build(), newTrigger().startNow().build());
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }
}

