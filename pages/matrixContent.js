const { locator } = require("codeceptjs");

const {I} = inject();

module.exports = {

    cells:{
        firstValue: '//div[@id="table-row-1_table-col-1"]//span',
        CellOneOne: '//div[@id="table-row-1_table-col-1"]',
        CellOneOneDivChild: '//div[@id="table-row-1_table-col-1"]//div',
        prefixValue: locate('//div[@id="table-row-1_table-col-6"]//span').at(1),
        suffixValue: locate('//div[@id="table-row-1_table-col-6"]//span').at(2),
        HeaderOne: '//div[@role="columnHeader" and @data-column-order="1"]',
        HeaderOneSpanChild: '//div[@role="columnHeader" and @data-column-order="1"]//span[@role="button"]',
        CellOneFive: '//div[@id="table-row-0_table-col-12"]',
        CellOneFiveDivSpanSpan: '//div[@id="table-row-0_table-col-12"]//div//span//span',        
        Cell_16_1:'//div[@id="table-row-16_table-col-0"]//span',
        Cell_1_2: '//div[@id="table-row-1_table-col-2"]//span',
        //Cell_1_3: '//div[@id="table-row-1_table-col-3"]', //as column3 not available
        Cell_1_3: '//div[@id="table-row-11_table-col-1"]',
        Cell_1_5: '//div[@id="table-row-1_table-col-5"]',
        //Cell_1_7: '//div[@id="table-row-1_table-col-7"]', //as column7 not available
        Cell_1_7: '//div[@id="table-row-11_table-col-2"]',
        //Cell_1_8: '//div[@id="table-row-1_table-col-8"]', //as column8 not available
        Cell_1_8: '//div[@id="table-row-11_table-col-5"]',
        Cell_2_6: '//div[@id="table-row-2_table-col-6"]//span',
        Cell_2_0: {xpath:'//*[@id="table-row-2_table-col-0"]/parent::div'},
        Cell_2_0_span: '#table-row-2_table-col-0 span[role="tabpanel"]',
        Cell_2_1: '//div[@id="table-row-2_table-col-1"]//span',
        Cell_3_0: {xpath:'//*[@id="table-row-3_table-col-0"]/parent::div'},
        Cell_3_1: '//div[@id="table-row-3_table-col-1"]//span',
        //Cell_3_2: 'div.table-row-3.table-col-2',
        Cell_3_2:  {xpath:'//div[@id="table-row-3_table-col-2"]'},
        //Cell_3_3: '//div[@id="table-row-3_table-col-3"]', //as column3 not available
        Cell_3_3: '//div[@id="table-row-3_table-col-5"]',
        Cell_10_9: '//div[@id="table-row-10_table-col-9"]',
        Cell_8_2: '//div[@id="table-row-8_table-col-2"]',
        Cell_8_2_id: 'table-row-8_table-col-2',
        
        Table_Div_Row6_Column6: '//div[@id="table-row-6_table-col-6"]',
        Table_Div_Row6_Column5: '//div[@id="table-row-6_table-col-5"]',
        Cell_10_1: '//div[@id="table-row-10_table-col-1"]',
        Cell_10_2: '//div[@id="table-row-10_table-col-2"]',
        //Cell_10_3: '//div[@id="table-row-10_table-col-3"]', //as column3 not available
        Cell_10_5: '//div[@id="table-row-10_table-col-5"]',
        Cell_1_6: '//div[@id="table-row-1_table-col-6"]',
        Cell_4_1: '//div[@id="table-row-4_table-col-1"]//span',
        Cell_4_2: '//div[@id="table-row-4_table-col-2"]',
       // Cell_4_3: '//div[@id="table-row-4_table-col-3"]//span', //as column3 not available
        Cell_4_3: '//div[@id="table-row-13_table-col-5"]//span',
        Cell_4_5: '//div[@id="table-row-4_table-col-5"]',
        Cell_4_6: '//div[@id="table-row-4_table-col-6"]',
        //Cell_4_7: '//div[@id="table-row-4_table-col-7"]', //as column7 not available
        Cell_4_7: '//div[@id="table-row-13_table-col-6"]',
        
        Cell_5_1: '//div[@id="table-row-5_table-col-1"]//span',
        Cell_5_2: '//div[@id="table-row-5_table-col-2"]//span',
        //Cell_5_3: '//div[@id="table-row-5_table-col-3"]//span', //as column3 not available
        Cell_5_3: '//div[@id="table-row-13_table-col-5"]//span',
        //Cell_5_4: '//div[@id="table-row-5_table-col-4"]',   //as column4 not available
        Cell_5_4: '//div[@id="table-row-13_table-col-2"]//span',
        Cell_5_5: '//div[@id="table-row-5_table-col-5"]',

        Cell_8_5 :'//div[@id="table-row-8_table-col-5"]',
        Cell_2_2: '//div[@id="table-row-2_table-col-2"]',
        //Cell_2_3: '//div[@id="table-row-2_table-col-3"]', //as column3 not available
        Cell_2_3: '//div[@id="table-row-14_table-col-1"]',
        //Cell_2_3_DivChild: '//div[@id="table-row-2_table-col-3"]//div', //as column3 not available
        Cell_2_3_DivChild: '//div[@id="table-row-14_table-col-1"]//div',
        //Cell_2_4: '//div[@id="table-row-2_table-col-4"]', //as column4 not available
        Cell_2_4: '//div[@id="table-row-14_table-col-2"]',
        //Cell_2_4_DivChild: '//div[@id="table-row-2_table-col-4"]//div', //as column4 not available
        Cell_2_4_DivChild: '//div[@id="table-row-14_table-col-2"]//div', 
        Cell_2_5: '//div[@id="table-row-2_table-col-5"]',
        Cell_2_5_DivChild: '//div[@id="table-row-2_table-col-5"]//div',
       
        Cell_11_1: '//div[@id="table-row-11_table-col-1"]',
        Cell_6_1: '//div[@id="table-row-6_table-col-1"]',
        Cell_6_2: '//div[@id="table-row-6_table-col-2"]',
        //Cell_6_3: '//div[@id="table-row-6_table-col-3"]', //as column3 not available
        Cell_6_3: '//div[@id="table-row-14_table-col-5"]',
       // Cell_6_3: 'div.table-row-6.table-col-3',
        //Cell_6_4: '//div[@id="table-row-6_table-col-4"]', //as column4 not available
        Cell_6_4: '//div[@id="table-row-14_table-col-6"]',
        Cell_6_5: '//div[@id="table-row-6_table-col-5"]',
        Cell_6_5_id: 'table-row-6_table-col-5',
        Cell_6_6: '//div[@id="table-row-6_table-col-6"]',
       // Cell_6_7: '//div[@id="table-row-6_table-col-7"]',
         Cell_6_7: '//div[@id="table-row-15_table-col-1"]',
        Cell_6_6_id: 'table-row-6_table-col-6',
        Cell_7_1: '//div[@id="table-row-7_table-col-1"]',
        //Cell_7_4: '//div[@id="table-row-7_table-col-4"]', //as column4 not available
        Cell_7_4: '//div[@id="table-row-7_table-col-2"]',

        Cell_9_1: '//div[@id="table-row-9_table-col-1"]',
        Cell_9_2: '//div[@id="table-row-9_table-col-2"]',
        Cell_9_2_id: 'table-row-9_table-col-2',
        //Cell_9_3: '//div[@id="table-row-9_table-col-3"]', //as column3 not available
        Cell_9_5: '//div[@id="table-row-9_table-col-5"]',
        //Cell_9_3_id: 'table-row-9_table-col-3', //as column3 not available
        Cell_9_3_id: 'table-row-9_table-col-5',

        Cell_1_0: {xpath:'//div[@id="table-row-1_table-col-0"]'},
        Cell_1_0_span: {xpath:'//div[@id="table-row-1_table-col-0"]//span'},
        Cell_15_5: '//div[@id="table-row-15_table-col-5"]',
    },

    rows:{
        row0: {xpath:'//*[contains(@id,"table-row-0_")]'},        
        row0span: '(//*[contains(@id,"table-row-0_")]//child::span)',
        row1: {xpath:'//*[contains(@id,"table-row-1_")]'},
        row1span: '(//*[contains(@id,"table-row-1_")]//child::span)',
        row2: {xpath:'//*[contains(@id,"table-row-2_")]'},
        row2span: '(//*[contains(@id,"table-row-2_")]//child::span)',
        row3: {xpath:'//*[contains(@id,"table-row-3_")]'},
        row3span: '(//*[contains(@id,"table-row-3_")]//child::span)',
        row4: {xpath:'//*[contains(@id,"table-row-4_")]'},
        row4span: '(//*[contains(@id,"table-row-4_")]//child::span)',
        row5: {xpath:'//*[contains(@id,"table-row-5_")]'},
        row5span: '(//*[contains(@id,"table-row-5_")]//child::span)',
        row6: {xpath:'//*[contains(@id,"table-row-6_")]'},
        row6span: '(//*[contains(@id,"table-row-6_")]//child::span)',
        row7: {xpath:'//*[contains(@id,"table-row-7_")]'},
        row7_DivChild: '(//*[contains(@id,"table-row-7_")]//child::div)',
        row8: {xpath:'//*[contains(@id,"table-row-8_")]'},
        
    },
    columns:{
        header1: locate('div[role="columnHeader"][data-column-order="1"]'),        
        header2: locate('div[role="columnHeader"][data-column-order="2"]'),        
        //header3: locate('div[role="columnHeader"][data-column-order="3"]'),        
        //header4: locate('div[role="columnHeader"][data-column-order="4"]'),  
        header3: locate('div[role="columnHeader"][data-column-order="1"]'),        
        header4: locate('div[role="columnHeader"][data-column-order="2"]'),        
        header5: locate('div[role="columnHeader"][data-column-order="5"]'),        
        header6: locate('div[role="columnHeader"][data-column-order="6"]'),        
        //header7: locate('div[role="columnHeader"][data-column-order="7"]'),        
        //header8: locate('div[role="columnHeader"][data-column-order="8"]'),  
        header7: locate('div[role="columnHeader"][data-column-order="5"]'),        
        header8: locate('div[role="columnHeader"][data-column-order="6"]'),         
        header9: locate('div[role="columnHeader"][data-column-order="9"]'),        
        header10: locate('div[role="columnHeader"][data-column-order="10"]'),        
        //header11: locate('div[role="columnHeader"][data-column-order="11"]'),        
        //header12: locate('div[role="columnHeader"][data-column-order="12"]'), 
        header11: locate('div[role="columnHeader"][data-column-order="9"]'),        
        header12: locate('div[role="columnHeader"][data-column-order="10"]'),     
        column1span: 'div[id$="col-1"] span',
        column2span: 'div[id$="col-2"] span',
        //column4span: 'div[id$="col-4"] span',
        column4span: 'div[id$="col-2"] span',
        //column3: 'div[id$="col-3"]',
        column3: 'div[id$="col-1"]',
        column5span: 'div[id$="col-5"] span',
        column6: 'div[id$="col-6"]',
        column6span: 'div[id$="col-6"] span',
        //column7: 'div[id$="col-7"]',
        column7: 'div[id$="col-5"]',
        //column7span: 'div[id$="col-7"] span',
        column7span: 'div[id$="col-5"] span',
        //column8: 'div[id$="col-8"]',
        column8: 'div[id$="col-6"]',
        //column8_divchild: 'div[id$="col-8"] div',
        column8_divchild: 'div[id$="col-6"] div',
        column9: 'div[id$="col-9"]',
        column10: 'div[id$="col-10"]',
        //column11: 'div[id$="col-11"]',
        column11: 'div[id$="col-9"]',
        //column12: 'div[id$="col-12"]',
        column12: 'div[id$="col-10"]',
    }


}

/*
        //November Build Objects
        firstValue:'#ibcsChart div.table-row-0.table-col-0 span',     
        CellOneOne: '#ibcsChart div.table-row-0.table-col-0',
        CellOneOneDivChild: '#ibcsChart div.table-row-0.table-col-0 div',
       // CellOneOneDivSpan: ' #ibcsChart div.table-row-0.table-col-0 div[role="Table Cell"] span',
        HeaderOne: '#ibcsChart div[role="columnHeader"][data-columnorder="0"]',
        HeaderOneSpanChild: '#ibcsChart div[role="columnHeader"][data-columnorder="0"] span[role="button"]',
        CellOneFive: '#ibcsChart div.table-row-0.table-col-12',
        CellOneFiveDivSpanSpan: '#ibcsChart div.table-row-0.table-col-12 div span span',
        Cell_16_1:'#ibcsChart div.table-row-16.table-col-0 span',
    */