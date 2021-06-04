const { event } = require('codeceptjs');
const log = require('../../config/logging').default;
const allure = codeceptjs.container.plugins('allure');
const fs = require('fs');
const path =require('path');
const schedulePage = require('../../pages/schedulesPage')
const webAction = require('../../utils/webUtils')

Feature('Smoke1');

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


Scenario('TC01_Validate_Login', async({ I }) => {
    session('valqtestuserSession',async () => {
        log.info('TC01_Validate_Login in valqtestuserSession started')
        await I.loginInPDFScheduler();
        await I.waitForVisible(schedulePage.selectWorkspace,process.env.WAIT_LONG)
        await webAction.clickTheElement(schedulePage.pdfSchedulerWS)
        await I.seeElement(schedulePage.scheduleTitle)
        //await I.storescreenshot('SchedulePage')
        
    });
});

Scenario('TC02_Validate_AllSideMenuIsClickable', async({ I }) => {
    session('valqtestuserSession',async () => {
        log.info('TC02_Validate_AllSideMenuIsClickable in valqtestuserSession started')
        await I.loginInPDFScheduler();
        await I.waitForVisible(schedulePage.selectWorkspace,process.env.WAIT_LONG)
        await webAction.clickTheElement(schedulePage.pdfSchedulerWS)
        await schedulePage.chooseFromSideMenuInDashboard('Schedules')
        //await I.storescreenshot('SchedulePage')
        await I.seeElement(schedulePage.scheduleTitleh2)
        await schedulePage.chooseFromSideMenuInDashboard('Jobs')
        //await I.storescreenshot('JobsPage')
        await I.seeElement(schedulePage.jobTitleh2)
        await schedulePage.chooseFromSideMenuInDashboard('Home')
        //await I.storescreenshot('HomePage')
        await I.seeElement(schedulePage.scheduleTitleh2)
        await schedulePage.chooseFromSideMenuInDashboard('Users')
        //await I.storescreenshot('UsersPage')
        await I.seeElement(schedulePage.userTitleh2)
        await schedulePage.chooseFromSideMenuInDashboard('Settings')
        //await I.storescreenshot('SettingsPage')
        await I.seeElement(schedulePage.userTitleh2)
    });
});

Scenario('TC03_SortingInSchedulePage', async({ I }) => {
    session('valqtestuserSession',async () => {
        log.info('TC03_SortingInSchedulePage in valqtestuserSession started')
        await I.loginInPDFScheduler();
        await I.waitForVisible(schedulePage.selectWorkspace,process.env.WAIT_LONG)
        await webAction.clickTheElement(schedulePage.pdfSchedulerWS) 
        await I.waitForVisible(schedulePage.scheduleTitle,process.env.WAIT_LONG)
        await schedulePage.chooseFromSideMenuInDashboard('Schedules')
        //Ascending Check
        await schedulePage.clickTableTitles('NAME')
        await I.wait(2)
        await schedulePage.checkForSorting('NAME','ascending')
        //Descending Check
        await schedulePage.clickTableTitles('NAME')
        await I.wait(2)
        await schedulePage.checkForSorting('NAME','descending')
        //DefaultCheck
        await schedulePage.clickTableTitles('NAME')        
        //Ascending Check
        await schedulePage.clickTableTitles('OWNER') 
        await I.wait(2)
        await schedulePage.checkForSorting('OWNER','ascending')        
        //Descending Check
        await schedulePage.clickTableTitles('OWNER')
        await I.wait(2)
        await schedulePage.checkForSorting('OWNER','descending')
        //DefaultCheck
        await schedulePage.clickTableTitles('OWNER')        
        //Ascending Check
        await schedulePage.clickTableTitles('STATUS')        
        //Descending Check
        await schedulePage.clickTableTitles('STATUS')        
        //DefaultCheck
        await schedulePage.clickTableTitles('STATUS')
        

    });
});

Scenario('TC04_AddANewSchedule', async({ I }) => {
    session('valqtestuserSession',async () => {
        log.info('TC04_SearchingInSchedulePage in valqtestuserSession started')
        await I.loginInPDFScheduler();
        await I.waitForVisible(schedulePage.selectWorkspace,process.env.WAIT_LONG)
        await webAction.clickTheElement(schedulePage.pdfSchedulerWS) 
        await schedulePage.chooseFromSideMenuInDashboard('Schedules')
        await schedulePage.addnewSchedule('Schedule_A')
        await schedulePage.chooseDate('June 4, 2021', 'start')
        await schedulePage.chooseDate('June 5, 2021', 'end')
        await schedulePage.chooseTime('08', '05', 'PM')
        const emailIds = ['sabareeshr@vbi.com', 'saravanan@vbi.com']
        await schedulePage.enterEmailInPlaceholder(...emailIds)
        await schedulePage.enterEmailSubject('HIIIII')
        await schedulePage.enterEmailBody('Welcomeeee')
        //await I.storescreenshot('BulkUpload');
    });
});