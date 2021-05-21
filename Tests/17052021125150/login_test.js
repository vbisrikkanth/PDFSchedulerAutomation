const { event } = require('codeceptjs');
const log = require('../../config/logging').default;
const allure = codeceptjs.container.plugins('allure');
const fs = require('fs');
const path =require('path');

Feature('login');

BeforeSuite(async ({ I }) => {
  
}) 


AfterSuite(async ({ I }) => {
  
});

Before( async ({I})=>{
   
    
    })
After(async ({I})=>{
	
       
    })
    
    var TestName;
    var FeatureName;
  
   
    event.dispatcher.on(event.test.before, async (test) => {
        TestName=test.title;
       })
    
    event.dispatcher.on(event.suite.before, async (suite) => {
        FeatureName = suite.title;
    })


Scenario('test something', async({ I }) => {
    session('adminmode',async () => {
        await I.loginInPDFScheduler(); 
        await I.addNewSchedule();        
        //pause(); 
    });

});

 /* Scenario('test something in parallel', async({ I }) => {
    await I.loginInPDFScheduler();    
    await I.click('//button[contains(text(),"New Schedule")]');
    await I.wait(5);
});
      */