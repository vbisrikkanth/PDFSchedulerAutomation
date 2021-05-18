const { locator } = require("codeceptjs");

const {I} = inject();

module.exports = {

    cells:{
        firstValue: 'div.table-row-1.table-col-1 span',
        CellOneOne: 'div.table-row-1.table-col-1',
        CellOneOneDivChild: 'div.table-row-1.table-col-1 div',
        prefixValue: locate('div.table-row-1.table-col-6 span').at(1),
        suffixValue: locate('div.table-row-1.table-col-6 span').at(2),
        HeaderOne: 'div[role="columnHeader"][data-column-order="1"]',
        HeaderOneSpanChild: 'div[role="columnHeader"][data-column-order="1"] span[role="button"]',
        CellOneFive: 'div.table-row-0.table-col-12',
        CellOneFiveDivSpanSpan: 'div.table-row-0.table-col-12 div span span',
        Cell_10_1: 'div.table-row-10.table-col-1',
        Cell_16_1:'div.table-row-16.table-col-0 span',
        Cell_1_2: 'div.table-row-1.table-col-2 span',
        Cell_1_3: 'div.table-row-1.table-col-3',
        Cell_1_5: 'div.table-row-1.table-col-5',
        Cell_1_7: 'div.table-row-1.table-col-7',
        Cell_1_8: 'div.table-row-1.table-col-8',
        Cell_2_6: 'div.table-row-2.table-col-6 span',
        Cell_2_1: 'div.table-row-2.table-col-1 span',
        Cell_3_1: 'div.table-row-3.table-col-1 span',
        Cell_3_2: 'div.table-row-3.table-col-2',
        Cell_3_3: 'div.table-row-3.table-col-3',
        Cell_10_9: 'div.table-row-10.table-col-9',
        Cell_8_2: 'div.table-row-8.table-col-2',
        Cell_8_2_id: 'table-row-8_table-col-2',
        Cell_9_1: 'div.table-row-9.table-col-1',
        Cell_9_2: 'div.table-row-9.table-col-2',
        Cell_9_2_id: 'table-row-9_table-col-2',
        Table_Div_Row6_Column6: 'div.table-row-6.table-col-6',
        Table_Div_Row6_Column5: 'div.table-row-6.table-col-5',
        Cell_10_2: 'div.table-row-10.table-col-2',
        Cell_10_3: 'div.table-row-10.table-col-3',
        Cell_1_6: 'div.table-row-1.table-col-6',
        Cell_4_1: 'div.table-row-4.table-col-1 span',
        Cell_4_2: 'div.table-row-4.table-col-2',
        Cell_4_3: 'div.table-row-4.table-col-3 span',
        Cell_4_5: 'div.table-row-4.table-col-5',
        Cell_4_6: 'div.table-row-4.table-col-6',
        Cell_4_7: 'div.table-row-4.table-col-7',
        
        Cell_5_1: 'div.table-row-5.table-col-1 span',
        Cell_5_2: 'div.table-row-5.table-col-2 span',
        Cell_5_3: 'div.table-row-5.table-col-3 span',
        Cell_8_5 :'div.table-row-8.table-col-5',
        Cell_2_2: 'div.table-row-2.table-col-2',
        Cell_2_3: 'div.table-row-2.table-col-3',
        Cell_2_3_DivChild: 'div.table-row-2.table-col-3 div',
        Cell_2_4: 'div.table-row-2.table-col-4',
        Cell_2_4_DivChild: 'div.table-row-2.table-col-4 div',
        Cell_2_5: 'div.table-row-2.table-col-5',
        Cell_2_5_DivChild: 'div.table-row-2.table-col-5 div',
        Cell_9_3: 'div.table-row-9.table-col-3',
        Cell_9_3_id: 'table-row-9_table-col-3',
        Cell_11_1: 'div.table-row-11.table-col-1',
        Cell_6_1: 'div.table-row-6.table-col-1',
        Cell_6_2: 'div.table-row-6.table-col-2',
        Cell_6_3: 'div.table-row-6.table-col-3',
        Cell_6_7: 'div.table-row-6.table-col-7',
      
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