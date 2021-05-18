// in this file you can append custom step methods to 'I' object
const toolBar = require("./pages/toolBar");
const assert = require('codeceptjs-assert');
const log = require('./config/logging').default;
const { helper } = require("codeceptjs");
//Below 2 lines added for POC by Saravana 
const { cells } = require('./pages/matrixContent');
const allure = codeceptjs.container.plugins('allure');
//const assertions = require("./pages/assertions");
//*********************************************************** */


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}


module.exports = function () {
  return actor({

    

    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.
    loginToPowerBI(email, password) {
      this.amOnPage('https://app.powerbi.com/');
      this.waitForText('SIGN IN');
      this.click('SIGN IN');
      this.waitForElement('#i0116', process.env.WAIT_MEDIUM);
      this.say('I Enter user name and password');
      this.fillField('#i0116', email);
      this.click('Next');
      this.wait(1);
      this.waitForVisible('#i0118');
      this.waitForElement('#i0118');
      this.fillField('#i0118', secret(password));
      this.say('Click on submit button');
      this.click('Sign in');
      this.wait(1);
      // this.saveScreenshot('LoginSuccessful.png');
      this.click('Yes');
      this.wait(process.env.WAIT_MEDIUM);
    },

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
    //Font bold verification
    clickOnBold() {
      this.click(toolBar.HomeTab.Style.bold);      
    },
    async verifyFontAsBold(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-weight: bold');      
     
    },
    async verifyFontAsNormal(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-weight: normal');      
     
    },
    // font Italics test
    clickOnItalics() {
      this.click(toolBar.HomeTab.Style.italic);
      this.say('clicked on "Italics" button on toolbar');
    },
    async verifyFontStyleAsItalics(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-style: italic');
     
    },
    async verifyFontStyleAsNormal(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-style: normal');
      
    },
    // font family test
    selectFontFamily() {

      this.click(toolBar.HomeTab.Style.fontDropdown);
      this.click(toolBar.HomeTab.Style.faceTahoma);
      this.say('I selected font family as "Arial" ');
    },
    selectFontFamilyDefault() {

      this.click(toolBar.HomeTab.Style.fontDropdown);
      this.click(toolBar.HomeTab.Style.faceSegui);
      this.say('I selected font family as "Segoe UI" ');
    },
    async verifyFontFamily(element,font) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-family: ${font}');
      
    },
    async verifyFontFamilyAsNormal(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.assertStringIncludes(propertyValue,'font-family: "Segoe UI"');
     
    },
    //font size
    async selectFontSize16() {
      this.click(toolBar.HomeTab.Style.fontSizeDropdown);
      this.click(toolBar.HomeTab.Style.size16);
      // this.say('I selected font size as "16" ');
    },
    async selectFontSizeDefault() {

      this.click(toolBar.HomeTab.Style.fontSizeDropdown);
      this.click(toolBar.HomeTab.Style.size14);
      // this.say('I selected font size as "14" ');
    },
    async verifyFontSize(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-size: 16px');      
    },
    async verifyFontSizeDefault(element) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'font-size: 14px');
  
    },

    //font size increase
    increaseFontSize() {
      I.click(toolBar.HomeTab.Style.sizeIncrement);
      this.say('I click font size increased button ');
    },
    decreaseFontSize() {
      
      I.click(toolBar.HomeTab.Style.sizeDecrement);
      this.say('I click font size decrease button ');
    },
    // fill color drop down
    clickOnFillColordropdown() {
      this.click(toolBar.HomeTab.Style.fillcolorDropdown);
      this.say('clicked on "fillcolorDropdown" button on toolbar');
    },
    // font selection from pallete
    clickOnFontColor(colorhexa) {
      this.click('#scroll-container rect[fill="'+ colorhexa +'"]');
      this.say('Clicked on a color in Color Palette');
    },
    //Verify font color
    async verifyFontcolor(element,rgbvalue) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'color: '+rgbvalue);      
     
    },
    // Reset to default
    clickOnResettoDefault() {
      this.click(toolBar.HomeTab.Style.resettodefault);
      this.say('Clicked on a Reset to Default in Color Palette');
    },
    // font color drop down
    clickOnFontColordropdown() {
      this.click(toolBar.HomeTab.Style.fontcolorDropdown);
      this.say('clicked on "fontcolorDropdown" button on toolbar');
    },
    //Verify Fill color
    async verifyFillcolor(element,rgbvalue) {
      propertyValue = await (await this.grabAttributeFrom(element, 'style')).toString();
      this.say('Property Value: '+propertyValue)
      this.assertStringIncludes(propertyValue,'color: '+rgbvalue);    
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
          this.say('clicked on "Alignment" '+ alignment_type +' button on toolbar');
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
   
     //Click Show/Hide
     clickShowHide(){
      this.click(toolBar.HomeTab.Format.showHide)
      this.say('clicked on "Show/Hide" button on toolbar');
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
    //click Bar chart
    clickbarChart(){     
      this.click(toolBar.HomeTab.Visualization.barChart)
      this.say('Clicked  "Bar Chart" times on toolbar');
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

   async Home_Bold(){     
    await this.selectCell(cells.firstValue);
    await this.clickOnBold();
    await this.verifyFontAsBold(cells.firstValue);
    await this.saveScreenshot('FontBold.png');
    await allure.addAttachment('Font Bold',new Buffer("FontBold.png"),'png');
    await this.clickOnBold();
    await this.verifyFontAsNormal(cells.firstValue);
    await this.saveScreenshot('FontNormal_1.png');
    await allure.addAttachment('Font Normal',new Buffer("FontNormal_1.png"),'png');
    await this.clearSelection(cells.firstValue); 
   },

   async Home_Italics(){
    await this.selectCell(cells.firstValue);
    await  this.clickOnItalics();
    await  this.verifyFontStyleAsItalics(cells.firstValue);
    await  this.saveScreenshot('FontItalics.png');
    await  allure.addAttachment('Font Italics',new Buffer("FontItalics.png"),'png');
    //await  allure.addAttachment('Font Italics',Buffer.from("FontItalics.png"),'png');
    await  this.clickOnItalics();
    await  this.verifyFontStyleAsNormal(cells.firstValue);
    await  this.saveScreenshot('FontNormal_2.png');
    await  allure.addAttachment('Font Normal',new Buffer("FontNormal_2.png"),'png');
    //await  allure.addAttachment('Font Normal',Buffer.from("FontNormal_2.png"),'png');
    await  this.clearSelection(cells.firstValue);
   },
  
    async Home_Fill(){
      await this.selectCell(cells.firstValue);
      await this.clickOnFillColordropdown();
      await this.clickOnFontColor('#d64550');
      await this.verifyFillcolor(cells.CellOneOne,'rgb(214, 69, 80)');
      await this.saveScreenshot('FillColor.png');
      await allure.addAttachment('Fill Color',new Buffer("FillColor.png"),'png');
      await this.clickOnFillColordropdown();
      await this.clickOnResettoDefault()
      await this.verifyFillcolor(cells.CellOneOne,'rgb(255, 255, 255)');
      await this.saveScreenshot('FillColor_ResettoDefault.png');
      await allure.addAttachment('Fill Color Reset to Default',new Buffer("FillColor_ResettoDefault.png"),'png');
      await this.clickOnFillColordropdown();
      await this.clickOnFontColor('#ffffff');
      await this.clearSelection(cells.firstValue);
    },

    async Home_FontColor(){
       await this.selectCell(cells.firstValue);
       await this.clickOnFontColordropdown();
       await this.clickOnFontColor('#e66c37');
       await this.verifyFontcolor(cells.firstValue,'rgb(230, 108, 55)');
       await this.saveScreenshot('FontColor.png');
       await allure.addAttachment('Font Color',new Buffer("FontColor.png"),'png');
       await this.clickOnFontColordropdown();
       await this.clickOnResettoDefault()
       await this.verifyFontcolor(cells.firstValue,'rgb(255, 255, 255)');
       await this.saveScreenshot('FontColor_ResettoDefault.png');
       await allure.addAttachment('Font Color Reset to Default',new Buffer("FontColor_ResettoDefault.png"),'png');
       await this.clearSelection(cells.firstValue);
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
