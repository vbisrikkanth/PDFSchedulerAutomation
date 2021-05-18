const { locator } = require("codeceptjs");

const {I} = inject();

module.exports = {

    cells:{
        firstValue: '#ibcsChart div.table-row-1.table-col-1 span',
        CellOneOne: '#ibcsChart div.table-row-1.table-col-1',
        CellOneOneDivChild: '#ibcsChart div.table-row-1.table-col-1 div',
        prefixValue: locate('#ibcsChart div.table-row-1.table-col-1 span').at(1),
        suffixValue: locate('#ibcsChart div.table-row-1.table-col-1 span').at(2),
        HeaderOne: '#ibcsChart div[role="columnHeader"][data-column-order="1"]',
        HeaderOneSpanChild: '#ibcsChart div[role="columnHeader"][data-column-order="1"] span[role="button"]',
        CellOneFive: '#ibcsChart div.table-row-0.table-col-12',
        CellOneFiveDivSpanSpan: '#ibcsChart div.table-row-0.table-col-12 div span span',
        Cell_10_1: '#ibcsChart div.table-row-10.table-col-1',
        Cell_16_1:'#ibcsChart div.table-row-16.table-col-0 span',
        Cell_1_2: '#ibcsChart div.table-row-1.table-col-2 span',
        Cell_2_6: '#ibcsChart div.table-row-2.table-col-6 span',
        Cell_2_1: '#ibcsChart div.table-row-2.table-col-1 span',
        Cell_3_1: '#ibcsChart div.table-row-2.table-col-2 span',
        Cell_10_9: '#ibcsChart div.table-row-10.table-col-9',
        Cell_8_2: '#ibcsChart div.table-row-8.table-col-2',
        Cell_8_2_id: 'table-row-8_table-col-2',
        Cell_9_2: '#ibcsChart div.table-row-9.table-col-2',
        Cell_9_2_id: 'table-row-9_table-col-2',
        Table_Div_Row6_Column6: '#ibcsChart div.table-row-6.table-col-6',
        Table_Div_Row6_Column5: '#ibcsChart div.table-row-6.table-col-5',
        Cell_10_2: '#ibcsChart div.table-row-10.table-col-2',
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