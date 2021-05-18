// in I file you can append custom step methods to 'I' object
const toolBar = require("./pages/toolBar");
const assert = require('codeceptjs-assert');
const log = require('./config/logging').default;
const { helper } = require("codeceptjs");
//Below 2 lines added for POC by Saravana 
const { cells } = require('./pages/matrixContent');
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
      await I.selectCell(cells.firstValue);
      await  I.clickOnItalics();
      await I.capturescreenshot(TestName,'Italics')     
      await  I.verifyFontStyleAsItalics(cells.firstValue);
      await  I.saveScreenshot('FontItalics.png');
      await  allure.addAttachment('Font Italics',new Buffer("FontItalics.png"),'png');
      await  I.clearSelection(cells.firstValue);
     },

     async Home_Bold(FeatureName,TestName){  
      await I.clickOnHomeTab();    
      await I.selectCell(cells.Cell_4_1);
      await I.clickOnBold();
      await I.capturescreenshot(TestName,'Bold')    
      await I.verifyFontAsBold(cells.Cell_4_1);
      await I.saveScreenshot('FontBold.png');
      await allure.addAttachment('Font Bold',new Buffer("FontBold.png"),'png');
      await I.clearSelection(cells.Cell_4_1); 
     },
    
      //Validate Fill Color
      async Home_Fill(FeatureName,TestName){
        await I.clickOnHomeTab(); 
        await I.selectCell(cells.Cell_4_2);
        await I.clickOnFillColordropdown();
        await I.clickOnFontColor('#d64550');
        await I.capturescreenshot(TestName,'Fill_Color')        
        await I.verifyFillcolor(cells.Cell_4_2,'rgb(214, 69, 80)');
        await I.saveScreenshot('FillColor.png');
        await allure.addAttachment('Fill Color',new Buffer("FillColor.png"),'png');
        await I.clearSelection(cells.Cell_4_2);  
      },

       //Validate FontColor
       async Home_FontColor(FeatureName,TestName){
        await I.clickOnHomeTab(); 
        await I.selectCell(cells.Cell_4_3);
        await I.clickOnFontColordropdown();
        await I.clickOnFontColor('#e66c37');
        await I.capturescreenshot(TestName,'Font_Color')
        await I.verifyFontcolor(cells.Cell_4_3,'rgb(230, 108, 55)');         
        await I.saveScreenshot('FontColor.png');
        await allure.addAttachment('Font Color',new Buffer("FontColor.png"),'png'); 
        await I.clearSelection(cells.Cell_4_3);   
     },

      //Change Font
    async Home_FontChange(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_5_1);
      await I.selectFontFamily();
      await I.capturescreenshot(TestName,'FontChange')
      await I.verifyFontFamily(cells.Cell_5_1,'Arial');      
      await I.clearSelection(cells.Cell_5_1);
    },

     //Increment Decrement Font Size
     async Home_Increment_Decrement_FontSize(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_5_2);
      await I.increaseFontSize();
      await I.capturescreenshot(TestName,'IncrementFontSize')
      await I.verifyFontSize(cells.Cell_5_2,'14');
      await I.decreaseFontSize();
      await I.capturescreenshot(TestName,'DecrementFontSize')
      await I.verifyFontSizeDefault(cells.Cell_5_2,'12');
      await I.clearSelection(cells.Cell_5_2);
    },
      //Change Font Size
    async Home_FontSize(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_5_3);
      await I.selectFontSize16();
      await I.capturescreenshot(TestName,'FontSizeChange')
      await I.verifyFontSize(cells.Cell_5_3,'16');
      await I.wait(10)
      await I.clearSelection(cells.Cell_5_3);
    },

     //Text Left Align
     async Home_Format_LeftAlign(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_1_5);
      await I.clickAlignment('left');
      await I.capturescreenshot(TestName,'LeftAlign')
      const res=await I.verifyTextAlignment(cells.Cell_1_5,'left');
      await I.saveScreenshot('LeftAlignment.png');
      allure.addAttachment('LeftAlignment',new Buffer("LeftAlignment.png"),'png');   
      await I.clearSelection(cells.Cell_1_5); 
      if(res==='fail')
      await I.assert(true,false,'Left Alignment failed');
    },

      //Text Center Align
      async Home_Format_CenterAlign(FeatureName,TestName){
        await I.clickOnHomeTab(); 
        await I.selectCell(cells.Cell_1_7);
        await I.clickAlignment('center');
        await I.capturescreenshot(TestName,'CenterAlign')
        const res=await I.verifyTextAlignment(cells.Cell_1_7,'center');
        await I.saveScreenshot('CenterAlignment.png');
        allure.addAttachment('CenterAlignment',new Buffer("CenterAlignment.png"),'png');  
        await I.clearSelection(cells.Cell_1_7) ;
        if(res==='fail')
        await I.assert(true,false,'Center Alignment failed');
      },

      //Text Right Align
    async Home_Format_RightAlign(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_1_8);
      await I.clickAlignment('right')
      await I.capturescreenshot(TestName,'RightAlign')
      const res=await I.verifyTextAlignment(cells.Cell_1_8,'right');
      await I.saveScreenshot('RightAlignment.png');
      allure.addAttachment('RightAlignment',new Buffer("RightAlignment.png"),'png');  
      await I.clearSelection(cells.Cell_1_8);  
      if(res==='fail')
      await I.assert(true,false,'Right Alignment failed');
    },

     //Text Right Align
     async Home_Format_RightAlign(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_1_8);
      await I.clickAlignment('right')
      await I.capturescreenshot(TestName,'RightAlign')
      const res=await I.verifyTextAlignment(cells.Cell_1_8,'right');
      await I.saveScreenshot('RightAlignment.png');
      allure.addAttachment('RightAlignment',new Buffer("RightAlignment.png"),'png');  
      await I.clearSelection(cells.Cell_1_8);  
      if(res==='fail')
      await I.assert(true,false,'Right Alignment failed');
    },

     //Text Top Align
     async Home_Format_TopAlign(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_2_3);
      await I.clickAlignment('top');
      await I.capturescreenshot(TestName,'TopAlign')
      const res=await I.verifyAlignment(cells.Cell_2_3_DivChild,'flex-start');
      await I.saveScreenshot('TopAlignment.png');
      allure.addAttachment('TopAlignment',new Buffer("TopAlignment.png"),'png');   
      await I.clearSelection(cells.Cell_2_3); 
      if(res==='fail')
      await I.assert(true,false,'Top Alignment failed');
    },

     //Text Middle Align
     async Home_Format_MiddleAlign(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_2_4);
      await I.clickAlignment('middle');
      await I.capturescreenshot(TestName,'MiddleAlign')
      const res=await I.verifyAlignment(cells.Cell_2_4_DivChild,'center');
      await I.saveScreenshot('MiddleAlignment.png');
      allure.addAttachment('MiddleAlignment',new Buffer("MiddleAlignment.png"),'png');   
      await I.clearSelection(cells.Cell_2_4); 
      if(res==='fail')
      await I.assert(true,false,'Middle Alignment failed');
    },

    //Text Bottom Align
    async Home_Format_BottomAlign(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_2_5);
      await I.clickAlignment('bottom');
      await I.capturescreenshot(TestName,'BottomAlign')
      const res=await I.verifyAlignment(cells.Cell_2_5_DivChild,'flex-end');
      await I.saveScreenshot('BottomAlignment.png');
      allure.addAttachment('BottomAlignment',new Buffer("BottomAlignment.png"),'png');   
      await I.clearSelection(cells.Cell_2_5); 
      if(res==='fail')
      await I.assert(true,false,'Bottom Alignment failed');
    },

     //Text Hide/Show
     async Home_Format_HideShow(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.firstValue);
      await I.clickShowHide();
      await I.capturescreenshot(TestName,'HideText')
      const res=await I.verifyTextHideShow(cells.firstValue,'hide');
      await I.saveScreenshot('Hide.png');
      allure.addAttachment('Hide',new Buffer("Hide.png"),'png');  
      if(res==='fail')
      await I.assert(true,false,'Hide failed');
      await I.clickShowHide();
      await I.capturescreenshot(TestName,'ShowText')
      const res1=await I.verifyTextHideShow(cells.firstValue,'show');
      await I.saveScreenshot('Show.png');
      allure.addAttachment('Show',new Buffer("Show.png"),'png');  
      if(res1==='fail')
      await I.assert(true,false,'Show failed');
      await I.clearSelection(cells.firstValue); 
    },

     //Text %
     async Home_Format_Percentage(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_3_2);
      await I.clickPercentage();
      await I.capturescreenshot(TestName,'ShowPercentage')
      const res=await I.verifyValue(cells.Cell_3_2,'23,900,000.00%');
      await I.saveScreenshot('Percentage.png');
      allure.addAttachment('Percentage',new Buffer('Percentage.png'),'png');  
      if(res==='fail')
      await I.assert(true,false,'Value comparison failed');
      await I.clearSelection(cells.Cell_3_2);  
    },

     //Add Prefix Suffix
     async Home_Format_Add_PrefixSuffix(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_1_6);
      await I.clickPrefixSuffix();
      await I.EnterPrefix('$');
      await I.EnterSuffix('TH');
      await I.capturescreenshot(TestName,'SelectPrefixSuffix')
      await I.clickPrefixSuffixApply();
      await I.capturescreenshot(TestName,'AppliedPrefixSuffix')
      const prefixres=await I.verifyValue(cells.prefixValue,'$');  
      const suffixres=await I.SuffixverifyValue(cells.suffixValue,'275.00TH');   
      await I.saveScreenshot('PrefixSuffix.png');
      allure.addAttachment('PrefixSuffix',new Buffer("PrefixSuffix.png"),'png');
      if(prefixres==='fail'||suffixres==='fail')
      await I.assert(true,false,'Value comparison failed'); 
      await I.clearSelection(cells.Cell_1_6);  
    },

    //Scaling Thousand
    async Home_Format_Scaling_Thousand(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_4_5);
      await I.clickScalingDropDown();
      await I.selectScaling('Thousand');
      await I.capturescreenshot(TestName,'Scaling_Thousand');  
      const res1=await I.verifyValue(cells.Cell_4_5,'93.00');    
      await I.saveScreenshot('ScalingThousand.png');
      allure.addAttachment('ScalingThousand',new Buffer("ScalingThousand.png"),'png');  
      if(res1==='fail')
      await I.assert(true,false,'Value comparison failed');
      await I.clearSelection(cells.Cell_4_5);  
    },

    //Scaling Billion
    async Home_Format_Scaling_Billion(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_4_6);
      await I.clickScalingDropDown();
      await I.selectScaling('Billion');
      await I.capturescreenshot(TestName,'Scaling_Billion');
      const res1=await I.verifyValue(cells.Cell_4_6,'0.00');    
      await I.saveScreenshot('Billion.png');
      allure.addAttachment('Billion',new Buffer("Billion.png"),'png');  
      if(res1==='fail')
      await I.assert(true,false,'Value comparison failed'); 
      await I.clearSelection(cells.Cell_4_6);  
    },

      //Scaling Million
     async Home_Format_Scaling_Million(FeatureName,TestName){
        await I.clickOnHomeTab(); 
        await I.selectCell(cells.Cell_4_7);
        await I.clickScalingDropDown();
        await I.selectScaling('Million');
        await I.capturescreenshot(TestName,'Scaling_Million'); 
        const res1=await I.verifyValue(cells.Cell_4_7,'0.34');    
        await I.saveScreenshot('Million.png');
        allure.addAttachment('Million',new Buffer("Million.png"),'png');  
        if(res1==='fail')
        await I.assert(true,false,'Value comparison failed');
        await I.clearSelection(cells.Cell_4_7);
      },

       //Scaling Trillion
    async Home_Format_Scaling_Trillion(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_6_4);
      await I.clickScalingDropDown();
      await I.selectScaling('Trillion');
      await I.capturescreenshot(TestName,'Scaling_Trillion');
      const res1=await I.verifyValue(cells.Cell_6_4,'0.00');    
      await I.saveScreenshot('Trillion.png');
      allure.addAttachment('Trillion',new Buffer("Trillion.png"),'png');  
      if(res1==='fail')
      await I.assert(true,false,'Value comparison failed'); 
      await I.clearSelection(cells.Cell_6_4);  
    },

    //Scaling None
    async Home_Format_Scaling_None(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Cell_3_1);
      await I.clickScalingDropDown();
      await I.selectScaling('None');
      await I.capturescreenshot(TestName,'Scaling_None');
      const res1=await I.verifyValue(cells.Cell_3_1,'208,000.00');    
      await I.saveScreenshot('None.png');
      allure.addAttachment('None',new Buffer("None.png"),'png');  
      if(res1==='fail')
      await I.assert(true,false,'Value comparison failed'); 
      await I.clearSelection(cells.Cell_3_1);  
    },

    //Border OverLineSolid
    async Home_Format_Border_OverlineSolid(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Table_Div_Row6_Column6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderoverlineSolid)
      await I.clearSelection(cells.Table_Div_Row6_Column6); 
      await I.capturescreenshot(TestName,'borderoverlineSolid');  
      const res1=await I.verifyBorder(cells.Table_Div_Row6_Column6,'border-top','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderoverlineSolid.png');
      allure.addAttachment('BorderoverlineSolid',new Buffer("BorderoverlineSolid.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border OverLineDouble
     async Home_Format_Border_OverlineDouble(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Table_Div_Row6_Column6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderoverlineDouble)
      await I.clearSelection(cells.Table_Div_Row6_Column6); 
      await I.capturescreenshot(TestName,'borderoverlineDouble');  
      const res1=await I.verifyBorder(cells.Table_Div_Row6_Column6,'border-top','2px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderoverlineDouble.png');
      allure.addAttachment('BorderoverlineDouble',new Buffer("BorderoverlineDouble.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');    
    },

     //Border UnderlineOverline
     async Home_Format_Border_UnderlineOverline(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Table_Div_Row6_Column6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderunderlineOverline)
      await I.clearSelection(cells.Table_Div_Row6_Column6); 
      await I.capturescreenshot(TestName,'borderunderlineoverline'); 
      await I.saveScreenshot('Borderunderlineoverline.png');
      allure.addAttachment('Borderunderlineoverline',new Buffer("Borderunderlineoverline.png"),'png');  
      const res1=await I.verifyBorder(cells.Table_Div_Row6_Column6,'border-bottom','1px solid rgb(102, 102, 102)');                
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
      const res2=await I.verifyBorder(cells.Table_Div_Row6_Column6,'border-top','1px solid rgb(102, 102, 102)');    
      if(res2==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border Left
     async Home_Format_Border_Left(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Table_Div_Row6_Column6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderleft)
      await I.clearSelection(cells.Table_Div_Row6_Column6); 
      await I.capturescreenshot(TestName,'borderleft');  
      const res1=await I.verifyBorder(cells.Table_Div_Row6_Column6,'border-left','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderLeft.png');
      allure.addAttachment('BorderLeft',new Buffer("BorderLeft.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

    //Border Right
    async Home_Format_Border_Right(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Table_Div_Row6_Column6);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderright)
      await I.clearSelection(cells.Table_Div_Row6_Column6); 
      await I.capturescreenshot(TestName,'borderright');  
      const res1=await I.verifyBorder(cells.Table_Div_Row6_Column6,'border-right','1px solid rgb(102, 102, 102)');    
      await I.saveScreenshot('BorderRight.png');
      allure.addAttachment('BorderRight',new Buffer("BorderRight.png"),'png');  
      if(res1==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border LineAll
     async Home_Format_Border_LineAll(FeatureName,TestName){
      await I.clickOnHomeTab(); 
      await I.selectCell(cells.Table_Div_Row6_Column5);
      await I.clickBorderDropDown();
      await I.click(toolBar.HomeTab.Format.borderlineAll)
      await I.clearSelection(cells.Table_Div_Row6_Column5); 
      await I.capturescreenshot(TestName,'borderlineAll');  
      await I.saveScreenshot('BorderLineAll.png');
      allure.addAttachment('BorderLineAll',new Buffer("BorderLineAll.png"),'png');  
      const res1=await I.verifyBorder(cells.Table_Div_Row6_Column5,'border-style','solid');          
      const res2=await I.verifyBorder(cells.Table_Div_Row6_Column5,'border-color','rgb(102, 102, 102)');          
      const res3=await I.verifyBorder(cells.Table_Div_Row6_Column5,'border-width','1px');          
      if(res1==='fail' || res2==='fail' ||res3==='fail') 
      await I.assert(true,false,'Value comparison failed');
    },

     //Border Default
     async Home_Format_Border_Default(FeatureName,TestName){
      await I.clickOnHomeTab();       
      await I.selectCell(cells.Table_Div_Row6_Column5);      
      await I.clickBorderDropDown(); 
      await I.click(toolBar.HomeTab.Format.borderdefaultline);
      await I.clearSelection(cells.Table_Div_Row6_Column5); 
      await I.capturescreenshot(TestName,'borderdefault');  
      const res4=await I.verifyNoBorder(cells.Table_Div_Row6_Column5)
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
      await I.selectCell(cells.Cell_8_5);
      await I.clickIncreaseDecimal(1);
      await I.capturescreenshot(TestName,'Increase_Decimal');
      const res1=await I.verifyValue(cells.Cell_8_5,'173.000');    
      await I.saveScreenshot('IncreaseDecimal.png');
      allure.addAttachment('IncreaseDecimal',new Buffer("IncreaseDecimal.png"),'png'); 
      if(res1==='fail')
      await I.assert(true,false,'Value comparison failed');  
      await I.clickDecreaseDecimal(1)
      await I.capturescreenshot(TestName,'Decrease_Decimal');
      const res2=await I.verifyValue(cells.Cell_8_5,'173.00');    
      await I.saveScreenshot('DecreaseDecimal.png');
      allure.addAttachment('DecreaseDecimal',new Buffer("DecreaseDecimal.png"),'png'); 
      if(res2==='fail')
      await I.assert(true,false,'Value comparison failed'); 
      await I.clearSelection(cells.Cell_8_5); 
    },
}
