const { I } = inject();

const loginPage = require('../pages/loginPage');
const pageURL = require('../pages/appURL');
const { appURL } = require('../pages/appURL');
const toolBar = require('../pages/toolBar');
const matrixContent = require('../pages/matrixContent');
const { cells } = require('../pages/matrixContent');
const assert = require('assert');
const Selector = require('testcafe');
const log = require('../config/logging').default;
const { fstat } = require('fs');
const allure = codeceptjs.container.plugins('allure');
const fs=require('fs')
var output_folder=''

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}

let hint;

Feature("Home Data Tests");
BeforeSuite(async ({ I }) => {
    log.info('=============Feature: Home Data Tests =============');
    I.say('I navigate to application base URL');    
    I.loginToPowerBI(process.env.PRO_USER,process.env.PRO_PASSWORD); 
    I.amOnPage(appURL.XPS_SANITY_URL);
    I.waitForVisible(loginPage.iFrame, process.env.WAIT_LONG);
    I.resizeWindow('maximize','maximize')
    //I.click(loginPage.editReport);
    I.click(loginPage.moreOptions)
    I.click(locate(loginPage.editOption).withText('Edit'))
    I.switchTo(loginPage.iFrame);
    
})
Before( ({I})=>{
    log.info('Tet Started ....  '+I.name);
    
    })
After(({I})=>{
        log.info('Tet Ended ....  '+I.name);
    })


Scenario('Home_Data_Total_InsertGrandTotal_Top',async({I})=>{    
    I.selectCell(cells.HeaderOne);
    I.clickHomeDataTotal(); 
    I.verifybarChartDisplay('293.0');  
    I.saveScreenshot('BarChart.png');
    allure.addAttachment('BarChart',new Buffer("BarChart.png"),'png');  
    I.clickshowAsNumbers();
    I.clearSelection(cells.HeaderOne);  
});
