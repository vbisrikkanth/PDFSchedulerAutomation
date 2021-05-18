const { I } = inject();
const toolBar = require('./toolBar');
const { cells } = require('./matrixContent');

module.exports = {

    async Home_Demo(FeatureName,TestName){      
        await I.selectCell(cells.Table_Div_Row6_Column5);      
        await I.clickBorderDropDown(); 
        await I.click(toolBar.HomeTab.Format.borderdefaultline);
        await I.clearSelection(cells.Table_Div_Row6_Column5); 
        await I.capturescreenshot(TestName,'borderdefault');  
        const res4=await I.verifyNoBorder(cells.Table_Div_Row6_Column5)
        if(res4==='fail') 
        await I.assert(true,false,'Value comparison failed');
      },
    
     
}
