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

Feature("Home Format Tests");
BeforeSuite(async ({ I }) => {
    log.info('=============Feature: Home Format Tests =============');
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

 
Scenario('Home_Format_LeftAlign',async({I})=>{    
    I.selectCell(cells.firstValue);
    I.clickAlignment('left')
    const res=await I.verifyTextAlignment(cells.CellOneOne,'left');
    I.saveScreenshot('LeftAlignment.png');
    allure.addAttachment('LeftAlignment',new Buffer("LeftAlignment.png"),'png');   
    I.clearSelection(cells.firstValue); 
    if(res==='fail')
    I.assert(true,false,'Left Alignment failed');
});



Scenario('Home_Format_CenterAlign',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickAlignment('center');
    const res=await I.verifyTextAlignment(cells.CellOneOne,'center');
    I.saveScreenshot('CenterAlignment.png');
    allure.addAttachment('CenterAlignment',new Buffer("CenterAlignment.png"),'png');  
    I.clearSelection(cells.firstValue) ;
    if(res==='fail')
    I.assert(true,false,'Center Alignment failed');
});


Scenario('Home_Format_RightAlign',async({I})=>{
    I.selectCell(cells.firstValue);
    I.clickAlignment('right')
    const res=await I.verifyTextAlignment(cells.CellOneOne,'right');
    I.saveScreenshot('RightAlignment.png');
    allure.addAttachment('RightAlignment',new Buffer("RightAlignment.png"),'png');  
    I.clearSelection(cells.firstValue);  
    if(res==='fail')
    I.assert(true,false,'Right Alignment failed');
});




Scenario('Home_Format_Hide_Show',async({I})=>{
    
    I.selectCell(cells.firstValue);
    I.clickShowHide();
    const res=await I.verifyTextHideShow(cells.firstValue,'hide');
    I.saveScreenshot('Hide.png');
    allure.addAttachment('Hide',new Buffer("Hide.png"),'png');  
    if(res==='fail')
    I.assert(true,false,'Hide failed');
    I.clickShowHide();
    const res1=await I.verifyTextHideShow(cells.firstValue,'show');
    I.saveScreenshot('Show.png');
    allure.addAttachment('Show',new Buffer("Show.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Show failed');
    I.clearSelection(cells.firstValue);  


});



Scenario('Home_Format_Percentage',async({I})=>{    
    I.selectCell(cells.firstValue);
    I.clickPercentage();
    const res=await I.verifyValue(cells.firstValue,'29,300,000.00%');
    I.saveScreenshot('Percentage.png');
    allure.addAttachment('Percentage',new Buffer("Percentage.png"),'png');  
    if(res==='fail')
    I.assert(true,false,'Value comparison failed');
    I.clickPercentage();    
    const res1=await I.verifyValue(cells.firstValue,'293.00'); 
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed'); 
    I.clearSelection(cells.firstValue);  
});



Scenario('Home_Format_Add_PrefixSuffix',async({I})=>{    
    I.selectCell(cells.firstValue);
    I.clickPrefixSuffix();
    I.EnterPrefix('$');
    I.EnterSuffix('TH');
    I.clickPrefixSuffixApply();
    const prefixres=await I.verifyValue(cells.prefixValue,'$');  
    const suffixres=await I.verifyValue(cells.suffixValue,'293.00TH');   
    I.saveScreenshot('PrefixSuffix.png');
    allure.addAttachment('PrefixSuffix',new Buffer("PrefixSuffix.png"),'png');
    if(prefixres==='fail'||suffixres==='fail')
    I.assert(true,false,'Value comparison failed'); 
    I.clickPrefixSuffix();
    I.EnterPrefix('');   
    I.EnterSuffix('');
    I.clickPrefixSuffixApply();   
    const res1=await I.verifyValue(cells.firstValue,'293.00'); 
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');
    I.clearSelection(cells.firstValue);  
});


Scenario('Home_Format_Scaling_Thousand',async({I})=>{    
    I.selectCell(cells.firstValue);
    I.clickScalingDropDown();
    I.selectScaling('Thousand');
    const res1=await I.verifyValue(cells.firstValue,'293.00k');    
    I.saveScreenshot('ScalingThousand.png');
    allure.addAttachment('ScalingThousand',new Buffer("ScalingThousand.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');
    I.clearSelection(cells.firstValue);  
});



Scenario('Home_Format_Scaling_Million',async({I})=>{    
    I.selectCell(cells.Cell_1_2);
    I.clickScalingDropDown();
    I.selectScaling('Million');
    const res1=await I.verifyValue(cells.Cell_1_2,'0.36m');    
    I.saveScreenshot('Million.png');
    allure.addAttachment('Million',new Buffer("Million.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');
    I.clearSelection(cells.Cell_1_2);  
});


Scenario('Home_Format_Scaling_Billion',async({I})=>{    
    I.selectCell(cells.Cell_2_6);
    I.clickScalingDropDown();
    I.selectScaling('Billion');
    const res1=await I.verifyValue(cells.Cell_2_6,'0.00b');    
    I.saveScreenshot('Billion.png');
    allure.addAttachment('Billion',new Buffer("Billion.png"),'png'); 
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed'); 
    I.clearSelection(cells.Cell_2_6);  
});



Scenario('Home_Format_Scaling_Trillion',async({I})=>{    
    I.selectCell(cells.Cell_2_1);
    I.clickScalingDropDown();
    I.selectScaling('Trillion');
    const res1=await I.verifyValue(cells.Cell_2_1,'0.00t');    
    I.saveScreenshot('Trillion.png');
    allure.addAttachment('Trillion',new Buffer("Trillion.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed'); 
    I.clearSelection(cells.Cell_2_1);  
});

Scenario('Home_Format_Scaling_None',async({I})=>{    
    I.selectCell(cells.Cell_3_1);
    I.clickScalingDropDown();
    I.selectScaling('None');
    const res1=await I.verifyValue(cells.Cell_3_1,'233,000.00');    
    I.saveScreenshot('None.png');
    allure.addAttachment('None',new Buffer("None.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed'); 
    I.clearSelection(cells.Cell_3_1);  
});



Scenario('Home_Format_Increase_Decrease_Decimal',async({I})=>{    
    I.selectCell(cells.Cell_10_9);
    I.clickIncreaseDecimal(1);
    const res1=await I.verifyValue(cells.Cell_10_9,'152.000');    
    I.saveScreenshot('IncreaseDecimal.png');
    allure.addAttachment('IncreaseDecimal',new Buffer("IncreaseDecimal.png"),'png'); 
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');  
    I.clickDecreaseDecimal(1)
    const res2=await I.verifyValue(cells.Cell_10_9,'152.00');    
    I.saveScreenshot('DecreaseDecimal.png');
    allure.addAttachment('DecreaseDecimal',new Buffer("DecreaseDecimal.png"),'png'); 
    if(res2==='fail')
    I.assert(true,false,'Value comparison failed'); 
    I.clearSelection(cells.firstValue); 
    
});





Scenario('Home_Format_NumberFormatting_Unified',async({I})=>{    
    I.selectCell(cells.Cell_10_1);
    I.clickNumberFormattingDropDown();
    I.selectNumberFormatting('Unified');    
    const res1=await I.verifyValue(cells.Cell_10_1,'196.00');  
    I.saveScreenshot('NumberFormatting_Default.png');
    allure.addAttachment('NumberFormatting_Default',new Buffer("NumberFormatting_Default.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');  
    I.clearSelection(cells.Cell_10_1);  
});



Scenario('Home_Format_NumberFormatting_IBCS',async({I})=>{    
    I.selectCell(cells.Cell_10_1);
    I.clickNumberFormattingDropDown();
    I.selectNumberFormatting('IBCS');    
    const res1=await I.verifyValue(cells.Cell_10_1,'196.0');  
    I.saveScreenshot('NumberFormatting_IBCS.png');
    allure.addAttachment('NumberFormatting_IBCS',new Buffer("NumberFormatting_IBCS.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');  
    I.clearSelection(cells.Cell_10_1);  
});


Scenario('Home_Format_NumberFormatting_Flexible',async({I})=>{    
    I.selectCell(cells.Cell_10_1);
    I.clickNumberFormattingDropDown();
    I.selectNumberFormatting('Flexible');    
    const res1=await I.verifyValue(cells.Cell_10_1,'196.00k');  
    I.saveScreenshot('NumberFormatting_Flexible.png');
    allure.addAttachment('NumberFormatting_Flexible',new Buffer("NumberFormatting_Flexible.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');  
    I.clearSelection(cells.Cell_10_1);  
});



Scenario('Home_Format_NumberFormatting_Native',async({I})=>{    
    I.selectCell(cells.Cell_10_1);
    I.clickNumberFormattingDropDown();
    I.selectNumberFormatting('Native');    
    const res1=await I.verifyValue(cells.Cell_10_1,'196000');  
    I.saveScreenshot('NumberFormatting_Native.png');
    allure.addAttachment('NumberFormatting_Native',new Buffer("NumberFormatting_Native.png"),'png');  
    if(res1==='fail')
    I.assert(true,false,'Value comparison failed');  
    I.clearSelection(cells.Cell_10_1);  
});


/*
Scenario('Home_Format_Increase_Decrease_Indent',async({I})=>{    
    I.selectCell(cells.CellOneFiveDivSpanSpan);
    I.clickIncreaseIndent(1);
    I.verifyIndent(cells.CellOneFiveDivSpanSpan,'padding-left: 10px');    
    I.saveScreenshot('IncreaseIndent.png');
    allure.addAttachment('IncreaseIndent',new Buffer("IncreaseIndent.png"),'png');  
    I.clickDecreaseIndent(1)
    I.verifyIndent(cells.CellOneFiveDivSpanSpan,'padding-left: 0px');    
    I.saveScreenshot('DecreaseIndent.png');
    allure.addAttachment('DecreaseIndent',new Buffer("DecreaseIndent.png"),'png'); 
    I.clearSelection(cells.CellOneFiveDivSpanSpan);  
});

*/