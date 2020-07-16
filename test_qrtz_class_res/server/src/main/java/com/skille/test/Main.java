package com.skille.test;

import com.skille.client.DummyJob;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

public class Main {
    public static void main(String[] args) {
        try {
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

            JobDetail jobDetail = newJob(DummyJob.class)
                    .withIdentity("1")
                    .build();
            Trigger trigger = newTrigger()
                    .withIdentity("1")
                    .withSchedule(CronScheduleBuilder.cronSchedule("0 * * ? * *"))
                    .build();
            scheduler.scheduleJob(jobDetail, trigger);
            scheduler.start();
            System.out.println("Scheduler Started");
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }
}
