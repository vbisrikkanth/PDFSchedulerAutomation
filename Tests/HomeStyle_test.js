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

Feature("Home Style Tests");
BeforeSuite(async ({ I }) => {
    log.info('=============Feature: Home Style Tests =============');
    I.say('I navigate to application base URL');    
    I.loginToPowerBI(process.env.PRO_USER,process.env.PRO_PASSWORD); 
    I.amOnPage(appURL.XPS_SANITY_URL);
    I.waitForVisible(loginPage.iFrame, process.env.WAIT_LONG);
    I.resizeWindow('maximize','maximize');
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

    
    
Scenario('Home_Style_Normal_to_Bold',async({I})=>{
  
    I.selectCell(cells.firstValue);
    I.clickOnBold();
    I.verifyFontAsBold(cells.firstValue);
    I.saveScreenshot('FontBold.png');
    allure.addAttachment('Font Bold',new Buffer("FontBold.png"),'png');
    I.clickOnBold();
    I.verifyFontAsNormal(cells.firstValue);
    I.saveScreenshot('FontNormal_1.png');
    allure.addAttachment('Font Normal',new Buffer("FontNormal_1.png"),'png');
    I.clearSelection(cells.firstValue);

});


Scenario('Home_Style_Normal_to_Italics',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnItalics();
    I.verifyFontStyleAsItalics(cells.firstValue);
    I.saveScreenshot('FontItalics.png');
    allure.addAttachment('Font Italics',new Buffer("FontItalics.png"),'png');
    I.clickOnItalics();
    I.verifyFontStyleAsNormal(cells.firstValue);
    I.saveScreenshot('FontNormal_2.png');
    allure.addAttachment('Font Normal',new Buffer("FontNormal_2.png"),'png');
    I.clearSelection(cells.firstValue);

});


Scenario('Home_Style_Normal_to_Bold_Italics',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnBold();
    I.clickOnItalics();
    I.verifyFontAsBold(cells.firstValue);   
    I.verifyFontStyleAsItalics(cells.firstValue);
    I.saveScreenshot('FontBoldItalics.png');
    allure.addAttachment('Font Bold Italics',new Buffer("FontBoldItalics.png"),'png');
    I.clickOnBold();
    I.verifyFontAsNormal(cells.firstValue);
    I.clickOnItalics();    
    I.verifyFontStyleAsNormal(cells.firstValue);
    I.saveScreenshot('FontNormal_3.png');
    allure.addAttachment('Hi There',new Buffer("FontNormal_3.png"),'png');
    I.clearSelection(cells.firstValue);
});



Scenario('Home_Style_Change_FillColor',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnFillColordropdown();
    I.clickOnFontColor('#d64550');
    I.verifyFillcolor(cells.CellOneOne,'rgb(214, 69, 80)');
    I.saveScreenshot('FillColor.png');
    allure.addAttachment('Fill Color',new Buffer("FillColor.png"),'png');
    I.clickOnFillColordropdown();
    I.clickOnResettoDefault()
    I.verifyFillcolor(cells.CellOneOne,'rgb(204, 204, 204)');
    I.saveScreenshot('FillColor_ResettoDefault.png');
    allure.addAttachment('Fill Color Reset to Default',new Buffer("FillColor_ResettoDefault.png"),'png');
    I.clickOnFillColordropdown();
    I.clickOnFontColor('#ffffff');
    I.clearSelection(cells.firstValue);
}); 

Scenario('Home_Style_Change_FontColor',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnFontColordropdown();
    I.clickOnFontColor('#e66c37');
    I.verifyFontcolor('rgb(230, 108, 55)');
    I.saveScreenshot('FontColor.png');
    allure.addAttachment('Font Color',new Buffer("FontColor.png"),'png');
    I.clickOnFontColordropdown();
    I.clickOnResettoDefault()
    I.verifyFontcolor('rgb(0, 0, 0)');
    I.saveScreenshot('FontColor_ResettoDefault.png');
    allure.addAttachment('Font Color Reset to Default',new Buffer("FontColor_ResettoDefault.png"),'png');
    I.clearSelection(cells.firstValue);
});


Scenario('Home_Style_Change_FontColor_FillColor',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickOnFillColordropdown();
    I.clickOnFontColor('#12239e');
    I.verifyFillcolor(cells.CellOneOne,'rgb(18, 35, 158)');
    I.clickOnFontColordropdown();
    I.clickOnFontColor('#ffffff');
    I.verifyFontcolor('rgb(255, 255, 255)');

    I.saveScreenshot('FillColor_FontColor.png');
    allure.addAttachment('FillColor_FontColor',new Buffer("FillColor_FontColor.png"),'png');

    I.clickOnFillColordropdown();
    I.clickOnResettoDefault()
    I.verifyFillcolor(cells.CellOneOne,'rgb(204, 204, 204)');
    I.clickOnFontColordropdown();
    I.clickOnResettoDefault()
    I.verifyFontcolor('rgb(0, 0, 0)');

    I.saveScreenshot('FillColor_FontColor_ResettoDefault.png');
    allure.addAttachment('FillColor_FontColor Reset to Default',new Buffer("FillColor_FontColor_ResettoDefault.png"),'png');
    
    I.clickOnFillColordropdown();
    I.clickOnFontColor('#ffffff');
    I.clearSelection(cells.firstValue);
}); 



Scenario('Home_Style_HeaderOrientation_Horizontal',async({I})=>{
    I.selectCell(cells.HeaderOne);
    I.clickHeaderOrientationOptions();
    I.clickHeaderOrientationHorizontal();
    I.verifyHeaderOrientationHorizontal(cells.HeaderOneSpanChild);    
    I.saveScreenshot('OrientationHorizontal.png');
    allure.addAttachment('OrientationHorizontal',new Buffer("OrientationHorizontal.png"),'png');
    I.clearSelection(cells.firstValue);
});

Scenario('Home_Style_HeaderOrientation_Vertical',async({I})=>{
    I.selectCell(cells.HeaderOne);
    I.clickHeaderOrientationOptions();
    I.clickHeaderOrientationVertical();
    I.verifyHeaderOrientationVertical(cells.HeaderOneSpanChild);    
    I.saveScreenshot('OrientationVertical.png');
    allure.addAttachment('OrientationVertical',new Buffer("OrientationVertical.png"),'png');
    I.clearSelection(cells.firstValue);
});


Scenario('Home_Style_HeaderOrientation_Diagonal_TopBottom',async({I})=>{
    I.selectCell(cells.HeaderOne);
    I.clickHeaderOrientationOptions();
    I.clickHeaderOrientationDiagonalTopBottom();
    I.verifyHeaderOrientationDiagonalTopBottom(cells.HeaderOneSpanChild);    
    I.saveScreenshot('OrientationDiagonalTopBottom.png');
    allure.addAttachment('OrientationDiagonalTopBottom',new Buffer("OrientationDiagonalTopBottom.png"),'png');    
    I.clearSelection(cells.firstValue);
});



Scenario('Home_Style_HeaderOrientation_Diagonal_BottomTop',async({I})=>{
    I.selectCell(cells.HeaderOne);
    I.clickHeaderOrientationOptions();
    I.clickHeaderOrientationDiagonalBottomTop();
    I.verifyHeaderOrientationDiagonalBottomTop(cells.HeaderOneSpanChild);    
    I.saveScreenshot('OrientationDiagonalBottomTop.png');
    allure.addAttachment('OrientationDiagonalBottomTop',new Buffer("OrientationDiagonalBottomTop.png"),'png');    
    I.clearSelection(cells.firstValue);
});


Scenario('Home_Style_Increment_Decrement_FontSize',async({I})=>{
    I.selectCell(cells.firstValue);
    I.increaseFontSize();
    I.verifyFontSize(cells.firstValue);
    I.decreaseFontSize();
    I.verifyFontSizeDefault(cells.firstValue);
    I.clearSelection(cells.firstValue);
});

Scenario('Home_Style_FontSize_Change',async({I})=>{
    I.selectCell(cells.firstValue);
    I.selectFontSize16();
    I.verifyFontSize(cells.firstValue);
    I.wait(10)
    I.selectFontSizeDefault();
    I.wait(5)
    I.verifyFontSizeDefault(cells.firstValue);
    I.clearSelection(cells.firstValue);

});



Scenario('Home_Style_FontChange',async({I})=>{
    I.selectCell(cells.firstValue);
    I.selectFontFamily();
    I.verifyFontFamily(cells.firstValue,'Arial');
    I.selectFontFamilyDefault();
    I.verifyFontFamilyAsNormal(cells.firstValue);
    I.clearSelection(cells.firstValue);

});
