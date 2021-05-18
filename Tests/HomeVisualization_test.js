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

Feature("Home Visualization Tests");
BeforeSuite(async ({ I }) => {
    log.info('=============Feature: Home Visualization Tests =============');
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

/*
Scenario('Home_Visualization_BarChart',async({I})=>{    
    I.selectCell(cells.HeaderOne);
    I.clickbarChart(); 
    const res1=await I.verifybarChartDisplay('293.00');  
    I.saveScreenshot('BarChart.png');
    allure.addAttachment('BarChart',new Buffer("BarChart.png"),'png');  
    I.doVisualRegression('Home_Visualization_BarChart','General') 
    if(res1==='fail')
    I.assert(true,false,'Bar Chart display validation failed');      
    I.clickshowAsNumbers();
    I.clearSelection(cells.HeaderOne);  
    I.clickOnSpecificArea(toolBar.HomeTab.Common.displaygrid);  
    
});



Scenario('Home_Visualization_PinChart',async({I})=>{    
    I.selectCell(cells.HeaderOne);
    I.clickPinChart(); 
    const res1=await I.verifyPinChartDisplay('293.00');  
    I.saveScreenshot('PinChart.png');
    allure.addAttachment('PinChart',new Buffer("PinChart.png"),'png');  
    I.clickshowAsNumbers();
    if(res1==='fail')
    I.assert(true,false,'Pin Chart display validation failed'); 
    I.clearSelection(cells.HeaderOne);  
    I.clickOnSpecificArea(toolBar.HomeTab.Common.displaygrid);
    
});

*/
Scenario('Home_Visualization_LollipopChart',async({I})=>{    
    I.selectCell(cells.HeaderOne);
    I.clickLollipopChart(); 
    const res1=await I.verifyLollipopChartDisplay('293.00');  
    I.saveScreenshot('LollipopChart.png');
    allure.addAttachment('LollipopChart',new Buffer("LollipopChart.png"),'png');  
    I.clickshowAsNumbers();
    if(res1==='fail')
    I.assert(true,false,'Lollipop Chart display validation failed'); 
    I.clearSelection(cells.HeaderOne); 
    I.clickOnSpecificArea(toolBar.HomeTab.Common.displaygrid); 
});

/*
Scenario('Home_Visualization_WaterFall',async({I})=>{    
    I.selectCell(cells.HeaderOne);
    I.clickWaterFallChart(); 
    I.verifyWaterFallChartDisplay('293.0');  
    I.saveScreenshot('PinChart.png');
    allure.addAttachment('PinChart',new Buffer("PinChart.png"),'png');  
    I.clickshowAsNumbers();
    I.clearSelection(cells.HeaderOne);  
});



Scenario('Home_Visualization_WaterflowChart',async({I})=>{    
    I.selectCell(cells.HeaderOne);
    I.clickWaterflowChart(); 
    const res1=await I.verifyWaterflowChartDisplay('293.0');  
    I.saveScreenshot('ContinousWaterFlowChart.png');
    allure.addAttachment('ContinousWaterFlowChart',new Buffer("ContinousWaterFlowChart.png"),'png');  
    I.clickshowAsNumbers();
    if(res1==='fail')
    I.assert(true,false,'Water Flow Chart display validation failed'); 
    I.clearSelection(cells.HeaderOne);  
});
*/