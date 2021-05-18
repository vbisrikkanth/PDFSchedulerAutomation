// in I file you can append custom step methods to 'I' object
const toolBar = require("./pages/toolBar");
const assert = require('codeceptjs-assert');
const log = require('./config/logging').default;
const { helper } = require("codeceptjs");
//Below 2 lines added for POC by Saravana 
const { cells } = require('./pages/matrixContent');
const { rows } = require('./pages/matrixContent');
const { columns } = require('./pages/matrixContent');
const allure = codeceptjs.container.plugins('allure');
const { I } = inject();
//const assertions = require("./pages/assertions");
//*********************************************************** */


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}


module.exports =  {
  

    //Validate Italics
    async Home_Italics(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);
      await I.wait(3);
      await I.selectCell(columns.header1);
      await  I.clickOnItalics();
      await I.capturescreenshot(TestName,'Italics_Column')     
      await  I.verifyFontStyleAsItalicsEntireColumn(columns.column1span);
      await  I.saveScreenshot('FontItalicsColumn.png');
      await  allure.addAttachment('FontItalicsColumn',new Buffer("FontItalicsColumn.png"),'png');
      await  I.clearSelection(columns.header1);
     },

       //Validate Bold
     async Home_Bold(FeatureName,TestName){  
      await I.clickOnHomeTab();   
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);
      await I.wait(3);
      await I.selectCell(columns.header2);
      await I.clickOnBold();
      await I.capturescreenshot(TestName,'Bold_Column')    
      await I.verifyFontAsBoldEntireColumn(columns.column2span);
      await I.saveScreenshot('FontBoldColumn.png');
      await allure.addAttachment('Font BoldColumn',new Buffer("FontBoldColumn.png"),'png');
      await  I.clearSelection(columns.header2);
     },
    
      //Validate Fill Color
      async Home_Fill(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);
        await I.wait(3);
        await I.selectCell(columns.header3);
        await I.clickOnFillColordropdown();
        await I.clickOnFontColor('#d64550');
        await I.capturescreenshot(TestName,'Fill_Color_Column')        
        await I.verifyFillcolorEntireColumn(columns.column3,'rgb(214, 69, 80)');
        await I.saveScreenshot('FillColorColumn.png');
        await allure.addAttachment('FillColorColumn',new Buffer("FillColorColumn.png"),'png');
        await I.clearSelection(rows.row2);  
      },

       //Validate FontColor
       async Home_FontColor(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(columns.header6);
        await I.clickOnFontColordropdown();
        await I.clickOnFontColor('#e66c37');
        await I.capturescreenshot(TestName,'Font_ColorColumn')
        await I.verifyFontcolorEntireColumn(columns.column6span,'rgb(230, 108, 55)');         
        await I.saveScreenshot('FontColorColumn.png');
        await allure.addAttachment('Font ColorColumn',new Buffer("FontColorColumn.png"),'png'); 
        await I.clearSelection(columns.header6);   
     },

      //Change Font
    async Home_FontChange(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header4);
      await I.selectFontFamily();
      await I.capturescreenshot(TestName,'FontChangeColumn')
      await I.verifyFontFamilyEntireColumn(columns.column4span,'Arial');      
      await I.clearSelection(columns.header4);
    },

     //Increment Decrement Font Size
     async Home_Increment_Decrement_FontSize(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header5);
      await I.increaseFontSize();
      await I.capturescreenshot(TestName,'IncrementFontSizeColumn')
      await I.verifyFontSizeEntireColumn(columns.column5span,'14');
      await I.decreaseFontSize();
      await I.capturescreenshot(TestName,'DecrementFontSizeColumn')
      await I.verifyFontSizeDefaultEntireColumn(columns.column5span,'12');
      await I.clearSelection(rows.row5);
    },
      //Change Font Size
    async Home_FontSize(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header7);
      await I.selectFontSize16();
      await I.capturescreenshot(TestName,'FontSizeChangeColumn')
      await I.verifyFontSizeEntireColumn(columns.column7span,'16');
      await I.wait(10)
      await I.clearSelection(columns.header7);
    },

     //Text Left Align
     async Home_Format_LeftAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header8);
      await I.clickAlignment('left');
      await I.capturescreenshot(TestName,'LeftAlignColumn')
      const res=await I.verifyTextAlignmentEntireRow(columns.column8,'left');
      await I.saveScreenshot('LeftAlignColumn.png');
      allure.addAttachment('LeftAlignColumn',new Buffer("LeftAlignColumn.png"),'png');   
      await I.clearSelection(columns.header8); 
      if(res==='fail')
      await I.assert(true,false,'Left Alignment failed');
    },

      //Text Center Align
      async Home_Format_CenterAlign(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(columns.header8);
        await I.clickAlignment('center');
        await I.capturescreenshot(TestName,'CenterAlignColumn')
        const res=await I.verifyTextAlignmentEntireRow(columns.column8,'center');
        await I.saveScreenshot('CenterAlignColumn.png');
        allure.addAttachment('CenterAlignColumn',new Buffer("CenterAlignColumn.png"),'png');  
        await I.clearSelection(columns.header8); 
        if(res==='fail')
        await I.assert(true,false,'Center Alignment failed');
      },

      //Text Right Align
    async Home_Format_RightAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header8);
      await I.clickAlignment('right')
      await I.capturescreenshot(TestName,'RightAlignColumn')
      const res=await I.verifyTextAlignmentEntireRow(columns.column8,'right');
      await I.saveScreenshot('RightAlignColumn.png');
      allure.addAttachment('RightAlignColumn',new Buffer("RightAlignColumn.png"),'png');  
      await I.clearSelection(columns.header8); 
      if(res==='fail')
      await I.assert(true,false,'Right Alignment failed');
    },

    //Text Top Align
     async Home_Format_TopAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header8);
      await I.clickAlignment('top');
      await I.capturescreenshot(TestName,'TopAlignColumn')
      const res=await I.verifyAlignmentEntireRow(columns.column8_divchild,'flex-start');
      await I.saveScreenshot('TopAlignColumn.png');
      allure.addAttachment('TopAlignColumn',new Buffer("TopAlignColumn.png"),'png');   
      await I.clearSelection(columns.header8);  
      if(res==='fail')
      await I.assert(true,false,'Top Alignment failed');
    },

     //Text Middle Align
     async Home_Format_MiddleAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header8);
      await I.clickAlignment('middle');
      await I.capturescreenshot(TestName,'MiddleAlignColumn')
      const res=await I.verifyAlignmentEntireColumn(columns.column8_divchild,'center');
      await I.saveScreenshot('MiddleAlignColumn.png');
      allure.addAttachment('MiddleAlignColumn',new Buffer("MiddleAlignColumn.png"),'png');   
      await I.clearSelection(columns.header8); 
      if(res==='fail')
      await I.assert(true,false,'Middle Alignment failed');
    },

    //Text Bottom Align
    async Home_Format_BottomAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header8);
      await I.clickAlignment('bottom');
      await I.capturescreenshot(TestName,'BottomAlignColumn')
      const res=await I.verifyAlignmentEntireRow(columns.column8_divchild,'flex-end');
      await I.saveScreenshot('BottomAlignColumn.png');
      allure.addAttachment('BottomAlignColumn',new Buffer("BottomAlignColumn.png"),'png');   
      await I.clearSelection(columns.header8); 
      if(res==='fail')
      await I.assert(true,false,'Bottom Alignment failed');
    },

     //Text Hide/Show
     async Home_Format_HideShow(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header1);
      await I.clickShowHide();
      await I.capturescreenshot(TestName,'HideColumn')
      const res=await I.verifyTextHideShowEntireColumn(columns.column1span,'hide');
      await I.saveScreenshot('HideColumn.png');
      allure.addAttachment('HideColumn',new Buffer("HideColumn.png"),'png');  
      if(res==='fail')
      await I.assert(true,false,'Hide failed');
      await I.clickShowHide();
      await I.capturescreenshot(TestName,'ShowTextColumn')
      const res1=await I.verifyTextHideShowEntireColumn(columns.column1span,'show');
      await I.saveScreenshot('ShowTextColumn.png');
      allure.addAttachment('ShowTextColumn',new Buffer("ShowTextColumn.png"),'png'); 
      await I.clearSelection(columns.header1); 
      if(res1==='fail')
      await I.assert(true,false,'Show failed');
       
    },

     //Text %
     async Home_Format_Percentage(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header9);
      await I.clickPercentage();
      await I.capturescreenshot(TestName,'ShowPercentageColumn');
      const res=await I.doVisualRegression(TestName,'ShowPercentageColumn');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - ShowPercentageColumn.png'));
      } 
      await I.clickPercentage();
      await I.clearSelection(columns.header9);  
    },

     //Add Prefix Suffix
     async Home_Format_Add_PrefixSuffix(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header10);
      await I.clickPrefixSuffix();
      await I.EnterPrefix('$');
      await I.EnterSuffix('TH');
      await I.capturescreenshot(TestName,'SelectPrefixSuffixColumn')
      await I.clickPrefixSuffixApply();
      await I.capturescreenshot(TestName,'AppliedPrefixSuffixColumn')
      await I.saveScreenshot('PrefixSuffixColumn.png');
      allure.addAttachment('PrefixSuffixColumn',new Buffer("PrefixSuffixColumn.png"),'png');
      const res=await I.doVisualRegression(TestName,'PrefixSuffixColumn');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - PrefixSuffixColumn.png'));
      } 
      await I.clearSelection(columns.header10);  
    },

    //Scaling Thousand
    async Home_Format_Scaling_Thousand(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header11);
      await I.clickScalingDropDown();
      await I.selectScaling('Thousand');
      await I.capturescreenshot(TestName,'Scaling_Thousand_Column');
      await I.saveScreenshot('ScalingThousandColumn.png');
      allure.addAttachment('ScalingThousandColumn',new Buffer("ScalingThousandColumn.png"),'png');
      const res=await I.doVisualRegression(TestName,'ScalingThousandColumn');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - ScalingThousandColumn.png'));
      } 
      await I.clearSelection(columns.header11); 
    },

    //Scaling Billion
    async Home_Format_Scaling_Billion(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header11);
      await I.clickScalingDropDown();
      await I.selectScaling('Billion');
      await I.capturescreenshot(TestName,'Scaling_Billion_Column');   
      await I.saveScreenshot('BillionColumn.png');
      const res=await I.doVisualRegression(TestName,'BillionColumn');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - BillionColumn.png'));
      } 
      await I.clearSelection(columns.header11); 
    },

      //Scaling Million
     async Home_Format_Scaling_Million(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(columns.header11);
        await I.clickScalingDropDown();
        await I.selectScaling('Million');
        await I.capturescreenshot(TestName,'Scaling_Million_Column'); 
        await I.saveScreenshot('MillionColumn.png');
        allure.addAttachment('MillionColumn',new Buffer("MillionColumn.png"),'png');  
        const res=await I.doVisualRegression(TestName,'MillionColumn');
        if(res!='pass')
        {
          const result = await tryTo(() => I.see('Image Equality - MillionColumn.png'));
        } 
        await I.clearSelection(columns.header11); 
      },

       //Scaling Trillion
    async Home_Format_Scaling_Trillion(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header11);
      await I.clickScalingDropDown();
      await I.selectScaling('Trillion');
      await I.capturescreenshot(TestName,'Scaling_Trillion_Column');         
      await I.saveScreenshot('TrillionColumn.png');
      allure.addAttachment('TrillionColumn',new Buffer("TrillionColumn.png"),'png');  
      const res=await I.doVisualRegression(TestName,'TrillionColumn');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - TrillionColumn.png'));
      } 
      await I.clearSelection(columns.header11); 
    },

    //Scaling None
    async Home_Format_Scaling_None(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header11);
      await I.clickScalingDropDown();
      await I.selectScaling('None');
      await I.capturescreenshot(TestName,'Scaling_None_Column'); 
      await I.saveScreenshot('NoneColumn.png');
      allure.addAttachment('NoneColumn',new Buffer("NoneColumn.png"),'png');  
      const res=await I.doVisualRegression(TestName,'NoneColumn');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - NoneColumn.png'));
      } 
      await I.clearSelection(columns.header11);  
    },

    //Border OverLineSolid
    async Home_Format_Border_OverlineSolid(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderoverlineSolid)
      await I.clearSelection(columns.header6); 
      await I.capturescreenshot(TestName,'borderoverlineSolidColumn');  
      const res1=await I.verifyBorderEntireRow(columns.column6,'border-top','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('borderoverlineSolidColumn.png');
      allure.addAttachment('borderoverlineSolidColumn',new Buffer("borderoverlineSolidColumn.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border OverLineDouble
     async Home_Format_Border_OverlineDouble(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header7);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderoverlineDouble);
      await I.clearSelection(columns.header7); 
      await I.capturescreenshot(TestName,'borderoverlineDoubleColumn');  
      const res1=await I.verifyBorderEntireRow(columns.column7,'border-top','2px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('borderoverlineDoubleColumn.png');
      allure.addAttachment('borderoverlineDoubleColumn',new Buffer("borderoverlineDoubleColumn.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');    
    },

     //Border UnderlineOverline
     async Home_Format_Border_UnderlineOverline(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header8);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderunderlineOverline)
      await I.clearSelection(columns.header8); 
      await I.capturescreenshot(TestName,'borderunderlineoverlineColumn'); 
      await I.saveScreenshot('borderunderlineoverlineColumn.png');
      allure.addAttachment('borderunderlineoverlineColumn',new Buffer("borderunderlineoverlineColumn.png"),'png');  
      const res1=await I.verifyBorderEntireRow(columns.column8,'border-bottom','1px solid rgb(102, 102, 102)');                
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
      const res2=await I.verifyBorderEntireRow(columns.column8,'border-top','1px solid rgb(102, 102, 102)');    
      if(res2==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border Left
     async Home_Format_Border_Left(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header9);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderleft)
      await I.clearSelection(columns.header9); 
      await I.capturescreenshot(TestName,'borderleftColumn');  
      const res1=await I.verifyBorderEntireRow(columns.column9,'border-left','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('borderleftColumn.png');
      allure.addAttachment('borderleftColumn',new Buffer("borderleftColumn.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

    //Border Right
    async Home_Format_Border_Right(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header10);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderright)
      await I.clearSelection(columns.header10); 
      await I.capturescreenshot(TestName,'borderrightColumn');  
      const res1=await I.verifyBorderEntireRow(columns.column10,'border-right','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('borderrightColumn.png');
      allure.addAttachment('borderrightColumn',new Buffer("borderrightColumn.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border LineAll
     async Home_Format_Border_LineAll(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header11);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderlineAll)
      await I.clearSelection(columns.header11); 
      await I.capturescreenshot(TestName,'borderlineAllColumn');  
      await I.saveScreenshot('borderlineAllColumn.png');
      allure.addAttachment('borderlineAllColumn',new Buffer("borderlineAllColumn.png"),'png');  
      const res1=await I.verifyBorderEntireRow(columns.column11,'border-style','solid');          
      const res2=await I.verifyBorderEntireRow(columns.column11,'border-color','rgb(102, 102, 102)');          
      const res3=await I.verifyBorderEntireRow(columns.column11,'border-width','1px');          
      if(res1==='fail' || res2==='fail' ||res3==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border Default
     async Home_Format_Border_Default(FeatureName,TestName){  
      await I.clickOnHomeTab();      
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header12);     
      await I.clickBorderDropDown(); 
      await I.click(toolBar.HomeTab.Format.borderdefaultline);
      await I.clearSelection(columns.header12); 
      await I.capturescreenshot(TestName,'borderdefaultColumn');  
      const res4=await I.verifyNoBorderRow(columns.column12);
      if(res4==='fail') 
      await I.assert(true,false,'Value comparison failed');
      
    },

     //Focus_AddComment
     async Home_Focus_AddComment(FeatureName,TestName){ 
      await I.selectCell(cells.Cell_8_2);
      await I.clickAddComment();
      await I.EnterCommentName('Tester');
      await I.EnterComment('Cell Comment');
      await I.ClickSaveComment();
      await I.capturescreenshot(TestName,'AddComment'); 
      const res=await I.doVisualRegression(TestName,'AddComment');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - AddComment.png'));
      } 
      await I.capturescreenshot(TestName,'SaveComment'); 
      const res1=await I.doVisualRegression(TestName,'SaveComment'); 
      if(res1!='pass')
      {
        const result1 = await tryTo(() => I.see('Image Equality - SaveComment.png'));
      } 
      await I.ViewComment(cells.Cell_8_2_id);
      await I.capturescreenshot(TestName,'ViewComment');
      const res2=await I.doVisualRegression(TestName,'ViewComment');
      if(res2!='pass')
      {
        const result2 = await tryTo(() => I.see('Image Equality - ViewComment.png'));
      } 
      await I.clearSelection(cells.Cell_8_2);  
    },

     //Focus_DeleteComment
     async Home_Focus_DeleteComment(FeatureName,TestName){ 
      await I.selectCell(cells.Cell_6_6);
      await I.clickAddComment();
      await I.EnterCommentName('Tester9');
      await I.EnterComment('Cell Comment 9');
      await I.ClickSaveComment();
      await I.capturescreenshot(TestName,'AddCommentforDelete'); 
      const res=await I.doVisualRegression(TestName,'AddCommentforDelete');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - AddCommentforDelete.png'));
      }  
      await I.capturescreenshot(TestName,'SaveCommentforDelete'); 
      const res1=await I.doVisualRegression(TestName,'SaveCommentforDelete');
      if(res1!='pass')
      {
        const result1 = await tryTo(() => I.see('Image Equality - SaveCommentforDelete.png'));
      }  
      await I.ViewComment(cells.Cell_6_6_id);
      await I.capturescreenshot(TestName,'ViewCommentforDelete');
      const res2=await I.doVisualRegression(TestName,'ViewCommentforDelete');
      if(res2!='pass')
      {
        const result2 = await tryTo(() => I.see('Image Equality - ViewCommentforDelete.png'));
      } 
      //await I.clickAddComment();
      await I.DeleteComment();
      await I.capturescreenshot(TestName,'CommentAfterDeletion');
      const res3=await I.doVisualRegression(TestName,'CommentAfterDeletion');
      if(res3!='pass')
      {
        const result3 = await tryTo(() => I.see('Image Equality - CommentAfterDeletion.png'));
      } 
      await I.clearSelection(cells.Cell_6_6);  
    },

    //Focus_EditComment
    async Home_Focus_EditComment(FeatureName,TestName){ 
      await I.selectCell(cells.Cell_6_5);
      await I.clickAddComment();
      await I.EnterCommentName('Tester9');
      await I.EnterComment('Cell Comment 9');
      await I.ClickSaveComment();
      await I.capturescreenshot(TestName,'AddCommentforDelete'); 
      const res=await I.doVisualRegression(TestName,'AddCommentforDelete');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - AddCommentforDelete.png'));
      }   
      await I.capturescreenshot(TestName,'SaveCommentforDelete'); 
      const res1=await I.doVisualRegression(TestName,'SaveCommentforDelete');
      if(res1!='pass')
      {
        const result1 = await tryTo(() => I.see('Image Equality - SaveCommentforDelete.png'));
      } 
      await I.ViewComment(cells.Cell_6_5_id);
      await I.capturescreenshot(TestName,'ViewCommentforDelete');
      const res2=await I.doVisualRegression(TestName,'ViewCommentforDelete');
      if(res2!='pass')
      {
        const result2 = await tryTo(() => I.see('Image Equality - ViewCommentforDelete.png'));
      }
      //await I.clickAddComment();
      await I.ClickEditComment();
      await I.EnterCommentName('Tester99');
      await I.EnterComment('Cell Comment 99');
      await I.capturescreenshot(TestName,'EditComment');
      const res3=await I.doVisualRegression(TestName,'EditComment');
      if(res3!='pass')
      {
        const result3 = await tryTo(() => I.see('Image Equality - EditComment.png'));
      }
      await I.ClickSaveComment();
      await I.capturescreenshot(TestName,'CommentAfterEdit');
      const res4=await I.doVisualRegression(TestName,'CommentAfterEdit');
      if(res4!='pass')
      {
        const result4 = await tryTo(() => I.see('Image Equality - CommentAfterEdit.png'));
      }
      await I.clearSelection(cells.Cell_6_5);  
    },

    //Focus_CommentFootNote
    async Home_Focus_CommentFootNote(FeatureName,TestName){ 
      await I.selectCell(cells.Cell_5_4);
      await I.clickAddComment();
      await I.EnterCommentName('Tester10');
      await I.EnterComment('Cell Comment10');        
      await I.capturescreenshot(TestName,'AddCommentFootNote'); 
      const res=await I.doVisualRegression(TestName,'AddCommentFootNote');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - AddCommentFootNote.png'));
      }
      await I.ClickSaveComment();
      await I.capturescreenshot(TestName,'SaveCommentFootNote'); 
      const res1=await I.doVisualRegression(TestName,'SaveCommentFootNote');
      if(res1!='pass')
      {
        const result1 = await tryTo(() => I.see('Image Equality - SaveCommentFootNote.png'));
      }
      await I.clickCommentdropdown();
      await I.clickCommentFootNoteToggle();
      await I.capturescreenshot(TestName,'CommentFootNote');
      const res2=await I.doVisualRegression(TestName,'CommentFootNote');
      if(res2!='pass')
      {
        const result2 = await tryTo(() => I.see('Image Equality - CommentFootNote.png'));
      }
      await I.clickCommentdropdown();
      await I.clickCommentFootNoteToggle();
      await I.clearSelection(cells.Cell_5_4);  
    },

    //Focus_CommentColumn
    async Home_Focus_CommentColumn(FeatureName,TestName){ 
        
      await I.clickCommentdropdown();
      await I.clickCommentColumnToggle();
      await I.capturescreenshot(TestName,'CommentColumn'); 
      const res=await I.doVisualRegression(TestName,'CommentColumn'); 
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - CommentColumn.png'));
      }  
      await I.clickCommentdropdown();
      await I.clickCommentColumnToggle();
      await I.capturescreenshot(TestName,'CommentColumnOff'); 
      const res1=await I.doVisualRegression(TestName,'CommentColumnOff'); 
      if(res1!='pass')
      {
        const result1 = await tryTo(() => I.see('Image Equality - CommentColumnOff.png'));
      } 
      
    },

     //Focus_HideAllComments
     async Home_Focus_HideAllComments(FeatureName,TestName){ 
        
      await I.selectCell(cells.Cell_6_7);
      await I.clickAddComment();
      await I.EnterCommentName('Tester9');
      await I.EnterComment('Cell Comment 9');
      await I.ClickSaveComment();
      await I.clickCommentdropdown();
      await I.clickCommentColumnToggle();
      await I.capturescreenshot(TestName,'AddCommentforHide'); 
      const res=await I.doVisualRegression(TestName,'AddCommentforHide');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - AddCommentforHide.png'));
      }
      await I.clickCommentdropdown(); 
      await I.clickCommentHideAll();
      await I.capturescreenshot(TestName,'HideAllComments'); 
      const res1=await I.doVisualRegression(TestName,'HideAllComments');
      if(res1!='pass')
      {
        const result1 = await tryTo(() => I.see('Image Equality - HideAllComments.png'));
      }  
      await I.clickCommentdropdown(); 
      await I.clickCommentHideAll();
      await I.clearSelection(cells.Cell_6_7);
    },

     //Increase Decrease Decimal
     async Home_Format_Increase_Decrease_Decimal(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(columns.header1); 
      await I.clickIncreaseDecimal(1);
      await I.capturescreenshot(TestName,'Increase_Decimal_Column');   
      await I.saveScreenshot('IncreaseDecimalColumn.png');
      allure.addAttachment('IncreaseDecimalColumn',new Buffer("IncreaseDecimalColumn.png"),'png'); 
      const res3=await I.doVisualRegression(TestName,'IncreaseDecimalColumn');
      if(res3!='pass')
      {
        const result3 = await tryTo(() => I.see('Image Equality - IncreaseDecimalColumn.png'));
      }
      await I.clickDecreaseDecimal(1)
      await I.capturescreenshot(TestName,'Decrease_Decimal_Column');    
      await I.saveScreenshot('DecreaseDecimalColumn.png');
      allure.addAttachment('DecreaseDecimalColumn',new Buffer("DecreaseDecimalColumn.png"),'png'); 
      const res4=await I.doVisualRegression(TestName,'DecreaseDecimalColumn');
      if(res4!='pass')
      {
        const result4 = await tryTo(() => I.see('Image Equality - DecreaseDecimalColumn.png'));
      }
      await I.clearSelection(columns.header1); 
    },
}
