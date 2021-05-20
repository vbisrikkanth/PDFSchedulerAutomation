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
        pause(); 
        /* 
            let filename='BulkUpload.png';
        const cwd = process.cwd();
        const filePathAttachment = path.join(cwd, '/output/', filename);
        await I.say(filePathAttachment);
        await I.saveScreenshot(filename,true);
        
        var bufferData = await fs.readFileSync(filePathAttachment);
        await allure.addAttachment(filename,bufferData,'image/png');

        await I.click('//button[contains(text(),"New Schedule")]');
        const editschedulename='//h2[text()="Untitled"]//parent::div//following-sibling::div/div[@class="cursor-pointer"]';
        await I.waitForVisible(editschedulename,process.env.WAIT_LONG);
        await I.click(editschedulename);
        await I.fillField('//input[@placeholder="Schedule Name"]',"Schedule_Saravana");
        await I.click('//div[@title="Start Date Calendar"]');
        await I.click('//abbr[@aria-label="May 19, 2021"]');
        await I.click('//div[contains(text(),"+ Add Bulk Recipient")]');
       
        await I.wait(5);        
        
        //Will work for only Input element File Upload
        await I.attachFile('//input[@type="file"]','./abc.csv');
        await I.wait(5);
        
        await I.clickbutton(); */
        //pause();        
    });

});

 /* Scenario('test something in parallel', async({ I }) => {
    await I.loginInPDFScheduler();    
    await I.click('//button[contains(text(),"New Schedule")]');
    await I.wait(5);
    let filename='NewSchedule';
    await I.saveScreenshot(filename,true);
    await allure.addAttachment(filename,new Buffer(filename),'png');
});
      */