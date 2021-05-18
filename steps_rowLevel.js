// in I file you can append custom step methods to 'I' object
const toolBar = require("./pages/toolBar");
const assert = require('codeceptjs-assert');
const log = require('./config/logging').default;
const { helper } = require("codeceptjs");
//Below 2 lines added for POC by Saravana 
const { cells } = require('./pages/matrixContent');
const { rows } = require('./pages/matrixContent');
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
      await I.selectCell(rows.row0);
      await  I.clickOnItalics();
      await I.capturescreenshot(TestName,'Italics_Row')     
      await  I.verifyFontStyleAsItalicsEntireRow(rows.row0span);
      await  I.saveScreenshot('FontItalicsRow.png');
      await  allure.addAttachment('FontItalicsRow',new Buffer("FontItalicsRow.png"),'png');
      await  I.clearSelection(rows.row0);
     },

       //Validate Bold
     async Home_Bold(FeatureName,TestName){
      await I.clickOnHomeTab();    
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row1);
      await I.clickOnBold();
      await I.capturescreenshot(TestName,'Bold_Row')    
      await I.verifyFontAsBoldEntireRow(rows.row1span);
      await I.saveScreenshot('FontBoldRow.png');
      await allure.addAttachment('Font BoldRow',new Buffer("FontBoldRow.png"),'png');
      await I.clearSelection(rows.row1); 
     },
    
      //Validate Fill Color
      async Home_Fill(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(rows.row2);
        await I.clickOnFillColordropdown();
        await I.clickOnFontColor('#d64550');
        await I.capturescreenshot(TestName,'Fill_Color_Row')        
        await I.verifyFillcolorEntireRow(rows.row2,'rgb(214, 69, 80)');
        await I.saveScreenshot('FillColorRow.png');
        await allure.addAttachment('FillColorRow',new Buffer("FillColorRow.png"),'png');
        await I.clearSelection(rows.row2);  
      },

       //Validate FontColor
       async Home_FontColor(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(rows.row3);
        await I.clickOnFontColordropdown();
        await I.clickOnFontColor('#e66c37');
        await I.capturescreenshot(TestName,'Font_ColorRow')
        await I.verifyFontcolorEntireRow(rows.row3span,'rgb(230, 108, 55)');         
        await I.saveScreenshot('FontColorRow.png');
        await allure.addAttachment('Font ColorRow',new Buffer("FontColorRow.png"),'png'); 
        await I.clearSelection(rows.row3);   
     },

      //Change Font
    async Home_FontChange(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row4);
      await I.selectFontFamily();
      await I.capturescreenshot(TestName,'FontChangeRow')
      await I.verifyFontFamilyEntireRow(rows.row4span,'Arial');      
      await I.clearSelection(rows.row4);
    },

     //Increment Decrement Font Size
     async Home_Increment_Decrement_FontSize(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row5);
      await I.increaseFontSize();
      await I.capturescreenshot(TestName,'IncrementFontSizeRow')
      await I.verifyFontSizeEntireRow(rows.row5span,'14');
      await I.decreaseFontSize();
      await I.capturescreenshot(TestName,'DecrementFontSizeRow')
      await I.verifyFontSizeDefaultEntireRow(rows.row5span,'12');
      await I.clearSelection(rows.row5);
    },
      //Change Font Size
    async Home_FontSize(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row6);
      await I.selectFontSize16();
      await I.capturescreenshot(TestName,'FontSizeChangeRow')
      await I.verifyFontSizeEntireRow(rows.row6span,'16');
      await I.wait(10)
      await I.clearSelection(rows.row6);
    },

     //Text Left Align
     async Home_Format_LeftAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row7);
      await I.clickAlignment('left');
      await I.capturescreenshot(TestName,'LeftAlignRow')
      const res=await I.verifyTextAlignmentEntireRow(rows.row7,'left');
      await I.saveScreenshot('LeftAlignmentRow.png');
      allure.addAttachment('LeftAlignmentRow',new Buffer("LeftAlignmentRow.png"),'png');   
      await I.clearSelection(rows.row7); 
      if(res==='fail')
      await I.assert(true,false,'Left Alignment failed');
    },

      //Text Center Align
      async Home_Format_CenterAlign(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(rows.row7);
        await I.clickAlignment('center');
        await I.capturescreenshot(TestName,'CenterAlignRow')
        const res=await I.verifyTextAlignmentEntireRow(rows.row7,'center');
        await I.saveScreenshot('CenterAlignRow.png');
        allure.addAttachment('CenterAlignRow',new Buffer("CenterAlignRow.png"),'png');  
        await I.clearSelection(rows.row7); 
        if(res==='fail')
        await I.assert(true,false,'Center Alignment failed');
      },

      //Text Right Align
    async Home_Format_RightAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row7);
      await I.clickAlignment('right')
      await I.capturescreenshot(TestName,'RightAlignRow')
      const res=await I.verifyTextAlignmentEntireRow(rows.row7,'right');
      await I.saveScreenshot('RightAlignRow.png');
      allure.addAttachment('RightAlignRow',new Buffer("RightAlignRow.png"),'png');  
      await I.clearSelection(rows.row7);  
      if(res==='fail')
      await I.assert(true,false,'Right Alignment failed');
    },

    //Text Top Align
     async Home_Format_TopAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row7);
      await I.clickAlignment('top');
      await I.capturescreenshot(TestName,'TopAlign')
      const res=await I.verifyAlignmentEntireRow(rows.row7_DivChild,'flex-start');
      await I.saveScreenshot('TopAlignmentRow.png');
      allure.addAttachment('TopAlignmentRow',new Buffer("TopAlignmentRow.png"),'png');   
      await I.clearSelection(rows.row7); 
      if(res==='fail')
      await I.assert(true,false,'Top Alignment failed');
    },

     //Text Middle Align
     async Home_Format_MiddleAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row7);
      await I.clickAlignment('middle');
      await I.capturescreenshot(TestName,'MiddleAlignRow')
      const res=await I.verifyAlignmentEntireRow(rows.row7_DivChild,'center');
      await I.saveScreenshot('MiddleAlignmentRow.png');
      allure.addAttachment('MiddleAlignmentRow',new Buffer("MiddleAlignmentRow.png"),'png');   
      await I.clearSelection(rows.row7); 
      if(res==='fail')
      await I.assert(true,false,'Middle Alignment failed');
    },

    //Text Bottom Align
    async Home_Format_BottomAlign(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row7);
      await I.clickAlignment('bottom');
      await I.capturescreenshot(TestName,'BottomAlignRow')
      const res=await I.verifyAlignmentEntireRow(rows.row7_DivChild,'flex-end');
      await I.saveScreenshot('BottomAlignmentRow.png');
      allure.addAttachment('BottomAlignmentRow',new Buffer("BottomAlignmentRow.png"),'png');   
      await I.clearSelection(rows.row7); 
      if(res==='fail')
      await I.assert(true,false,'Bottom Alignment failed');
    },

     //Text Hide/Show
     async Home_Format_HideShow(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row1);
      await I.clickShowHide();
      await I.capturescreenshot(TestName,'HideTextRow')
      const res=await I.verifyTextHideShowEntireRow(rows.row1span,'hide');
      await I.saveScreenshot('HideRow.png');
      allure.addAttachment('HideRow',new Buffer("HideRow.png"),'png');  
      if(res==='fail')
      await I.assert(true,false,'Hide failed');
      await I.clickShowHide();
      await I.capturescreenshot(TestName,'ShowTextRow')
      const res1=await I.verifyTextHideShowEntireRow(rows.row1span,'show');
      await I.saveScreenshot('ShowTextRow.png');
      allure.addAttachment('ShowTextRow',new Buffer("ShowTextRow.png"),'png'); 
      await I.clearSelection(rows.row1); 
      if(res1==='fail')
      await I.assert(true,false,'Show failed');
       
    },

     //Text %
     async Home_Format_Percentage(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row7);
      await I.clickPercentage();
      await I.capturescreenshot(TestName,'ShowPercentageRows');
      const res=await I.doVisualRegression(TestName,'ShowPercentageRows');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - ShowPercentageRows.png'));
      } 
      await I.clearSelection(rows.row7);  
    },

     //Add Prefix Suffix
     async Home_Format_Add_PrefixSuffix(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row8);
      await I.clickPrefixSuffix();
      await I.EnterPrefix('$');
      await I.EnterSuffix('TH');
      await I.capturescreenshot(TestName,'SelectPrefixSuffixRow')
      await I.clickPrefixSuffixApply();
      await I.capturescreenshot(TestName,'AppliedPrefixSuffixRow')
      await I.saveScreenshot('PrefixSuffixRow.png');
      allure.addAttachment('PrefixSuffixRow',new Buffer("PrefixSuffixRow.png"),'png');
      const res=await I.doVisualRegression(TestName,'PrefixSuffixRow');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - PrefixSuffixRow.png'));
      } 
      await I.clearSelection(rows.row8);  
    },

    //Scaling Thousand
    async Home_Format_Scaling_Thousand(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row0);
      await I.clickScalingDropDown();
      await I.selectScaling('Thousand');
      await I.capturescreenshot(TestName,'Scaling_Thousand_Row');
      await I.saveScreenshot('ScalingThousandRow.png');
      allure.addAttachment('ScalingThousandRow',new Buffer("ScalingThousandRow.png"),'png');
      const res=await I.doVisualRegression(TestName,'ScalingThousandRow');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - ScalingThousandRow.png'));
      } 
      await I.clearSelection(rows.row0); 
    },

    //Scaling Billion
    async Home_Format_Scaling_Billion(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row1);
      await I.clickScalingDropDown();
      await I.selectScaling('Billion');
      await I.capturescreenshot(TestName,'Scaling_Billion_Row');   
      await I.saveScreenshot('BillionRow.png');
      const res=await I.doVisualRegression(TestName,'BillionRow');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - BillionRow.png'));
      } 
      await I.clearSelection(rows.row1); 
    },

      //Scaling Million
     async Home_Format_Scaling_Million(FeatureName,TestName){
        await I.clickOnHomeTab();  
        await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
        await I.wait(3);
        await I.selectCell(rows.row2);
        await I.clickScalingDropDown();
        await I.selectScaling('Million');
        await I.capturescreenshot(TestName,'Scaling_Million_Row'); 
        await I.saveScreenshot('MillionRow.png');
        allure.addAttachment('MillionRow',new Buffer("MillionRow.png"),'png');  
        const res=await I.doVisualRegression(TestName,'MillionRow');
        if(res!='pass')
        {
          const result = await tryTo(() => I.see('Image Equality - MillionRow.png'));
        } 
        await I.clearSelection(rows.row2); 
      },

       //Scaling Trillion
    async Home_Format_Scaling_Trillion(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row3);
      await I.clickScalingDropDown();
      await I.selectScaling('Trillion');
      await I.capturescreenshot(TestName,'Scaling_Trillion_Row');         
      await I.saveScreenshot('TrillionRow.png');
      allure.addAttachment('TrillionRow',new Buffer("TrillionRow.png"),'png');  
      const res=await I.doVisualRegression(TestName,'TrillionRow');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - TrillionRow.png'));
      } 
      await I.clearSelection(rows.row3); 
    },

    //Scaling None
    async Home_Format_Scaling_None(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row4);
      await I.clickScalingDropDown();
      await I.selectScaling('None');
      await I.capturescreenshot(TestName,'Scaling_None_Row'); 
      await I.saveScreenshot('NoneRow.png');
      allure.addAttachment('NoneRow',new Buffer("NoneRow.png"),'png');  
      const res=await I.doVisualRegression(TestName,'NoneRow');
      if(res!='pass')
      {
        const result = await tryTo(() => I.see('Image Equality - NoneRow.png'));
      } 
      await I.clearSelection(rows.row4);  
    },

    //Border OverLineSolid
    async Home_Format_Border_OverlineSolid(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderoverlineSolid)
      await I.clearSelection(rows.row6); 
      await I.capturescreenshot(TestName,'borderoverlineSolidRow');  
      const res1=await I.verifyBorderEntireRow(rows.row6,'border-top','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('borderoverlineSolidRow.png');
      allure.addAttachment('borderoverlineSolidRow',new Buffer("borderoverlineSolidRow.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border OverLineDouble
     async Home_Format_Border_OverlineDouble(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row3);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderoverlineDouble);
      await I.clearSelection(rows.row3); 
      await I.capturescreenshot(TestName,'borderoverlineDoubleRow');  
      const res1=await I.verifyBorderEntireRow(rows.row3,'border-top','2px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderoverlineDoubleRow.png');
      allure.addAttachment('BorderoverlineDoubleRow',new Buffer("BorderoverlineDoubleRow.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');    
    },

     //Border UnderlineOverline
     async Home_Format_Border_UnderlineOverline(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row4);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderunderlineOverline)
      await I.clearSelection(rows.row4); 
      await I.capturescreenshot(TestName,'borderunderlineoverlineRow'); 
      await I.saveScreenshot('BorderunderlineoverlineRow.png');
      allure.addAttachment('BorderunderlineoverlineRow',new Buffer("BorderunderlineoverlineRow.png"),'png');  
      const res1=await I.verifyBorderEntireRow(rows.row4,'border-bottom','1px solid rgb(102, 102, 102)');                
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
      const res2=await I.verifyBorderEntireRow(rows.row4,'border-top','1px solid rgb(102, 102, 102)');    
      if(res2==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border Left
     async Home_Format_Border_Left(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row2);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderleft)
      await I.clearSelection(rows.row2); 
      await I.capturescreenshot(TestName,'borderleftRow');  
      const res1=await I.verifyBorderEntireRow(rows.row2,'border-left','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderLeftRow.png');
      allure.addAttachment('BorderLeftRow',new Buffer("BorderLeftRow.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

    //Border Right
    async Home_Format_Border_Right(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row1);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderright)
      await I.clearSelection(rows.row1); 
      await I.capturescreenshot(TestName,'borderrightRow');  
      const res1=await I.verifyBorderEntireRow(rows.row1,'border-right','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderRightRow.png');
      allure.addAttachment('BorderRightRow',new Buffer("BorderRightRow.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border LineAll
     async Home_Format_Border_LineAll(FeatureName,TestName){
      await I.clickOnHomeTab();  
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row5);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderlineAll)
      await I.clearSelection(rows.row5); 
      await I.capturescreenshot(TestName,'borderlineAllRow');  
      await I.saveScreenshot('borderlineAllRow.png');
      allure.addAttachment('borderlineAllRow',new Buffer("borderlineAllRow.png"),'png');  
      const res1=await I.verifyBorderEntireRow(rows.row5,'border-style','solid');          
      const res2=await I.verifyBorderEntireRow(rows.row5,'border-color','rgb(102, 102, 102)');          
      const res3=await I.verifyBorderEntireRow(rows.row5,'border-width','1px');          
      if(res1==='fail' || res2==='fail' ||res3==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border Default
     async Home_Format_Border_Default(FeatureName,TestName){
      await I.clickOnHomeTab();        
      await I.click(toolBar.HomeTab.QuickAccess.autoFit);  
      await I.wait(3);
      await I.selectCell(rows.row0);     
      await I.clickBorderDropDown(); 
      await I.click(toolBar.HomeTab.Format.borderdefaultline);
      await I.clearSelection(rows.row0); 
      await I.capturescreenshot(TestName,'borderdefaultRow');  
      const res4=await I.verifyNoBorderRow(rows.row0);
      if(res4==='fail') 
      await I.assert(true,false,'Value comparison failed');
      
    },

     //Focus_AddComment
     async Home_Focus_AddComment(FeatureName,TestName){
      await I.clickOnHomeTab();  
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
      await I.clickOnHomeTab();   
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
      await I.clickOnHomeTab();  
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
      await I.clickOnHomeTab();  
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
      await I.clickOnHomeTab();    
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
      await I.clickOnHomeTab();    
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
      await I.selectCell(rows.row1);  
      await I.clickIncreaseDecimal(1);
      await I.capturescreenshot(TestName,'Increase_Decimal_Row');   
      await I.saveScreenshot('IncreaseDecimalRow.png');
      allure.addAttachment('IncreaseDecimalRow',new Buffer("IncreaseDecimalRow.png"),'png'); 
      const res3=await I.doVisualRegression(TestName,'IncreaseDecimalRow');
      if(res3!='pass')
      {
        const result3 = await tryTo(() => I.see('Image Equality - IncreaseDecimalRow.png'));
      }
      await I.clickDecreaseDecimal(1)
      await I.capturescreenshot(TestName,'Decrease_Decimal_Row');    
      await I.saveScreenshot('DecreaseDecimalRow.png');
      allure.addAttachment('DecreaseDecimalRow',new Buffer("DecreaseDecimalRow.png"),'png'); 
      const res4=await I.doVisualRegression(TestName,'DecreaseDecimalRow');
      if(res4!='pass')
      {
        const result4 = await tryTo(() => I.see('Image Equality - DecreaseDecimalRow.png'));
      }
      await I.clearSelection(rows.row1); 
    },
}
