const { event } = require('codeceptjs');
const log = require('../../config/logging').default;
Feature('login');

BeforeSuite(async ({ I }) => {
    log.info('=============Feature: login =============');
    session('adminmode', async() => {
        await I.loginInPDFScheduler();
     });
    
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
        await I.click('//button[contains(text(),"New Schedule")]');
        const editschedulename='//h2[text()="Untitled"]//parent::div//following-sibling::div/div[@class="cursor-pointer"]';
        await I.waitForVisible(editschedulename,process.env.WAIT_LONG);
        await I.click(editschedulename);
        await I.fillField('//input[@placeholder="Schedule Name"]',"Schedule_Saravana");
        await I.click('//div[@title="Start Date Calendar"]');
        await I.click('//abbr[@aria-label="May 19, 2021"]');
        await I.click('//div[contains(text(),"+ Add Bulk Recipient")]');
        await I.wait(5);        
        //await I.click('//div//p[contains(text(),"upload")]'); 
        //await I.fileupload();
        
        //Will work for only Input element File Upload
        await I.attachFile('//input[@type="file"]','./abc.csv');
        await I.wait(5);
        await I.clickbutton();
        pause();        
    });

});
    