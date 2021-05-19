// in this file you can append custom step methods to 'I' object
const toolBar = require("./pages/toolBar");
const assert = require('codeceptjs-assert');
const log = require('./config/logging').default;
const { helper } = require("codeceptjs");
//Below 2 lines added for POC by Saravana 
const { cells } = require('./pages/matrixContent');
const { rows } = require('./pages/matrixContent');
const allure = codeceptjs.container.plugins('allure');
const { appURL } = require('./pages/appURL');
const { loginToPowerBI } = require("./pages/loginPage");
const loginPage = require('./pages/loginPage');
//const assertions = require("./pages/assertions");
//*********************************************************** */


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}


module.exports = function () {
  return actor({
    async loginInPDFScheduler()
    {
      await this.say('I navigate to application base URL'); 
      await this.amOnPage(process.env.BASE_URL);
      await this.wait(10);
      await this.waitForText('Sign in with Microsoft');
       

      await this.click('//span[contains(text(),"Sign in with Microsoft")]');    
      await this.wait(5);
      await this.switchToNextTab();
     
      await this.waitForVisible('//button[contains(text(),"Advanced")]',process.env.WAIT_LONG);
      await this.click('//button[contains(text(),"Advanced")]');
      
      await this.click('//a[@id="proceed-link"]');
      await this.waitForVisible('//input[@type="email"]',process.env.WAIT_LONG);
      await this.fillField('//input[@type="email"]',process.env.ADMIN_USER);
      await this.click('Next');
      await this.wait(5);
      await this.waitForVisible('//input[@type="password"]',process.env.WAIT_LONG);
      await this.fillField('//input[@type="password"]',secret(process.env.ADMIN_PASSWORD));
      await this.click('Sign in');
      await this.wait(5);
      await this.click('Yes');
      await this.switchToPreviousTab();
      await this.waitForVisible('//button[contains(text(),"New Schedule")]', process.env.WAIT_LONG); 
    
    },
    async gotoMainWindow()
    {
      await this.switchTo();
    },
    async refreshBrowser()
    {
      await this.switchTo();
       var url;
      if(process.env.MODE==='PowerBI') 
      {
        url=appURL.XPS_SANITY_URL;
      }
      else if(process.env.MODE==='Normal')
      {
        url=process.env.BASE_URL;
      }
      await this.refreshthePage(url);
      await this.wait(20); 
    },

    async loginApp()
    {      
      await this.say('I navigate to application base URL');   
      if(process.env.MODE==='PowerBI') 
      {
          await this.amOnPage(appURL.XPS_SANITY_URL);
          await this.wait(10);
          const result = await tryTo(() => this.see('Comment'));
          await this.say('EditOptionShown'+result);
          if(result==false)
          {
            await this.loginToPowerBI(process.env.PRO_USER,process.env.PRO_PASSWORD); 
           // await this.amOnPage(appURL.XPS_SANITY_URL);
            await this.waitForVisible(loginPage.iFrame, process.env.WAIT_LONG);
            await this.resizeWindow('maximize','maximize');  
            await this.wait(10);
           
          }          
          await this.click(loginPage.moreOptions);
        // I.click(locate(loginPage.editOption).withText('Edit'))
          await this.click(locate(loginPage.editOption));
          await this.wait(10);
          await this.switchTo(loginPage.iFrame);
      }
      else if(process.env.MODE==='Normal')
      {
        await this.amOnPage(process.env.BASE_URL)
        await this.waitForVisible(toolBar.HomeTab.Style.italic, process.env.WAIT_LONG);
        await this.resizeWindow('maximize','maximize');    
      }
    },

    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.
    async loginToPowerBI(email, password) {
      //const result = await tryTo(() => this.see('Comment'));
      
     // await this.say(result);
     // if(result==false)
     // {
      //await this.amOnPage('https://app.powerbi.com/');
      //await this.amOnPage(appURL.XPS_SANITY_URL);
      await this.waitForText('SIGN IN');
      await this.click('SIGN IN');
      await this.waitForElement('#i0116', process.env.WAIT_MEDIUM);
      await this.say('I Enter user name and password');
      await this.fillField('#i0116', email);
      await this.click('Next');
      await this.wait(1);
      await this.waitForVisible('#i0118');
      await this.waitForElement('#i0118');
      await this.fillField('#i0118', secret(password));
      await this.say('Click on submit button');
      await this.click('Sign in');
      await this.wait(1);
      // this.saveScreenshot('LoginSuccessful.png');
      await this.click('Yes');
      await this.wait(process.env.WAIT_MEDIUM);
      //}
    },

    //Validate Italics
    async Home_Italics(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.firstValue);
      await  this.clickOnItalics();
      await this.capturescreenshot(TestName,'Italics')     
      await  this.verifyFontStyleAsItalics(cells.firstValue);
      await  this.saveScreenshot('FontItalics.png');
      await  allure.addAttachment('Font Italics',new Buffer("FontItalics.png"),'png');
      //await  allure.addAttachment('Font Italics',Buffer.from("FontItalics.png"),'png');
      await  this.clickOnItalics();
      await this.capturescreenshot(TestName,'Italics_to_Normal')    
      await  this.verifyFontStyleAsNormal(cells.firstValue);
      await  this.saveScreenshot('FontNormal_2.png');
      await  allure.addAttachment('Font Normal',new Buffer("FontNormal_2.png"),'png');
      //await  allure.addAttachment('Font Normal',Buffer.from("FontNormal_2.png"),'png');
      await  this.clearSelection(cells.firstValue);
     },
    
     //Validate Fill Color
      async Home_Fill(FeatureName,TestName){
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_4_2);
        await this.clickOnFillColordropdown();
        await this.clickOnFontColor('#d64550');
        await this.capturescreenshot(TestName,'Fill_Color')        
        await this.verifyFillcolor(cells.Cell_4_2,'rgb(214, 69, 80)');
        await this.saveScreenshot('FillColor.png');
        await allure.addAttachment('Fill Color',new Buffer("FillColor.png"),'png');
        await this.clickOnFillColordropdown();
        await this.clickOnResettoDefault()
        await this.capturescreenshot(TestName,'Fill_Color_ResetToDefault')        
        await this.verifyFillcolor(cells.Cell_4_2,'rgb(255, 255, 255)');
        await this.saveScreenshot('FillColor_ResettoDefault.png');
        await allure.addAttachment('Fill Color Reset to Default',new Buffer("FillColor_ResettoDefault.png"),'png');
        await this.clickOnFillColordropdown();
        await this.clickOnFontColor('#ffffff');
        await this.clearSelection(cells.Cell_4_2);
      },
  
      //Validate FontColor
      async Home_FontColor(FeatureName,TestName){
         await this.clickOnHomeTab();  
         await this.selectCell(cells.Cell_4_3);
         await this.clickOnFontColordropdown();
         await this.clickOnFontColor('#e66c37');
         await this.capturescreenshot(TestName,'Font_Color')
         await this.verifyFontcolor(cells.Cell_4_3,'rgb(230, 108, 55)');         
         await this.saveScreenshot('FontColor.png');
         await allure.addAttachment('Font Color',new Buffer("FontColor.png"),'png');
         await this.clickOnFontColordropdown();
         await this.clickOnResettoDefault()
         await this.capturescreenshot(TestName,'Font_Color_Default')
         await this.verifyFontcolor(cells.Cell_4_3,'rgb(0, 0, 0)');
         await this.saveScreenshot('FontColor_ResettoDefault.png');
         await allure.addAttachment('Font Color Reset to Default',new Buffer("FontColor_ResettoDefault.png"),'png');
         await this.clearSelection(cells.Cell_4_3);
      },

      //Header Orientation Horizontal
      async Home_HeaderOrientation_Horizontal(FeatureName,TestName){
        await this.clickOnHomeTab();  
        await this.selectCell(cells.HeaderOne);
        await this.clickHeaderOrientationOptions();
        await this.clickHeaderOrientationHorizontal();
        await this.verifyHeaderOrientationHorizontal(cells.HeaderOneSpanChild);    
        //await this.saveScreenshot('OrientationHorizontal.png');
        //await allure.addAttachment('OrientationHorizontal',new Buffer("OrientationHorizontal.png"),'png');
        await this.capturescreenshot(TestName,'OrientationHorizontal')
        await this.clearSelection(cells.HeaderOne);
       // await this.clickOnSpecificArea(toolBar.HomeTab.Common.displaygrid)
    },

     //Header Orientation Vertical
     async Home_HeaderOrientation_Vertical(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.HeaderOne);
      await this.clickHeaderOrientationOptions();
      await this.clickHeaderOrientationVertical();
      await this.capturescreenshot(TestName,'OrientationVertical')
      await this.verifyHeaderOrientationVertical(cells.HeaderOneSpanChild);    
      await this.saveScreenshot('OrientationVertical.png');
      allure.addAttachment('OrientationVertical',new Buffer("OrientationVertical.png"),'png');
      await this.clearSelection(cells.HeaderOne);
    },

    //Header Orientation DiagonalTopBottom
    async Home_HeaderOrientation_DiagonalTopBottom(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.HeaderOne);
      await this.clickHeaderOrientationOptions();
      await this.clickHeaderOrientationDiagonalTopBottom();
      await this.capturescreenshot(TestName,'OrientationDiagonalTopBottom')
      await this.verifyHeaderOrientationDiagonalTopBottom(cells.HeaderOneSpanChild);    
      await this.saveScreenshot('OrientationDiagonalTopBottom.png');
      allure.addAttachment('OrientationDiagonalTopBottom',new Buffer("OrientationDiagonalTopBottom.png"),'png');    
      await this.clearSelection(cells.HeaderOne);
    },

    //Header Orientation DiagonalBottomTop
    async Home_HeaderOrientation_DiagonalBottomTop(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.HeaderOne);
      await this.clickHeaderOrientationOptions();
      await this.clickHeaderOrientationDiagonalBottomTop();
      await this.capturescreenshot(TestName,'OrientationDiagonalBottomTop')
      await this.verifyHeaderOrientationDiagonalBottomTop(cells.HeaderOneSpanChild);    
      await this.saveScreenshot('OrientationDiagonalBottomTop.png');
      allure.addAttachment('OrientationDiagonalBottomTop',new Buffer("OrientationDiagonalBottomTop.png"),'png');    
      await this.clearSelection(cells.HeaderOne);
    },

    //Increment Decrement Font Size
    async Home_Increment_Decrement_FontSize(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_5_2);
      await this.increaseFontSize();
      await this.capturescreenshot(TestName,'IncrementFontSize')
      await this.verifyFontSize(cells.Cell_5_2,'14');
      await this.decreaseFontSize();
      await this.capturescreenshot(TestName,'DecrementFontSize')
      await this.verifyFontSizeDefault(cells.Cell_5_2,'12');
      await this.clearSelection(cells.Cell_5_2);
    },
    //Change Font
    async Home_FontChange(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_5_1);
      await this.selectFontFamily();
      await this.capturescreenshot(TestName,'FontChange')
      await this.verifyFontFamily(cells.Cell_5_1,'Arial');
      await this.selectFontFamilyDefault();
      await this.capturescreenshot(TestName,'FontDefault')
      await this.verifyFontFamilyAsNormal(cells.Cell_5_1);
      await this.clearSelection(cells.Cell_5_1);
    },
    //Change Font Size
    async Home_FontSize(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_5_3);
      await this.selectFontSize16();
      await this.capturescreenshot(TestName,'FontSizeChange')
      await this.verifyFontSize(cells.Cell_5_3,'16');
      await this.wait(10)
      await this.selectFontSizeDefault(); 
      await this.wait(5)
      await this.capturescreenshot(TestName,'FontSizeDefault')
      await this.verifyFontSize(cells.Cell_5_3,'12');
      await this.clearSelection(cells.Cell_5_3);
    },
     //Text Left Align
     async Home_Format_LeftAlign(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_1_5);
      await this.clickAlignment('left');
      await this.capturescreenshot(TestName,'LeftAlign')
      const res=await this.verifyTextAlignment(cells.Cell_1_5,'left');
      await this.saveScreenshot('LeftAlignment.png');
      allure.addAttachment('LeftAlignment',new Buffer("LeftAlignment.png"),'png');   
      await this.clearSelection(cells.Cell_1_5); 
      if(res==='fail')
      await this.assert(true,false,'Left Alignment failed');
    },
    //Text Center Align
    async Home_Format_CenterAlign(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_1_7);
      await this.clickAlignment('center');
      await this.capturescreenshot(TestName,'CenterAlign')
      const res=await this.verifyTextAlignment(cells.Cell_1_7,'center');
      await this.saveScreenshot('CenterAlignment.png');
      allure.addAttachment('CenterAlignment',new Buffer("CenterAlignment.png"),'png');  
      await this.clearSelection(cells.Cell_1_7) ;
      if(res==='fail')
      await this.assert(true,false,'Center Alignment failed');
    },
    //Text Right Align
    async Home_Format_RightAlign(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_1_8);
      await this.clickAlignment('right')
      await this.capturescreenshot(TestName,'RightAlign')
      const res=await this.verifyTextAlignment(cells.Cell_1_8,'right');
      await this.saveScreenshot('RightAlignment.png');
      allure.addAttachment('RightAlignment',new Buffer("RightAlignment.png"),'png');  
      await this.clearSelection(cells.Cell_1_8);  
      if(res==='fail')
      await this.assert(true,false,'Right Alignment failed');
    },
     //Text Top Align
     async Home_Format_TopAlign(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_2_3);
      await this.clickAlignment('top');
      await this.capturescreenshot(TestName,'TopAlign')
      const res=await this.verifyAlignment(cells.Cell_2_3_DivChild,'flex-start');
      await this.saveScreenshot('TopAlignment.png');
      allure.addAttachment('TopAlignment',new Buffer("TopAlignment.png"),'png');   
      await this.clearSelection(cells.Cell_2_3); 
      if(res==='fail')
      await this.assert(true,false,'Top Alignment failed');
    },
   
    //Text Middle Align
    async Home_Format_MiddleAlign(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_2_4);
      await this.clickAlignment('middle');
      await this.capturescreenshot(TestName,'MiddleAlign')
      const res=await this.verifyAlignment(cells.Cell_2_4_DivChild,'center');
      await this.saveScreenshot('MiddleAlignment.png');
      allure.addAttachment('MiddleAlignment',new Buffer("MiddleAlignment.png"),'png');   
      await this.clearSelection(cells.Cell_2_4); 
      if(res==='fail')
      await this.assert(true,false,'Middle Alignment failed');
    },
    //Text Bottom Align
    async Home_Format_BottomAlign(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_2_5);
      await this.clickAlignment('bottom');
      await this.capturescreenshot(TestName,'BottomAlign')
      const res=await this.verifyAlignment(cells.Cell_2_5_DivChild,'flex-end');
      await this.saveScreenshot('BottomAlignment.png');
      allure.addAttachment('BottomAlignment',new Buffer("BottomAlignment.png"),'png');   
      await this.clearSelection(cells.Cell_2_5); 
      if(res==='fail')
      await this.assert(true,false,'Bottom Alignment failed');
    },
    //Text Hide/Show
    async Home_Format_HideShow(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.firstValue);
      await this.clickShowHide();
      await this.capturescreenshot(TestName,'HideText')
      const res=await this.verifyTextHideShow(cells.firstValue,'hide');
      await this.saveScreenshot('Hide.png');
      allure.addAttachment('Hide',new Buffer("Hide.png"),'png');  
      if(res==='fail')
      await this.assert(true,false,'Hide failed');
      await this.clickShowHide();
      await this.capturescreenshot(TestName,'ShowText')
      const res1=await this.verifyTextHideShow(cells.firstValue,'show');
      await this.saveScreenshot('Show.png');
      allure.addAttachment('Show',new Buffer("Show.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Show failed');
      await this.clearSelection(cells.firstValue); 
    },
     //Text %
     async Home_Format_Percentage(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_3_2);
      await this.clickPercentage();
      await this.capturescreenshot(TestName,'ShowPercentage')
      const res=await this.verifyValue(cells.Cell_3_2,'23,900,000.00%');
      await this.saveScreenshot('Percentage.png');
      allure.addAttachment('Percentage',new Buffer('Percentage.png'),'png');  
      if(res==='fail')
      await this.assert(true,false,'Value comparison failed');
      await this.clickPercentage();   
      await this.capturescreenshot(TestName,'ShowNormal') 
      const res1=await this.verifyValue(cells.Cell_3_2,'239.00'); 
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed'); 
      await this.clearSelection(cells.Cell_3_2);  
    },
    //Add Prefix Suffix
    async Home_Format_Add_PrefixSuffix(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_1_6);
      await this.clickPrefixSuffix();
      await this.EnterPrefix('$');
      await this.EnterSuffix('TH');
      await this.capturescreenshot(TestName,'SelectPrefixSuffix')
      await this.clickPrefixSuffixApply();
      await this.capturescreenshot(TestName,'AppliedPrefixSuffix')
      const prefixres=await this.verifyValue(cells.prefixValue,'$');  
      const suffixres=await this.SuffixverifyValue(cells.suffixValue,'275.00TH');   
      await this.saveScreenshot('PrefixSuffix.png');
      allure.addAttachment('PrefixSuffix',new Buffer("PrefixSuffix.png"),'png');
      if(prefixres==='fail'||suffixres==='fail')
      await this.assert(true,false,'Value comparison failed'); 
      await this.clickPrefixSuffix();
      await this.EnterPrefix('');   
      await this.EnterSuffix('');
      await this.capturescreenshot(TestName,'ClearedPrefixSuffix')
      await this.clickPrefixSuffixApply(); 
      await this.capturescreenshot(TestName,'NoPrefixSuffix')  
      const res1=await this.verifyValue(cells.Cell_1_6,'275.00'); 
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');
      await this.clearSelection(cells.Cell_1_6);  
    },
    //Scaling Thousand
    async Home_Format_Scaling_Thousand(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_4_5);
      await this.clickScalingDropDown();
      await this.selectScaling('Thousand');
      await this.capturescreenshot(TestName,'Scaling_Thousand');  
      const res1=await this.verifyValue(cells.Cell_4_5,'93.00');    
      await this.saveScreenshot('ScalingThousand.png');
      allure.addAttachment('ScalingThousand',new Buffer("ScalingThousand.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');
      await this.clearSelection(cells.Cell_4_5);  
    },
    //Scaling Million
    async Home_Format_Scaling_Million(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_4_7);
      await this.clickScalingDropDown();
      await this.selectScaling('Million');
      await this.capturescreenshot(TestName,'Scaling_Million'); 
      const res1=await this.verifyValue(cells.Cell_4_7,'0.00m');    
      await this.saveScreenshot('Million.png');
      allure.addAttachment('Million',new Buffer("Million.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');
      await this.clearSelection(cells.Cell_4_7);
    },
    //Scaling Billion
    async Home_Format_Scaling_Billion(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_4_6);
      await this.clickScalingDropDown();
      await this.selectScaling('Billion');
      await this.capturescreenshot(TestName,'Scaling_Billion');
      const res1=await this.verifyValue(cells.Cell_4_6,'0.00b');    
      await this.saveScreenshot('Billion.png');
      allure.addAttachment('Billion',new Buffer("Billion.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed'); 
      await this.clearSelection(cells.Cell_4_6);  
    },
    //Scaling Trillion
    async Home_Format_Scaling_Trillion(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_6_4);
      await this.clickScalingDropDown();
      await this.selectScaling('Trillion');
      await this.capturescreenshot(TestName,'Scaling_Trillion');
      const res1=await this.verifyValue(cells.Cell_6_4,'0.00t');    
      await this.saveScreenshot('Trillion.png');
      allure.addAttachment('Trillion',new Buffer("Trillion.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed'); 
      await this.clearSelection(cells.Cell_6_4);  
    },
    //Scaling None
    async Home_Format_Scaling_None(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_3_1);
      await this.clickScalingDropDown();
      await this.selectScaling('None');
      await this.capturescreenshot(TestName,'Scaling_None');
      const res1=await this.verifyValue(cells.Cell_3_1,'208,000.00');    
      await this.saveScreenshot('None.png');
      allure.addAttachment('None',new Buffer("None.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed'); 
      await this.clearSelection(cells.Cell_3_1);  
    },
    //Increase Decrease Decimal
    async Home_Format_Increase_Decrease_Decimal(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_8_5);
      await this.clickIncreaseDecimal(1);
      await this.capturescreenshot(TestName,'Increase_Decimal');
      const res1=await this.verifyValue(cells.Cell_8_5,'173.000');    
      await this.saveScreenshot('IncreaseDecimal.png');
      allure.addAttachment('IncreaseDecimal',new Buffer("IncreaseDecimal.png"),'png'); 
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');  
      await this.clickDecreaseDecimal(1)
      await this.capturescreenshot(TestName,'Decrease_Decimal');
      const res2=await this.verifyValue(cells.Cell_8_5,'173.00');    
      await this.saveScreenshot('DecreaseDecimal.png');
      allure.addAttachment('DecreaseDecimal',new Buffer("DecreaseDecimal.png"),'png'); 
      if(res2==='fail')
      await this.assert(true,false,'Value comparison failed'); 
      await this.clearSelection(cells.Cell_8_5); 
    },
    //Unified#1
    async Home_Format_NumberFormatting_Unified1(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Cell_7_1);
      await this.clickNumberFormattingDropDown();
      await this.selectNumberFormatting('Unified #1'); 
      await this.capturescreenshot(TestName,'Unified1');   
      const res1=await this.verifyValue(cells.Cell_7_1,'276.0');  
      await this.saveScreenshot('Unified1.png');
      allure.addAttachment('Unified1',new Buffer("Unified1.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');  
      await this.clearSelection(cells.Cell_7_1);  
    },
      //Unified#2
      async Home_Format_NumberFormatting_Unified2(FeatureName,TestName){
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_7_4);
        await this.clickNumberFormattingDropDown();
        await this.selectNumberFormatting('Unified #2'); 
        await this.capturescreenshot(TestName,'Unified2');   
        const res1=await this.verifyValue(cells.Cell_7_4,'648.00');  
        await this.saveScreenshot('Unified2.png');
        allure.addAttachment('Unified2',new Buffer("Unified2.png"),'png');  
        if(res1==='fail')
        await this.assert(true,false,'Value comparison failed');  
        await this.clearSelection(cells.Cell_7_4);  
      },
     //Unified
     async Home_Format_NumberFormatting_Unified(FeatureName,TestName){
      await this.selectCell(cells.Cell_10_1);
      await this.clickNumberFormattingDropDown();
      await this.selectNumberFormatting('Unified'); 
      await this.capturescreenshot(TestName,'Unified');   
      const res1=await this.verifyValue(cells.Cell_10_1,'0.48');  
      await this.saveScreenshot('NumberFormatting_Default.png');
      allure.addAttachment('NumberFormatting_Default',new Buffer("NumberFormatting_Default.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');  
      await this.clearSelection(cells.Cell_10_1);  
    },
     //IBCS
     async Home_Format_NumberFormatting_IBCS(FeatureName,TestName){
      await this.selectCell(cells.Cell_10_3);
      await this.clickNumberFormattingDropDown();
      await this.selectNumberFormatting('IBCS');   
      await this.capturescreenshot(TestName,'IBCS');   
      const res1=await this.verifyValue(cells.Cell_10_3,'-0.0');  
      await this.saveScreenshot('NumberFormatting_IBCS.png');
      allure.addAttachment('NumberFormatting_IBCS',new Buffer("NumberFormatting_IBCS.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');  
      await this.clearSelection(cells.Cell_10_3);    
    },
    //Flexible
    async Home_Format_NumberFormatting_Flexible(FeatureName,TestName){
      await this.selectCell(cells.Cell_11_1);
      await this.clickNumberFormattingDropDown();
      await this.selectNumberFormatting('Flexible');  
      await this.capturescreenshot(TestName,'Flexible');   
      const res1=await this.verifyValue(cells.Cell_11_1,'757.97k');  
      await this.saveScreenshot('NumberFormatting_Flexible.png');
      allure.addAttachment('NumberFormatting_Flexible',new Buffer("NumberFormatting_Flexible.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');  
      await this.clearSelection(cells.Cell_11_1);     
    },
     //Native
     async Home_Format_NumberFormatting_Native(FeatureName,TestName){
      await this.selectCell(cells.Cell_10_1);
      await this.clickNumberFormattingDropDown();
      await this.selectNumberFormatting('Native');    
      await this.capturescreenshot(TestName,'Native'); 
      const res1=await this.verifyValue(cells.Cell_10_1,'196000');  
      await this.saveScreenshot('NumberFormatting_Native.png');
      allure.addAttachment('NumberFormatting_Native',new Buffer("NumberFormatting_Native.png"),'png');  
      if(res1==='fail')
      await this.assert(true,false,'Value comparison failed');  
      await this.clearSelection(cells.Cell_10_1);    
    },

     //Border OverLineSolid
     async Home_Format_Border_OverlineSolid(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column6);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderoverlineSolid);
      await this.clearSelection(cells.Table_Div_Row6_Column6); 
      await this.capturescreenshot(TestName,'borderoverlineSolid');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-top','1px solid rgb(102, 102, 102)');    
      await this.saveScreenshot('BorderoverlineSolid.png');
      allure.addAttachment('BorderoverlineSolid',new Buffer("BorderoverlineSolid.png"),'png');  
      if(res1==='fail') 
      await this.assert(true,false,'Value comparison failed');
      await this.selectCell(cells.Table_Div_Row6_Column6);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline)
      await this.clearSelection(cells.Table_Div_Row6_Column6);
      await this.capturescreenshot(TestName,'NoBorder1');  
    },
     //Border UnderLineSolid
     async Home_Format_Border_UnderlineSolid(FeatureName,TestName){
      await this.selectCell(cells.Table_Div_Row6_Column6);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderunderlineSolid)
      await this.clearSelection(cells.Table_Div_Row6_Column6); 
      await this.capturescreenshot(TestName,'borderunderlineSolid');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-bottom','1px solid rgb(102, 102, 102)');    
      await this.saveScreenshot('BorderunderlineSolid.png');
      allure.addAttachment('BorderunderlineSolid',new Buffer("BorderunderlineSolid.png"),'png');  
      if(res1==='fail') 
      await this.assert(true,false,'Value comparison failed');
      await this.selectCell(cells.Table_Div_Row6_Column6);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline)
      await this.clearSelection(cells.Table_Div_Row6_Column6);
      await this.capturescreenshot(TestName,'NoBorder2');  
    },
    //Border OverLineDouble
    async Home_Format_Border_OverlineDouble(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column6);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderoverlineDouble)
      await this.clearSelection(cells.Table_Div_Row6_Column6); 
      await this.capturescreenshot(TestName,'borderoverlineDouble');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-top','2px solid rgb(102, 102, 102)');    
      await this.saveScreenshot('BorderoverlineDouble.png');
      allure.addAttachment('BorderoverlineDouble',new Buffer("BorderoverlineDouble.png"),'png');  
      if(res1==='fail') 
      await this.assert(true,false,'Value comparison failed');
      await this.selectCell(cells.Table_Div_Row6_Column6);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline)
      await this.clearSelection(cells.Table_Div_Row6_Column6);
      await this.capturescreenshot(TestName,'NoBorder3');  
    },
    //Border UnderlineOverline
    async Home_Format_Border_UnderlineOverline(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column6);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderunderlineOverline)
      await this.clearSelection(cells.Table_Div_Row6_Column6); 
      await this.capturescreenshot(TestName,'borderunderlineoverline'); 
      await this.saveScreenshot('Borderunderlineoverline.png');
      allure.addAttachment('Borderunderlineoverline',new Buffer("Borderunderlineoverline.png"),'png');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-bottom','1px solid rgb(102, 102, 102)');                
      if(res1==='fail') 
      await this.assert(true,false,'Value comparison failed');
      const res2=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-top','1px solid rgb(102, 102, 102)');    
      if(res2==='fail') 
      await this.assert(true,false,'Value comparison failed');

      await this.selectCell(cells.Table_Div_Row6_Column6);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline)
      await this.clearSelection(cells.Table_Div_Row6_Column6);
      await this.capturescreenshot(TestName,'NoBorder4');  
    },
     //Border Left
     async Home_Format_Border_Left(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column6);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderleft)
      await this.clearSelection(cells.Table_Div_Row6_Column6); 
      await this.capturescreenshot(TestName,'borderleft');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-left','1px solid rgb(102, 102, 102)');    
      await this.saveScreenshot('BorderLeft.png');
      allure.addAttachment('BorderLeft',new Buffer("BorderLeft.png"),'png');  
      if(res1==='fail') 
      await this.assert(true,false,'Value comparison failed');
      await this.selectCell(cells.Table_Div_Row6_Column6);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline)
      await this.clearSelection(cells.Table_Div_Row6_Column6);
      await this.capturescreenshot(TestName,'NoBorder5');  
    },
    //Border Right
    async Home_Format_Border_Right(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column6);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderright)
      await this.clearSelection(cells.Table_Div_Row6_Column6); 
      await this.capturescreenshot(TestName,'borderright');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column6,'border-right','1px solid rgb(102, 102, 102)');    
      await this.saveScreenshot('BorderRight.png');
      allure.addAttachment('BorderRight',new Buffer("BorderRight.png"),'png');  
      if(res1==='fail') 
      await this.assert(true,false,'Value comparison failed');
      await this.selectCell(cells.Table_Div_Row6_Column6);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline)
      await this.clearSelection(cells.Table_Div_Row6_Column6);
      await this.capturescreenshot(TestName,'NoBorder6');  
    },
    //Border LineAll
    async Home_Format_Border_LineAll(FeatureName,TestName){
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column5);
      await this.clickBorderDropDown();
      await this.click(toolBar.HomeTab.Format.borderlineAll)
      await this.clearSelection(cells.Table_Div_Row6_Column5); 
      await this.capturescreenshot(TestName,'borderlineAll');  
      await this.saveScreenshot('BorderLineAll.png');
      allure.addAttachment('BorderLineAll',new Buffer("BorderLineAll.png"),'png');  
      const res1=await this.verifyBorder(cells.Table_Div_Row6_Column5,'border-style','solid');          
      const res2=await this.verifyBorder(cells.Table_Div_Row6_Column5,'border-color','rgb(102, 102, 102)');          
      const res3=await this.verifyBorder(cells.Table_Div_Row6_Column5,'border-width','1px');          
      if(res1==='fail' || res2==='fail' ||res3==='fail') 
      await this.assert(true,false,'Value comparison failed');
      await this.selectCell(cells.Table_Div_Row6_Column5);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline);      
      await this.clearSelection(cells.Table_Div_Row6_Column5);
      await this.capturescreenshot(TestName,'NoBorder7');  
    },
    //Border Default
    async Home_Format_Border_Default(FeatureName,TestName){      
      await this.clickOnHomeTab();  
      await this.selectCell(cells.Table_Div_Row6_Column5);      
      await this.clickBorderDropDown(); 
      await this.click(toolBar.HomeTab.Format.borderdefaultline);
      await this.clearSelection(cells.Table_Div_Row6_Column5); 
      await this.capturescreenshot(TestName,'borderdefault');  
      const res4=await this.verifyNoBorder(cells.Table_Div_Row6_Column5)
      if(res4==='fail') 
      await this.assert(true,false,'Value comparison failed');
      
    },

     //Visualization BarChart
     async Home_Visualization_BarChart(FeatureName,TestName){  
      await this.clickOnHomeTab();      
      await this.selectCell(cells.HeaderOne);
      //await this.clickbarChartdropDown(); 
      await this.clickBarChart();
      await this.capturescreenshot(TestName,'BarChart');
      await this.saveScreenshot('BarChart.png');
      allure.addAttachment('BarChart',new Buffer("BarChart.png"),'png');  
      const res=await this.doVisualRegression(TestName,'BarChart');
      if(res!='pass')
      {
      const result = await tryTo(() => this.see('Image Equality - BarChart.png'));
      }  
      await this.clickHomeHeader();
      await this.clickshowAsNumbers();
      await this.clearSelection(cells.HeaderOne);  
    },

     //Visualization IntegratedChart
     async Home_Visualization_IntegratedChart(FeatureName,TestName){      
      await this.selectCell(cells.HeaderOne);
      await this.clickbarChartdropDown(); 
      await this.clickIntegratedChart();
      await this.capturescreenshot(TestName,'IntegratedChart');
      await this.saveScreenshot('IntegratedChart.png');
      allure.addAttachment('IntegratedChart',new Buffer("IntegratedChart.png"),'png');  
      const res=await this.doVisualRegression(TestName,'IntegratedChart') 
      if(res!='pass')
      {
      const result = await tryTo(() => this.see('Image Equality - IntegratedChart.png'));
      }   
      await this.clickHomeHeader();
      await this.clickshowAsNumbers();
     // await this.clearSelection(cells.HeaderOne);  
    },

     //Visualization PinChart
     async Home_Visualization_PinChart(FeatureName,TestName){ 
      await this.clickOnHomeTab();     
      await this.selectCell(cells.HeaderOne);
      await this.clickPinChart(); 
      const res1=await this.verifyPinChartDisplay('260.00');  
      await this.saveScreenshot('PinChart.png');
      await this.capturescreenshot(TestName,'PinChart');
      allure.addAttachment('PinChart',new Buffer("PinChart.png"),'png');  
      const res=await this.doVisualRegression(TestName,'PinChart') 
      if(res!='pass')
      {
      const result = await tryTo(() => this.see('Image Equality - PinChart.png'));
      }   
      await this.clickshowAsNumbers();
      if(res1==='fail')
      await this.assert(true,false,'Pin Chart display validation failed'); 
      await this.clearSelection(cells.HeaderOne);  
     // await this.clickOnSpecificArea(toolBar.HomeTab.Common.displaygrid);
     },
      //Visualization PinChart
      async Home_Visualization_LollipopChart(FeatureName,TestName){ 
        await this.clickOnHomeTab();     
        await this.selectCell(cells.HeaderOne);
        await this.clickLollipopChart(); 
        const res1=await this.verifyLollipopChartDisplay('260.00');  
        await this.saveScreenshot('LollipopChart.png');
        await this.capturescreenshot(TestName,'LollipopChart');
        allure.addAttachment('LollipopChart',new Buffer("LollipopChart.png"),'png');
        const res=await this.doVisualRegression(TestName,'LollipopChart') 
        if(res!='pass')
        {
        const result = await tryTo(() => this.see('Image Equality - LollipopChart.png'));
        }    
        await this.clickshowAsNumbers();
        if(res1==='fail')
        await this.assert(true,false,'Lollipop Chart display validation failed'); 
        await this.clearSelection(cells.HeaderOne); 
       // await this.clickOnSpecificArea(toolBar.HomeTab.Common.displaygrid); 
       },
       //Visualization WaterfallChartRegular
      async Home_Visualization_WaterfallChartRegular(FeatureName,TestName){
        await this.clickOnHomeTab();      
        await this.selectCell(cells.HeaderOne);
        await this.clickWaterFallChartdropdown();
        await this.clickWaterFallChartRegular();
        await this.verifyWaterFallChartDisplay('260.00');  
        await this.capturescreenshot(TestName,'WaterFallChartRegular');
        await this.saveScreenshot('WaterFallChartRegular.png');
        allure.addAttachment('WaterFallChartRegular',new Buffer("WaterFallChartRegular.png"),'png');  
        const res=await this.doVisualRegression(TestName,'WaterFallChartRegular') 
        if(res!='pass')
        {
        const result = await tryTo(() => this.see('Image Equality - WaterFallChartRegular.png'));
        }   
        await this.clickshowAsNumbers();
        await this.clearSelection(cells.HeaderOne);  
       },
        //Visualization WaterfallChartContinuous
      async Home_Visualization_WaterfallChartContinuous(FeatureName,TestName){
        await this.clickOnHomeTab();      
        await this.selectCell(cells.HeaderOne);
        await this.clickWaterFallChartdropdown();
        await this.clickWaterFallChartContinuous();
        await this.verifyWaterFallChartDisplay('293.0');  
        await this.capturescreenshot(TestName,'WaterFallChartContinuous');
        await this.saveScreenshot('WaterFallChartContinuous.png');
        allure.addAttachment('WaterFallChartContinuous',new Buffer("WaterFallChartContinuous.png"),'png');  
        const res=await this.doVisualRegression(TestName,'WaterFallChartContinuous');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - WaterFallChartContinuous.png'));
        }   
        await this.clickshowAsNumbers();
        await this.clearSelection(cells.HeaderOne);  
       },

         //Visualization BulletChartSimple
      async Home_Visualization_BulletChartSimple(FeatureName,TestName){    
        await this.selectCell(cells.HeaderOne);
        await this.clickBulletChartdropdown();
        await this.clickBulletChartSimple();
        await this.capturescreenshot(TestName,'BulletChartSimple');
        await this.saveScreenshot('BulletChartSimple.png');
        allure.addAttachment('BulletChartSimple',new Buffer("BulletChartSimple.png"),'png');  
        const res=await this.doVisualRegression(TestName,'BulletChartSimple') 
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - BulletChartSimple.png'));
        }
        await this.clickHomeHeader();
        await this.clickshowAsNumbers();
       // await this.clearSelection(cells.HeaderOne);  
       },

          //Visualization BulletChartCustom
      async Home_Visualization_BulletChartCustom(FeatureName,TestName){    
        await this.selectCell(cells.HeaderOne);
        await this.clickBulletChartdropdown();
        await this.clickBulletChartCustom();
        await this.capturescreenshot(TestName,'BulletChartCustom');
        await this.saveScreenshot('BulletChartCustom.png');
        allure.addAttachment('BulletChartCustom',new Buffer("BulletChartCustom.png"),'png');  
        const res=await this.doVisualRegression(TestName,'BulletChartCustom');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - BulletChartCustom.png'));
        } 
        await this.clickHomeHeader();
        await this.clickshowAsNumbers();
        //await this.clearSelection(cells.HeaderOne);  
       },

        //Visualization LineChart
      async Home_Visualization_LineChart(FeatureName,TestName){    
        await this.selectCell(cells.HeaderOne);
        await this.clickSparklineChartdropdown();
        await this.clickLineChart();
        await this.capturescreenshot(TestName,'LineChart');
        await this.saveScreenshot('LineChart.png');
        allure.addAttachment('LineChart',new Buffer("LineChart.png"),'png');  
        const res=await this.doVisualRegression(TestName,'LineChart');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - LineChart.png'));
        }  
        await this.clickHomeHeader();
        await this.clickshowAsNumbers();
        //await this.clearSelection(cells.HeaderOne);  
       },

        //Visualization Area Chart
      async Home_Visualization_AreaChart(FeatureName,TestName){    
        await this.selectCell(cells.HeaderOne);
        await this.clickSparklineChartdropdown();
        await this.clickAreaChart();
        await this.capturescreenshot(TestName,'AreaChart');
        await this.saveScreenshot('AreaChart.png');
        allure.addAttachment('AreaChart',new Buffer("AreaChart.png"),'png');  
        const res=await this.doVisualRegression(TestName,'AreaChart');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - AreaChart.png'));
        } 
        await this.clickHomeHeader();
        await this.clickshowAsNumbers();
        //await this.clearSelection(cells.HeaderOne);  
       },

         //Visualization Column Chart
      async Home_Visualization_ColumnChart(FeatureName,TestName){    
        await this.selectCell(cells.HeaderOne);
        await this.clickSparklineChartdropdown();
        await this.clickColumnChart();
        await this.capturescreenshot(TestName,'ColumnChart');
        await this.saveScreenshot('ColumnChart.png');
        allure.addAttachment('ColumnChart',new Buffer("ColumnChart.png"),'png');  
        const res=await this.doVisualRegression(TestName,'ColumnChart');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - ColumnChart.png'));
        } 
        await this.clickHomeHeader();
        await this.clickshowAsNumbers();
        //await this.clearSelection(cells.HeaderOne);  
       },

      //Visualization WinLoss Chart
      async Home_Visualization_WinLossChart(FeatureName,TestName){    
        await this.selectCell(cells.HeaderOne);
        await this.clickSparklineChartdropdown();
        await this.clickWinLoss();
        await this.capturescreenshot(TestName,'WinLoss');
        await this.saveScreenshot('WinLoss.png');
        allure.addAttachment('WinLoss',new Buffer("WinLoss.png"),'png');  
        const res=await this.doVisualRegression(TestName,'WinLoss');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - WinLoss.png'));
        } 
        await this.clickHomeHeader();
        await this.clickshowAsNumbers();
        //await this.clearSelection(cells.HeaderOne);  
      },

      //Column InsertGrandTotal_Column
      async Home_Column_Total_InsertGrandTotal_Column(FeatureName,TestName){  
        await this.clickOnHomeTab();    
        await this.clickTotaldropdown();
        await this.clickInsertGrantTotalColumn();
        await this.capturescreenshot(TestName,'InsertGrantTotalColumn');
        await this.saveScreenshot('InsertGrantTotalColumn.png');
        allure.addAttachment('InsertGrantTotalColumn',new Buffer("InsertGrantTotalColumn.png"),'png');  
        const res=await this.doVisualRegression(TestName,'InsertGrantTotalColumn');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - InsertGrantTotalColumn.png'));
        }
        await this.clickTotaldropdown();
        await this.clickInsertGrantTotalColumn();      
      },

       //Column Enablerowsubtotalsplit
       async Home_Column_Total_Enablerowsubtotalsplit(FeatureName,TestName){
        await this.clickOnHomeTab();      
        await this.clickTotaldropdown();
        await this.clickEnablerowsubtotalsplit();
        await this.capturescreenshot(TestName,'Enablerowsubtotalsplit');
        await this.saveScreenshot('Enablerowsubtotalsplit.png');
        allure.addAttachment('Enablerowsubtotalsplit',new Buffer("Enablerowsubtotalsplit.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Enablerowsubtotalsplit');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Enablerowsubtotalsplit.png'));
        }  
        await this.clickTotaldropdown();
        await this.clickEnablerowsubtotalsplit();      
      },

       //Focus_CondFormat_Icons
       async Focus_CondFormat_Icons(FeatureName,TestName){    
        await this.clickOnHomeTab();     
        await this.selectCell(cells.Cell_2_2);
        await this.clickCondFormatdropdown();        
        await this.clickIconsToggle();
        await this.clickCloseCondFormatSideBar();
        await this.capturescreenshot(TestName,'CondFormatIcons'); 
        const res=await this.doVisualRegression(TestName,'CondFormatIcons');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - CondFormatIcons.png'));
        }
       
        await this.clickCondFormatdropdown();        
        await this.clickIconsToggle();  
        await this.clearSelection(cells.Cell_2_2);     
      },

       //Focus_CondFormat_Rating
       async Focus_CondFormat_Rating(FeatureName,TestName){  
        await this.clickOnHomeTab();       
        await this.selectCell(cells.Cell_2_2);
        await this.clickCondFormatdropdown();        
        await this.clickRatingToggle();
        await this.clickCloseCondFormatSideBar();
        await this.capturescreenshot(TestName,'CondFormatRating'); 
        const res=await this.doVisualRegression(TestName,'CondFormatRating');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - CondFormatRating.png'));
        }
     
        await this.clickCondFormatdropdown();        
        await this.clickRatingToggle();   
        await this.clearSelection(cells.Cell_2_2);    
      },

      //Focus_CondFormat_ABCClassify
      async Focus_CondFormat_ABCClassify(FeatureName,TestName){ 
        await this.clickOnHomeTab();        
        await this.selectCell(cells.Cell_2_2);
        await this.clickCondFormatdropdown();        
        await this.clickABCClassifyToggle();
        await this.clickCloseCondFormatSideBar();
        await this.capturescreenshot(TestName,'CondFormatABCClassification'); 
        const res=await this.doVisualRegression(TestName,'CondFormatABCClassification');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - CondFormatABCClassification.png'));
        }
        
        await this.clickCondFormatdropdown();        
        await this.clickABCClassifyToggle();  
        await this.clearSelection(cells.Cell_2_2);     
      },


       //Focus_CondFormat_HeatMap
       async Focus_CondFormat_HeatMap(FeatureName,TestName){       
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_2_2);
        await this.clickCondFormatdropdown();        
        await this.clickHeatMapToggle();
        await this.clickCloseCondFormatSideBar();
        await this.capturescreenshot(TestName,'CondFormatHeatMap'); 
        const res=await this.doVisualRegression(TestName,'CondFormatHeatMap');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - CondFormatHeatMap.png'));
        }
        
        await this.clickCondFormatdropdown();        
        await this.clickHeatMapToggle();    
        await this.clearSelection(cells.Cell_2_2);   
      },



      //Focus_CondFormat_Segmentation
      async Focus_CondFormat_Segmentation(FeatureName,TestName){   
        await this.clickOnHomeTab();      
        await this.selectCell(cells.Cell_2_2);
        await this.clickCondFormatdropdown();        
        await this.clickSegmentationToggle();
        await this.clickCloseCondFormatSideBar();
        await this.capturescreenshot(TestName,'CondFormatSegmentation'); 
        const res=await this.doVisualRegression(TestName,'CondFormatSegmentation');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - CondFormatSegmentation.png'));
        }
       
        await this.clickCondFormatdropdown();        
        await this.clickSegmentationToggle();   
        await this.clearSelection(cells.Cell_2_2);   
      },



       //Focus_HideAllComments
       async Home_Focus_HideAllComments(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_15_5);
        await this.clickAddComment();
        await this.EnterCommentName('Tester9');
        await this.EnterComment('Cell Comment 9');
        await this.ClickSaveComment();
        await this.clickCommentdropdown();
        await this.clickCommentColumnToggle();
        await this.capturescreenshot(TestName,'AddCommentforHide'); 
        const res=await this.doVisualRegression(TestName,'AddCommentforHide');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - AddCommentforHide.png'));
        }
        await this.clickCommentdropdown(); 
        await this.clickCommentHideAll();
        await this.capturescreenshot(TestName,'HideAllComments'); 
        const res1=await this.doVisualRegression(TestName,'HideAllComments');
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - HideAllComments.png'));
        }  
        await this.clickCommentdropdown(); 
        await this.clickCommentHideAll();
      },

      //Focus_CommentColumn
      async Home_Focus_CommentColumn(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.clickCommentdropdown();
        await this.clickCommentColumnToggle();
        await this.capturescreenshot(TestName,'CommentColumn'); 
        const res=await this.doVisualRegression(TestName,'CommentColumn'); 
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - CommentColumn.png'));
        }  
        await this.clickCommentdropdown();
        await this.clickCommentColumnToggle();
        await this.capturescreenshot(TestName,'CommentColumnOff'); 
        const res1=await this.doVisualRegression(TestName,'CommentColumnOff'); 
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - CommentColumnOff.png'));
        } 
        
      },

      //Focus_CommentFootNote
      async Home_Focus_CommentFootNote(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_5_4);
        await this.clickAddComment();
        await this.EnterCommentName('Tester10');
        await this.EnterComment('Cell Comment10');        
        await this.capturescreenshot(TestName,'AddCommentFootNote'); 
        const res=await this.doVisualRegression(TestName,'AddCommentFootNote');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - AddCommentFootNote.png'));
        }
        await this.ClickSaveComment();
        await this.capturescreenshot(TestName,'SaveCommentFootNote'); 
        const res1=await this.doVisualRegression(TestName,'SaveCommentFootNote');
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - SaveCommentFootNote.png'));
        }
        await this.clickCommentdropdown();
        await this.clickCommentFootNoteToggle();
        await this.capturescreenshot(TestName,'CommentFootNote');
        const res2=await this.doVisualRegression(TestName,'CommentFootNote');
        if(res2!='pass')
        {
          const result2 = await tryTo(() => this.see('Image Equality - CommentFootNote.png'));
        }
        await this.clickCommentdropdown();
        await this.clickCommentFootNoteToggle();
        await this.clearSelection(cells.Cell_5_4);  
      },

      //Focus_EditComment
      async Home_Focus_EditComment(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_6_5);
        await this.clickAddComment();
        await this.EnterCommentName('Tester9');
        await this.EnterComment('Cell Comment 9');
        await this.ClickSaveComment();
        await this.capturescreenshot(TestName,'AddCommentforDelete'); 
        const res=await this.doVisualRegression(TestName,'AddCommentforDelete');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - AddCommentforDelete.png'));
        }   
        await this.capturescreenshot(TestName,'SaveCommentforDelete'); 
        const res1=await this.doVisualRegression(TestName,'SaveCommentforDelete');
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - SaveCommentforDelete.png'));
        } 
        await this.ViewComment(cells.Cell_6_5_id);
        await this.capturescreenshot(TestName,'ViewCommentforDelete');
        const res2=await this.doVisualRegression(TestName,'ViewCommentforDelete');
        if(res2!='pass')
        {
          const result2 = await tryTo(() => this.see('Image Equality - ViewCommentforDelete.png'));
        }
        //await this.clickAddComment();
        await this.ClickEditComment();
        await this.EnterCommentName('Tester99');
        await this.EnterComment('Cell Comment 99');
        await this.capturescreenshot(TestName,'EditComment');
        const res3=await this.doVisualRegression(TestName,'EditComment');
        if(res3!='pass')
        {
          const result3 = await tryTo(() => this.see('Image Equality - EditComment.png'));
        }
        await this.ClickSaveComment();
        await this.capturescreenshot(TestName,'CommentAfterEdit');
        const res4=await this.doVisualRegression(TestName,'CommentAfterEdit');
        if(res4!='pass')
        {
          const result4 = await tryTo(() => this.see('Image Equality - CommentAfterEdit.png'));
        }
        await this.clearSelection(cells.Cell_9_2);  
      },

       //Focus_DeleteComment
       async Home_Focus_DeleteComment(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_6_6);
        await this.clickAddComment();
        await this.EnterCommentName('Tester9');
        await this.EnterComment('Cell Comment 9');
        await this.ClickSaveComment();
        await this.capturescreenshot(TestName,'AddCommentforDelete'); 
        const res=await this.doVisualRegression(TestName,'AddCommentforDelete');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - AddCommentforDelete.png'));
        }  
        await this.capturescreenshot(TestName,'SaveCommentforDelete'); 
        const res1=await this.doVisualRegression(TestName,'SaveCommentforDelete');
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - SaveCommentforDelete.png'));
        }  
        await this.ViewComment(cells.Cell_6_6_id);
        await this.capturescreenshot(TestName,'ViewCommentforDelete');
        const res2=await this.doVisualRegression(TestName,'ViewCommentforDelete');
        if(res2!='pass')
        {
          const result2 = await tryTo(() => this.see('Image Equality - ViewCommentforDelete.png'));
        } 
        //await this.clickAddComment();
        await this.DeleteComment();
        await this.capturescreenshot(TestName,'CommentAfterDeletion');
        const res3=await this.doVisualRegression(TestName,'CommentAfterDeletion');
        if(res3!='pass')
        {
          const result3 = await tryTo(() => this.see('Image Equality - CommentAfterDeletion.png'));
        } 
        await this.clearSelection(cells.Cell_6_6);  
      },

       //Focus_AddComment
       async Home_Focus_AddComment(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.Cell_8_2);
        await this.clickAddComment();
        await this.EnterCommentName('Tester');
        await this.EnterComment('Cell Comment');
        await this.ClickSaveComment();
        await this.capturescreenshot(TestName,'AddComment'); 
        const res=await this.doVisualRegression(TestName,'AddComment');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - AddComment.png'));
        } 
        await this.capturescreenshot(TestName,'SaveComment'); 
        const res1=await this.doVisualRegression(TestName,'SaveComment'); 
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - SaveComment.png'));
        } 
        await this.ViewComment(cells.Cell_8_2_id);
        await this.capturescreenshot(TestName,'ViewComment');
        const res2=await this.doVisualRegression(TestName,'ViewComment');
        if(res2!='pass')
        {
          const result2 = await tryTo(() => this.see('Image Equality - ViewComment.png'));
        } 
        await this.clearSelection(cells.Cell_8_2);  
      },

      //Column_TopNPercentage
      async Home_Column_TopNPercentage(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.HeaderOne);
        await this.clickTopN();
        await this.SelectTopNtopbottom('Top');
        await this.SelectTopNType('Percentage');
        await this.EnterTopNInput('30');        
        await this.SelectTopNField('Country');
        await this.capturescreenshot(TestName,'Home_Column_TopNPercentage_CriteriaSelected');  
        await this.clickTopN_Apply();
        await this.capturescreenshot(TestName,'Home_Column_TopNPercentage');   
        await this.saveScreenshot('Home_Column_TopNPercentage.png');
        const res=await this.doVisualRegression(TestName,'Home_Column_TopNPercentage');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Home_Column_TopNPercentage.png'));
        }  
        await this.clickTopN();
        await this.clickTopN_ResetAll();
        await this.clickTopN_Close();
        await this.clearSelection(cells.HeaderOne);  
      },

      //Column_TopNValue
      async Home_Column_TopNValue(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.HeaderOne);
        await this.clickTopN();
        await this.SelectTopNtopbottom('Top');
        await this.SelectTopNType('Value');
        await this.EnterTopNInput('5');        
        await this.SelectTopNField('Country');
        await this.capturescreenshot(TestName,'Home_Column_TopNValue_CriteriaSelected');   
        await this.clickTopN_Apply();
        await this.capturescreenshot(TestName,'Home_Column_TopNValue');   
        await this.saveScreenshot('Home_Column_TopNValue.png');
        const res=await this.doVisualRegression(TestName,'Home_Column_TopNValue');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Home_Column_TopNValue.png'));
        } 
        await this.clickTopN();
        await this.clickTopN_ResetAll();
        await this.clickTopN_Close();
        await this.clearSelection(cells.HeaderOne);  
      },

      //Column_AdvancedFilter
      async Home_Column_AdvancedFilterWithGroup(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.clickFilterdropdown();
        await this.clickAdvancedFilter();     
        await this.SelectFilterFieldAdvanced('Country',1);
        await this.SelectFilterOperatorAdvanced('is',1);
        await this.SelectFilterValueAdvanced('Canada',1);
        await this.clickAdvancedFilterAddGroup();
        await this.SelectFilterFieldAdvanced('Country',2);
        await this.SelectFilterOperatorAdvanced('is',2);
        await this.SelectFilterValueAdvanced('Brazil',2);
        await this.SelectRuleCombinatorOr();
        await this.capturescreenshot(TestName,'Advanced_Filter_Group');
        await this.saveScreenshot('Advanced_Filter_Group.png');
        allure.addAttachment('Advanced_Filter_Group',new Buffer("Advanced_Filter_Group.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Advanced_Filter_Group');  
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Advanced_Filter_Group.png'));
        }  
        await this.clickSortAdvancedFilterApply();

        await this.capturescreenshot(TestName,'Advanced_Filter_Group_Apply');
        const res1=await this.doVisualRegression(TestName,'Advanced_Filter_Group_Apply'); 
        await this.clickFilterdropdown();
        await this.clickSortAdvancedFilterResetAll();
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - Advanced_Filter_Group_Apply.png'));
        } 
       
              
      },

      //Column_AdvancedFilter
      async Home_Column_AdvancedFilter(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.clickFilterdropdown();
        await this.clickAdvancedFilter();     
        await this.SelectFilterFieldAdvanced('Country',1);
        await this.SelectFilterOperatorAdvanced('is',1);
        await this.SelectFilterValueAdvanced('Canada',1);
        await this.capturescreenshot(TestName,'Advanced_Filter_Canada');
        await this.saveScreenshot('Advanced_Filter_Canada.png');
        allure.addAttachment('Advanced_Filter_Canada',new Buffer("Advanced_Filter_Canada.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Advanced_Filter_Canada');  
        if(res!='pass')
        {
        const result = await tryTo(() => this.see('Image Equality - Advanced_Filter_Canada.png'));
        }
        await this.clickSortAdvancedFilterApply();
        await this.capturescreenshot(TestName,'Advanced_Filter_Canada_Apply');
        const res1=await this.doVisualRegression(TestName,'Advanced_Filter_Canada_Apply'); 
        await this.clickFilterdropdown();
        await this.clickFiltersClear();
        await this.clickFilterdropdown(); 
        if(res1!='pass')
        {
        const result1 = await tryTo(() => this.see('Image Equality - Advanced_Filter_Canada_Apply.png'));
        }
             
      },

      //Column_RemoveFilter
      async Home_Column_RemoveFilter(FeatureName,TestName){
        await this.clickOnHomeTab();   
        await this.clickFilterdropdown();
        await this.clickAddFilter();     
        await this.SelectFilterField('Country',1);
        await this.SelectFilterOperator('is',1);
        await this.SelectFilterValue('Poland',1);
        await this.capturescreenshot(TestName,'Add_Filter_Poland');
        await this.saveScreenshot('Add_Filter_Poland.png');
        allure.addAttachment('Add_Filter_Poland',new Buffer("Add_Filter_Poland.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Add_Filter_Poland');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Add_Filter_Poland.png'));
        }  
        await this.clickFilterRemove();
        await this.capturescreenshot(TestName,'Remove_Filter_Poland');
        const res1=await this.doVisualRegression(TestName,'Remove_Filter_Poland');  
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - Remove_Filter_Poland.png'));
        }            
        await this.clickFilterdropdown();           
      },

       //Column_AddFilter
       async Home_Column_AddFilter(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.clickFilterdropdown();
        await this.clickAddFilter();     
        await this.SelectFilterField('Country');
        await this.SelectFilterOperator('is');
        await this.SelectFilterValue('Canada');
        await this.capturescreenshot(TestName,'Add_Filter');
        await this.saveScreenshot('Add_Filter.png');
        allure.addAttachment('Add_Filter',new Buffer("Add_Filter.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Add_Filter');  
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Add_Filter.png'));
        }  
        await this.clickFiltersClear();
        await this.wait(3);
        await this.capturescreenshot(TestName,'Filter_Clear');
        const res1=await this.doVisualRegression(TestName,'Filter_Clear');  
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - Filter_Clear.png'));
        }      
        await this.clickFilterdropdown();    
      },


       //Column_Sort_Descending
       async Home_Column_Sort_Descending(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.HeaderOne);   
        await this.clickSortdropdown();
        await this.clickSortDescending();
        await this.capturescreenshot(TestName,'SortDescending');
        await this.saveScreenshot('SortDescending.png');
        allure.addAttachment('SortDescending',new Buffer("SortDescending.png"),'png');  
        const res=await this.doVisualRegression(TestName,'SortDescending');  
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - SortDescending.png'));
        }
        await this.clickSortdropdown();
        await this.clickSortClear();
        await this.capturescreenshot(TestName,'SortDescending_Clear');
        const res1=await this.doVisualRegression(TestName,'SortDescending_Clear');  
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - SortDescending_Clear.png'));
        }
        await this.clearSelection(cells.HeaderOne);
      },

      //Column_Sort_Ascending
      async Home_Column_Sort_Ascending(FeatureName,TestName){ 
        await this.clickOnHomeTab();  
        await this.selectCell(cells.HeaderOne);   
        await this.clickSortdropdown();
        await this.clickSortAscending();
        await this.capturescreenshot(TestName,'SortAscending');
        await this.saveScreenshot('SortAscending.png');
        allure.addAttachment('SortAscending',new Buffer("SortAscending.png"),'png');  
        const res=await this.doVisualRegression(TestName,'SortAscending'); 
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - SortAscending.png'));
        } 
        await this.clickSortdropdown();
        await this.clickSortClear();
        await this.capturescreenshot(TestName,'SortAscending_Clear');
        const res1=await this.doVisualRegression(TestName,'SortAscending_Clear'); 
        if(res1!='pass')
        {
          const result1 = await tryTo(() => this.see('Image Equality - SortAscending_Clear.png'));
        }  
        await this.clearSelection(cells.HeaderOne);
      },

      //Positions_Column_Cancel
      async Home_Column_Positions_Cancel(FeatureName,TestName){ 
        await this.clickOnHomeTab();     
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_9');
        await this.clickPositions_Cancel();
        await this.saveScreenshot('Positions_Cancel.png');
        allure.addAttachment('Positions_Cancel',new Buffer("Positions_Cancel.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Cancel');  
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Cancel.png'));
        }   
      },

       //Column Positions_Column_GrandTotal_Off
       async Home_Column_Positions_GrandTotal_Off(FeatureName,TestName){ 
        await this.clickOnHomeTab();     
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickColumn_GrandTotal_Off();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_8');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Column_GrandTotal_Off.png');
        allure.addAttachment('Positions_Column_GrandTotal_Off',new Buffer("Positions_Column_GrandTotal_Off.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Column_GrandTotal_Off');  
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Column_GrandTotal_Off.png'));
        }     
      },

       //Column Positions_Column_GrandTotal_Right
       async Home_Column_Positions_GrandTotal_Right(FeatureName,TestName){ 
        await this.clickOnHomeTab();     
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickColumn_GrandTotal_Right();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_7');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Column_GrandTotal_Right.png');
        allure.addAttachment('Positions_Column_GrandTotal_Right',new Buffer("Positions_Column_GrandTotal_Right.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Column_GrandTotal_Right');    
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Column_GrandTotal_Right.png'));
        }   
      },

       //Column Positions_Column_GrandTotal_Left
       async Home_Column_Positions_GrandTotal_Left(FeatureName,TestName){ 
        await this.clickOnHomeTab();     
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickColumn_GrandTotal_Left();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_6');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Column_GrandTotal_Left.png');
        allure.addAttachment('Positions_Column_GrandTotal_Left',new Buffer("Positions_Column_GrandTotal_Left.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Column_GrandTotal_Left');    
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Column_GrandTotal_Left.png'));
        }    
      },

        //Column Positions_Row_SubTotal_Off
       async Home_Column_Positions_Row_SubTotal_Off(FeatureName,TestName){
        await this.clickOnHomeTab();      
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickRow_SubTotal_Off();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_5');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Positions_Row_SubTotal_Off.png');
        allure.addAttachment('Positions_Row_SubTotal_Off',new Buffer("Positions_Row_SubTotal_Off.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Row_SubTotal_Off');    
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Row_SubTotal_Off.png'));
        }    
      },

        
       //Column Positions_Row_SubTotal_Bottom
       async Home_Column_Positions_Row_SubTotal_Bottom(FeatureName,TestName){  
        await this.clickOnHomeTab();    
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickRow_SubTotal_Bottom();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_4');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Positions_Row_SubTotal_Bottom.png');
        allure.addAttachment('Positions_Row_SubTotal_Bottom',new Buffer("Positions_Row_SubTotal_Bottom.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Row_SubTotal_Bottom');     
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Row_SubTotal_Bottom.png'));
        }   
      },


       //Column Positions_Row_SubTotal_Top
       async Home_Column_Positions_Row_SubTotal_Top(FeatureName,TestName){   
        await this.clickOnHomeTab();   
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickRow_SubTotal_Top();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_3');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Positions_Row_SubTotal_Top.png');
        allure.addAttachment('Positions_Row_SubTotal_Top',new Buffer("Positions_Row_SubTotal_Top.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Row_SubTotal_Top');
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Row_SubTotal_Top.png'));
        }      
      },

      //Column Positions_Row_GrandTotal_Off
      async Home_Column_Positions_Row_GrandTotal_Off(FeatureName,TestName){
        await this.clickOnHomeTab();      
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickRow_GrandTotal_Off();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_2');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Positions_Row_GrandTotal_Off.png');
        allure.addAttachment('Positions_Row_GrandTotal_Off',new Buffer("Positions_Row_GrandTotal_Off.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Row_GrandTotal_Off');     
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Row_GrandTotal_Off.png'));
        } 
      },

      //Column Positions_Row_GrandTotal_Bottom
      async Home_Column_Positions_Row_GrandTotal_Bottom(FeatureName,TestName){ 
        await this.clickOnHomeTab();     
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickRow_GrandTotal_Bottom();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected_1');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Positions_Row_GrandTotal_Bottom.png');
        allure.addAttachment('Positions_Row_GrandTotal_Bottom',new Buffer("Positions_Row_GrandTotal_Bottom.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Row_GrandTotal_Bottom');    
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Row_GrandTotal_Bottom.png'));
        }  
      },


      //Column Positions_Row_GrandTotal_Top
      async Home_Column_Positions_Row_GrandTotal_Top(FeatureName,TestName){  
        await this.clickOnHomeTab();    
        await this.clickTotaldropdown();
        await this.clickPositions();
        await this.clickRow_GrandTotal_Top();
        await this.capturescreenshot(TestName,'Positions_OptionsSelected');
        await this.clickPositions_Apply();
        await this.saveScreenshot('Positions_Row_GrandTotal_Top.png');
        allure.addAttachment('Positions_Row_GrandTotal_Top',new Buffer("Positions_Row_GrandTotal_Top.png"),'png');  
        const res=await this.doVisualRegression(TestName,'Positions_Row_GrandTotal_Top'); 
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - Positions_Row_GrandTotal_Top.png'));
        }      
      },

    //Select a cell
    async selectCell(element) {
      this.waitForElement(element, process.env.WAIT_LOW);
      this.click(element);
      this.say('Selected value on grid ' + (await this.grabTextFrom(element)).toString() );
      log.info('Select first cell on Matrix Grid'+this.name);

    },

    clearSelection(element){
      this.click(element);
      log.info('Clear Selection first cell on Matrix Grid');
    },
    async selectRow(element) {
      this.waitForElement(element, process.env.WAIT_LOW);
      this.click(element);
      this.say('Selected Row on grid ' + (await this.grabTextFrom(element)).toString() );
    },
    async selectColumn(element) {
      this.waitForElement(element, process.env.WAIT_LOW);
      this.click(element);
      this.say('Selected Columns on grid ' + (await this.grabTextFrom(element)).toString() );
    },

     //Disable Footer
     async clickOnDisableFooter() {       
      this.click(toolBar.AdvancedTab.Header_Footer.DisableFooter);    
      this.wait(5);  
    },

     //Enable Footer
     async clickOnEnableFooter() {       
      this.click(toolBar.AdvancedTab.Header_Footer.EnableFooter);    
      this.wait(5);  
    },
     //Disable Header
     async clickOnDisableHeader() {       
      this.click(toolBar.AdvancedTab.Header_Footer.DisableHeader);    
      this.wait(5);  
    },

     //Enable Header
    async clickOnEnableHeader() {       
      this.click(toolBar.AdvancedTab.Header_Footer.EnableHeader);    
      this.wait(5);  
    },

     //Page Number XByY
     clickOnInsertPageNumberX() {
      this.click(toolBar.AdvancedTab.Header_Footer.PageX);    
      this.wait(1);  
    },

    //Page Number XByY
    clickOnInsertPageNumberXByY() {
      this.click(toolBar.AdvancedTab.Header_Footer.PageXbyY);    
      this.wait(1);  
    },

     //Date YYYY-MM-DD
     clickOnDeleteHyphenDateMM_DD_YYYY(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYY.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYYDelete);    
      this.wait(1);  
    },

     //Date YYYY-MM-DD
     clickOnDeleteHyphenDateMM_DD_YYYYFooter(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYY.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYYDelete);    
      this.wait(1);  
    },

     //Date MM/DD/YYYY
     clickOnDeleteSlashDateMM_DD_YYYY(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYY.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYYDelete);    
      this.wait(1);  
    },

    //Date MM/DD/YYYY
    clickOnDeleteSlashDateMM_DD_YYYYFooter(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYY.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYYDelete);    
      this.wait(1);  
    },

    //Date MM/DD/YYYY
    clickOnDeleteDateMM_DD_YYYYFooter(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYY.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYYDelete);    
      this.wait(1);  
    },

    //Date MM/DD/YYYY
    clickOnDeleteDateMM_DD_YYYY(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYY.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYYDelete);    
      this.wait(1);  
    },

    //Page Number X
    clickOnDeletePageNumberXFooter(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.FooterPageXeditor.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.FooterPageXDelete);    
      this.wait(1);  
    },

    //Page Number X
    clickOnDeletePageNumberX(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.PageXeditor.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.PageXDelete);    
      this.wait(1);  
    },

      //Page Number XbyY
      clickOnDeletePageNumberXbyYFooter(ind) {
        this.click(toolBar.AdvancedTab.Header_Footer.FooterPageXbyYeditor.at(ind))
        this.click(toolBar.AdvancedTab.Header_Footer.FooterPageXbyYDelete);    
        this.wait(1);  
      },

     //Page Number XbyY
     clickOnDeletePageNumberXbyY(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.PageXbyYeditor.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.PageXbyYDelete);    
      this.wait(1);  
    },

     //Page Number XofY
     clickOnDeletePageNumberXofYFooter(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.FooterPageXofYeditor.at(ind));
      this.click(toolBar.AdvancedTab.Header_Footer.FooterPageXofYDelete);    
      this.wait(1);  
    },

     //Page Number XofY
     clickOnDeletePageNumberXofY(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.PageXofYeditor.at(ind))
      this.click(toolBar.AdvancedTab.Header_Footer.PageXofYDelete);    
      this.wait(1);  
    },

    //Date Time MM_DD_YYYY
    clickOnInsertDateTimeMM_DD_YYYY(typ) {
      this.click(locate(toolBar.AdvancedTab.Header_Footer.DateTimeType).withText(typ));    
      this.wait(1);  
    },
    
     //Page Number XofY
     clickOnInsertPageNumberXofY() {
      this.click(toolBar.AdvancedTab.Header_Footer.PageXofY);    
      this.wait(1);  
    },

     //DateTime Drop Down - Header and Footer
     clickOnDateTimeDropDown() {
      this.click(toolBar.AdvancedTab.Header_Footer.DateTimedropdown);    
      this.wait(1);  
    },

    //Delete TextBox - Header and Footer
    async clickOnDeleteField(ind) {
      await this.click(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValue).withText('America').at(ind));
      await this.click(locate(toolBar.AdvancedTab.Header_Footer.FieldDelete).at(ind));    
      await this.wait(1);  
    },

    //Delete TextBox - Header and Footer
    clickOnDeleteTextBoxFooter(ind) {
      this.click(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor.at(ind))
      this.click(locate(toolBar.AdvancedTab.Header_Footer.TextBoxDeleteFooter).at(ind));    
      this.wait(1);  
    },

     //Delete TextBox - Header and Footer
     async clickOnDeleteTextBox(ind) {
      await this.click(toolBar.AdvancedTab.Header_Footer.TextBoxeditor.at(ind));
      await this.click(locate(toolBar.AdvancedTab.Header_Footer.TextBoxDelete).at(ind));    
      await this.wait(1);  
    },

    //Delete Image - Header and Footer
    async clickOnDeleteImageFooter(ind) {
      await this.click(toolBar.AdvancedTab.Header_Footer.ImageCanvasFooter.at(ind));
      await this.click(toolBar.AdvancedTab.Header_Footer.ImageDeleteFooter);    
      await this.wait(1);  
    },


    //Delete Image - Header and Footer
    async clickOnDeleteImage(ind) {
      await this.click(toolBar.AdvancedTab.Header_Footer.ImageCanvas.at(ind));
      await this.click(locate(toolBar.AdvancedTab.Header_Footer.ImageDelete).at(ind));    
      await this.wait(1);  
    },

     //Insert Field - Header and Footer
     clickOnInsertField() {
      this.click(toolBar.AdvancedTab.Header_Footer.Fielddropdown); 
      this.click(toolBar.AdvancedTab.Header_Footer.FieldName);    
      this.wait(1);  
    },

     //Insert TextBox - Header and Footer
     clickOnInsertTextBox() {
      this.click(toolBar.AdvancedTab.Header_Footer.TextBox);    
      this.wait(1);  
    },

     //Insert Image - Header and Footer
     clickOnInsertImage() {
      this.click(toolBar.AdvancedTab.Header_Footer.InsertImage);    
      this.wait(1);  
    },

    //Page Number Drop Down - Header and Footer
    clickOnPageNumberDropDown() {
      this.click(toolBar.AdvancedTab.Header_Footer.PageNumberdropdown);    
      this.wait(1);  
    },

    //Advanced Header & Footer SelectAllText
    selectAllTextHeader(selectelement) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.wait(2);  
    },


    //Advanced Header & Footer Underline Click
    clickOnHeaderFooterFillColor(selectelement) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.Underline); 
      this.wait(1);    
      this.doubleClick(selectelement); 
      this.wait(2);  
    },

    //Advanced Header & Footer Underline Click
    clickOnHeaderUnderline(selectelement) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.Underline); 
      this.wait(1);    
      this.doubleClick(selectelement); 
      this.wait(2);  
    },

    //Advanced Header & Footer Underline Click
    clickOnFooterUnderline(selectelement,ind) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.Underline); 
      this.wait(1);    
      this.doubleClick(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(ind)); 
      this.wait(2);    
    },

     //Advanced Header & Footer Italic Click
     clickOnHeaderItalic(selectelement) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.italic); 
      this.wait(1);    
      this.doubleClick(selectelement); 
      this.wait(2);  
    },

    //Advanced Header & Footer Italic Click
    clickOnFooterItalic(selectelement,ind) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.italic); 
      this.wait(1);    
      this.doubleClick(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(ind)); 
      this.wait(2);  
    },


    clickOnHeaderBold(selectelement) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.Bold); 
      this.wait(1);    
      this.doubleClick(selectelement); 
      this.wait(2);  
    },

     //Advanced Header & Footer Bold Click
     clickOnFooterBold(selectelement,ind) {
      this.click(selectelement);
      this.pressKey('ctrl+a');
      this.click(toolBar.AdvancedTab.Header_Footer.Bold); 
      this.wait(1);    
      this.doubleClick(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(ind)); 
      this.wait(2);  
    },

     //Advanced Header & Footer Click
     clickOnHeaderFooter() {
      this.click(toolBar.AdvancedTab.Reporting.HeaderFooter);    
      this.wait(5);  
    },

    //Advanced ReorderRows click
    clickOnReorderRows() {
      this.click(toolBar.AdvancedTab.Customize.ReorderRows);    
      this.wait(3);  
    },

     //Advanced Verify CategorySigns
     async verifyCategorySigns() {
      const noofrows=await this.grabNumberOfVisibleElements(locate({xpath:'//div[contains(@id,"table-col-0")]'}));
      const noofcatsignrow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Customize.CategorySignOptions);
      this.say('Category Signs impacted rows');
      this.assert(noofrows,noofcatsignrow,'Expected Value and Actual Value of Category Sign impacted rows');      
    },

     //Advanced CategorySigns click
     clickOnInvert() {
      this.click(toolBar.AdvancedTab.Customize.InvertSign);    
      this.wait(3);  
    },


     //Advanced CategorySigns click
     clickOnCategorySigns() {
      this.click(toolBar.AdvancedTab.Customize.CategorySign);    
      this.wait(3);  
    },

    //Advanced CellEditing
    async InputCellEditing(val,TestName,screenshotname) {
      await this.fillField(toolBar.AdvancedTab.Customize.CellEditingDiv,val);
      //await this.inputcelledit(val);
      await this.storescreenshot(TestName,screenshotname);
      await this.click(toolBar.AdvancedTab.Customize.CellEditingUpdateBtn);  
      
    },


     //Advanced ReportLayout click
     clickOnReportLayout() {
      this.click(toolBar.AdvancedTab.Reporting.ReportLayout);    
      this.wait(3);  
    },

    //Advanced Tab click
    async calculatedMeasureInput(lbl,calculation,formul,desc,rowaggtype,TestName,screenshotname) {
      if(lbl!='NA')
      {
        await this.fillField(toolBar.AdvancedTab.Customize.InsertMeasureLabel,lbl);
      }
      if(calculation!='NA')
      {
        await this.click(toolBar.AdvancedTab.Customize.InsertMeasureSelectCalculation);
        await this.click(locate(toolBar.AdvancedTab.Customize.InsertMeasureSelectCalculationOption).withText(calculation));
      }
      if(formul!='NA')
      {
        await this.click(toolBar.AdvancedTab.Customize.InsertRowFormula);
        await this.click(locate(toolBar.AdvancedTab.Customize.InsertRowFormulaOptions).withText(formul));      
      }
     
      if(desc!='NA')
      {
        await this.fillField(toolBar.AdvancedTab.Customize.InsertRowDescription,desc);      
      }
      if(rowaggtype!='NA')
      {
        await this.click(toolBar.AdvancedTab.Customize.InsertMeasureSelectAgg);
        await this.click(locate(toolBar.AdvancedTab.Customize.InsertMeasureSelectAggOption).withText(rowaggtype));         
      }
      await this.storescreenshot(TestName,screenshotname);
      await this.click(toolBar.AdvancedTab.Customize.InsertRowApplyBtn);    
      await this.click(toolBar.AdvancedTab.Customize.InsertRowCloseBtn); 
      await this.wait(2);  
    },

    
     //Advanced Tab click
     async calculatedRowInput(lbl,formul,inctot,desc,TestName,screenshotname) {
      if(lbl!='NA')
      {
        await this.fillField(toolBar.AdvancedTab.Customize.InsertRowLabel,lbl);
      }
      if(formul!='NA')
      {
        await this.click(toolBar.AdvancedTab.Customize.InsertRowFormula);
        await this.click(locate(toolBar.AdvancedTab.Customize.InsertRowFormulaOptions).withText(formul));      
      }
      if(inctot==='true')
      {
        await this.click(toolBar.AdvancedTab.Customize.InsertRowIncludeinTotalCheckBox);        
      }
      if(desc!='NA')
      {
        await this.fillField(toolBar.AdvancedTab.Customize.InsertRowDescription,desc);      
      }
      await this.storescreenshot(TestName,screenshotname);
      await this.click(toolBar.AdvancedTab.Customize.InsertRowApplyBtn);    
      await this.click(toolBar.AdvancedTab.Customize.InsertRowCloseBtn); 
      await this.wait(2);  
    },

    //Advanced Insert Column Option
    clickonInsertColumnOption(opti) {
      this.click(toolBar.AdvancedTab.Customize.InsertColumn);    
      this.wait(2);  
      this.click(toolBar.AdvancedTab.Customize.InsertRowOptions.withText(opti));
      this.wait(3);
    },

    //Advanced Insert Row Option
    clickonInsertRowOption(opti) {
      this.click(toolBar.AdvancedTab.Customize.InsertRow);    
      this.wait(2);  
      this.click(toolBar.AdvancedTab.Customize.InsertRowOptions.withText(opti));
      this.wait(3);
    },

    //Select Row Aggregationtype
    SelectRowAggTypeAdvancedTab(typ) {
      this.click(toolBar.AdvancedTab.Analytics.RowAggregationdropdown);
      this.click(toolBar.AdvancedTab.Analytics.RowAggregationType.withText(typ));    
      this.wait(5);  
    },

    //Edit Alert Config
    async EditAlertConfig(recordno,FilterField,FilterOperator,FilterValue,TestName,scname) {   
      var editbuttonlocator=toolBar.AdvancedTab.Analytics.EditRuleBtn.replace('ind',recordno);
      var editbutton=locate({xpath:editbuttonlocator});
      await this.click(editbutton);
      await this.click(toolBar.AdvancedTab.Analytics.EditAlertConfigBtn);
      await this.SelectFilterField(FilterField,1);
      await this.SelectFilterOperator(FilterOperator,1);
      await this.SelectFilterValue(FilterValue,1);
      await this.click(toolBar.AdvancedTab.Analytics.EditConfigApplyBtn);
    },

    //Duplicate Rule
    async DuplicateRule(alertname,TestName,scname) {      
      var duplicatelocator=toolBar.AdvancedTab.Analytics.DuplicateRule.replace('alertname',alertname);
      var alertsearchlocator=toolBar.AdvancedTab.Analytics.AlertSearch.replace('alertname','copy of '+alertname);
      var alertfound=await this.grabNumberOfVisibleElements(alertsearchlocator);
      await this.click(locate({xpath:duplicatelocator}));
      await this.storescreenshot(TestName,'DuplicateRule_'+scname);
      var alertfoundnow=await this.grabNumberOfVisibleElements(alertsearchlocator);
      //switch off the alerts
      var offRuleLocator=toolBar.AdvancedTab.Analytics.OffRule.replace('alertname','copy of '+alertname);
      await this.click(locate({xpath:offRuleLocator}));
      var offRuleLocator1=toolBar.AdvancedTab.Analytics.OffRule.replace('alertname',alertname);
      await this.click(locate({xpath:offRuleLocator1}));
      if(alertfoundnow>alertfound)
      {
        await this.assert(1,1,'Duplicate rule added');
      }
      else
      {
        await this.assert(1,0,'Duplicate rule NOT added');
      }

    },


    //Edit Alert
    async EditAlert(recordno,alertname,alertemail,TestName,scname) {      
      var editbuttonlocator=toolBar.AdvancedTab.Analytics.EditRuleBtn.replace('ind',recordno);
      var editbutton=locate({xpath:editbuttonlocator});
      await this.click(editbutton);
      await this.fillField(toolBar.AdvancedTab.Analytics.EditAlertName,alertname);
      await this.fillField(toolBar.AdvancedTab.Analytics.EditAlertEmail,alertemail);
      await this.storescreenshot(TestName,'EditAlert_'+scname);
      await this.click(toolBar.AdvancedTab.Analytics.EditAlertApplyBtn);
    },

     //Add Alert
     async AddAlert(TestName,scname) {
      var alertpanelshown=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Analytics.AlertPanel);
      if(alertpanelshown<1)
      await this.click(toolBar.AdvancedTab.Analytics.Alert);
      var alertlistcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Analytics.AlertList);
      await this.click(toolBar.AdvancedTab.Analytics.AddNewAlert);
      await this.storescreenshot(TestName,'AddAlert_'+scname);
      var alertlistcountnew=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Analytics.AlertList);
      if(alertlistcountnew-1===alertlistcount)
      {
        await this.assert(1,1,'Add Alert done');
      }
      else
      {
        await this.assert(1,0,'Add Alert did not add records');
      }
    },

    async InputSubTotPaddAdvancedTab(typ,TestName,scname,val) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeInputType.replace("ThemeType",typ);
      await this.fillField(locate(templ),val);    
      await this.wait(1);  
      await this.storescreenshot(TestName,scname+'_'+val); 
      var subtotpaddval=val;
      var loc1=toolBar.AdvancedTab.Display.RegionHeading;
      var regionelementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1})); 
      var i;
      for(i=0;i<regionelementscount;i++)
      {
        element_id=await this.grabAttributeFrom(locate({xpath:loc1}).at(i+1),'id');
        row_no=element_id.split('_');
        var j=0;
        var temp_loc='//div[starts-with(@id,"'+ row_no[0] +'_")]//span/parent::div';
        var region_row_cells_count=await this.grabNumberOfVisibleElements(locate({xpath:temp_loc}));
        for(j=0;j<region_row_cells_count;j++)
        {
          var element=locate({xpath:temp_loc}).at(j+1);
          propertyValue=await (await this.grabAttributeFrom(locate(element), 'style')).toString();
          this.assertStringIncludes(propertyValue,'padding-top: '+subtotpaddval+'px');
        }
      }
    },

    //RowHeight
    async InputRowHeightAdvancedTab(typ,TestName,scname,val) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeInputType.replace("ThemeType",typ);
      await this.fillField(locate(templ),val);    
      await this.wait(1);  
      await this.storescreenshot(TestName,scname+'_'+val); 
      var loc1=toolBar.AdvancedTab.Display.RegionHeading;
      var regionelementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1})); 
      var i;
      var subtotPaddingLoc=toolBar.AdvancedTab.Display.AppearanceTableThemeInputType.replace("ThemeType",'Sub-Total Padding');
      var subtotpaddval=await this.grabAttributeFrom(subtotPaddingLoc,'value');
     
      var exp_heading_row_height=Number.parseInt(subtotpaddval)+Number.parseInt(val);
      var exp_cell_row_height=Number.parseInt(val);
      var non_heading_row='//div[starts-with(@id,"table-row")';
      for(i=0;i<regionelementscount;i++)
      {
        element_id=await this.grabAttributeFrom(locate({xpath:loc1}).at(i+1),'id');
        row_no=element_id.split('_');
        var j=0;
        var temp_loc='//div[starts-with(@id,"'+ row_no[0] +'")]/parent::div';
        non_heading_row=non_heading_row+'and not(starts-with(@id,"'+ row_no[0] +'"))';
        var region_row_cells_count=await this.grabNumberOfVisibleElements(locate({xpath:temp_loc}));
        for(j=0;j<region_row_cells_count;j++)
        {
          var element=locate({xpath:temp_loc}).at(j+1);
          propertyValue=await (await this.grabAttributeFrom(locate(element), 'style')).toString();
          this.assertStringIncludes(propertyValue,'height: '+exp_heading_row_height+'px');
        }
      }
      non_heading_row=non_heading_row+']/parent::div';
      var row_cells_count=await this.grabNumberOfVisibleElements(locate({xpath:non_heading_row}));
      for(j=0;j<row_cells_count;j++)
      {
        var element1=locate({xpath:non_heading_row}).at(j+1);
        propertyValue=await (await this.grabAttributeFrom(locate(element1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'height: '+exp_cell_row_height+'px');
      }
    },

    //Disable Group in Column
    async CheckDisableGroupAppearnceAdvancedTab(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeInputType.replace("ThemeType",typ);
      var checkboxstatus=''
      checkboxstatus=await (await this.grabAttributeFrom(templ, 'aria-checked')).toString();        
      var res='';
      if(opt==="On" && checkboxstatus==='false')
      {
        await this.click(locate(templ));    
        await this.wait(2);  
        await this.storescreenshot(TestName,'DisableGroup_On_'+scname); 
        res=await this.doVisualRegression(TestName,'DisableGroup_On_'+scname);
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - DisableGroup_On_'+scname+'.png'));
        } 
      }
      else if(opt==="Off" && checkboxstatus==='true')
      {
        await this.click(locate(templ));    
        await this.wait(2);  
        await this.storescreenshot(TestName,'DisableGroup_Off_'+scname); 
        res=await this.doVisualRegression(TestName,'DisableGroup_Off_'+scname);
        if(res!='pass')
        {
          const result = await tryTo(() => this.see('Image Equality - DisableGroup_Off_'+scname+'.png'));
        } 
      }

    },

    //Check ChildCount
    async CheckChildCountAppearnceAdvancedTab(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeInputType.replace("ThemeType",typ);
      var checkboxstatus=''
      checkboxstatus=await (await this.grabAttributeFrom(templ, 'aria-checked')).toString();        
      var loc='';
      var childcount='';
      if(opt==="On" && checkboxstatus==='false')
      {
        await this.click(locate(templ));    
        await this.wait(2);  
        await this.storescreenshot(TestName,'EnableChildCount_'+scname); 
        loc=toolBar.AdvancedTab.Display.ChildCount;
        childcount=await this.grabNumberOfVisibleElements(loc);
        var i=0;
        var headingtext='';
        var rec_count=0;
        for(i=0;i<childcount;i++)
        {
          loc=locate(toolBar.AdvancedTab.Display.ChildCount).at(i+1);
          headingtext=await this.grabTextFrom(loc);
          headingtext=headingtext.match(/(\d+)/);
          this.say(headingtext[0]);
          rec_count=rec_count+Number.parseInt(headingtext[0]);
        }
        loc=locate(toolBar.AdvancedTab.Display.StatusBarTotal);
        headingtext=await this.grabTextFrom(loc);
        headingtext=headingtext.match(/(\d+)/);
        this.say(headingtext[0]);
        await this.assert(Number.parseInt(headingtext[0]),rec_count+childcount,'Child Count and Staus Bar Total count Match')

      }
      else if(opt==="Off" && checkboxstatus==='true')
      {
        await this.click(locate(templ));    
        await this.wait(2);  
        loc=toolBar.AdvancedTab.Display.ChildCount;
        childcount=await this.grabNumberOfVisibleElements(loc);
        await this.storescreenshot(TestName,'EnableChildCount_'+scname); 
        await this.assert(0,childcount,'Child Count Visibility');
      }

    },

     //Select StatusBar
     async SelectStatusBarAppearnceAdvancedTab(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));    
      await this.wait(2);  
      var optionloc=locate({xpath:toolBar.AdvancedTab.Display.ThemeSelectOption}).withText(opt);
      await this.click(optionloc);
      await this.storescreenshot(TestName,'StatusBar_'+scname);  
      if(opt==="On")
      {
        await this.seeElement(toolBar.AdvancedTab.Display.statusBarenabled);
        await this.dontSeeElement(toolBar.AdvancedTab.Display.statusBardisabled);
      }
      else
      {
        await this.seeElement(toolBar.AdvancedTab.Display.statusBardisabled);
        await this.dontSeeElement(toolBar.AdvancedTab.Display.statusBarenabled);
      }
    },


    //Select Theme
    async SelectThemeAppearnceAdvancedTab(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));    
      await this.wait(2);  
      var optionloc=locate({xpath:toolBar.AdvancedTab.Display.ThemeSelectOption}).withText(opt);
      await this.click(optionloc);
      await this.storescreenshot(TestName,'ThemeType_'+scname);  
    },

     //Verify NoBorderRight
     async verifyNoBorderRight(element){
      var attrib='style';
      var res=''
      try
      {
        var c = await (await this.grabAttributeFrom(element, 'style')).toString();
        await this.say('Property Value: '+c);
        var val_4=c.includes('border-right');      
        if(val_4===false)
          res='pass';  
         else
         res='fail';          
      }
      catch(err)
      {
        log.info('Validation Output:::'+err);
        res='fail';              
      }
      return res;
},



     //Verify Border
     async verifyNoBorderBottom(element){
      var attrib='style';
      var res=''
      try
      {
        var c = await (await this.grabAttributeFrom(element, 'style')).toString();
        await this.say('Property Value: '+c);
        var val_4=c.includes('border-bottom');      
        if(val_4===false)
          res='pass';  
         else
         res='fail';          
      }
      catch(err)
      {
        log.info('Validation Output:::'+err);
        res='fail';              
      }
      return res;
},

     //Select CompactLine
     async SelectCompactLine(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));    
      await this.wait(2);  
      var loc='';
      var optionloc='';
      loc=toolBar.AdvancedTab.Display.ThemeSelectOption;
      optionloc=locate({xpath:loc}).withText(opt);   
      await this.click(optionloc); 
      var loc1=toolBar.AdvancedTab.Display.CompactLineCells;
      var regionelementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1}));
      var i=0;
      var validation_text;
      await this.storescreenshot(TestName,'ThemeType_'+scname);  
      if(opt==='On')
      {
        validation_text='1px solid rgb(166, 166, 166)';
        for(i=0;i<regionelementscount;i++)
        {
          res1=await this.verifyBorder(locate({xpath:loc1}).at(i+1),'border-right',validation_text);                
          if(res1==='fail') 
          await this.assert(true,false,'Value comparison failed');
        }
      }
      else if(opt==='Off')
      {
        for(i=0;i<regionelementscount;i++)
        {
          res1=await this.verifyNoBorderRight(locate({xpath:loc1}).at(i+1));                
          if(res1==='fail') 
          await this.assert(true,false,'Value comparison failed');
        }
      }
     },

     //Select MinorGridlines
     async SelectMinorGridlines(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));    
      await this.wait(2);  
      var loc='';
      var optionloc='';
      loc=toolBar.AdvancedTab.Display.ThemeSelectOption;
      optionloc=locate({xpath:loc}).withText(opt);   
      await this.click(optionloc);   
      var loc1=toolBar.AdvancedTab.Display.NonHeading;
      var regionelementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1}));             
      var i=0;
      var validation_text;
      await this.storescreenshot(TestName,'ThemeType_'+scname);  
      if(opt==='Solid Lines')
      {
        validation_text='0.5px solid rgb(200, 200, 200)';
      }
      else if(opt==='Dashed Lines')
      {
        validation_text='1px hidden rgb(200, 200, 200)';
      }
      else
      {
        validation_text='';
      }

      var element_id;
      var row_no;
      for(i=0;i<regionelementscount-1;i++)
      {
        element_id=await this.grabAttributeFrom(locate({xpath:loc1}).at(i+1),'id');
        row_no=element_id.split('_');
        var j=0;
        var temp_loc='//div[contains(@id,"'+ row_no[0] +'_")]';
        var cell_count=await this.grabNumberOfVisibleElements(locate({xpath:temp_loc})); 
        var res1;
        for(j=0;j<cell_count;j++)
        {
          await this.say(locate({xpath:temp_loc}).at(j+1));
          if(validation_text==='')
          {
            res1=await this.verifyNoBorderBottom(locate({xpath:temp_loc}).at(j+1));
            if(res1==='fail') 
            await this.assert(true,false,'Value comparison failed');
          }
          else
          {
            if(opt==='Dashed Lines')
            {
              temp_loc='//div[contains(@id,"'+ row_no[0] +'_")]//span[@class="bottomDashedLine"]';
              var cnt=await this.grabNumberOfVisibleElements(locate({xpath:temp_loc}).at(j+1));
              if(cnt<1)
              res1='fail';

            }
            else
            {
              res1=await this.verifyBorder(locate({xpath:temp_loc}).at(j+1),'border-bottom',validation_text);                
            }
            if(res1==='fail') 
            await this.assert(true,false,'Value comparison failed');
          }
        }
      }     
            
    },

     //Select MajorGridlines
     async SelectMajorGridlines(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));     
      var loc='';
      var optionloc='';
      loc=toolBar.AdvancedTab.Display.ThemeSelectOption;
      optionloc=locate({xpath:loc}).withText(opt);   
      await this.click(optionloc);   
      var loc1=toolBar.AdvancedTab.Display.RegionHeading;
      var regionelementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1}));             
      var i=0;
      var validation_text;
      await this.storescreenshot(TestName,'ThemeType_'+scname);  
      if(opt==='Single')
      {
        validation_text='1px solid rgb(102, 102, 102)';
      }
      else if(opt==='Double')
      {
        validation_text='4px solid rgb(102, 102, 102)';
      }
      else
      {
        validation_text='';
      }

      var element_id;
      var row_no;
      for(i=0;i<regionelementscount;i++)
      {
        element_id=await this.grabAttributeFrom(locate({xpath:loc1}).at(i+1),'id');
        row_no=element_id.split('_');
        var j=0;
        var temp_loc='//div[contains(@id,"'+ row_no[0] +'_")]';
        var cell_count=await this.grabNumberOfVisibleElements(locate({xpath:temp_loc})); 
        var res1;
        for(j=0;j<cell_count;j++)
        {
          await this.say(locate({xpath:temp_loc}).at(j+1));
          if(validation_text==='')
          {
            res1=await this.verifyNoBorderBottom(locate({xpath:temp_loc}).at(j+1));
            if(res1==='fail') 
            await this.assert(true,false,'Value comparison failed');
          }
          else
          {
            res1=await this.verifyBorder(locate({xpath:temp_loc}).at(j+1),'border-bottom',validation_text);                
            if(res1==='fail') 
            await this.assert(true,false,'Value comparison failed');
          }
        }
      }     
            
    },


    //Select RowExpColl
    async SelectRowExpColl(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));    
      await this.wait(2);  
      var loc='';
      var optionloc='';
      loc=toolBar.AdvancedTab.Display.ThemeSelectOption;
      optionloc=locate({xpath:loc}).withText(opt);   
      await this.click(optionloc);   
      var loc1='';        
      if(opt==='Always present')
      {
        loc1='//span[@aria-label="Expand/Collapse" and not(contains(@class,"isRowExpandCollapseIcon"))]';
      }
      else
      {
        await this.moveCursorTo(locate({xpath:'//div[@class="mrx-zoom-container"]'}));  
        loc1='//span[@aria-label="Expand/Collapse" and contains(@class,"isRowExpandCollapseIcon")]';
      }
      await this.storescreenshot(TestName,'ThemeType_'+scname);  
      const elementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1}));
      await this.assert(elementscount>0,elementscount>0,'Row Expand/Collapse '+opt);
    },

     //Select HierarchyIconStyle
     async SelectHierarchyIconStyle(typ,TestName,scname,opt) {
      var templ=toolBar.AdvancedTab.Display.AppearanceTableThemeSelectType.replace("ThemeType",typ);
      await this.click(locate(templ));    
      await this.wait(2);  
      var loc='';
      var optionloc='';
      if(opt==='None')
      {
        loc=toolBar.AdvancedTab.Display.ThemeSelectOption;
        optionloc=locate({xpath:loc}).withText(opt);        
      }
      else
      {
        loc=toolBar.AdvancedTab.Display.ThemeSelectOption+'[contains(@class,"'+ opt +'")]';
        optionloc=locate({xpath:loc});              
      }
      await this.click(optionloc);    
      await this.moveCursorTo(locate({xpath:'//div[@class="mrx-zoom-container"]'}));  
      await this.storescreenshot(TestName,'ThemeType_'+scname);  
      var loc1='';
      await this.say(opt);
      switch(opt){
        case 'UpDown':
          loc1='//span[@aria-label="Expand/Collapse" and (contains(@class,"ChevronRight") or contains(@class,"ChevronDown"))]';
          break;
        case 'PlusMinus':
          loc1='//span[@aria-label="Expand/Collapse" and (contains(@class,"ms-Icon--Remove") or contains(@class,"ms-Icon--Add"))]';
          break;
        case 'PlusMinusSolid':
          loc1='//span[@aria-label="Expand/Collapse" and (contains(@class,"ms-Icon--Blocked2") or contains(@class,"ms-Icon--CircleAddition"))]';
          break;
        case 'PlusMinusSquare':
          loc1='//span[@aria-label="Expand/Collapse" and (contains(@class,"ms-Icon--ExploreContentSingle") or contains(@class,"ms-Icon--CollapseContentSingle"))]';
          break;
        case 'CaretBottomRight':
          loc1='//span[@aria-label="Expand/Collapse" and (contains(@class,"ms-Icon--CaretRight8") or contains(@class,"ms-Icon--CaretBottom"))]';
          break;
        case 'None':
          loc1='//span[@aria-label="Expand/Collapse"]';
          break;
        default:
          loc1='';
      }

      const elementscount=await this.grabNumberOfVisibleElements(locate({xpath:loc1}));
      if(opt==='None')
      {
        await this.assert(0,elementscount,'Hierarchy ICON style None');
      }
      else
      {
        await this.assert(elementscount>0,elementscount>0,'Hierarchy ICON style '+opt);
      }

    },

    //Select TemplateType
    async SelectTemplateTypeAdvancedTab(typ,TestName,scname) {
      await this.click(toolBar.AdvancedTab.Display.Templates);
      var templ=toolBar.AdvancedTab.Display.TemplateType.replace("templatetype",typ);
      await this.click(locate(templ));    
      this.wait(5);  
      await this.storescreenshot(TestName,'TemplateType_'+scname);
      const res=await this.doVisualRegression(TestName,'TemplateType_'+scname);
      if(res!='pass')
      {
        const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
      } 
    },

    async SmartAnalysisTypeSelect(typ){
      await this.click(toolBar.AdvancedTab.Analytics.SmartAnalysisdropdown);
      var templ=toolBar.AdvancedTab.Analytics.SmartAnalysisType.replace("analysistype",typ);
      await this.click(locate(templ));    
    },

     //Select SmartAnalysisType
     async SmartAnalysisTypeAdvancedTab(rowno,typ,TestName,scname) {
      await this.click(rowno);
      await this.click(toolBar.AdvancedTab.Analytics.SmartAnalysisdropdown);
      var templ=toolBar.AdvancedTab.Analytics.SmartAnalysisType.replace("analysistype",typ);
      await this.click(locate(templ));    
      this.wait(5);  
      await this.storescreenshot(TestName,'AnalysisType_'+scname);
    },

    //Apperanceclick
    async clickOnAppearance() {
      await this.click(toolBar.AdvancedTab.Display.Appearance);    
      await this.wait(3);  
    },

     //Advanced Tab click
     async clickOnHomeTab() {
       await this.moveCursorTo(toolBar.HomeTab.Common.Home_header);
      await this.click(toolBar.HomeTab.Common.Home_header);     
    },

    //Advanced Tab click
    async clickOnAdvancedTab() {
      await this.click(toolBar.HomeTab.Common.Advanced_header);    
      await this.wait(2);  
    },
    
    //Breaks Dropdown click
    clickOnBreaksdropdown() {
      this.click(toolBar.AdvancedTab.Reporting.Breaksdropdown);      
    },

    //Pagination Dropdown click
    clickOnPaginationdropdown() {
      this.click(toolBar.AdvancedTab.Reporting.Paginationdropdown);      
    },

      //Select Page Break
      selectPageBreak(pagebreaktype) {
        this.click(locate(toolBar.AdvancedTab.Reporting.BreaksPageBreakType).withText(pagebreaktype));    
        this.wait(2);
      },

      //Breaks Remove Page Break
     clickOnRemovePageBreak() {
      this.click(toolBar.AdvancedTab.Reporting.BreaksRemovePageBreak);    
      this.wait(2);
    },

     //Breaks Insert Page Break
     clickOnInsertPageBreak() {
      this.click(toolBar.AdvancedTab.Reporting.BreaksInsertPageBreak);    
      this.wait(2);
    },

     //Pagination None
     clickOnPaginationnone() {
      this.click(toolBar.AdvancedTab.Reporting.PaginationFixedNone);      
    },

    //Pagination FixedRows
    clickOnPaginationfixedrows() {
      this.click(toolBar.AdvancedTab.Reporting.PaginationFixedRows);      
    },

    //Pagination Responsive
    clickOnPaginationresponsive() {
      this.click(toolBar.AdvancedTab.Reporting.PaginationResponsive);      
    },

    //Font bold click
    clickOnBold() {
      this.click(toolBar.HomeTab.Style.bold);      
    },
    
    //Verify if the font is bold
    async verifyFontAsBold(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-weight: bold'); 
    },

     //Verify if the font is bold
     async verifyFontAsBoldEntireColumn(element) {
      var column_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=0;i<column_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-weight: bold');
      }
    },

     //Verify if the font is bold
     async verifyFontAsBoldEntireRow(element) {
      var ele=locate({xpath:element});
      var row_elements=await this.grabNumberOfVisibleElements(ele);
      let i=0;
      for(i=2;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate({xpath:element+'['+ i +']'}), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-weight: bold'); 
      }
    },

    //Verify if the font is normal
    async verifyFontAsNormal(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-weight: normal');      
     
    },

    // Click on Italics
    clickOnItalics() {
      this.click(toolBar.HomeTab.Style.italic);
      this.say('clicked on "Italics" button on toolbar');
    },

    //Verify if Font Style is Italic
    async verifyFontStyleAsItalics(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-style: italic');
     
    },

     //Verify if Font Style is Italic
     async verifyFontStyleAsItalicsEntireRow(element) {
      var ele=locate({xpath:element});
      var row_elements=await this.grabNumberOfVisibleElements(ele);
      let i=0;
      for(i=2;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate({xpath:element+'['+ i +']'}), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-style: italic');
      }

    },

    //Verify if Font Style is Italic
    async verifyFontStyleAsItalicsEntireColumn(element) {      
      var column_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=0;i<column_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-style: italic');
      }

    },


    //Verify if Font Style is Normal
    async verifyFontStyleAsNormal(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-style: normal');
      
    },

     // Select font family
     selectFont(fontName) {
      this.click(toolBar.HomeTab.Style.fontDropdown);
      this.click(locate(toolBar.AdvancedTab.Header_Footer.fontname).withText(fontName));
      this.say('I selected font family as '+ fontName);
    },

    // Select font family
    selectFontFamily() {
      this.click(toolBar.HomeTab.Style.fontDropdown);
      this.click(toolBar.HomeTab.Style.faceTahoma);
      this.say('I selected font family as "Arial" ');
    },

    //Select font as default
    selectFontFamilyDefault() {
      this.click(toolBar.HomeTab.Style.fontDropdown);
      this.click(toolBar.HomeTab.Style.faceSegui);
      this.say('I selected font family as "Segoe UI" ');
    },

    //Verify the Font Family
    async verifyFontFamilyEntireRow(element,font) {
      var ele=locate({xpath:element});
      var row_elements=await this.grabNumberOfVisibleElements(ele);
      let i=0;
      for(i=2;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate({xpath:element+'['+ i +']'}), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-family: '+font);
      }
    },

    //Verify the Font Family
    async verifyFontFamilyEntireColumn(element,font) {
      var column_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=0;i<column_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-family: '+font);
      }
    },

    //Verify the Font Family
    async verifyFontFamily(element,font) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-family: '+font);
      
    },

    //Verify if the Font Family is normal
    async verifyFontFamilyAsNormal(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-family: "Segoe UI"');
     
    },

    //Select font size
    async changeFontSize(siz) {
      this.click(toolBar.HomeTab.Style.fontSizeDropdown);
      this.click(locate(toolBar.AdvancedTab.Header_Footer.fontsize).withText(siz));
      // this.say('I selected font size as "16" ');
    },

    //Select font size
    async selectFontSize16() {
      this.click(toolBar.HomeTab.Style.fontSizeDropdown);
      this.click(toolBar.HomeTab.Style.size16);
      // this.say('I selected font size as "16" ');
    },

     //Select font default
    async selectFontSizeDefault() {
      this.click(toolBar.HomeTab.Style.fontSizeDropdown);
      this.click(toolBar.HomeTab.Style.size12);
      // this.say('I selected font size as "14" ');
    },

    //Verify font size
    async verifyFontSizeEntireColumn(element,size) {

      var column_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=0;i<column_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-size: '+ size +'px');
      }
    },

    //Verify font size
    async verifyFontSizeEntireRow(element,size) {
      var ele=locate({xpath:element});
      var row_elements=await this.grabNumberOfVisibleElements(ele);
      let i=0;
      for(i=2;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate({xpath:element+'['+ i +']'}), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-size: '+ size +'px');
      }    
    },

    //Verify font size
    async verifyFontSize(element,size) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-size: '+ size +'px');      
    },

    ////Select font size default
    async verifyFontSizeDefaultEntireColumn(element) {      
      var column_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=0;i<column_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-size: 12px');
      }
    },

     ////Select font size default
     async verifyFontSizeDefaultEntireRow(element) {
      var ele=locate({xpath:element});
      var row_elements=await this.grabNumberOfVisibleElements(ele);
      let i=0;
      for(i=2;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate({xpath:element+'['+ i +']'}), 'style')).toString();
        this.assertStringIncludes(propertyValue,'font-size: 12px');
      }  
    },

    ////Select font size default
    async verifyFontSizeDefault(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-size: 12px');
  
    },

    //font size increase
    increaseFontSize() {
      this.click(toolBar.HomeTab.Style.sizeIncrement);
      this.say('I click font size increased button ');
    },

    //Decrease font size
    decreaseFontSize() {
      this.click(toolBar.HomeTab.Style.sizeDecrement);
      this.say('I click font size decrease button ');
    },

    // Click on fill color drop down
    clickOnFillColordropdown() {
      this.click(toolBar.HomeTab.Style.fillcolorDropdown);
      this.say('clicked on "fillcolorDropdown" button on toolbar');
    },

    // Select color from pallete for fill
    clickOnFontColor(colorhexa) {
      this.click('#scroll-container rect[fill="'+ colorhexa +'"]');
      this.say('Clicked on a color in Color Palette');
    },

     //Verify font color
     async verifyFontcolorEntireColumn(element,rgbvalue) {
      var column_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=0;i<column_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.assertStringIncludes(propertyValue,'color: '+rgbvalue);
      }
    },

     //Verify font color
     async verifyFontcolorEntireRow(element,rgbvalue) {
      var ele=locate({xpath:element});
      var row_elements=await this.grabNumberOfVisibleElements(ele);
      let i=0;
      for(i=2;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate({xpath:element+'['+ i +']'}), 'style')).toString();
        this.assertStringIncludes(propertyValue,'color: '+rgbvalue);
      }
    },

    //Verify font color
    async verifyFontcolor(element,rgbvalue) {
      const elecount=await this.grabNumberOfVisibleElements(element);
      for(var i=0;i<elecount;i++)
      {
        propertyValue = await (await this.grabAttributeFrom(locate(element).at(i+1), 'style')).toString();
        this.say('Property Value: '+propertyValue)
        this.assertStringIncludes(propertyValue,'color: '+rgbvalue); 
      }

      
    },

    // Reset to default in Color Palette
    clickOnResettoDefault() {
      this.click(toolBar.HomeTab.Style.resettodefault);
      this.say('Clicked on a Reset to Default in Color Palette');
    },

    // Click font color drop down
    clickOnFontColordropdown() {
      this.click(toolBar.HomeTab.Style.fontcolorDropdown);
      this.say('clicked on "fontcolorDropdown" button on toolbar');
    },

    //Verify Font color
    async verifyFillcolor(element,rgbvalue) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'color: '+rgbvalue);    
    },

     //Verify Font color
     async verifyFillcolorEntireRow(element,rgbvalue) {
      var row_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=1;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i), 'style')).toString();
        this.assertStringIncludes(propertyValue,'color: '+rgbvalue); 
      }
    },

     //Verify Font color
     async verifyFillcolorEntireColumn(element,rgbvalue) {
      var row_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=1;i<row_elements;i++)
      {
        propertyValue=await (await this.grabAttributeFrom(locate(element).at(i), 'style')).toString();
        this.assertStringIncludes(propertyValue,'background-color: '+rgbvalue); 
      }
    },

    //Click Header Orientation drop down
    clickHeaderOrientationOptions(){
      this.click(toolBar.HomeTab.Style.headerOrientationdrop)
      this.say('clicked on "HeaderOrientationDropdown" button on toolbar');
    },
     //Click Header Orientation Horizontal
     clickHeaderOrientationHorizontal(){
      this.click(toolBar.HomeTab.Style.headerOrientationHorizontal)
      this.say('clicked on "HeaderOrientationHorizontal" button on toolbar');
    },
     //Verify Header Orientation Horizontal
     async verifyHeaderOrientationHorizontal(element){
      propertyValue = await (await this.grabAttributeFrom(element, 'class')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'header-cell-text');
    },
    //Click Header Orientation Vertical
    clickHeaderOrientationVertical(){
      this.click(toolBar.HomeTab.Style.headerOrientationVertical)
      this.say('clicked on "HeaderOrientationVertical" button on toolbar');
    },
    //Verify Header Orientation Horizontal
    async verifyHeaderOrientationVertical(element){
      propertyValue = await (await this.grabAttributeFrom(element, 'class')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'header-cell-text orient-top');
    },
     //Click Header Orientation DiagonalTopBottom
     clickHeaderOrientationDiagonalTopBottom(){
      this.click(toolBar.HomeTab.Style.headerOrientationDiagonalTopBottom)
      this.say('clicked on "HeaderOrientationDiagonalTopBottom" button on toolbar');
    },
    //Verify Header Orientation DiagonalTopBottom
    async verifyHeaderOrientationDiagonalTopBottom(element){
      propertyValue = await (await this.grabAttributeFrom(element, 'class')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'header-cell-text orient-bottomRight');
    },
     //Click Header Orientation DiagonalBottomTop
     clickHeaderOrientationDiagonalBottomTop(){
      this.click(toolBar.HomeTab.Style.headerOrientationDiagonalBottomTop)
      this.say('clicked on "HeaderOrientationDiagonalBottomTop" button on toolbar');
    },
     //Verify Header Orientation DiagonalBottomTop
     async verifyHeaderOrientationDiagonalBottomTop(element){
      propertyValue = await (await this.grabAttributeFrom(element, 'class')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'header-cell-text orient-topRight');
    },

    //**********************************************************************//
    //                          Home Format Methods                         //
    //**********************************************************************//
     //Click Header Orientation DiagonalTopBottom
     clickAlignment(alignment_type){
          if(alignment_type==='left')
          {
            this.click(toolBar.HomeTab.Format.leftalign)
          }
          else if(alignment_type==='center')
          {
            this.click(toolBar.HomeTab.Format.centeralign)
          }
          else if(alignment_type==='right')
          {
            this.click(toolBar.HomeTab.Format.rightalign)
          }
          else if(alignment_type==='top')
          {
            this.click(toolBar.HomeTab.Format.topalign)
          }
          else if(alignment_type==='middle')
          {
            this.click(toolBar.HomeTab.Format.middlealign)
          }
          else if(alignment_type==='bottom')
          {
            this.click(toolBar.HomeTab.Format.bottomalign)
          }
          this.say('clicked on "Alignment" '+ alignment_type +' button on toolbar');
        },

         //Verify Text Alignment
      async verifyHeaderAlignment(element,alignmenttype){
        var expectedvalue='editor-align-'+alignmenttype;
        var attrib='class';
        var res=''
        try
        {
          var row_elements=await this.grabNumberOfVisibleElements(element);
          let i=0;
          for(i=0;i<row_elements;i++)
          {
            propertyValue=await (await this.grabAttributeFrom(locate(element).at(i+1), attrib)).toString();
            this.say('Property Value: '+propertyValue);
            await this.assertStringIncludes(propertyValue,expectedvalue);   
            res='pass';    
          }
                 
        }
        catch(err)
        {
          log.info('Validation Output:::'+err);
          //if(err.code==='ERR_ASSERTION')
          res='fail';              
        }
        return res;
  },

      
        //Verify Text Alignment
      async verifyTextAlignmentEntireRow(element,alignmenttype){
        var expectedvalue='text-align: '+alignmenttype;
        var attrib='style';
        var res=''
        try
        {
          var row_elements=await this.grabNumberOfVisibleElements(element);
          let i=0;
          for(i=1;i<row_elements;i++)
          {
            propertyValue=await (await this.grabAttributeFrom(locate(element).at(i), attrib)).toString();
            this.say('Property Value: '+propertyValue);
            await this.assertStringIncludes(propertyValue,expectedvalue);   
            res='pass';    
          }
                 
        }
        catch(err)
        {
          log.info('Validation Output:::'+err);
          //if(err.code==='ERR_ASSERTION')
          res='fail';              
        }
        return res;
  },

        //Verify Text Alignment
      async verifyTextAlignment(element,alignmenttype){
            var expectedvalue='text-align: '+alignmenttype;
            var attrib='style';
            var res=''
            try
            {
              propertyValue = await (await this.grabAttributeFrom(element, attrib)).toString();
              this.say('Property Value: '+propertyValue);
              await this.assertStringIncludes(propertyValue,expectedvalue);   
              res='pass';              
            }
            catch(err)
            {
              log.info('Validation Output:::'+err);
              //if(err.code==='ERR_ASSERTION')
              res='fail';              
            }
            return res;
      },
        //Verify Border
        async verifyBorderEntireRow(element,bordertype,bordervalue){
          var expectedvalue=bordertype+': '+bordervalue;
          var attrib='style';
          var res=''
          this.wait(5)
          try
          {
            var row_elements=await this.grabNumberOfVisibleElements(element);
            let i=0;
            for(i=1;i<row_elements;i++)
            {
              propertyValue=await (await this.grabAttributeFrom(locate(element).at(i), attrib)).toString();              
              await this.assertStringIncludes(propertyValue,expectedvalue);   
              res='pass';    
            }           
          }
          catch(err)
          {
            log.info('Validation Output:::'+err);
            //if(err.code==='ERR_ASSERTION')
            res='fail';              
          }
          return res;
    },
        //Verify Border
        async verifyBorder(element,bordertype,bordervalue){
          var expectedvalue=bordertype+': '+bordervalue;
          var attrib='style';
          var res=''
          this.wait(5)
          try
          {
            propertyValue = await (await this.grabAttributeFrom(element, attrib)).toString();
            this.say('Property Value: '+propertyValue);
            await this.assertStringIncludes(propertyValue,expectedvalue);   
            res='pass';              
          }
          catch(err)
          {
            log.info('Validation Output:::'+err);
            //if(err.code==='ERR_ASSERTION')
            res='fail';              
          }
          return res;
    },
    //Verify Border
    async verifyNoBorderRow(element){
      var attrib='style';
      var res=''
      try
      {
        var row_elements=await this.grabNumberOfVisibleElements(element);
        let i=0;
        for(i=1;i<row_elements;i++)
        {
          var c=await (await this.grabAttributeFrom(locate(element).at(i), attrib)).toString();              
          this.say('Property Value: '+c);      
         
          var val_3=c.includes('border-top');
          var val_4=c.includes('border-bottom');
          
            if(val_3===false&&val_4===false)
              res='pass';  
             else
             res='fail'; 
        }   
              
      }
      catch(err)
      {
        log.info('Validation Output:::'+err);
        res='fail';              
      }
      return res;
},
      //Verify Border
      async verifyNoBorder(element){
        var attrib='style';
        var res=''
        try
        {
        var c = await (await this.grabAttributeFrom(element, 'style')).toString();
        this.say('Property Value: '+c);      
        //var val_1=c.includes('border-left');
       // var val_2=c.includes('border-right');
        var val_3=c.includes('border-top');
        var val_4=c.includes('border-bottom');
        //var val_5=c.includes('border-style');
        //var val_6=c.includes('border-color');
       // var val_7=c.includes('border-width');
        // if(val_1===false&&val_2===false&&val_3===false&&val_4===false&&val_5===false&&val_6===false&&val_7===false)
        //  res='pass';  
        // else
         // res='fail';    
          if(val_3===false&&val_4===false)
            res='pass';  
           else
           res='fail';          
        }
        catch(err)
        {
          log.info('Validation Output:::'+err);
          res='fail';              
        }
        return res;
  },

  //Verify Alignment
  async verifyAlignmentEntireColumn(element,alignmenttype){
    var expectedvalue='align-items: '+alignmenttype;
    var attrib='style';
    var res=''
    try
    {
      var row_elements=await this.grabNumberOfVisibleElements(element);
      let i=0;
      for(i=1;i<row_elements;i++)
      {
        propertyValue=await this.grabAttributeFrom(locate(element).at(i), attrib);
        this.say('Property Value: '+propertyValue);
        if (typeof propertyValue !== 'undefined')
        await this.assertStringIncludes(propertyValue,expectedvalue);   
        res='pass';    
      }            
    }
    catch(err)
    {
      log.info('Validation Output:::'+err);
      //if(err.code==='ERR_ASSERTION')
      res='fail';              
    }
    return res;
},


    //Verify Alignment
    async verifyAlignmentEntireRow(element,alignmenttype){
      var expectedvalue='align-items: '+alignmenttype;
      var attrib='style';
      var res=''
      try
      {
        var row_elements=await this.grabNumberOfVisibleElements(element);
        let i=0;
        for(i=3;i<row_elements;i++)
        {
          propertyValue=await (await this.grabAttributeFrom(locate(element).at(i), attrib)).toString();
          this.say('Property Value: '+propertyValue);
          await this.assertStringIncludes(propertyValue,expectedvalue);   
          res='pass';    
        }            
      }
      catch(err)
      {
        log.info('Validation Output:::'+err);
        //if(err.code==='ERR_ASSERTION')
        res='fail';              
      }
      return res;
},

        //Verify Alignment
        async verifyAlignment(element,alignmenttype){
          var expectedvalue='align-items: '+alignmenttype;
          var attrib='style';
          var res=''
          try
          {
            propertyValue = await (await this.grabAttributeFrom(element, attrib)).toString();
            this.say('Property Value: '+propertyValue);
            await this.assertStringIncludes(propertyValue,expectedvalue);   
            res='pass';              
          }
          catch(err)
          {
            log.info('Validation Output:::'+err);
            //if(err.code==='ERR_ASSERTION')
            res='fail';              
          }
          return res;
    },
     //Click Show/Hide
     clickShowHide(){
      this.click(toolBar.HomeTab.Format.showHide)
      this.say('clicked on "Show/Hide" button on toolbar');
    },

     //Verify Text Hide/Show
     async verifyTextHideShowEntireColumn(element,hideshow){
      var res=''
      try
      {      
        var column_elements=await this.grabNumberOfVisibleElements(element);     
        let i=0;      
        if(hideshow==='show')
        { 
          for(i=0;i<column_elements;i++)
          {
            propertyValue=this.seeElement(locate(element).at(i+1));
            this.say('Verified on "Show". The Value is Shown');
          }        
        }
        else if(hideshow==='hide')
        {
          for(i=0;i<column_elements;i++)
          {
            propertyValue=this.seeElement(locate(element).at(i+1));
            this.say('Verified on "Hide". The Value is Hidden');
          }
        }
      }
      catch(err)
            {
              log.info('Validation Output:::'+err);
              //if(err.code==='ERR_ASSERTION')
              res='fail';              
            }
            return res;
    },

     //Verify Text Hide/Show
     async verifyTextHideShowEntireRow(element,hideshow){
      var res=''
      try
      {      
        var ele=locate({xpath:element});
        var row_elements=await this.grabNumberOfVisibleElements(ele);
        let i=0;      
        if(hideshow==='show')
        {         
          for(i=1;i<row_elements;i++)
          {
            this.seeElement(locate({xpath:element+'['+ i +']'}));
            this.say('Verified on "Show". The Value is Shown');
          }
        }
        else if(hideshow==='hide')
        {
          for(i=1;i<row_elements;i++)
          {
            this.dontSeeElement(locate({xpath:element+'['+ i +']'}));
            this.say('Verified on "Hide". The Value is Hidden');
          }
        }
      }
      catch(err)
            {
              log.info('Validation Output:::'+err);
              //if(err.code==='ERR_ASSERTION')
              res='fail';              
            }
            return res;
    },

    //Verify Text Hide/Show
    async verifyTextHideShow(element,hideshow){
      var res=''
      try
      {            
        if(hideshow==='show')
        {
          this.seeElement(element)
          this.say('Verified on "Show". The Value is Shown');
        }
        else if(hideshow==='hide')
        {
          this.dontSeeElement(element)
          this.say('Verified on "Hide". The Value is Hidden');
        }
      }
      catch(err)
            {
              log.info('Validation Output:::'+err);
              //if(err.code==='ERR_ASSERTION')
              res='fail';              
            }
            return res;
    },
    //Click Percentage
    clickPercentage(){
      this.click(toolBar.HomeTab.Format.percentage)
      this.say('clicked on "Percentage" button on toolbar');
      this.wait(5);
    },
    //Verify Value
      async verifyValue(element,expectedvalue){
        var res=''
        try
        {
        propertyValue = await (await this.grabTextFrom(element)).toString().trim();
        this.say('Expected Value:'+expectedvalue+' Actual Value:'+ propertyValue);
        this.assert(propertyValue,expectedvalue,'Expected Value and Actual Value do not match')
        res='pass';
        }
        catch(err)
        {
          log.info('Validation Output:::'+err);
          res='fail';
        }
        return res;
    },
    //SuffixVerify Value
    async SuffixverifyValue(element,expectedvalue){
      var res=''
      try
      {
      propertyValue = await (await this.grabTextFrom(element)).toString().trim();
      propertyValue=propertyValue.replace(" ",'');
      this.say('Expected Value:'+expectedvalue+' Actual Value:'+ propertyValue);
      this.assert(propertyValue,expectedvalue,'Expected Value and Actual Value do not match')
      res='pass';
      }
      catch(err)
      {
        log.info('Validation Output:::'+err);
        res='fail';
      }
      return res;
  },

    //Click PrefixSuffix
    clickPrefixSuffix(){
      this.click(toolBar.HomeTab.Format.prefixsuffix)
      this.say('clicked on "PrefixSuffix" button on toolbar');
    },

    //Enter Prefix
    EnterPrefix(prefixvalue){
      if(prefixvalue!='')
      this.fillField(toolBar.HomeTab.Format.valueprefix,prefixvalue)
      else
      this.clearField(toolBar.HomeTab.Format.valueprefix)
      this.say('Entered value '+ prefixvalue +' in "Prefix" field');
    },

    //Enter Prefix
    EnterSuffix(suffixvalue){
      if(suffixvalue!='')
      this.fillField(toolBar.HomeTab.Format.valuesuffix,suffixvalue)
      else
      this.clearField(toolBar.HomeTab.Format.valuesuffix)
      this.say('Entered value '+ suffixvalue +' in "Suffix" field');
    },

    //Click PrefixSuffixApply
    clickPrefixSuffixApply(){
      this.click(toolBar.HomeTab.Format.prefixsuffixApply)
      this.say('clicked on "PrefixSuffixApply" button on toolbar');
    },

    //Click ScalingDropDown
    clickScalingDropDown(){
      this.click(toolBar.HomeTab.Format.scalingdropdown)
      this.say('clicked on "ScalingDropdown" button on toolbar');
    },

     //Click ScalingDropDown
     clickBorderDropDown(){
      this.click(toolBar.HomeTab.Format.borderdropdown)
      this.say('clicked on "BorderDropdown" button on toolbar');
    },

    //Click the Scaling Option
    selectScaling(scalingvalue){
      this.click(toolBar.HomeTab.Format.scalingOption.withText(scalingvalue))
      this.say('Selected option "'+ scalingvalue +'" button on toolbar');
    },

    //click Increase Decimal
    clickIncreaseDecimal(numberofclicks){
      for(var i=0;i<numberofclicks;i++)
      {
        this.click(toolBar.HomeTab.Format.increaseDecimal)
        this.wait(1)
      }
      this.say('Clicked IncreaseDecimal "'+ numberofclicks +'" times on toolbar');
    },

    //click Decrease Decimal
    clickDecreaseDecimal(numberofclicks){
      for(var i=0;i<numberofclicks;i++)
      this.click(toolBar.HomeTab.Format.decreaseDecimal)
      this.say('Clicked DecreaseDecimal "'+ numberofclicks +'" times on toolbar');
    },

    //click Increase Indent
    clickIncreaseIndent(numberofclicks){
      for(var i=0;i<numberofclicks;i++)
      {
        this.click(toolBar.HomeTab.Format.increaseIndent)
        this.wait(1)
      }
      this.say('Clicked IncreaseIndent "'+ numberofclicks +'" times on toolbar');
    },

      //Verify Indent
      async verifyIndent(element,paddingvalue){
        propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
        this.say('Property Value: '+propertyValue)
        const assert_out=this.assertStringIncludes(propertyValue,paddingvalue);   
      },

      //click Increase Indent
    clickDecreaseIndent(numberofclicks){
      for(var i=0;i<numberofclicks;i++)
      {
        this.click(toolBar.HomeTab.Format.decreaseIndent)
        this.wait(1)
      }
      this.say('Clicked DecreaseIndent "'+ numberofclicks +'" times on toolbar');
    },

    //click Number Formatting Drop Down
    clickNumberFormattingDropDown(){     
        this.click(toolBar.HomeTab.Format.numberFormattingdropdown)
        this.say('Clicked  "Number Formatting Drop Down" times on toolbar');
    },

    //select Number Formatting
    selectNumberFormatting(formattype){     
      this.click(locate(toolBar.HomeTab.Format.numberFormattingOptions).withText(formattype))
      this.say('Clicked  "Number Formatting Drop Down" times on toolbar');
   },
    //**********************************************************************//

    //**********************************************************************//
    //                          Home Visualization Methods                         //
    //**********************************************************************//
    //click Bar chart drop down
    clickbarChartdropDown(){     
      this.click(toolBar.HomeTab.Visualization.barChartdropdown);
      this.say('Clicked  "Bar Chart" dropdown on toolbar');
    },
     //click Bar chart
     clickBarChart(){     
      this.click(toolBar.HomeTab.Visualization.barChart)
      this.say('Clicked  "Bar Chart" on toolbar');
    },

     //click Integrated chart
     clickIntegratedChart(){     
      this.click(toolBar.HomeTab.Visualization.barChartIntegrated)
      this.say('Clicked  "Integrated Chart" on toolbar');
    },

     //click Home Header
     clickHomeHeader(){     
      this.click(toolBar.HomeTab.Common.Home_header)
      this.say('Clicked  "Home Header" on toolbar');
    },
     //Verify Bar Chart Display
     async verifybarChartDisplay(valuecheck){
      var res=''
       try{
          this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_g);
          this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_rect_chart);
          this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_text_chart);
          //this.seeElement(locate(toolBar.HomeTab.Visualization.barChart_svg_text_chart).withText(valuecheck));
          //propertyValue = await (await this.grabAttributeFrom(toolBar.HomeTab.Visualization.barChart_svg_text_chart,'innerHTML'));
          propertyValue=await this.executeScript(function ()
          {
            return document.querySelector("#table-row-1_table-col-1 > svg > text").innerHTML;    
          });          
          this.say('Property Value:'+propertyValue);
          this.assertStringIncludes(propertyValue,valuecheck)
          this.say('Verified on "BarChart" display');          
          res='pass';
       }
       catch(err)
       {
          this.say('"BarChart" is not displayed properly'+err.toString())
          res='fail';
       }
       return res;
    },

    //click Show As Numbers
    clickshowAsNumbers(){     
      this.click(toolBar.HomeTab.Visualization.showAsNumber)
      this.say('Clicked  "Show As Numbers" times on toolbar');
    },

    //click Waterflow chart
    clickWaterflowChart(){     
      this.click(toolBar.HomeTab.Visualization.waterflowChart)
      this.say('Clicked  "Continuous WaterFlow Chart" times on toolbar');
    },

     //Verify Bar Chart Display
     async verifyWaterflowChartDisplay(valuecheck){
      try{
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_g);
         this.seeElement(toolBar.HomeTab.Visualization.waterflowChart_svg_line);
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_rect_chart);
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_text_chart);
        // this.seeElement(locate(toolBar.HomeTab.Visualization.barChart_svg_text_chart).withText(valuecheck));
        // propertyValue = await (await this.grabTextFrom(toolBar.HomeTab.Visualization.barChart_svg_text_chart)).toString().trim();
        // this.say('Property Value:'+propertyValue);
         this.say('Verified on "Continuos WaterFlow Chart" display');          
         //propertyValue = 
         //this.say('Property Value:'+propertyValue);
      }
      catch(err)
      {
         this.say('"Continuos WaterFlow Chart" is not displayed properly'+err.toString())
         this.seeTextEquals('a','b')
      }
   },

      //click Pin chart
      clickPinChart(){    
        this.click(toolBar.HomeTab.Visualization.pinChartDropDown) 
        this.click(toolBar.HomeTab.Visualization.pinChart)
        this.say('Clicked  "Pin Chart" times on toolbar');
      },

      //Verify Pin Chart Display
     async verifyPinChartDisplay(valuecheck){
      var res=''
      try{
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_g);
         this.seeElement(toolBar.HomeTab.Visualization.PinChart_svg_line);         
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_text_chart);
         propertyValue=await this.executeScript(function ()
          {
            return document.querySelector("#table-row-1_table-col-1 > svg > text").innerHTML;    
          });          
         this.say('Verified on "Pin Chart" display');          
         this.say('Property Value:'+propertyValue);
         res='pass';
      }
      catch(err)
      {
         this.say('"Pin Chart" is not displayed properly'+err.toString())
         res='fail';
      }
      return res;
   },

    //click Pin chart
    clickLollipopChart(){    
      this.click(toolBar.HomeTab.Visualization.pinChartDropDown) 
      this.click(toolBar.HomeTab.Visualization.lollipopChart)
      this.say('Clicked  "Lollipop Chart" times on toolbar');
    },

     //Verify Pin Chart Display
     async verifyLollipopChartDisplay(valuecheck){
      var res=''
      try{
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_g);
         this.seeElement(toolBar.HomeTab.Visualization.PinChart_svg_line);         
         this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_text_chart);        
               
          propertyValue=await this.executeScript(function ()
          {
            return document.querySelector("#table-row-1_table-col-1 > svg > text").innerHTML;    
               
          });   
         this.say('Verified on "Lollipop Chart" display');          
         this.say('Property Value:'+propertyValue);
         res='pass';
      }
      catch(err)
      {
         this.say('"Lollipop Chart" is not displayed properly'+err.toString())
         res='fail';
      }
      return res;
   },

   //Select Postions Positions_Cancel
   clickPositions_Cancel(){     
    this.click(toolBar.HomeTab.Column.Positions_Cancel);
    this.say('Clicked  "Positions_Cancel" on toolbar');
    },

    //Select Postions Positions_Apply
    clickPositions_Apply(){     
      this.click(toolBar.HomeTab.Column.Positions_Apply);
      this.say('Clicked  "Positions_Apply" on toolbar');
      },

    //Select Postions Positions_Apply
    clickPositions_Apply(){     
      this.click(toolBar.HomeTab.Column.Positions_Apply);
      this.say('Clicked  "Positions_Apply" on toolbar');
      },

   //Select Postions Column_GrandTotal_Off
   clickColumn_GrandTotal_Off(){     
    this.click(toolBar.HomeTab.Column.Column_GrandTotal_Off);
    this.say('Clicked  "Column_GrandTotal_Off" on toolbar');
    },

    //Select Postions Column_GrandTotal_Right
    clickColumn_GrandTotal_Right(){     
      this.click(toolBar.HomeTab.Column.Column_GrandTotal_Right);
      this.say('Clicked  "Column_GrandTotal_Right" on toolbar');
      },

   //Select Postions Column_GrandTotal_Left
   clickColumn_GrandTotal_Left(){     
    this.click(toolBar.HomeTab.Column.Column_GrandTotal_Left);
    this.say('Clicked  "Column_GrandTotal_Left" on toolbar');
    },

   //Select Postions Row_SubTotal_Off
   clickRow_SubTotal_Off(){     
    this.click(toolBar.HomeTab.Column.Row_SubTotal_Off);
    this.say('Clicked  "Row_SubTotal_Off" on toolbar');
    },

   //Select Postions Row_SubTotal_Top
   clickRow_SubTotal_Top(){     
    this.click(toolBar.HomeTab.Column.Row_SubTotal_Top);
    this.say('Clicked  "Row_SubTotal_Top" on toolbar');
    },

    //Select Postions Row_SubTotal_Bottom
    clickRow_SubTotal_Bottom(){     
      this.click(toolBar.HomeTab.Column.Row_SubTotal_Bottom);
      this.say('Clicked  "Row_SubTotal_Bottom" on toolbar');
      },

    //Select Postions Row_GrandTotal_Off
    clickRow_GrandTotal_Off(){     
      this.click(toolBar.HomeTab.Column.Row_GrandTotal_Off);
      this.say('Clicked  "Row_GrandTotal_Off" on toolbar');
      },

   //Select Postions Row_GrandTotal_Bottom
   clickRow_GrandTotal_Bottom(){     
    this.click(toolBar.HomeTab.Column.Row_GrandTotal_Bottom);
    this.say('Clicked  "Row_GrandTotal_Bottom" on toolbar');
    },

   //Select Postions Row_GrandTotal_Top
   clickRow_GrandTotal_Top(){      
    this.click(toolBar.HomeTab.Column.Row_GrandTotal_Top);
    this.say('Clicked  "Row_GrandTotal_Top" on toolbar');
    },

    //click Postions
    clickPositions(){     
      this.click(toolBar.HomeTab.Column.Positions);
      this.say('Clicked  "Positions" on toolbar');
    },

   //click Enablerowsubtotalsplit
   clickEnablerowsubtotalsplit(){     
    this.click(toolBar.HomeTab.Column.Enablerowsubtotalsplit);
    this.say('Clicked  "Enablerowsubtotalsplit" on toolbar');
  },

   //click InsertGrantTotalColumn
   clickInsertGrantTotalColumn(){     
    this.click(toolBar.HomeTab.Column.InsertGrantTotalColumn);
    this.say('Clicked  "InsertGrantTotalColumn" on toolbar');
  },

  //click Filter Remove
  clickFilterRemove(){     
    this.click(toolBar.HomeTab.Column.FilterDelete);
    this.say('Clicked  "FilterRemove" on toolbar');
  },

   //click Filter Clear
   clickFiltersClear(){  
    this.wait(10);   
    this.click(toolBar.HomeTab.Column.FilterClear);
    this.say('Clicked  "FilterClear" on toolbar');
    this.wait(10);
  },

  //click Sort Clear
  clickSortClear(){     
    this.click(toolBar.HomeTab.Column.SortClear);
    this.say('Clicked  "SortClear" on toolbar');
  },

  //click Sort Descending
  clickSortDescending(){     
    this.click(toolBar.HomeTab.Column.SortDescending);
    this.say('Clicked  "SortDescending" on toolbar');
  },


  //click Sort Ascending
  clickSortAscending(){     
    this.click(toolBar.HomeTab.Column.SortAscending);
    this.say('Clicked  "SortAscending" on toolbar');
  },

  //click ResetAll in Advanced Filter
  clickSortAdvancedFilterResetAll(){     
    this.click(toolBar.HomeTab.Column.Advanced_Filter_ResetAll);
    this.say('Clicked  "Advanced_Filter_ResetAll" on toolbar');
  },

  //click Apply in Advanced Filter
  clickSortAdvancedFilterApply(){     
    this.click(toolBar.HomeTab.Column.Advanced_Filter_Apply);
    this.say('Clicked  "Advanced_Filter_Apply" on toolbar');
  },

   //Select Advanced Filer Rule Combinator And
   SelectRuleCombinatorAnd(){     
    this.click(toolBar.HomeTab.Column.Advanced_Filter_RuleCombinatorAnd);
    this.say('Clicked  "And - Rule Combinator Advanced Filter" on toolbar');
  },

  //Select Advanced Filer Rule Combinator And
  SelectRuleCombinatorOr(){     
    this.click(toolBar.HomeTab.Column.Advanced_Filter_RuleCombinatorOr);
    this.say('Clicked  "Or - Rule Combinator Advanced Filter" on toolbar');
  },

  //Select Filter Operator
  SelectFilterValueAdvanced(val,ind){     
    this.click(toolBar.HomeTab.Column.FilterValue.at(ind));
    this.say('Clicked  "Filter Value" on toolbar');
    this.click(toolBar.HomeTab.Column.FilterValueSelect.withText(val));
    this.say('Selected Filter Value '+ operator +' from the list');
  },

  //Select Filter Operator
  SelectFilterValue(val,ind){     
    this.click(toolBar.HomeTab.Column.FilterValue);
    this.say('Clicked  "Filter Value" on toolbar');
    this.click(toolBar.HomeTab.Column.FilterValueSelect.withText(val));
    this.say('Selected Filter Value '+ operator +' from the list');
  },

  //Select Filter Operator
  SelectFilterOperatorAdvanced(operator,ind){     
    this.click(toolBar.HomeTab.Column.FilterOperator.at(ind));
    this.say('Clicked  "Filter Operator" on toolbar');
    this.click(toolBar.HomeTab.Column.FilterOperatorValue.withText(operator));
    this.say('Selected Operator '+ operator +' from the list');
  },
  //Select Filter Operator
  SelectFilterOperator(operator,ind){     
    this.click(toolBar.HomeTab.Column.FilterOperator);
    this.say('Clicked  "Filter Operator" on toolbar');
    this.click(toolBar.HomeTab.Column.FilterOperatorValue.withText(operator));
    this.say('Selected Operator '+ operator +' from the list');
  },

   //Select TopNField
   SelectTopNField(fieldname){     
    this.click(toolBar.HomeTab.Column.TopNField);
    this.say('Clicked  "TopNField" on toolbar');
    this.click(toolBar.HomeTab.Column.TopNFieldValue.withText(fieldname));
    this.say('Selected TopNFieldValue '+ fieldname +' from the list');
  },

  //Select TopNType
  SelectTopNType(fieldname){     
    this.click(toolBar.HomeTab.Column.TopNType);
    this.say('Clicked  "TopNType" on toolbar');
    this.click(toolBar.HomeTab.Column.TopNTypeValue.withText(fieldname));
    this.say('Selected TopNTypeValue '+ fieldname +' from the list');
  },

  //EnterTopNInput
  EnterTopNInput(inputvalue){     
    this.fillField(toolBar.HomeTab.Column.TopNInput,inputvalue)
    this.say('Entered '+ inputvalue +' in the TopNInput');
  },

   //Select TopNtopbottom
   SelectTopNtopbottom(fieldname){     
    this.click(toolBar.HomeTab.Column.TopNtopbottom);
    this.say('Clicked  "TopNtopbottom" on toolbar');
    this.click(toolBar.HomeTab.Column.TopNtopbottomValue.withText(fieldname));
    this.say('Selected TopNtopbottom '+ fieldname +' from the list');
  },

  //Select Filter Field
  SelectFilterFieldAdvanced(fieldname,ind){     
    this.click(toolBar.HomeTab.Column.FilterField.at(ind));
    this.say('Clicked  "Filter Field" on toolbar');
    this.click(toolBar.HomeTab.Column.FilterFieldValue.withText(fieldname));
    this.say('Selected Field '+ fieldname +' from the list');
  }, 
  //Select Filter Field
  SelectFilterField(fieldname,ind){     
    this.click(toolBar.HomeTab.Column.FilterField);
    this.say('Clicked  "Filter Field" on toolbar');
    this.click(toolBar.HomeTab.Column.FilterFieldValue.withText(fieldname));
    this.say('Selected Field '+ fieldname +' from the list');
  },

  //click Advanced Filter AddGroup
  clickAdvancedFilterAddGroup(){     
    this.click(toolBar.HomeTab.Column.Advanced_Filter_AddGroup);
    this.say('Clicked  "AdvancedFilter_AddGroup" on toolbar');
  },

  //click Advanced Filter
  clickAdvancedFilter(){     
    this.click(toolBar.HomeTab.Column.AdvancedFilter);
    this.say('Clicked  "AdvancedFilter" on toolbar');
  },

  //click Add Filter
  clickAddFilter(){     
    this.click(toolBar.HomeTab.Column.AddFilter);
    this.say('Clicked  "Add Filter" on toolbar');
  },

  //click TopN_Close
  clickTopN_Close(){     
    this.click(toolBar.HomeTab.Column.TopNClose);
    this.say('Clicked  "TopNClose" drop down on toolbar');
  },

   //click TopN_ResetAll
   clickTopN_ResetAll(){     
    this.click(toolBar.HomeTab.Column.TopN_ResetAll);
    this.say('Clicked  "TopN_ResetAll" drop down on toolbar');
  },


  //click TopN_Apply
  clickTopN_Apply(){     
    this.click(toolBar.HomeTab.Column.TopN_Apply);
    this.say('Clicked  "TopN_Apply" drop down on toolbar');
  },

  //Delete Comment
  ClickEditComment(){ 
    this.click(toolBar.HomeTab.Focus.CommentEdit);
    this.say('Clicked on "EditComment" in Comment popup');
  },

  //Delete Comment
  DeleteComment(){ 
    this.click(toolBar.HomeTab.Focus.CommentDelete);
    this.say('Clicked on "DeleteComment" in Comment popup');
  },

  //View Comment
  ViewComment(element){     
    this.moveCursorTo({xpath: '//*[@id="'+ element +'"]/following-sibling::div//div[@class="indicator-div circle"]'});
    this.say('Hover on "Comment" in Comment popup');
  },

  //Save Comment
  ClickSaveComment(){     
    this.click(toolBar.HomeTab.Focus.CommentSave);
    this.say('Clicked on "Save" in Comment popup');
  },

  //Enter Comment
  EnterComment(comment){     
    this.fillField(toolBar.HomeTab.Focus.CommentInput,comment);
    this.say('Entered  the comment '+comment);
  },

   //Enter Comment Name
   EnterCommentName(commentname){     
    this.fillField(toolBar.HomeTab.Focus.CommentName,commentname);
    this.say('Entered  "Comment Name"');
  },

   //click CommentColumnToggle
   clickCommentColumnToggle(){     
    this.click(toolBar.HomeTab.Focus.CommentColumnToggle);
    this.say('Clicked  "Comment Column Toggle" on toolbar');
  },

   //click IconsToggle
   clickIconsToggle(){     
    this.click(toolBar.HomeTab.Focus.CondFormatIconsToggle);
    this.say('Clicked  "Icons" on toolbar');
  },

   //click RatingToggle
   clickRatingToggle(){     
    this.click(toolBar.HomeTab.Focus.CondFormatRatingToggle);
    this.say('Clicked  "Rating" on toolbar');
  },

  //click ABCClassifyToggle
  clickABCClassifyToggle(){     
    this.click(toolBar.HomeTab.Focus.CondFormatABCClassifyToggle);
    this.say('Clicked  "ABC Classification" on toolbar');
  },

  //click HeatMapToggle
  clickHeatMapToggle(){     
    this.click(toolBar.HomeTab.Focus.CondFormatHeatMapToggle);
    this.say('Clicked  "Heat Map" on toolbar');
  },

    //click SegmentationToggle
    clickSegmentationToggle(){     
      this.click(toolBar.HomeTab.Focus.CondFormatSegmentationToggle);
      this.say('Clicked  "Segmentation Toggle" on toolbar');
    },

   //click CommentFootNoteToggle
   clickCommentFootNoteToggle(){     
    this.click(toolBar.HomeTab.Focus.CommentFootNoteToggle);
    this.say('Clicked  "Comment FootNote Toggle" on toolbar');
  },

  //click CommentHideAll
  clickCommentHideAll(){     
    this.click(toolBar.HomeTab.Focus.CommentHideAll);
    this.say('Clicked  "Hide All Comment" on toolbar');
  },

  //click Commentdropdown
  clickCommentdropdown(){     
    this.click(toolBar.HomeTab.Focus.Commentdropdown);
    this.say('Clicked  "Comment" drop down on toolbar');
  },

   //click CloseCondFormat
   clickCloseCondFormatSideBar(){     
    this.click(toolBar.HomeTab.Focus.CondFormatSideBarClose);
    this.say('Clicked  "Close Conditional Formatting" on toolbar');
  },

   //click CondFormatdropdown
   clickCondFormatdropdown(){     
    this.click(toolBar.HomeTab.Focus.CondFormatdropdown);
    this.say('Clicked  "Conditional Formatting" drop down on toolbar');
  },
  
   //click AddComment
   clickAddComment(){     
    this.click(toolBar.HomeTab.Focus.CommentAdd);
    this.say('Clicked  "AddComment" drop down on toolbar');
  },

   //click TopN
   clickTopN(){     
    this.click(toolBar.HomeTab.Column.TopN);
    this.say('Clicked  "TopN" drop down on toolbar');
  },

  //click Filter dropdown
  clickFilterdropdown(){     
    this.click(toolBar.HomeTab.Column.Filterdropdown);
    this.say('Clicked  "Filter" drop down on toolbar');
  },

  //click Sort dropdown
  clickSortdropdown(){     
    this.click(toolBar.HomeTab.Column.Sortdropdown);
    this.say('Clicked  "Sort" drop down on toolbar');
  },


   //click Total dropdown
  async clickTotaldropdown(){     
    await this.click(toolBar.HomeTab.Column.Totaldropdown);
    await this.say('Clicked  "Total" drop down on toolbar');
  },

   //click Sparkline chart dropdown
   clickSparklineChartdropdown(){     
    this.click(toolBar.HomeTab.Visualization.sparklinesChartdropdown)
    this.say('Clicked  "Spark lines Chartdropdown" drop down on toolbar');
  },

  //click WinLoss
  clickWinLoss(){     
    this.click(toolBar.HomeTab.Visualization.WinLossChart)
    this.say('Clicked  "WinLoss Chart" on toolbar');
  },

   //click ColumnChart
   clickColumnChart(){     
    this.click(toolBar.HomeTab.Visualization.ColumnChart)
    this.say('Clicked  "Column Chart" on toolbar');
  },

  //click AreaChart
  clickAreaChart(){     
    this.click(toolBar.HomeTab.Visualization.AreaChart)
    this.say('Clicked  "Area Chart" on toolbar');
  },

  //click LineChart
  clickLineChart(){     
    this.click(toolBar.HomeTab.Visualization.LineChart)
    this.say('Clicked  "Line Chart" on toolbar');
  },

    //click Bullet chart dropdown
    clickBulletChartdropdown(){     
      this.click(toolBar.HomeTab.Visualization.bulletChartdropdown)
      this.say('Clicked  "Bullet Chart" drop down on toolbar');
    },

    //click Bullet chartSimple
    async clickBulletChartSimple(){     
      await this.click(toolBar.HomeTab.Visualization.bulletChartSimple)
      await this.say('Clicked  "Bullet Chart" Simple on toolbar');
    },

    //click Bullet chartCustom
    async clickBulletChartCustom(){     
      await this.click(toolBar.HomeTab.Visualization.bulletChartCustom)
      await this.say('Clicked  "Bullet Chart" Custom on toolbar');
    },

    //click WaterFall chart dropdown
    clickWaterFallChartdropdown(){     
      this.click(toolBar.HomeTab.Visualization.waterfallChartdropdown)
      this.say('Clicked  "Water Fall Chart" drop down on toolbar');
    },

    //click WaterFall chartRegular
    clickWaterFallChartRegular(){     
      this.click(toolBar.HomeTab.Visualization.waterfallChartRegular)
      this.say('Clicked  "Water Fall Chart" Regular on toolbar');
    },

    //click WaterFall chartContinuous
    clickWaterFallChartContinuous(){     
      this.click(toolBar.HomeTab.Visualization.waterfallChartContinuous)
      this.say('Clicked  "Water Fall Chart" Continuous on toolbar');
    },
      //click WaterFall chart
      clickWaterFallChart(){     
        this.click(toolBar.HomeTab.Visualization.waterfallChart)
        this.say('Clicked  "Water Fall Chart" times on toolbar');
      },

      //Verify Water Fall Chart Display
     async verifyWaterFallChartDisplay(valuecheck){
      try{
        this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_g);
        this.seeElement(toolBar.HomeTab.Visualization.waterflowChart_svg_line);
        this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_rect_chart);
        this.seeElement(toolBar.HomeTab.Visualization.barChart_svg_text_chart);
       // this.seeElement(locate(toolBar.HomeTab.Visualization.barChart_svg_text_chart).withText(valuecheck));
       // propertyValue = await (await this.grabTextFrom(toolBar.HomeTab.Visualization.barChart_svg_text_chart)).toString().trim();
       // this.say('Property Value:'+propertyValue);
        this.say('Verified on "WaterFall Chart" display');          
        //propertyValue = 
        //this.say('Property Value:'+propertyValue);
      }
      catch(err)
      {
         this.say('"WaterFall Chart" is not displayed properly'+err.toString())
         this.seeTextEquals('a','b')
      }
   },

   async Home_Bold(FeatureName,TestName){   
    await this.clickOnHomeTab();  
    await this.selectCell(cells.Cell_4_1);
    await this.clickOnBold();
    await this.capturescreenshot(TestName,'Bold')    
    await this.verifyFontAsBold(cells.Cell_4_1);
    await this.saveScreenshot('FontBold.png');
    await allure.addAttachment('Font Bold',new Buffer("FontBold.png"),'png');
    await this.clickOnBold();
    await this.capturescreenshot(TestName,'Normal')  
    await this.verifyFontAsNormal(cells.Cell_4_1);
    await this.saveScreenshot('FontNormal_1.png');
    await allure.addAttachment('Font Normal',new Buffer("FontNormal_1.png"),'png');
    await this.clearSelection(cells.Cell_4_1); 
   },

   async Advanced_ReorderRows(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.selectCell(cells.Cell_2_0);
    await this.clickOnReorderRows();
    await this.draganddrop(cells.Cell_2_0_span);
    await this.storescreenshot(TestName,'ReorderRows')
    const res=await this.doVisualRegression(TestName,'ReorderRows');
    await this.clickOnReorderRows();
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - ReorderRows.png'));
    } 
   },

   async Advanced_CategorySigns(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnCategorySigns();
    await this.verifyCategorySigns();
    await this.storescreenshot(TestName,'CategorySigns')    
    const res=await this.doVisualRegression(TestName,'CategorySigns');
    await this.clickOnCategorySigns();
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - CategorySigns.png'));
    } 
   },

   async Advanced_Invert(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.selectCell(rows.row2);
    let beforemap = new Map();
    var i=0;
    const row2elements=await this.grabNumberOfVisibleElements(rows.row2);
    for(i=2;i<=row2elements;i++)
    {
      var ele=locate(rows.row2span).at(i);
      var val=await this.grabTextFrom(ele);
      beforemap.set(i,val);
      console.log(i+''+val);
    }
    await this.storescreenshot(TestName,'BeforeInvert') 
    await this.clickOnInvert();
    //await this.verifyCategorySigns();
    await this.storescreenshot(TestName,'AfterInvert')    
    const row2elementsnow=await this.grabNumberOfVisibleElements(rows.row2);
    for(i=2;i<=row2elementsnow;i++)
    {
      var ele1=locate(rows.row2span).at(i);
      var val1=await this.grabTextFrom(ele1);
      console.log(i+''+val1);
      this.assert(beforemap.get(i)*-1,val1,'Compare Before and After Values');
    }
    await this.clickOnInvert();
    await this.click(toolBar.AdvancedTab.Customize.InvertSignApply);
   },

   async Advanced_InsertContributionRow(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.selectCell(rows.row3);
    await this.clickonInsertRowOption('% Contribution Row');
    await this.storescreenshot(TestName,'AfterContributionRowInsert');
    const res=await this.doVisualRegression(TestName,'ContributionRow');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - ContributionRow.png'));
    } 
    await this.click(toolBar.AdvancedTab.Customize.ContributionRowDelete);
    await this.storescreenshot(TestName,'AfterContributionRowDelete');
    const res1=await this.doVisualRegression(TestName,'ContributionRowDelete');
    if(res1!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - ContributionRowDelete.png'));
    }
   },

   async Advanced_InsertStaticRow(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.selectCell(rows.row3);
    await this.clickonInsertRowOption('Static Row');
    await this.storescreenshot(TestName,'AfterStaticRowInsert');
    const res=await this.doVisualRegression(TestName,'StaticRow');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - StaticRow.png'));
    } 
    await this.click(toolBar.AdvancedTab.Customize.StaticRowDelete);
    await this.storescreenshot(TestName,'AfterStaticRowDelete');
    const res1=await this.doVisualRegression(TestName,'StaticRowDelete');
    if(res1!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - StaticRowDelete.png'));
    }
   },

   async InsertCalculatedRow(rowlabel,rowno,TestName,screenshotname,newrowlabel)
   {
      await this.clickOnAdvancedTab();
      const reg=rowlabel;
      var locator=toolBar.AdvancedTab.Customize.MatrixRowLabel.replace('labelname',reg);
      const element=locate({xpath:locator});
      var findid= await (await this.grabAttributeFrom(element, 'id')).toString();
      var findrow=findid.split("_");
      let sourcerowmap = new Map();
      var i=0;
      const row2elements=await this.grabNumberOfVisibleElements(locate({xpath:'//div[contains(@id,"'+findrow[0]+'")]'}));
      for(i=2;i<=row2elements;i++)
      {
        var ele=locate({xpath:'//div[contains(@id,"'+findrow[0]+'")]//span[@role="cell"]'}).at(i);
        var val=await this.grabTextFrom(ele);
        sourcerowmap.set(i,val);
        console.log(i+''+val);
      }    
      await this.selectCell(rowno);
      await this.clickonInsertRowOption('Calculated Row');
      await this.wait(10);
      await this.calculatedRowInput(newrowlabel,reg,'false','Formula Description',TestName,screenshotname+'Input');
      await this.storescreenshot(TestName,screenshotname);
      var locator1=toolBar.AdvancedTab.Customize.MatrixRowLabel.replace('labelname',newrowlabel);
      const element1=locate({xpath:locator1});
      var findid1= await (await this.grabAttributeFrom(element1, 'id')).toString();
      var findrow1=findid1.split("_");
      const newrowelements=await this.grabNumberOfVisibleElements(locate({xpath:'//div[contains(@id,"'+findrow1[0]+'")]'}));
      for(i=2;i<=newrowelements;i++)
      {
        var newele=locate({xpath:'//div[contains(@id,"'+findrow1[0]+'")]//span[@role="cell"]'}).at(i);
        var newval=await this.grabTextFrom(newele);
        console.log(i+''+newval);
        await this.assert(sourcerowmap.get(i),newval,'Value Comparison');      
      }   
   },

   async ValidateEditedRow(rowlabel,newrowlabel)
   {
      const reg=rowlabel;
      var locator=toolBar.AdvancedTab.Customize.MatrixRowLabel.replace('labelname',reg);
      const element=locate({xpath:locator});
      var findid= await (await this.grabAttributeFrom(element, 'id')).toString();
      var findrow=findid.split("_");
      let sourcerowmap = new Map();
      var i=0;
      const row2elements=await this.grabNumberOfVisibleElements(locate({xpath:'//div[contains(@id,"'+findrow[0]+'")]'}));
      for(i=2;i<=row2elements;i++)
      {
        var ele=locate({xpath:'//div[contains(@id,"'+findrow[0]+'")]//span[@role="cell"]'}).at(i);
        var val=await this.grabTextFrom(ele);
        sourcerowmap.set(i,val);
        console.log(i+''+val);
      }    
     
      var locator1=toolBar.AdvancedTab.Customize.MatrixRowLabel.replace('labelname',newrowlabel);
      const element1=locate({xpath:locator1});
      
      var findid1= await (await this.grabAttributeFrom(element1, 'id')).toString();
      var findrow1=findid1.split("_");
      const newrowelements=await this.grabNumberOfVisibleElements(locate({xpath:'//div[contains(@id,"'+findrow1[0]+'")]'}));
      for(i=2;i<=newrowelements;i++)
      {
        var newele=locate({xpath:'//div[contains(@id,"'+findrow1[0]+'")]//span[@role="cell"]'}).at(i);
        var newval=await this.grabTextFrom(newele);
        console.log(i+''+newval);
        await this.assert(sourcerowmap.get(i),newval,'Value Comparison');      
      }   
   },

   async Advanced_InsertCalculatedRow(FeatureName,TestName){ 
      await this.InsertCalculatedRow('Europe',rows.row3,TestName,"InsertCalculatedRow",'NewOne');    
   },

   async Advanced_EditCalculatedRow(FeatureName,TestName){ 
    await this.InsertCalculatedRow('Europe',rows.row3,TestName,'InsertCalculatedRowforEdit','EditOne');    
    await this.clickonInsertRowOption('View Inserted Row(s)');
    await this.wait(5);
    await this.storescreenshot(TestName,'ViewInsertedRowsforEdit');
    //Edit the Record
    var locator1=toolBar.AdvancedTab.Customize.ViewInsertRowEdit.replace('labelname','EditOne');
    const element1=locate({xpath:locator1});
    await this.click(element1);    
    await this.calculatedRowInput("EditedLabel","NA",'false','NA',TestName,'EditCalculatedRowInput');
    await this.storescreenshot(TestName,'EditedCalculatedRow');
    await this.ValidateEditedRow('Europe','EditedLabel');

   },

   async Advanced_DeleteCalculatedRow(FeatureName,TestName){ 
    await this.InsertCalculatedRow('Europe',rows.row3,TestName,'InsertCalculatedRowforDelete','DeleteOne');    
    await this.clickonInsertRowOption('View Inserted Row(s)');
    await this.wait(5);
    await this.storescreenshot(TestName,'ViewInsertedRowsforDelete');
    //Delete the Record
    var locator1=toolBar.AdvancedTab.Customize.ViewInsertRowDelete.replace('labelname','DeleteOne');
    const element1=locate({xpath:locator1});
    await this.click(element1);    
    await this.storescreenshot(TestName,'DeletedCalculatedRow');
    var locator=toolBar.AdvancedTab.Customize.MatrixRowLabel.replace('labelname','DeleteOne');
    const element=locate({xpath:locator});
    const newrowelements=await this.grabNumberOfVisibleElements(element);
    this.say(newrowelements);
    await this.assert(0,newrowelements,'Delete Calculated Row');
   },

   
   async InsertCalculatedMeasure(columnlabel,TestName,screenshotname,newcolumnlabel)
   {
      
      await this.clickOnAdvancedTab();
      await this.clickonInsertColumnOption('Visual Measure');
      await this.wait(10);
      await this.calculatedMeasureInput(newcolumnlabel,'NA',columnlabel,'Formula Description','Sum',TestName,screenshotname+'Input');
      await this.storescreenshot(TestName,screenshotname);
      //Validate all the columns
      var locator=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',columnlabel);
      const element=locate({xpath:locator});
      var columnlabelcount=await this.grabNumberOfVisibleElements(element);
      var locator1=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',newcolumnlabel);
      const element1=locate({xpath:locator1});
      var newcolumnlabelcount=await this.grabNumberOfVisibleElements(element1);
      if(columnlabelcount===newcolumnlabelcount)
      {
        var i=0;
        var ele;
        var findid;
        var findcol;
        var ele_list;
        var newele_list;
        var ele_list_count;
        var newele_list_count;
        for(i=0;i<columnlabelcount;i++)
        {
          ele=locate(element).at(i+1);
          findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
          findcol=findid.split(" ");
          ele_list=locate('div[id$="'+findcol[3]+'"]');
          ele_list_count=await this.grabNumberOfVisibleElements(ele_list);

          ele=locate(element1).at(i+1);
          findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
          findcol=findid.split(" ");
          newele_list=locate('div[id$="'+findcol[3]+'"] span');
          newele_list_count=await this.grabNumberOfVisibleElements(newele_list);

          if(ele_list_count===newele_list_count)
          {
            var j=0;
            for(j=0;j<ele_list_count;j++)
            {
               var expectedvalue=await this.grabTextFrom(locate(ele_list).at(j+1));
               var actualvalue=await this.grabTextFrom(locate(newele_list).at(j+1));
               await this.assert(expectedvalue,actualvalue,'Base vs Measure Compare');
            }
           }
           else
           {
            this.say('Formula Reference Column count and Measure Column count do not match');
            this.assert(ele_list_count,newele_list_count,'Formula Reference Column count and Measure Column match');    
           }
        }

      }
      else
      {
        this.say('Calculated Measure Columns do not match');
        this.assert(columnlabelcount,newcolumnlabelcount,'Calculated Measure Columns do not match')
      }


   },

   async DeleteAuditCalculatedRowsColumns(rowlabel,TestName,scname,typ)
   {
    await this.click(toolBar.AdvancedTab.Analytics.AuditDataEditing);
    /* 
    if(typ==="rows")
    await this.click(toolBar.AdvancedTab.Analytics.AuditCalculatedRows);
    if(typ==="columns")
    await this.click(toolBar.AdvancedTab.Analytics.AuditCalculatedColumns);
 */
    var locator1=toolBar.AdvancedTab.Analytics.AuditItemslist.replace('labelname',rowlabel);
    const elecount=await this.grabNumberOfVisibleElements(locate({xpath:locator1}));
    await this.say(rowlabel +' count in Calculated Rows')
    if(elecount>0)
    {
      await this.click(locate({xpath:locator1}));
      var locator2=toolBar.AdvancedTab.Analytics.DeleteAuditItemlist.replace('labelname',rowlabel);
      await this.click(locate({xpath:locator2}));
      await this.click(toolBar.AdvancedTab.Analytics.WarningPopupDeleteButton);
      await this.storescreenshot(TestName,scname);
    }
    else
    {
      this.assert(1,elecount,'Calculated Rows '+ rowlabel +' in Audit Column');
    }
   },

   async AuditCalculatedRows(rowlabel,TestName,scname)
   {
      await this.click(toolBar.AdvancedTab.Analytics.AuditDataEditing);
      await this.click(toolBar.AdvancedTab.Analytics.AuditCalculatedRows);
      await this.storescreenshot(TestName,scname);
      var locator1=toolBar.AdvancedTab.Analytics.AuditItemslist.replace('labelname',rowlabel);
      const elecount=await this.grabNumberOfVisibleElements(locate({xpath:locator1}));
      await this.say(rowlabel +' count in Calculated Rows')
      if(elecount>0)
      {
        this.assert(1,1,'Calculated Rows '+ rowlabel +' in Audit Column');
      }
      else
      {
        this.assert(1,elecount,'Calculated Rows '+ rowlabel +' in Audit Column');
      }

   },

   async AuditCalculatedColumns(columnlabel,TestName,scname)
   {
      await this.click(toolBar.AdvancedTab.Analytics.AuditDataEditing);
      await this.click(toolBar.AdvancedTab.Analytics.AuditCalculatedColumns);
      await this.storescreenshot(TestName,scname);
      var locator1=toolBar.AdvancedTab.Analytics.AuditItemslist.replace('labelname',columnlabel);
      const elecount=await this.grabNumberOfVisibleElements(locate({xpath:locator1}));
      await this.say(columnlabel +' count in Calculated Columns');
      if(elecount>0)
      {
        this.assert(1,1,'Calculated Rows '+ columnlabel +' in Audit Column');
      }
      else
      {
        this.assert(1,elecount,'Calculated Rows '+ columnlabel +' in Audit Column');
      }

   },

   async Advanced_AnalyticsAudit(FeatureName,TestName){ 
    await this.InsertCalculatedRow('Europe',rows.row3,TestName,"InsertCalculatedRow",'AuditRow');    
    await this.InsertCalculatedMeasure('PY',TestName,'InsertCalculatedMeasure','AuditMeasure');
    await this.click(toolBar.AdvancedTab.Analytics.Audit);
    await this.AuditCalculatedRows('AuditRow',TestName,'Audit_CalculatedRow');
    await this.DeleteAuditCalculatedRowsColumns('AuditRow',TestName,'DeleteAuditRow','rows');
    await this.AuditCalculatedColumns('AuditMeasure',TestName,'Audit_CalculatedMeasure');
    await this.DeleteAuditCalculatedRowsColumns('AuditMeasure',TestName,'DeleteAuditColumn','columns');
    await this.click(toolBar.AdvancedTab.Analytics.AuditClose);    
   },


   async Advanced_InsertCalculatedMeasure(FeatureName,TestName){ 
    await this.InsertCalculatedMeasure('PY',TestName,'InsertCalculatedMeasure','NewOne');
    await this.clickonInsertColumnOption('View Inserted Column(s)');
    await this.wait(5);
     //Delete the Record
     var locator1=toolBar.AdvancedTab.Customize.ViewInsertRowDelete.replace('labelname','NewOne');
     const element1=locate({xpath:locator1});
     await this.click(element1);
   },

   async ValidatedEditedMeasure(columnlabel,newcolumnlabel){
     //Validate all the columns
     var locator=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',columnlabel);
     const element=locate({xpath:locator});
     var columnlabelcount=await this.grabNumberOfVisibleElements(element);
     var locator1=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',newcolumnlabel);
     const element1=locate({xpath:locator1});
     var newcolumnlabelcount=await this.grabNumberOfVisibleElements(element1);
     if(columnlabelcount===newcolumnlabelcount)
     {
       var i=0;
       var ele;
       var findid;
       var findcol;
       var ele_list;
       var newele_list;
       var ele_list_count;
       var newele_list_count;
       for(i=0;i<columnlabelcount;i++)
       {
         ele=locate(element).at(i+1);
         findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
         findcol=findid.split(" ");
         ele_list=locate('div[id$="'+findcol[3]+'"]');
         ele_list_count=await this.grabNumberOfVisibleElements(ele_list);

         ele=locate(element1).at(i+1);
         findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
         findcol=findid.split(" ");
         newele_list=locate('div[id$="'+findcol[3]+'"] span');
         newele_list_count=await this.grabNumberOfVisibleElements(newele_list);

         if(ele_list_count===newele_list_count)
         {
           var j=0;
           for(j=0;j<ele_list_count;j++)
           {
              var expectedvalue=await this.grabTextFrom(locate(ele_list).at(j+1));
              var actualvalue=await this.grabTextFrom(locate(newele_list).at(j+1));
              await this.assert(expectedvalue,actualvalue,'Base vs Measure Compare');
           }
          }
          else
          {
           this.say('Formula Reference Column count and Measure Column count do not match');
           this.assert(ele_list_count,newele_list_count,'Formula Reference Column count and Measure Column match');    
          }
       }

     }
     else
     {
       this.say('Calculated Measure Columns do not match');
       this.assert(columnlabelcount,newcolumnlabelcount,'Calculated Measure Columns do not match')
     }
   },

   async Advanced_EditCalculatedMeasure(FeatureName,TestName){ 
    await this.InsertCalculatedMeasure('PY',TestName,'InsertCalculatedMeasureforEdit','EditOne');
    await this.clickonInsertColumnOption('View Inserted Column(s)');
    await this.wait(5);
    await this.storescreenshot(TestName,'ViewInsertedColumnsforEdit');
    //Edit the Record
    var locator1=toolBar.AdvancedTab.Customize.ViewInsertRowEdit.replace('labelname','EditOne');
    const element1=locate({xpath:locator1});
    await this.click(element1);
    await this.calculatedMeasureInput('EditedLabel','NA','NA','NA','NA',TestName,'CalculatedMeasureEdited');
    await this.storescreenshot(TestName,'EditedCalculatedMeasure');
    await this.ValidatedEditedMeasure('PY','EditedLabel');
    //Delete the Record
    await this.clickonInsertColumnOption('View Inserted Column(s)');
    await this.wait(5);
    var locator2=toolBar.AdvancedTab.Customize.ViewInsertRowDelete.replace('labelname','EditedLabel');
    const element2=locate({xpath:locator2});
    await this.click(element2);

   },

   async Advanced_DeleteCalculatedMeasure(FeatureName,TestName){ 
    await this.InsertCalculatedMeasure('PY',TestName,'InsertCalculatedMeasureforEdit','DeleteOne');
    await this.clickonInsertColumnOption('View Inserted Column(s)');
    await this.wait(5);
    await this.storescreenshot(TestName,'ViewInsertedColumnsforDelete');
    //Delete the Record
    var locator1=toolBar.AdvancedTab.Customize.ViewInsertRowDelete.replace('labelname','DeleteOne');
    const element1=locate({xpath:locator1});
    await this.click(element1);
    await this.storescreenshot(TestName,'DeletedCalculatedMeasure');
    var locator=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname','DeleteOne');
    const element=locate({xpath:locator});
    const newrowelements=await this.grabNumberOfVisibleElements(element);
    this.say(newrowelements);
    await this.assert(0,newrowelements,'Delete Calculated Measure');

   },
   
   async Advanced_CellEditing(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.selectCell(cells.Cell_3_2);
    await this.click(toolBar.AdvancedTab.Customize.CellEditing);    
    await this.wait(3); 
    var celledit=await this.grabTextFrom(toolBar.AdvancedTab.Customize.CellEditingDiv);
    await this.InputCellEditing(celledit+'*1',TestName,'CellEditingInput');
    await this.storescreenshot(TestName,'AfterCellEditing');
   },

   async Advanced_RowAggregationNative(FeatureName,TestName){     
    var scname='RowAggregationNative';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Native');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async Advanced_RowAggregationSum(FeatureName,TestName){     
    var scname='RowAggregationSum';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Sum');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async Advanced_RowAggregationMinimum(FeatureName,TestName){     
    var scname='RowAggregationMinimum';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Minimum');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async Advanced_RowAggregationMaximum(FeatureName,TestName){     
    var scname='RowAggregationMaximum';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Maximum');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async Advanced_RowAggregationAvgChildren(FeatureName,TestName){     
    var scname='RowAggregationAvgChildren';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Average (children)');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async Advanced_RowAggregationAvgLeaf(FeatureName,TestName){     
    var scname='RowAggregationAvgLeaf';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Average (Leaf)');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async Advanced_RowAggregationStandardDeviation(FeatureName,TestName){     
    var scname='RowAggregationStandardDeviation';
    await this.clickOnAdvancedTab();
    await this.SelectRowAggTypeAdvancedTab('Standard Deviation');
    await this.storescreenshot(TestName,scname);
    const res=await this.doVisualRegression(TestName,scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - '+scname+'.png'));
    } 
   },

   async MoveToDefaultTemplate(){
    await this.click(toolBar.AdvancedTab.Display.Templates); 
    var templ=toolBar.AdvancedTab.Display.TemplateType.replace("templatetype",'Default');
    await this.click(locate(templ));    
    this.wait(5); 
    await this.click(toolBar.AdvancedTab.Display.Templates);   
   },

   async Advanced_TemplatesDefaultMatrix(FeatureName,TestName){     
    var scname='Default';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    
   },

   async Advanced_TemplatesDefaultSpreadsheet(FeatureName,TestName){     
    var scname='Spreadsheet';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

   async Advanced_TemplatesFinancialsSimple(FeatureName,TestName){     
    var scname='Simple';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

   async Advanced_TemplatesFinancialswBars(FeatureName,TestName){     
    var scname='w. Bars';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,'wBars');
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+'wBars');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_wBars.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

   async Advanced_TemplatesFinancialswWaterfall(FeatureName,TestName){     
    var scname='w. Waterfall';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,'wWaterfall');
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+'wWaterfall');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_wWaterfall.png'));
    } 
    await this.MoveToDefaultTemplate();
   },
   
   async Advanced_AnalyticsAddAlert(FeatureName,TestName){     
    var scname='AnalyticsAlert';
    await this.clickOnAdvancedTab();
    await this.AddAlert(TestName,scname);
    var alertlistcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Analytics.AlertList);
    scname='EditAlert';
    await this.EditAlert(alertlistcount,'AlertAdd','saravanakk@visualbi.com',TestName,scname);
    scname='EditAlertConfig';
    await this.EditAlertConfig(alertlistcount,'Country','is','USA',TestName,scname);
    const res=await this.doVisualRegression(TestName,'AnalyticsAlertApplied');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - AnalyticsAlertApplied.png'));
    } 
    //Switch off the alert
    var offbuttonlocator=toolBar.AdvancedTab.Analytics.OffRuleBtn.replace('ind',alertlistcount);
    var offbutton=locate({xpath:offbuttonlocator});
    await this.click(offbutton);
   },

   async Advanced_AnalyticsDuplicateRule(FeatureName,TestName){     
    var scname='AnalyticsAlertDuplicate';
    await this.clickOnAdvancedTab();
    await this.AddAlert(TestName,scname);
    var alertlistcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Analytics.AlertList);
    scname='EditAlertforDuplicate';
    await this.EditAlert(alertlistcount,'AlertForCopy','saravanakk@visualbi.com',TestName,scname);
    //Copy the Alert
    scname='DuplicateAlert';
    await this.DuplicateRule('AlertForCopy',TestName,scname);
    
   },

    //Verify if the header is dark or light
    async verifyHeaderFillColor(element,attrbiValue) {
      propertyValue = await (await this.grabAttributeFrom(element, 'class')).toString();
      await this.say('Property Value: '+propertyValue)
      await this.assertStringIncludes(propertyValue,attrbiValue); 
    },

  async Advanced_AppearanceTableHIconStyle(FeatureName,TestName){     
    var scnamebase='AppearanceTableHIcon';
    var scname='';
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    scname=scnamebase+'UpDown';
    await this.SelectHierarchyIconStyle('Hierarchy Icon Style',TestName,scname,'UpDown');
    scname=scnamebase+'PlusMinus';
    await this.SelectHierarchyIconStyle('Hierarchy Icon Style',TestName,scname,'PlusMinus');
    scname=scnamebase+'PlusMinusSolid';
    await this.SelectHierarchyIconStyle('Hierarchy Icon Style',TestName,scname,'PlusMinusSolid');
    scname=scnamebase+'PlusMinusSquare';
    await this.SelectHierarchyIconStyle('Hierarchy Icon Style',TestName,scname,'PlusMinusSquare');
    scname=scnamebase+'CaretBottomRight';
    await this.SelectHierarchyIconStyle('Hierarchy Icon Style',TestName,scname,'CaretBottomRight');
    scname=scnamebase+'None';
    await this.SelectHierarchyIconStyle('Hierarchy Icon Style',TestName,scname,'None');
    await this.clickOnAppearance();
    },
  
    async Advanced_AppearanceTableRowExpColl(FeatureName,TestName){     
      var scnamebase='AppearanceTableRowExpColl';
      var scname='';
      await this.clickOnAdvancedTab();
      await this.clickOnAppearance();
      scname=scnamebase+'AlwaysPresent';
      await this.SelectRowExpColl('Row Expand/Collapse',TestName,scname,'Always present');
      scname=scnamebase+'OnlyOnHover';
      await this.SelectRowExpColl('Row Expand/Collapse',TestName,scname,'Only on Hover');
      await this.clickOnAppearance();
      },

      async Advanced_AppearanceTableCompactline(FeatureName,TestName){     
        var scnamebase='AppearanceTableCompactline';
        var scname='';
        await this.clickOnAdvancedTab();
        await this.clickOnAppearance();
        scname=scnamebase+'CompactLine_On';
        await this.SelectCompactLine('Compact line',TestName,scname,'On');
        scname=scnamebase+'CompactLine_Off';
        await this.SelectCompactLine('Compact line',TestName,scname,'Off');
        await this.clickOnAppearance();
        },

    async Advanced_AppearanceTableMinorGridlines(FeatureName,TestName){     
      var scnamebase='AppearanceTableMinorGridlines';
      var scname='';
      await this.clickOnAdvancedTab();
      await this.clickOnAppearance();
      scname=scnamebase+'Solid Lines';
      await this.SelectMinorGridlines('Minor gridlines',TestName,scname,'Solid Lines');
      scname=scnamebase+'Dashed Lines';
      await this.SelectMinorGridlines('Minor gridlines',TestName,scname,'Dashed Lines');
      scname=scnamebase+'Off';
      await this.SelectMinorGridlines('Minor gridlines',TestName,scname,'Off');
      await this.clickOnAppearance();
      },
  
    async Advanced_AppearanceTableMajorGridlines(FeatureName,TestName){     
      var scnamebase='AppearanceTableMajorGridlines';
      var scname='';
      await this.clickOnAdvancedTab();
      await this.clickOnAppearance();
      scname=scnamebase+'Single';
      await this.SelectMajorGridlines('Major gridlines',TestName,scname,'Single');
      scname=scnamebase+'Double';
      await this.SelectMajorGridlines('Major gridlines',TestName,scname,'Double');
      scname=scnamebase+'Off';
      await this.SelectMajorGridlines('Major gridlines',TestName,scname,'Off');
      await this.clickOnAppearance();
      },


   async Advanced_AppearanceTableToolbarTheme(FeatureName,TestName){     
    var scname='AppearanceTableToolbarThemeDark';
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    await this.SelectThemeAppearnceAdvancedTab('Toolbar Theme',TestName,scname,'Dark');
    var element=toolBar.AdvancedTab.Display.HeaderContainer;
    await this.verifyHeaderFillColor(element,'darkToolbar');
    scname='AppearanceTableToolbarThemeLight';
    await this.SelectThemeAppearnceAdvancedTab('Toolbar Theme',TestName,scname,'Light');
    await this.verifyHeaderFillColor(element,'lightToolbar');
    await this.clickOnAppearance();
   },
  
   async Advanced_AppearanceTableTheme(FeatureName,TestName){     
    var scname='AppearanceTableThemeDark';
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    await this.SelectThemeAppearnceAdvancedTab('Theme',TestName,scname,'Dark');
    var element=toolBar.AdvancedTab.Display.MatrixContainer;
    await this.verifyFillcolorEntireColumn(element,'rgb(51, 51, 51)'); 
    scname='AppearanceTableThemeLight';
    await this.SelectThemeAppearnceAdvancedTab('Theme',TestName,scname,'Light');
    await this.verifyFillcolorEntireColumn(element,'rgb(255, 255, 255)'); 
    await this.clickOnAppearance();
   },

   async Advanced_AppearanceRowHeight(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    scname='AppearanceTableRowHeight';
    await this.InputRowHeightAdvancedTab('Row Height',TestName,scname,'25');
    await this.clickOnAppearance(); 
   },

   async Advanced_AppearanceSubTotPadding(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    scname='AppearanceTableSubTotPadding';
    await this.InputSubTotPaddAdvancedTab('Sub-Total Padding',TestName,scname,'12');
    await this.clickOnAppearance(); 
   },

   async Advanced_AppearanceDisableGroupInColumn(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    scname='AppearanceTableOffDisableGroup';
    await this.CheckDisableGroupAppearnceAdvancedTab('Disable Group in Column',TestName,scname,'Off');
    var scname='AppearanceTableOnDisableGroup';
    await this.CheckDisableGroupAppearnceAdvancedTab('Disable Group in Column',TestName,scname,'On');      
    await this.clickOnAppearance(); 
   },

   async Advanced_AppearanceChildCount(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    await this.SelectStatusBarAppearnceAdvancedTab('Status Bar',TestName,'StatusForChildCount','On');
    scname='AppearanceTableEnableChildCount';
    await this.CheckChildCountAppearnceAdvancedTab('Enable Child Count',TestName,scname,'On');
    var scname='AppearanceTableDisableChildCount';
    await this.CheckChildCountAppearnceAdvancedTab('Enable Child Count',TestName,scname,'Off');      
    await this.clickOnAppearance(); 
   },


   async Advanced_AppearanceTableStatusBar(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnAppearance();
    scname='AppearanceTableStatusBarOff';
    await this.SelectStatusBarAppearnceAdvancedTab('Status Bar',TestName,scname,'Off');
    var scname='AppearanceTableStatusBarOn';
    await this.SelectStatusBarAppearnceAdvancedTab('Status Bar',TestName,scname,'On');      
    await this.clickOnAppearance();
   },

   async Advanced_TemplatesBusinessT01(FeatureName,TestName){     
    var scname='T01';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

      
   async Advanced_TemplatesBusinessT02(FeatureName,TestName){     
    var scname='T02';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

    
   async Advanced_TemplatesBusinessT03(FeatureName,TestName){     
    var scname='T03';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

   
   async Advanced_TemplatesBusinessT04(FeatureName,TestName){     
    var scname='T04';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

   async Advanced_TemplatesBusinessT05(FeatureName,TestName){     
    var scname='T05';
    await this.clickOnAdvancedTab();
    await this.SelectTemplateTypeAdvancedTab(scname,TestName,scname);
    this.click(toolBar.AdvancedTab.Display.Templates);    
    const res=await this.doVisualRegression(TestName,'Templates_'+scname);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - Templates_'+scname+'.png'));
    } 
    await this.MoveToDefaultTemplate();
   },

   async Advanced_SmartAnalysisContribution(FeatureName,TestName){     
    var scname='SmartAnalysisContribution';
    var typ='Contribution';
    await this.clickOnAdvancedTab();
    await this.SmartAnalysisTypeAdvancedTab(cells.Cell_1_0,typ,TestName,scname);
    //Validate all the columns
    var columnlabel='AC';    
    var locator=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',columnlabel);
    const element=locate({xpath:locator});
    var numberofACcolumns=await this.grabNumberOfVisibleElements(element);
    var newcolumnlabel='% of '+await this.grabTextFrom(locate(cells.Cell_1_0_span));
    var locator1=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',newcolumnlabel);
    const element1=locate({xpath:locator1});
    var numberofContrColumns=await this.grabNumberOfVisibleElements(element1);
    var res='';
    if(numberofACcolumns===numberofContrColumns)
    {
    
      var i=0;
      var ele;
      var findid;
      var findcol;
      var ele_list;
      var newele_list;
      var ele_list_count;
      var newele_list_count;
      var baseACvaluelocator;
      var baseACvalue;
      for(i=0;i<numberofACcolumns;i++)
      {
      
        ele=locate(element).at(i+1);
        findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
        findcol=findid.split(" ");
        ele_list=locate('div[id$="'+findcol[3]+'"]');       
        ele_list_count=await this.grabNumberOfVisibleElements(ele_list);
        //var exp_temp='div[id="table-row-ind_'+findcol[3]+'"] div[role="cell"] span'; 
        var exp_temp='//div[@id="table-row-ind_'+findcol[3]+'"]//div[@role="cell"]/span';

        baseACvaluelocator=locate('div[id="table-row-1_'+findcol[3]+'"] span');
        baseACValue=await this.grabTextFrom(locate(baseACvaluelocator));
        baseACValue=parseFloat(baseACValue);

        ele=locate(element1).at(i+1);
        findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
        findcol=findid.split(" ");
        newele_list=locate('div[id$="'+findcol[3]+'"]');
        newele_list_count=await this.grabNumberOfVisibleElements(newele_list);
        var act=locate('div[id$="'+findcol[3]+'"] span'); 

        if(ele_list_count===newele_list_count)
        {
          var j=0;
          for(j=0;j<ele_list_count;j++)
          {
             var exp=exp_temp.replace('ind',j);
             exp=locate({xpath:exp}); 
             await this.say('Expected Locator:::'+exp);
             await this.say('Actual Locator:::'+act+' at '+j+1);
             var actualvalue=await this.grabTextFrom(act.at(j+1));
             var expectedvalue=await this.grabTextFrom(exp);
             expectedvalue=expectedvalue.replace(',','');
             expectedvalue=parseFloat(expectedvalue);
             expectedvalue=(expectedvalue/baseACValue)*100;
             expectedvalue=expectedvalue.toFixed(2);
             await this.say('Expected Value:::'+expectedvalue);
             await this.say('Actual Value:::'+actualvalue);
             if(expectedvalue!='NaN')  
             {      
              //await this.assert(expectedvalue+'%',actualvalue,'Base vs Measure Compare');
              await this.say(expectedvalue+'% ,'+ actualvalue +',Base vs Measure Compare');
              if(expectedvalue+'%'!=actualvalue)
              res=res+'\n'+expectedvalue+','+actualvalue;
             }
             else
             {
              //await this.assert('0.00%',actualvalue,'Base vs Measure Compare');
              await this.say('0.00%,'+ actualvalue +',Base vs Measure Compare');
              if('0.00%'!=actualvalue)
              res=res+'\n 0.00% ,'+actualvalue;
             }
          }
         }
         else
         {
          this.say('AC and Contribution Cell count do not match');
          await this.SmartAnalysisTypeSelect('Clear');
          await this.clearSelection(cells.Cell_1_0); 
          this.assert(ele_list_count,newele_list_count,'AC and Contribution Cell count match');   
         }
      }

    }
    else
    {
      this.say('AC and Contribution Columns do not match');
      await this.SmartAnalysisTypeSelect('Clear');
      await this.clearSelection(cells.Cell_1_0); 
      this.assert(numberofACcolumns,numberofContrColumns,'AC and Contribution Columns do not match');
    }
    await this.clearSelection(cells.Cell_1_0); 
    await this.SmartAnalysisTypeSelect('Clear'); 
    if(res!='')
    {
      await this.say(res);
      await this.assert(1,0,'Value Comparison Failure');
    }
    else
    {      
      await this.assert(1,1,'Value Comparison Pass');
    }
   },

   
   async Advanced_SmartAnalysisVariance(FeatureName,TestName){     
    var scname='SmartAnalysisVariance';
    var typ='Variance';
    await this.clickOnAdvancedTab();
    await this.SmartAnalysisTypeAdvancedTab(cells.Cell_1_0,typ,TestName,scname);
    //Validate all the columns
    var columnlabel='AC';    
    var locator=toolBar.AdvancedTab.Analytics.SmartAnalysisColumnLabelAC.replace('labelname',columnlabel);
    const element=locate({xpath:locator});
    var numberofACcolumns=await this.grabNumberOfVisibleElements(element);
    var newcolumnlabel='Variance';
    var locator1=toolBar.AdvancedTab.Customize.MatrixColumnLabel.replace('labelname',newcolumnlabel);
    const element1=locate({xpath:locator1});
    var numberofContrColumns=await this.grabNumberOfVisibleElements(element1);
    var res='';
    if(numberofACcolumns===numberofContrColumns)
    {
    
      var i=0;
      var ele;
      var findid;
      var findcol;
      var ele_list;
      var newele_list;
      var ele_list_count;
      var newele_list_count;
      var baseACvaluelocator;
      var baseACvalue;
      for(i=0;i<numberofACcolumns;i++)
      {
        ele=locate(element).at(i+1);
        findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
        findcol=findid.split(" ");
        ele_list=locate('div[id$="'+findcol[3]+'"]');       
        ele_list_count=await this.grabNumberOfVisibleElements(ele_list);
        //var exp_temp='div[id="table-row-ind_'+findcol[3]+'"] div[role="cell"] span'; 
        var exp_temp='//div[@id="table-row-ind_'+findcol[3]+'"]//div[@role="cell"]/span';

        baseACvaluelocator=locate('div[id="table-row-1_'+findcol[3]+'"] span');
        baseACValue=await this.grabTextFrom(locate(baseACvaluelocator));
        baseACValue=parseFloat(baseACValue);

        ele=locate(element1).at(i+1);
        findid= await (await this.grabAttributeFrom(ele, 'class')).toString();
        findcol=findid.split(" ");
        newele_list=locate('div[id$="'+findcol[3]+'"]');
        newele_list_count=await this.grabNumberOfVisibleElements(newele_list);
        var act=locate('div[id$="'+findcol[3]+'"] span'); 

        if(ele_list_count===newele_list_count)
        {
          var j=0;
          for(j=0;j<ele_list_count;j++)
          {
             var exp=exp_temp.replace('ind',j);
             exp=locate({xpath:exp}); 
             await this.say('Expected Locator:::'+exp);
             await this.say('Actual Locator:::'+act+' at '+j+1);
             var actualvalue=await this.grabTextFrom(act.at(j+1));
             var expectedvalue=await this.grabTextFrom(exp);
             expectedvalue=expectedvalue.replace(',','');
             expectedvalue=parseFloat(expectedvalue);
             expectedvalue=(expectedvalue/baseACValue)*100;
             expectedvalue=expectedvalue.toFixed(2);             
             if(expectedvalue!='NaN')  
             {      
              expectedvalue=expectedvalue-100;
              if(expectedvalue<0)
              expectedvalue=expectedvalue*-1;
              expectedvalue=expectedvalue.toFixed(2);
              await this.say('Expected Value:::'+expectedvalue);
              await this.say('Actual Value:::'+actualvalue);
              //await this.assert(expectedvalue+'%',actualvalue,'Base vs Measure Compare');
              await this.say(expectedvalue+'% ,'+ actualvalue +', Base vs Measure Compare');
              if(expectedvalue+'%'!=actualvalue)
              res=res+'\n'+expectedvalue+','+actualvalue;
             }
             else
             {
              //await this.assert('0.00%',actualvalue,'Base vs Measure Compare');
              await this.say('100.00% ,'+ actualvalue +', Base vs Measure Compare');
              if('100.00%'!=actualvalue)
              res=res+'\n 100.00% ,'+actualvalue;
             }
          }
         }
         else
         {
          await this.say('AC and Contribution Cell count do not match');
          await this.clearSelection(cells.Cell_1_0); 
          await this.SmartAnalysisTypeSelect('Clear');
          await this.assert(ele_list_count,newele_list_count,'AC and Contribution Cell count match');    
          res=res+'\n AC and Contribution Cell count match';
         }
      }

    }
    else
    {
      await this.say('AC and Contribution Columns do not match');
      await this.clearSelection(cells.Cell_1_0); 
      await this.SmartAnalysisTypeSelect('Clear');
      await this.assert(numberofACcolumns,numberofContrColumns,'AC and Contribution Columns do not match');
      res=res+'\n AC and Contribution Columns do not match';
    }
    
    await this.clearSelection(cells.Cell_1_0); 
    await this.SmartAnalysisTypeSelect('Clear');  
    if(res!='')
    {
      await this.say(res);
      await this.assert(1,0,'Value Comparison Failure');
    }
    else
    {      
      await this.assert(1,1,'Value Comparison Pass');
    }
   },

   async Advanced_ReportLayout(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnReportLayout();
    await this.storescreenshot(TestName,'ReportLayout')
    await this.clickOnReportLayout();
    const res=await this.doVisualRegression(TestName,'ReportLayout');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - ReportLayout.png'));
    } 
   },

   async Advanced_Pagination_Responsive(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnPaginationdropdown();
    await this.clickOnPaginationresponsive();
    await this.capturescreenshot(TestName,'PaginationResponsive')
    await this.saveScreenshot('PaginationResponsive.png');
    allure.addAttachment('PaginationResponsive',new Buffer("PaginationResponsive.png"),'png');
    const res=await this.doVisualRegression(TestName,'PaginationResponsive');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - PaginationResponsive.png'));
    } 
   },

   async Advanced_Pagination_FixedRows(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnPaginationdropdown();
    await this.clickOnPaginationfixedrows();
    await this.capturescreenshot(TestName,'PaginationFixedRows')
    await this.saveScreenshot('PaginationFixedRows.png');
    allure.addAttachment('PaginationFixedRows',new Buffer("PaginationFixedRows.png"),'png');
    const res=await this.doVisualRegression(TestName,'PaginationFixedRows');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - PaginationFixedRows.png'));
    } 
   },

   async Advanced_Pagination_None(FeatureName,TestName){     
    await this.clickOnAdvancedTab();
    await this.clickOnPaginationdropdown();
    await this.clickOnPaginationnone();
    await this.capturescreenshot(TestName,'PaginationFixedNone')
    await this.saveScreenshot('PaginationFixedNone.png');
    allure.addAttachment('PaginationFixedNone',new Buffer("PaginationFixedNone.png"),'png');
    const res=await this.doVisualRegression(TestName,'PaginationFixedNone');
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - PaginationFixedNone.png'));
    } 
   },

   async Advanced_Breaks_InsertRemovePageBreak(FeatureName,TestName){     
     //var typ="Country";
     var typ="Region";
    await this.clickOnAdvancedTab();
    await this.clickOnBreaksdropdown();
    await this.clickOnInsertPageBreak();
    await this.selectPageBreak(typ);
    await this.capturescreenshot(TestName,'InsertPageBreak'+typ)
    await this.saveScreenshot('InsertPageBreak'+typ+'.png');
    allure.addAttachment('InsertPageBreak'+typ,new Buffer('InsertPageBreak'+typ+'.png'),'png');
    const res=await this.doVisualRegression(TestName,'InsertPageBreak'+typ);
    if(res!='pass')
    {
      const result = await tryTo(() => this.see('Image Equality - InsertPageBreak'+typ+'.png'));
    } 
    await this.clickOnBreaksdropdown();
    await this.clickOnRemovePageBreak();
    await this.capturescreenshot(TestName,'RemovePageBreak'+typ)
    await this.saveScreenshot('RemovePageBreak'+typ+'.png');
    allure.addAttachment('RemovePageBreak'+typ,new Buffer('RemovePageBreak'+typ+'.png'),'png');
    const res1=await this.doVisualRegression(TestName,'RemovePageBreak'+typ);
    if(res1!='pass')
    {
      const result1 = await tryTo(() => this.see('Image Equality - RemovePageBreak'+typ+'.png'));
    } 
   },

    /* async verifyelementsvisible(element) 
    {
      const tt=await this.grabNumberOfVisibleElements(element);
      return tt;
    },  
 */

   async Advanced_EnableHeader(FeatureName,TestName){     
       await this.navigateTOHeaderFooter();
       const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
       if(headereditor<1)
       {
         await this.clickOnEnableHeader();
       }
       const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
       await this.storescreenshot(TestName,'Advanced_EnableHeader')    
        if(headereditorcount===1)
       {
         this.say("Header Editor is shown");
        this.assertStringIncludes("1","1");
       }
       else
       {
        this.say("Header Editor is NOT shown");
        this.assertStringIncludes("1","0")
       }
       await this.clickOnAdvancedTab();
       await this.storescreenshot(TestName,'Advanced_Tab_Header');
    }, 

    async Advanced_DisableHeader(FeatureName,TestName){     
      await this.navigateTOHeaderFooter();
      const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
      if(headereditor>0)
      {
        await this.clickOnDisableHeader();
      }
      const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
      await this.storescreenshot(TestName,'Advanced_DisableHeader')    
      if(headereditorcount===0)
      {
        this.say("Header Editor is hidden");
        this.assertStringIncludes("0","0");
      }
      else
      {
       this.say("Header Editor is shown");
       this.assertStringIncludes("0","1")
      }
      await this.clickOnAdvancedTab();
      await this.storescreenshot(TestName,'Advanced_Tab_HeaderDisable');
    
   }, 
   async navigateTOHeaderFooter(){
    await this.clickOnAdvancedTab();
    await this.clickOnHeaderFooter();
   },
   async storescreenshot(TestName,filename){
    await this.capturescreenshot(TestName,filename)    
    await this.saveScreenshot(filename+'.png');
    await allure.addAttachment(filename,new Buffer(filename+".png"),'png');   
   },

   async Advanced_EnableFooter(FeatureName,TestName){     
    await this.navigateTOHeaderFooter();
    const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
    if(footerlabel<1)
    {
      await this.clickOnEnableFooter();
    }
    const footerlabelcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
    await this.storescreenshot(TestName,'Advanced_EnableFooter');
     if(footerlabelcount===1)
    {
      this.say("Footer is shown");
     this.assertStringIncludes("1","1");
    }
    else
    {
     this.say("Footer is NOT shown");
     this.assertStringIncludes("1","0")
    }
    /* await this.clickOnAdvancedTab();
    await this.capturescreenshot(TestName,'Advanced_Tab_Footer');
    await this.saveScreenshot('Advanced_Tab_Footer.png');
    await allure.addAttachment('Advanced_Tab_Footer',new Buffer("Advanced_Tab_Footer.png"),'png');
    */
 }, 

    async Advanced_DisableFooter(FeatureName,TestName){     
      await this.navigateTOHeaderFooter();
      const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
      if(footerlabel>0)
      {
        await this.clickOnDisableFooter();
      }
      const footerlabelcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
      await this.storescreenshot(TestName,'Advanced_DisableFooter');
      if(footerlabelcount===0)
      {
        this.say("Footer is hidden");
        this.assertStringIncludes("0","0");
      } 
      else
      {
        this.say("Footer is shown");
        this.assertStringIncludes("0","1")
      }
      /* await this.clickOnAdvancedTab();
      await this.capturescreenshot(TestName,'Advanced_Tab_Footer');
      await this.saveScreenshot('Advanced_Tab_Footer.png');
      await allure.addAttachment('Advanced_Tab_Footer',new Buffer("Advanced_Tab_Footer.png"),'png');
      */
    },
    
    async Advanced_FooterInsertPageNumberXofY(FeatureName,TestName){     
      await this.navigateTOHeaderFooter();
      const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
      if(footerlabel<1)
      {
        await this.clickOnEnableFooter();
      }
      await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
      await this.clickOnPageNumberDropDown();
      await this.clickOnInsertPageNumberXofY();      
      await this.storescreenshot(TestName,'Advanced_FooterPageNumberInsertXofY')    
      await this.seeElement(toolBar.AdvancedTab.Header_Footer.FooterPageXofYeditor);      
      await this.clickOnAdvancedTab();
      await this.storescreenshot(TestName,'Advanced_Tab_FooterPageNumberInsertXofY');
   }, 

    async Advanced_HeaderInsertPageNumberXofY(FeatureName,TestName){     
       await this.navigateTOHeaderFooter();
      const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
      if(headerlabel<1)
      {
        await this.clickOnEnableHeader();
      }
      await this.clickOnPageNumberDropDown();
      await this.clickOnInsertPageNumberXofY();      
      await this.storescreenshot(TestName,'Advanced_HeaderPageNumberInsertXofY')    
      await this.seeElement(toolBar.AdvancedTab.Header_Footer.PageXofYeditor);      
      await this.clickOnAdvancedTab();
      await this.storescreenshot(TestName,'Advanced_Tab_HeaderPageNumberInsertXofY');
    }, 

    async Advanced_FooterInsertPageNumberXbyY(FeatureName,TestName){     
      await this.navigateTOHeaderFooter();
      const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
      if(footerlabel<1)
      {
        await this.clickOnEnableFooter();
      }
      await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
      await this.clickOnPageNumberDropDown();
      await this.clickOnInsertPageNumberXByY();
      await this.storescreenshot(TestName,'Advanced_FooterPageNumberInsertXbyY')    
      await this.seeElement(toolBar.AdvancedTab.Header_Footer.FooterPageXbyYeditor);
      await this.clickOnAdvancedTab();
      await this.storescreenshot(TestName,'Advanced_Tab_FooterPageNumberInsertXbyY');
      await this.navigateTOHeaderFooter();
      await this.clickOnDisableFooter();
   }, 

   async Advanced_HeaderInsertPageNumberXbyY(FeatureName,TestName){     
    await this.navigateTOHeaderFooter();
    const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
    if(headerlabel<1)
    {
      await this.clickOnEnableHeader();
    }
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberXByY();
    await this.storescreenshot(TestName,'Advanced_HeaderPageNumberInsertXbyY')    
    await this.seeElement(toolBar.AdvancedTab.Header_Footer.PageXbyYeditor);
    await this.clickOnAdvancedTab();
    await this.storescreenshot(TestName,'Advanced_Tab_HeaderPageNumberInsertXbyY');

 }, 

 async Advanced_FooterInsertPageNumberX(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  await this.clickOnPageNumberDropDown();
  await this.clickOnInsertPageNumberX();
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberInsertX');
  await this.seeElement(toolBar.AdvancedTab.Header_Footer.FooterPageXeditor);
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterPageNumberInsertX');
 
}, 

 async Advanced_HeaderInsertPageNumberX(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  await this.clickOnPageNumberDropDown();
  await this.clickOnInsertPageNumberX();
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberInsertX');
  await this.seeElement(toolBar.AdvancedTab.Header_Footer.PageXeditor);
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderPageNumberInsertX');
 
}, 


async Advanced_HeaderDeletePageNumberXofY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const PageNumberXofY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXofYeditor);
  if(PageNumberXofY<1)
  {
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberXofY();      
  }
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberXofY_BeforeDelete')    
  const BeforeDeleteXofY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXofYeditor);
  await this.clickOnDeletePageNumberXofY(1); 
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberXofY_AfterDelete')    
  const DeleteXofY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXofYeditor);
  if(DeleteXofY===BeforeDeleteXofY-1)
  {
    this.say("Page Number XofY is deleted");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("Page Number XofY NOT deleted");
    this.assertStringIncludes("0","1");
  }     
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderPageNumberDeleteXofY');
 }, 


 async Advanced_FooterDeletePageNumberXofY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const PageNumberXofY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXofYeditor);
  if(PageNumberXofY<1)
  {
    await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberXofY();      
  }
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberXofY_BeforeDelete')    
  const BeforeDeleteXofY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXofYeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  await this.clickOnDeletePageNumberXofYFooter(1); 
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberXofY_AfterDelete')    
  const DeleteXofY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXofYeditor);
  if(DeleteXofY===BeforeDeleteXofY-1)
  {
    this.say("Page Number XofY is deleted");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("Page Number XofY NOT deleted");
    this.assertStringIncludes("0","1");
  }     
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterPageNumberDeleteXofY');
 }, 

async Advanced_HeaderDeletePageNumberXbyY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const PageNumberXbyY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXbyYeditor);
  if(PageNumberXbyY<1)
  {
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberXByY();      
  }
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberXbyY_BeforeDelete')    
  const BeforeDeleteXbyY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXbyYeditor);
  await this.clickOnDeletePageNumberXbyY(1); 
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberXbyY_AfterDelete')    
  const DeleteXbyY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXbyYeditor);
  if(DeleteXbyY===BeforeDeleteXbyY-1)
  {
    this.say("Page Number XbyY is deleted");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("Page Number XbyY NOT deleted");
    this.assertStringIncludes("0","1");
  }     
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderPageNumberDeleteXbyY');
 }, 

 async Advanced_FooterDeletePageNumberXbyY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const PageNumberXbyY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXbyYeditor);
  if(PageNumberXbyY<1)
  {
    await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel)
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberXByY();      
  }
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberXbyY_BeforeDelete')    
  const BeforeDeleteXbyY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXbyYeditor);
  await this.clickOnDeletePageNumberXbyYFooter(1); 
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberXbyY_AfterDelete')    
  const DeleteXbyY=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXbyYeditor);
  if(DeleteXbyY===BeforeDeleteXbyY-1)
  {
    this.say("Page Number XbyY is deleted");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("Page Number XbyY NOT deleted");
    this.assertStringIncludes("0","1");
  }     
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterPageNumberDeleteXbyY');
 }, 

async Advanced_HeaderDeletePageNumberX(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const PageNumberX=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXeditor);
  if(PageNumberX<1)
  {
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberX();      
  }
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberX_BeforeDelete')    
  const BeforeDeleteX=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXeditor);
  await this.clickOnDeletePageNumberX(1); 
  await this.storescreenshot(TestName,'Advanced_HeaderPageNumberX_AfterDelete')    
  const DeleteX=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.PageXeditor);
  if(DeleteX===BeforeDeleteX-1)
  {
    this.say("Page Number X is deleted");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("Page Number X NOT deleted");
    this.assertStringIncludes("0","1");
  }     
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderPageNumberDeleteX');
 }, 

 
async Advanced_FooterDeletePageNumberX(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const PageNumberX=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXeditor);
  if(PageNumberX<1)
  {
    await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
    await this.clickOnPageNumberDropDown();
    await this.clickOnInsertPageNumberX();      
  }
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberX_BeforeDelete')    
  const BeforeDeleteX=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXeditor);
  await this.clickOnDeletePageNumberXFooter(1); 
  await this.storescreenshot(TestName,'Advanced_FooterPageNumberX_AfterDelete')    
  const DeleteX=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterPageXeditor);
  if(DeleteX===BeforeDeleteX-1)
  {
    this.say("Page Number X is deleted");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("Page Number X NOT deleted");
    this.assertStringIncludes("0","1");
  }     
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterPageNumberDeleteX');
 }, 

async Advanced_HeaderInsertDate_Slash_MMDDYYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();  
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYY);
  await this.clickOnDateTimeDropDown();
  await this.clickOnInsertDateTimeMM_DD_YYYY('01/01/2021');      
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeSlashMM_DD_YYYY');   
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count+1)
  {
    this.say("Inserted Slash Date MM DD YYYY");
    this.assertStringIncludes("1","1");
  }
  else
  {
    this.say("NOT Inserted Slash Date MM DD YYYY");
    this.assertStringIncludes("1","0");
  }      
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderSlashDateTimeMM_DD_YYYY');
 }, 

 async Advanced_FooterInsertDate_Slash_MMDDYYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYY);
  await this.clickOnDateTimeDropDown();
  await this.clickOnInsertDateTimeMM_DD_YYYY('01/01/2021');      
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeSlashMM_DD_YYYY');   
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count+1)
  {
    this.say("Inserted Slash Date MM DD YYYY");
    this.assertStringIncludes("1","1");
  }
  else
  {
    this.say("NOT Inserted Slash Date MM DD YYYY");
    this.assertStringIncludes("1","0");
  }      
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterSlashDateTimeMM_DD_YYYY');
 }, 

async Advanced_HeaderInsertDate_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();   
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYY);
  this.say(date_mm_dd_yyyy_count);
  await this.clickOnDateTimeDropDown();
  await this.clickOnInsertDateTimeMM_DD_YYYY('Jan 1, 2021');      
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeMM_DD_YYYY')    
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYY);     
  this.say(date_mm_dd_yyyy_count_now);
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count+1)
  {
    this.say("Inserted Date_MM_DD_YYYY");
    this.assertStringIncludes("1","1");
  }
  else
  {
    this.say("NOT Inserted Date_MM_DD_YYYY");
    this.assertStringIncludes("1","0");
  }      
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderDateTimeMM_DD_YYYY');
 }, 

 
async Advanced_FooterInsertDate_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYY);
  this.say(date_mm_dd_yyyy_count);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  await this.clickOnDateTimeDropDown();
  await this.clickOnInsertDateTimeMM_DD_YYYY('Jan 1, 2021');      
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeMM_DD_YYYY')    
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYY);     
  this.say(date_mm_dd_yyyy_count_now);
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count+1)
  {
    this.say("Inserted Date_MM_DD_YYYY");
    this.assertStringIncludes("1","1");
  }
  else
  {
    this.say("NOT Inserted Date_MM_DD_YYYY");
    this.assertStringIncludes("1","0");
  }      
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterDateTimeMM_DD_YYYY');
 }, 

 async Advanced_HeaderInsertDate_Hyphen_MMDDYYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();   
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(footerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYY);
  await this.clickOnDateTimeDropDown();
  await this.clickOnInsertDateTimeMM_DD_YYYY('2021-01-01');      
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeHyphenMM_DD_YYYY')    
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count+1)
  {
    this.say("Inserted Hyphen Date YYYY-MM-DD");
    this.assertStringIncludes("1","1");
  }
  else
  {
    this.say("NOT Inserted Hyphen Date MM DD YYYY");
    this.assertStringIncludes("1","0");
  }      
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderHyphenDateTimeMM_DD_YYYY');
}, 

async Advanced_FooterInsertDate_Hyphen_MMDDYYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYY);
  await this.clickOnDateTimeDropDown();
  await this.clickOnInsertDateTimeMM_DD_YYYY('2021-01-01');      
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeHyphenMM_DD_YYYY')    
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count+1)
  {
    this.say("Inserted Hyphen Date YYYY-MM-DD");
    this.assertStringIncludes("1","1");
  }
  else
  {
    this.say("NOT Inserted Hyphen Date MM DD YYYY");
    this.assertStringIncludes("1","0");
  }      
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterHyphenDateTimeMM_DD_YYYY');
}, 

async Advanced_HeaderDeleteDate_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();    
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYY);
  if(date_mm_dd_yyyy_count===0)
  {
    await this.clickOnDateTimeDropDown();
    await this.clickOnInsertDateTimeMM_DD_YYYY('Jan 1, 2021');      
  }
  const date_mm_dd_yyyy_count_beforedelete=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYY);
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeMM_DD_YYYY_BeforeDelete')    
  await this.clickOnDeleteDateMM_DD_YYYY(1);
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count_beforedelete-1)
  {
    this.say("Deleted Date_MM_DD_YYYY");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted Date_MM_DD_YYYY");
    this.assertStringIncludes("0","1");
  } 
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeMM_DD_YYYY_AfterDelete')    
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderDateTimeMM_DD_YYYY_Delete');
 }, 

 async Advanced_FooterDeleteDate_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYY);
 
  if(date_mm_dd_yyyy_count===0)
  {
    await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
    await this.clickOnDateTimeDropDown();
    await this.clickOnInsertDateTimeMM_DD_YYYY('Jan 1, 2021');       
  }
  const date_mm_dd_yyyy_count_beforedelete=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYY);
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeMM_DD_YYYY_BeforeDelete')    
  await this.clickOnDeleteDateMM_DD_YYYYFooter(1);
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count_beforedelete-1)
  {
    this.say("Deleted Date_MM_DD_YYYY");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted Date_MM_DD_YYYY");
    this.assertStringIncludes("0","1");
  } 
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeMM_DD_YYYY_AfterDelete')    
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterDateTimeMM_DD_YYYY_Delete');
 }, 

 
async Advanced_FooterDeleteDate_Slash_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYY);
  if(date_mm_dd_yyyy_count===0)
  {
    await this.clickOnDateTimeDropDown();
    await this.clickOnInsertDateTimeMM_DD_YYYY('01/01/2021');      
  }
  const date_mm_dd_yyyy_count_beforedelete=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYY);
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeSlashMM_DD_YYYY_BeforeDelete')    
  await this.clickOnDeleteSlashDateMM_DD_YYYYFooter(1);
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeSlashMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count_beforedelete-1)
  {
    this.say("Deleted DateSlash_MM_DD_YYYY");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted DateSlash_MM_DD_YYYY");
    this.assertStringIncludes("0","1");
  } 
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeSlashMM_DD_YYYY_AfterDelete')    
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderSlashDateTimeMM_DD_YYYY_Delete');
}, 

async Advanced_HeaderDeleteDate_Slash_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();   
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYY);
  if(date_mm_dd_yyyy_count===0)
  {
    await this.clickOnDateTimeDropDown();
    await this.clickOnInsertDateTimeMM_DD_YYYY('01/01/2021');   
  }
  const date_mm_dd_yyyy_count_beforedelete=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYY);
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeSlashMM_DD_YYYY_BeforeDelete')    
  
  await this.clickOnDeleteSlashDateMM_DD_YYYY(1);
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeSlashMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count_beforedelete-1)
  {
    this.say("Deleted DateSlash_MM_DD_YYYY");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted DateSlash_MM_DD_YYYY");
    this.assertStringIncludes("0","1");
  } 
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeSlashMM_DD_YYYY_AfterDelete')    
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterSlashDateTimeMM_DD_YYYY_Delete');
}, 


async Advanced_FooterDeleteDate_Hyphen_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYY);
  if(date_mm_dd_yyyy_count===0)
  {
    await this.clickOnDateTimeDropDown();
    await this.clickOnInsertDateTimeMM_DD_YYYY('2021-01-01');    
  }
  const date_mm_dd_yyyy_count_beforedelete=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYY);
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeHyphenMM_DD_YYYY_BeforeDelete')    
  await this.clickOnDeleteHyphenDateMM_DD_YYYY(1);
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterDateTimeHyphenMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count_beforedelete-1)
  {
    this.say("Deleted DateHyphen_MM_DD_YYYY");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted DateHyphen_MM_DD_YYYY");
    this.assertStringIncludes("0","1");
  } 
  await this.storescreenshot(TestName,'Advanced_FooterDateTimeHyphenMM_DD_YYYY_AfterDelete')    
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterHyphenDateTimeMM_DD_YYYY_Delete');
 }, 

async Advanced_HeaderDeleteDate_Hyphen_MM_DD_YYYY(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();   
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const date_mm_dd_yyyy_count=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYY);
  if(date_mm_dd_yyyy_count===0)
  {
    await this.clickOnDateTimeDropDown();
    await this.clickOnInsertDateTimeMM_DD_YYYY('2021-01-01');      
  }
  const date_mm_dd_yyyy_count_beforedelete=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYY);
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeHyphenMM_DD_YYYY_BeforeDelete')    
  await this.clickOnDeleteHyphenDateMM_DD_YYYY(1);
  const date_mm_dd_yyyy_count_now=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.DateTimeHyphenMMDDYYYY);     
  if(date_mm_dd_yyyy_count_now===date_mm_dd_yyyy_count_beforedelete-1)
  {
    this.say("Deleted DateHyphen_MM_DD_YYYY");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted DateHyphen_MM_DD_YYYY");
    this.assertStringIncludes("0","1");
  } 
  await this.storescreenshot(TestName,'Advanced_HeaderDateTimeHyphenMM_DD_YYYY_AfterDelete')    
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderHyphenDateTimeMM_DD_YYYY_Delete');
 }, 

async Advanced_HeaderInsertImage(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();  
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  await this.clickOnInsertImage();
  await this.fileupload();
  await this.storescreenshot(TestName,'Advanced_HeaderInsertImage')    
  await this.seeElement(toolBar.AdvancedTab.Header_Footer.ImageCanvas);    
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderInsertImage');
}, 


async Advanced_FooterInsertImage(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  await this.clickOnInsertImage();
  await this.fileuploadFooter();
  await this.storescreenshot(TestName,'Advanced_FooterInsertImage')    
  await this.seeElement(toolBar.AdvancedTab.Header_Footer.ImageCanvasFooter);    
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderInsertImage');
}, 

async Advanced_FooterDeleteImage(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  const footerimage=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.ImageCanvasFooter);
  if(footerimage<1)
  {
    
    await this.clickOnInsertImage();
    await this.fileuploadFooter();
  }
  const beforedeletefooterimage=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.ImageCanvasFooter);
  await this.storescreenshot(TestName,'Advanced_FooterImageBeforeDelete');    
   await this.clickOnDeleteImageFooter(1);
  const footerimagenow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.ImageCanvasFooter);
  await this.storescreenshot(TestName,'Advanced_FooterImageAfterDelete');    

  if(footerimagenow===beforedeletefooterimage-1)
  {
    this.say("Deleted Footer Image");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted Footer Image");
    this.assertStringIncludes("0","1");
  } 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterDeleteImage');
}, 

async Advanced_HeaderDeleteImage(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();  
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const headerimage=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.ImageCanvas);
  if(headerimage<1)
  {
    await this.clickOnInsertImage();
    await this.fileupload();
  }
  const beforedeleteheaderimage=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.ImageCanvas);
  await this.storescreenshot(TestName,'Advanced_HeaderImageBeforeDelete');    
   await this.clickOnDeleteImage(beforedeleteheaderimage);
  const headerimagenow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.ImageCanvas);
  await this.storescreenshot(TestName,'Advanced_HeaderImageAfterDelete');    

  if(headerimagenow===beforedeleteheaderimage-1)
  {
    this.say("Deleted Header Image");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted Header Image");
    this.assertStringIncludes("0","1");
  } 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderDeleteImage');
}, 


async Advanced_HeaderInsertTextBox(FeatureName,TestName){     
  await this.navigateTOHeaderFooter(); 
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(footerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  await this.clickOnInsertTextBox();
  await this.storescreenshot(TestName,'Advanced_HeaderInsertTextBox')    
  await this.seeElement(toolBar.AdvancedTab.Header_Footer.TextBoxeditor);    
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderInsertTextBox');
 }, 

 
async Advanced_FooterInsertTextBox(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterInsertTextBox')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    await this.seeElement(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);   
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterInsertTextBox');
 }, 

 
async Advanced_FooterDeleteTextBox(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextbox=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  if(footertextbox<1)
  {
    
    await this.clickOnInsertTextBox();
  }
  const beforedeletefootertextbox=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterTextBoxBeforeDelete')    
  await this.clickOnDeleteTextBoxFooter(1);
  const footertextboxnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterTextBoxAfterDelete')    
 
  if(footertextboxnow===beforedeletefootertextbox-1)
  {
    this.say("Deleted TextBox");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted TextBox");
    this.assertStringIncludes("0","1");
  } 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterDeleteTextBox');
 }, 

async Advanced_HeaderDeleteTextBox(FeatureName,TestName){     
  await this.navigateTOHeaderFooter(); 
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const headertextbox=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.TextBoxeditor);
  if(headertextbox<1)
  {
    await this.clickOnInsertTextBox();;
  }
  const beforedeleteheadertextbox=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.TextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_HeaderTextBoxBeforeDelete')    
  await this.clickOnDeleteTextBox(beforedeleteheadertextbox);
  const headertextboxnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.TextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_HeaderTextBoxAfterDelete')    
 
  if(headertextboxnow===beforedeleteheadertextbox-1)
  {
    this.say("Deleted TextBox");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted TextBox");
    this.assertStringIncludes("0","1");
  } 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderDeleteTextBox');
 }, 


async Advanced_HeaderInsertField(FeatureName,TestName){     
  await this.navigateTOHeaderFooter(); 
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  await this.clickOnInsertField();
  await this.storescreenshot(TestName,'Advanced_HeaderInsertField')    
  await this.seeElement(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValue).withText('America'));    
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderInsertField');
  }, 

  
async Advanced_FooterInsertField(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  await this.clickOnInsertField();
  await this.storescreenshot(TestName,'Advanced_FooterInsertField')    
  await this.seeElement(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValueFooter).withText('America'));    
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterInsertField');
  }, 

async Advanced_HeaderDeleteField(FeatureName,TestName){     
  await this.navigateTOHeaderFooter(); 
  const headerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headerlabel<1)
  {
    await this.clickOnEnableHeader();
  }
  const fieldcount=await this.grabNumberOfVisibleElements(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValue).withText('America'));
  if(fieldcount<1)
  {
  await this.clickOnInsertField();
  }
  const beforedeletefieldcount=await this.grabNumberOfVisibleElements(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValue).withText('America'));
  await this.storescreenshot(TestName,'Advanced_HeaderInsertFieldBeforeDelete')   
  await this.clickOnDeleteField(beforedeletefieldcount);
  const headerfieldnow=await this.grabNumberOfVisibleElements(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValue).withText('America'));
  await this.storescreenshot(TestName,'Advanced_HeaderFieldAfterDelete')    
  
  if(headerfieldnow===beforedeletefieldcount-1)
  {
    this.say("Deleted Field");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted Field");
    this.assertStringIncludes("0","1");
  } 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderDeleteField');
}, 


async Advanced_FooterDeleteField(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }  
  const fieldcount=await this.grabNumberOfVisibleElements(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValueFooter).withText('America'));
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(fieldcount<1)
  {
    
    await this.clickOnInsertField();
  }
  const beforedeletefieldcount=await this.grabNumberOfVisibleElements(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValueFooter).withText('America'));
  await this.storescreenshot(TestName,'Advanced_HeaderInsertFieldBeforeDelete')   
  await this.clickOnDeleteField(beforedeletefieldcount);
  const headerfieldnow=await this.grabNumberOfVisibleElements(locate(toolBar.AdvancedTab.Header_Footer.FieldNameValue).withText('America'));
  await this.storescreenshot(TestName,'Advanced_HeaderFieldAfterDelete')    
  
  if(headerfieldnow===beforedeletefieldcount-1)
  {
    this.say("Deleted Field");
    this.assertStringIncludes("0","0");
  }
  else
  {
    this.say("NOT Deleted Field");
    this.assertStringIncludes("0","1");
  } 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderDeleteField');
}, 

async Advanced_HeaderBold(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeBold'); 
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");
    var span=toolBar.AdvancedTab.Header_Footer.HeaderParaSpan.replace('index','1');
    var strong=toolBar.AdvancedTab.Header_Footer.HeaderParaStrong.replace('index','1');
    const headerspancount=await this.grabNumberOfVisibleElements(span);
    await this.clickOnHeaderBold(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    const headerstrongcount=await this.grabNumberOfVisibleElements(strong);
    await this.storescreenshot(TestName,'Advanced_HeaderAfterBold');  
    this.say(headerspancount);
    this.say(headerstrongcount);
    if(headerspancount===headerstrongcount)
    {
      this.say("Header Editor made Bold");
      this.assertStringIncludes("1","1");
    }
    else
    {
      this.say("Header Editor NOT Bold");
      this.assertStringIncludes("1","0")
    }
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderBold');
  
}, 


async Advanced_FooterBold(FeatureName,TestName){  
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeBold');  
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.clickOnFooterBold(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor),feditor);
  var strong=toolBar.AdvancedTab.Header_Footer.FooterParaStrong.replace('index',feditor);
  const headerstrongcount=await this.grabNumberOfVisibleElements(strong);
  await this.storescreenshot(TestName,'Advanced_HeaderAfterBold');  

   if(headerstrongcount>0)
    {
      this.say("Footer Editor made Bold");
      this.assertStringIncludes("1","1");
    }
    else
    {
      this.say("Footer Editor NOT Bold");
      this.assertStringIncludes("1","0")
    }
 
 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterBold');
  
}, 


async Advanced_HeaderItalic(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeItalic');    
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");
    var span=toolBar.AdvancedTab.Header_Footer.HeaderParaSpan.replace('index','1');
    var em=toolBar.AdvancedTab.Header_Footer.HeaderParaItalic.replace('index','1');
    const headerspancount=await this.grabNumberOfVisibleElements(span);
    await this.clickOnHeaderItalic(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    const headeremcount=await this.grabNumberOfVisibleElements(em);
    await this.storescreenshot(TestName,'Advanced_HeaderAfterItalic'); 
    this.say(headerspancount);
    this.say(headeremcount);
    if(headerspancount===headeremcount)
    {
      this.say("Header Editor made Italic");
      this.assertStringIncludes("1","1");
    }
    else
    {
      this.say("Header Editor NOT Italic");
      this.assertStringIncludes("1","0")
    }
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderItalic'); 
}, 


async Advanced_FooterItalic(FeatureName,TestName){  
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeItalic')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.clickOnFooterItalic(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor),feditor);
  var em=toolBar.AdvancedTab.Header_Footer.FooterParaItalic.replace('index',feditor);  
  const headeremcount=await this.grabNumberOfVisibleElements(em);
  await this.storescreenshot(TestName,'Advanced_FooterAfterItalic');  

   if(headeremcount>0)
    {
      this.say("Footer Editor made Italic");
      this.assertStringIncludes("1","1");
    }
    else
    {
      this.say("Footer Editor NOT Italic");
      this.assertStringIncludes("1","0")
    }
 
 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterItalic');
  
}, 

async Advanced_HeaderUnderline(FeatureName,TestName){     
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeUnderline'); 
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");
    var span=toolBar.AdvancedTab.Header_Footer.HeaderParaSpan.replace('index','1');
    var u=toolBar.AdvancedTab.Header_Footer.HeaderParaUnderline.replace('index','1');
    const headerspancount=await this.grabNumberOfVisibleElements(span);
    await this.clickOnHeaderUnderline(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    const headerucount=await this.grabNumberOfVisibleElements(u);
    await this.storescreenshot(TestName,'Advanced_HeaderAfterUnderline');   
    this.say(headerspancount);
    this.say(headerucount);
    if(headerspancount===headerucount)
    {
      this.say("Header Editor made Underline");
      this.assertStringIncludes("1","1");
    }
    else
    {
      this.say("Header Editor NOT Underline");
      this.assertStringIncludes("1","0")
    }
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderUnderline');
}, 


async Advanced_FooterUnderline(FeatureName,TestName){  
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeUnderline')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
   
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.clickOnFooterUnderline(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor),feditor);
  var u=toolBar.AdvancedTab.Header_Footer.FooterParaUnderline.replace('index',feditor);
  const footerucount=await this.grabNumberOfVisibleElements(u);
  await this.storescreenshot(TestName,'Advanced_FooterAfterUnderline');  

   if(footerucount>0)
    {
      this.say("Footer Editor made Underline");
      this.assertStringIncludes("1","1");
    }
    else
    {
      this.say("Footer Editor NOT Underline");
      this.assertStringIncludes("1","0")
    }
 
 
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterUnderline');
  
}, 

 //Validate Fill Color
 async Advanced_HeaderFillColor(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeFillColor');   
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");
    await this.click(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
    await this.clickOnFillColordropdown();
    await this.clickOnFontColor('#f0e199');
    var fillele=toolBar.AdvancedTab.Header_Footer.fillcolorElement.replace('index','1');

    await this.verifyFillcolor(fillele,'rgb(240, 225, 153)');
    await this.storescreenshot(TestName,'Advanced_HeaderAfterFillColor'); 
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderFillColor');
},

 //Validate Fill Color
 async Advanced_FooterFillColor(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeFillColor')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.clickOnFillColordropdown();
  await this.clickOnFontColor('#f0e199');  
  await this.storescreenshot(TestName,'Advanced_HeaderAfterFillColor'); 
  var fillele=toolBar.AdvancedTab.Header_Footer.fillcolorElementFooter.replace('index',feditor);
  await this.verifyFillcolor(fillele,'rgb(240, 225, 153)');

  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterFillColor');
},

//Validate Font Color
async Advanced_HeaderFontColor(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeFontColor');  
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");    
    await this.selectAllTextHeader(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    await this.clickOnFontColordropdown();
    await this.clickOnFontColor('#744ec2');
    await this.doubleClick(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
    var fontele=toolBar.AdvancedTab.Header_Footer.HeaderParaSpan.replace('index','1');
    await this.verifyFontcolor(fontele,'rgb(116, 78, 194)');   
    await this.storescreenshot(TestName,'Advanced_HeaderAfterFontColor');   
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderFontColor');
},

//Validate Font Color
async Advanced_FooterFontColor(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeFontColor')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.selectAllTextHeader(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.clickOnFontColordropdown();
  await this.clickOnFontColor('#744ec2');
  await this.doubleClick(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  var fontele=toolBar.AdvancedTab.Header_Footer.FooterParaSpan.replace('index',feditor);
  await this.verifyFontcolor(fontele,'rgb(116, 78, 194)');   
  await this.storescreenshot(TestName,'Advanced_FooterAfterFontColor');   
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterFontColor');
},


//Validate Font Change
async Advanced_HeaderFontChange(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeFontChange');  
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");    
    await this.selectAllTextHeader(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    await this.selectFont('Calibri');
    await this.doubleClick(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    var fontele=toolBar.AdvancedTab.Header_Footer.HeaderParaSpan.replace('index','1');
    await this.verifyFontFamilyEntireColumn(fontele,'Calibri');   
    await this.storescreenshot(TestName,'Advanced_HeaderAfterFontChange');  
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderFontChange');
},
//Validate Font Change
async Advanced_FooterFontChange(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeFontChange')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.selectAllTextHeader(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.selectFont('Calibri');
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  var fontele=toolBar.AdvancedTab.Header_Footer.FooterParaSpan.replace('index',feditor);
  await this.verifyFontFamilyEntireColumn(fontele,'Calibri');   
  await this.storescreenshot(TestName,'Advanced_FooterAfterFontChange');

  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterFontChange');
},

//Validate Font Change
async Advanced_HeaderFontSizeChange(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeFontSizeChange');   
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");    
    await this.selectAllTextHeader(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    await this.changeFontSize('16px');
    await this.doubleClick(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    var fontele=toolBar.AdvancedTab.Header_Footer.HeaderParaSpan.replace('index','1');
    await this.verifyFontSizeEntireColumn(fontele,'16') 
    await this.storescreenshot(TestName,'Advanced_HeaderAfterFontSizeChange');  
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderFontSizeChange');
},

//Validate Font Change
async Advanced_FooterFontSizeChange(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeFontChange')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.selectAllTextHeader(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));   
  await this.changeFontSize('16px');
  await this.storescreenshot(TestName,'Advanced_FooterAfterFontSizeChange');  
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  var fontele=toolBar.AdvancedTab.Header_Footer.FooterParaSpan.replace('index',feditor);
  await this.verifyFontSizeEntireColumn(fontele,'16');
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterFontSizeChange');
},

//Validate Header Left Alignment
async Advanced_HeaderLeftAlign(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeleftAlign');    
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");  
    await this.click(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    await this.clickAlignment('left');
   
    var ele=toolBar.AdvancedTab.Header_Footer.HeaderEditordiv.replace('index','1');
    const res=await this.verifyHeaderAlignment(ele,'left');
    await this.storescreenshot('Advanced_HeaderAfterleftAlign.png');
    if(res==='fail')
    await this.assert(true,false,'Left Alignment failed');
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderLeftAlign');
},

//Validate Header Left Alignment
async Advanced_FooterLeftAlign(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeLeftAlign')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.clickAlignment('left');
  
  var ele=toolBar.AdvancedTab.Header_Footer.FooterEditordiv.replace('index',feditor);
  const res=await this.verifyHeaderAlignment(ele,'left');
  await this.storescreenshot('Advanced_FooterAfterleftAlign.png');
  if(res==='fail')
  await this.assert(true,false,'Left Alignment failed'); 
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterLeftAlign');
},

//Validate Header Center Alignment
async Advanced_HeaderCenterAlign(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.storescreenshot(TestName,'Advanced_HeaderBeforeCenterAlign');   
  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");  
    await this.click(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    await this.clickAlignment('center');
   
    var ele=toolBar.AdvancedTab.Header_Footer.HeaderEditordiv.replace('index','1');
    const res=await this.verifyHeaderAlignment(ele,'center');
    await this.saveScreenshot('Advanced_HeaderAftercenterAlign.png');
    allure.addAttachment('Advanced_HeaderAftercenterAlign',new Buffer("Advanced_HeaderAftercenterAlign.png"),'png');   
    
    if(res==='fail')
    await this.assert(true,false,'Center Alignment failed');
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_HeaderCenterAlign');
},

//Validate Header Left Alignment
async Advanced_FooterCenterAlign(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeCenterAlign')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.clickAlignment('center');
  
  var ele=toolBar.AdvancedTab.Header_Footer.FooterEditordiv.replace('index',feditor);
  const res=await this.verifyHeaderAlignment(ele,'center');
  await this.storescreenshot('Advanced_FooterAfterCenterAlign.png');
  if(res==='fail')
  await this.assert(true,false,'Left Alignment failed'); 
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterCenterAlign');
},

//Validate Header Right Alignment
async Advanced_HeaderRightAlign(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const headereditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  if(headereditor<1)
  {
    await this.clickOnEnableHeader();
  }
  const headereditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.HeaderEditor);
  await this.capturescreenshot(TestName,'Advanced_HeaderBeforeRightAlign');    
  await this.saveScreenshot('Advanced_HeaderBeforeRightAlign.png');
  await allure.addAttachment('Advanced_HeaderBeforeRightAlign',new Buffer("Advanced_HeaderBeforeRightAlign.png"),'png');

  if(headereditorcount>0)
  {
    this.say("Header Editor is shown");
    this.assertStringIncludes("1","1");  
    await this.click(toolBar.AdvancedTab.Header_Footer.HeaderEditor.at(1));
    await this.clickAlignment('right');
   
    var ele=toolBar.AdvancedTab.Header_Footer.HeaderEditordiv.replace('index','1');
    const res=await this.verifyHeaderAlignment(ele,'right');
    await this.saveScreenshot('Advanced_HeaderAfterrightAlign.png');
    allure.addAttachment('Advanced_HeaderAfterrightAlign',new Buffer("Advanced_HeaderAfterrightAlign.png"),'png');   
    
    if(res==='fail')
    await this.assert(true,false,'Right Alignment failed');
  }
  else
  {
   this.say("Header Editor is NOT shown");
   this.assertStringIncludes("1","0")
  }
  await this.clickOnAdvancedTab();
  await this.capturescreenshot(TestName,'Advanced_Tab_HeaderRightAlign');
  await this.saveScreenshot('Advanced_Tab_HeaderRightAlign.png');
  await allure.addAttachment('Advanced_Tab_HeaderRightAlign',new Buffer("Advanced_Tab_HeaderRightAlign.png"),'png');
 
},

//Validate Header Left Alignment
async Advanced_FooterRightAlign(FeatureName,TestName){
  await this.navigateTOHeaderFooter();
  const footerlabel=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterLabel);
  if(footerlabel<1)
  {
    await this.clickOnEnableFooter();
  }
  const footertextboxeditorcount=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterLabel);  
  await this.clickOnInsertTextBox();
  const footertextboxeditorcountnow=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterTextBoxeditor);
  await this.storescreenshot(TestName,'Advanced_FooterBeforeRightAlign')   
  if(footertextboxeditorcountnow-1===footertextboxeditorcount) 
  {
    this.say("Footer Insert TextBox done");
    this.assertStringIncludes("1","1"); 
  }
  else
  {
    this.say("Footer Insert TextBox did not happen");
    this.assertStringIncludes("1","0");
  }
  const feditor=await this.grabNumberOfVisibleElements(toolBar.AdvancedTab.Header_Footer.FooterEditor);
  await this.click(toolBar.AdvancedTab.Header_Footer.FooterEditor.at(feditor));
  await this.clickAlignment('right');
  
  var ele=toolBar.AdvancedTab.Header_Footer.FooterEditordiv.replace('index',feditor);
  const res=await this.verifyHeaderAlignment(ele,'right');
  await this.storescreenshot('Advanced_FooterAfterRightAlign.png');
  if(res==='fail')
  await this.assert(true,false,'Left Alignment failed'); 
  
  await this.clickOnAdvancedTab();
  await this.storescreenshot(TestName,'Advanced_Tab_FooterRightAlign');
},
    //**********************************************************************//
    //**********************************************************************//
    //                          Home Data Methods                         //
    //**********************************************************************//
      
      //click Home Data Total
      clickHomeDataTotal(){     
        this.click(toolBar.HomeTab.Data.dataTotal)
        this.say('Clicked  "Home Data - Total" on toolbar');
      },

     //**********************************************************************//



  });


}
