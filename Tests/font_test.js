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
const allure = codeceptjs.container.plugins('allure');

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}

let hint;

Feature("Font Tests");
BeforeSuite(async ({ I }) => {
    log.info('=============Feature: Font Tests =============');
    I.say('I navigate to application base URL');    
    I.loginToPowerBI(process.env.PRO_USER,process.env.PRO_PASSWORD); 
    I.amOnPage(appURL.XPS_SANITY_URL);
    I.waitForVisible(loginPage.iFrame, process.env.WAIT_LONG);
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

Scenario('Verify the font as bold',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnBold();
    I.verifyFontAsBold(cells.firstValue);
    I.clickOnBold();
    I.verifyFontAsNormal(cells.firstValue);
    I.clearSelection(cells.firstValue);
    I.saveScreenshot('FontBold.png');
    allure.addAttachment('Hi There',new Buffer("FontBold.png"),'png');

});
/*

Scenario('Verify the font as Italics',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnItalics();
    I.verifyFontStyleAsItalics(cells.firstValue);
    I.clickOnItalics();
    I.verifyFontStyleAsNormal(cells.firstValue);
    I.clearSelection(cells.firstValue);

});

Scenario('Verify the font as Family ',async({I})=>{
    I.selectCell(cells.firstValue);
    I.selectFontFamily();
    I.verifyFontFamily(cells.firstValue,'Tahoma');
    I.selectFontFamilyDefault();
    I.verifyFontFamilyAsNormal(cells.firstValue);
    I.clearSelection(cells.firstValue);

});


Scenario('Verify the font as Size via Dropdown',async({I})=>{
    I.selectCell(cells.firstValue);
    I.selectFontSize16();
    I.verifyFontSize(cells.firstValue);
    I.selectFontSizeDefault();
    I.verifyFontSizeDefault(cells.firstValue);
    I.clearSelection(cells.firstValue);

});

Scenario('Verify the font as Size via Text Increase Button',async({I})=>{
    I.selectCell(cells.firstValue);
    I.increaseFontSize();
    I.verifyFontSize(cells.firstValue);
    I.decreaseFontSize();
    I.verifyFontSizeDefault(cells.firstValue);
    I.clearSelection(cells.firstValue);

});
*/