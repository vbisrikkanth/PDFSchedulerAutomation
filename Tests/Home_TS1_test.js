const { I } = inject();

const loginPage = require('../pages/loginPage');
const { appURL } = require('../pages/appURL');
const assert = require('assert');
const Selector = require('testcafe');
const log = require('../config/logging').default;
const { fstat } = require('fs');
const fs=require('fs');
const allure = codeceptjs.container.plugins('allure');

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}



Feature("Home");
BeforeSuite(async ({ I }) => {
    log.info('=============Feature: Home =============');
    I.say('I navigate to application base URL');    
    I.loginToPowerBI(process.env.PRO_USER,process.env.PRO_PASSWORD); 
    I.amOnPage(appURL.XPS_SANITY_URL);
    I.waitForVisible(loginPage.iFrame, process.env.WAIT_LONG);
    I.resizeWindow('maximize','maximize');    
    I.click(loginPage.moreOptions)
    I.click(locate(loginPage.editOption).withText('Edit'))
    I.switchTo(loginPage.iFrame);
    
})

Before( ({I})=>{
    log.info('Test Started ....  '+I.name);
    
    })
After(({I})=>{
        log.info('Test Ended ....  '+I.name);
    })

    
Scenario('TS1',async({I})=>{
    I.say('Hi');
    //I.selectCell(cells.firstValue);
    I.Home_Bold();
});

