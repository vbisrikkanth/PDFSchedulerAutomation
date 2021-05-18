const { I } = inject();

module.exports = {

    HomeTab: {
        Common: {
            displaygrid: 'div.mrx-grid__will_change_auto',
            Home_header: locate('#header-container li.tab-list-item span').withText('Home'),
            Advanced_header: locate('#header-container li.tab-list-item span').withText('Advanced'),

            ////li/span[contains(text(),"Advanced")]
        },
        QuickAccess: {
            autoFit: locate('span#autoFitAllColumns-b'),
        },
        Style: {

            //Home Style Locators
            bold: '#scroll-container span#fontBold-b',
            italic: '#scroll-container span#fontItalic-b',
            fontDropdown: locate('#scroll-container div.toolbar-select div.ms-Icon.ms-Icon--ChevronDown.downArrow').at(1),
            fontSizeDropdown: locate('#scroll-container div.toolbar-select div.ms-Icon.ms-Icon--ChevronDown.downArrow').at(2),
            //faceSegui: '#fontSizeIncrement-b  option[value=""Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif"]',
            //faceSegui: locate('#fontSizeIncrement-b  option').withText('Segoe UI'),
            faceSegui: '//*[@id="fontSizeIncrement-b"]/*[text()="Segoe UI"]',
            //faceTahoma: locate('#fontSizeIncrement-b option').withText('Arial'),
            faceTahoma: '//*[@id="fontSizeIncrement-b"]/*[text()="Arial"]',
            //faceTimesNewRoman: '#fontSizeIncrement-b option[value="Times New Roman"]',
            faceTimesNewRoman: '//*[@id="fontSizeIncrement-b"]/*[text()="Times New Roman"]',
            //faceCorbel: '#fontSizeIncrement-b option[value="Corbel"]',
            faceCorbel: '//*[@id="fontSizeIncrement-b"]/*[text()="Corbel"]',
            //faceCourierNew: '#fontSizeIncrement-b option[value="Courier New"]',
            faceCourierNew: '//*[@id="fontSizeIncrement-b"]/*[text()="Courier New"]',
            //faceGeorgia: '#fontSizeIncrement-b option[value="Georgia"]',
            faceGeorgia: '//*[@id="fontSizeIncrement-b"]/*[text()="Georgia"]',
            //size16: '#fontSizeIncrement-d option[value="16"]',
            size16: '//*[@id="fontSizeIncrement-d"]/*[text()="16"]',
            //size14: '#fontSizeIncrement-d option[value="14"]',
            size14: '//*[@id="fontSizeIncrement-d"]/*[text()="14"]',
            //size12: '#fontSizeIncrement-d option[value="12"]',
            size12: '//*[@id="fontSizeIncrement-d"]/*[text()="12"]',
            //sizeIncrement: '#fontSizeIncrement-b',
            sizeIncrement: '//*[@id="fontSizeIncrement-b"]',
            //sizeDecrement: '#fontSizeDecrement-b',
            sizeDecrement: '//*[@id="fontSizeDecrement-b"]',
            bgColorDropdown: '#scroll-container [class^="icon icon--ChevronDown icons8-ChevronDown bf-er-co"]',
            bgColorBlue: '#scroll-container svg.bf-rx-colorpicker-svg g:nth-child(1) :nth-child(3)',
            bgColorWhite: '#scroll-container svg.bf-rx-colorpicker-svg g:nth-child(1) :nth-child(1)',
            colorDropdown: locate('#scroll-container [class^="icon icon--ChevronDown icons8-ChevronDown bf-er-co"]').at(1),
            headerOrientationdrop: locate('#headerOrientation-d'),
            fillcolorDropdown: locate('i.icon.icon--ChevronDown.icons8-ChevronDown.bf-er-colorpicker-icon-dropdown').at(1),
            fontcolorDropdown: locate('i.icon.icon--ChevronDown.icons8-ChevronDown.bf-er-colorpicker-icon-dropdown').at(2),
            resettodefault: locate('div.bf-er-colopicker-Palette-reset'),
            headerOrientationHorizontal: locate('span[aria-label$="text-direction-5"]'),
            headerOrientationDiagonalTopBottom: locate('span[aria-label$="text-direction"]'),
            headerOrientationVertical: locate('span[aria-label$="text-direction-1"]'),
            headerOrientationDiagonalBottomTop: locate('span[aria-label$="text-direction-4"]'),
           
            
        },

        //Home Format Locators
        Format: {            
            leftalign: locate('#scroll-container #labelAlignLeft-b'),
            centeralign: locate('#scroll-container #labelAlignLeft-b').at(2),
            //centeralign: locate('#scroll-container #labelAlignCenter-b'),
            rightalign: locate('#scroll-container #labelAlignRight-b'),

            topalign: locate('#scroll-container #labelAlignTop-b'),
            middlealign: locate('#scroll-container #labelAlignMiddle-b'),
            bottomalign: locate('#scroll-container #labelAlignBottom-b'),

            showHide: locate('#scroll-container div#showHide-b'),
            percentage: locate('#scroll-container #convertPercentage-b'),
            prefixsuffix: locate('#scroll-container #prefixSuffixModal-m'),
            valueprefix: locate('div.prefix-value input'),
            valuesuffix: locate('div.suffix-value input'),
            prefixsuffixApply: locate('div.ib_footer div').withText('Apply'),
            prefixsuffixCancel: locate('div.ib_footer div').withText('Cancel'),
            scalingdropdown: locate('span#scaling-d'),
            scalingOption: locate('div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title'),
            increaseDecimal: locate('#increaseDecimal-b'),
            decreaseDecimal: locate('#decreaseDecimal-b'),
            increaseIndent: locate('span#rightIndent-b'),
            decreaseIndent: locate('span#leftIndent-b'),
            numberFormattingdropdown: locate('div.toolbar_select div.ms-Icon.ms-Icon--ChevronDown.downArrow').at(3),
            numberFormattingOptions: 'div#numberFormatting-b option',
           
            borderdropdown: locate('span#lineStyle-d'),
            //borderdefaultline: locate('span.infoRiver.dark-no-border.linestyle.dropdownItem').at(1),
            borderdefaultline: locate('span[class$="linestyle active dropdownItem"]'),
            //borderoverlineSolid: locate('span.infoRiver.dark-top-border.linestyle.dropdownItem').at(1),
            borderoverlineSolid: locate('span[class$="top-border-2 linestyle dropdownItem"]'),
            //borderunderlineSolid: locate('span.infoRiver.dark-top-border.rotate_180.linestyle.dropdownItem'),
            borderunderlineSolid: locate('span[class$="bottom-border linestyle dropdownItem"]'),
            //borderoverlineDouble: locate('span.infoRiver.dark-double-top-border.linestyle.dropdownItem'),
            borderoverlineDouble: locate('span[class$="double-top-border linestyle dropdownItem"]'),
            //borderunderlineOverline: locate('span.infoRiver.dark-both-border.linestyle.dropdownItem'),
            borderunderlineOverline: locate('span[class$="both-border linestyle dropdownItem"]'),
            //borderleft: locate('span.infoRiver.dark-top-border.rotate_neg_90.linestyle.dropdownItem'),
            borderleft: locate('span[class$="top-border-2 rotate_neg_90 linestyle dropdownItem"]'),
            //borderright: locate('span.infoRiver.dark-top-border.rotate_pos_90.linestyle.dropdownItem'),
            borderright: locate('span[class$="top-border-2 rotate_pos_90 linestyle dropdownItem"]'),
            //borderlineAll: locate('span.infoRiver.dark-no-border.linestyle.dropdownItem').at(2),
            borderlineAll: locate('span[class$="all-border linestyle dropdownItem"]'),
        },
        Visualization: {
            //barChartdropdown: locate('div.toolbar-column span#bulletBarChart-b'),
            barChartdropdown: locate('span#barChart-b'),
            barChartIntegrated: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Integrated'),

            barChart: locate('span#barChart-b'),
            waterflowChart: '#waterflowChart-b',
            pinChartDropDown: locate('span#pinChart-b'),
            pinChart: locate('div.sub-menu-icon-display span').withText('Pin'),
            lollipopChart: locate('div.sub-menu-icon-display span').withText('Lollipop'),

            waterfallChartdropdown: locate('span#waterfallChart-b'),
            waterfallChartRegular: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Regular'),
            waterfallChartContinuous: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Continuous'),

            bulletChartdropdown: locate('span#bulletButton-b span[class$="dropdown-button-icon"]'),
            bulletChartSimple: '//span[contains(text(),"Simple")]',
            bulletChartCustom: '//span[contains(text(),"Custom")]',

            //sparklinesChartdropdown: 'div.toolbar-column div#sparklineType',
            sparklinesChartdropdown: locate('span#sparkLineOptions-d span[class$="dropdown-button-icon"]'),
            LineChart: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Line'),
            AreaChart: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Area'),
            ColumnChart: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Column'),
            WinLossChart: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Win / Loss'),

            waterfallChart: '#waterfallChart-b',
            sparklineChart: '#sparkLineOptions-d',
            barChart_svg_g: 'div.table-row-1.table-col-1 svg g',
            barChart_svg_rect_chart: 'div.table-row-1.table-col-1 svg rect',
            barChart_svg_text_chart: 'div.table-row-1.table-col-1 svg text',
            showAsNumber: '#showAsNumbers-b',
            waterflowChart_svg_line: 'div.table-row-1.table-col-1 svg line',
            PinChart_svg_line: 'div.table-row-1.table-col-1 svg line',
            PinChart_svg_circle: 'div.table-row-0.table-col-0 svg circle',


        },
        Column: {
            dataTotal: locate('#totals-d'),
            dataTotalSubMenu: locate('div.toolbar.dropdownOption-toolbar div span'),
            dataTopsubMenu: locate('div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title').withText('Top'),
            dataBottomsubMenu: locate('div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title').withText('Bottom'),
            dataClearsubMenu: locate('div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title').withText('Clear'),
            
            
            Totaldropdown: locate('div span#totals-d'),
            InsertGrantTotalColumn: locate('div.sub-menu-icon-display.active label.bf-ui-form-switch.form-switch').at(2),
            Enablerowsubtotalsplit: locate('div.sub-menu-icon-display.active label.bf-ui-form-switch.form-switch').at(3),
            Positions: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Position(s)'),
            
            Row_GrandTotal_Top: locate('div.ib_container div input#rowGrandTotalPosition_above'),
            Row_GrandTotal_Bottom: locate('div.ib_container div input#rowGrandTotalPosition_below'),
            Row_GrandTotal_Off: locate('div.ib_container div input#rowGrandTotalPosition_clear'),

            Row_SubTotal_Top: locate('div.ib_container div input#rowSubTotalPosition_above'),
            Row_SubTotal_Bottom: locate('div.ib_container div input#rowSubTotalPosition_below'),
            Row_SubTotal_Off: locate('div.ib_container div input#rowSubTotalPosition_clear'),

            Column_GrandTotal_Left: locate('div.ib_container div input#columnGrandTotalPosition_left'),
            Column_GrandTotal_Right: locate('div.ib_container div input#columnGrandTotalPosition_right'),
            Column_GrandTotal_Off: locate('div.ib_container div input#columnGrandTotalPosition_clear'),

            Column_SubTotal_Left: locate('div.ib_container div input#columnSubTotalPosition_left'),
            Column_SubTotal_Right: locate('div.ib_container div input#columnSubTotalPosition_right'),
            Column_SubTotal_Off: locate('div.ib_container div input#columnSubTotalPosition_clear'),

            Positions_Apply: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Apply'),
            Positions_Cancel: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Cancel'),

            Sortdropdown: locate('div span#sort-d'),
            SortAscending: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Ascending'),
            SortDescending: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Descending'),
            SortClear: locate('div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Clear'),

            Filterdropdown: locate('div span#filter-d'),
            AddFilter: locate('span.queryBuilder-footer-title').withText('Add Filter'),
            FilterField: locate('div.dropdown-root.rule-fields'),
            FilterFieldValue: locate('div.dropdown-root.rule-fields div.dropdown-menu  div.dropdown-option span'),
            FilterOperator: locate('div.dropdown-root.rule-operators'),
            FilterOperatorValue: locate('div.dropdown-root.rule-operators div.dropdown-menu  div.dropdown-option span'),
            FilterValue: locate('div.bf-ui-form-auto-complete.form-auto-complete.rule-value'),
            FilterValueSelect: locate('div.bf-ui-form-auto-complete.form-auto-complete.rule-value ul li span'),
            FilterClear: locate('div button.ruleGroup-clearRule span'),
            FilterDelete: locate('div button.rule-remove'),

            AdvancedFilter: locate('span.queryBuilder-footer-title').withText('Advanced'),
            Advanced_Filter_Apply: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Apply'),
            Advanced_Filter_AddGroup: locate('button.ruleGroup-addGroup span'),
            Advanced_Filter_RuleCombinatorAnd: locate('span.ruleGroup-combinators.betweenRules label.radio span.radio-title').withText('And'),
            Advanced_Filter_RuleCombinatorOr: locate('span.ruleGroup-combinators.betweenRules label.radio span.radio-title').withText('Or'),
            Advanced_Filter_ResetAll: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Reset all'),

            TopN: locate('span#ranking-b'),
            TopNtopbottom: locate('div.ranking-rule-topbottom div.dropdown-control'),
            TopNtopbottomValue: locate('div.ranking-rule-topbottom div.dropdown-menu span'),
            TopNInput: locate('input.ranking-rule-topNInput'),
            TopNType: locate('div.ranking-rule-topNType div.dropdown-control'),
            TopNTypeValue: locate('div.ranking-rule-topNType div.dropdown-menu span'),
            TopNField: locate('div.ranking-rule-topNField div.dropdown-control'),
            TopNFieldValue: locate('div.ranking-rule-topNField div.dropdown-menu span'),
            TopN_Apply: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Apply'),
            TopN_ResetAll: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Reset all'),
            TopNClose: locate('div span.ms-Icon.ms-Icon--ChromeClose.closePopup'),
        },
        Focus: {
            CommentAdd: locate('div.compound-button.commentIcon div.compound-icon-container'),
            CommentName: locate('div.modal-user-name.comment-list input'),
            CommentInput: locate('div.modal-editor div.ql-editor p'),
            CommentColorlist: locate('div.bf-ui-flex.colors-list div.colors-select div.color-div'),
            CommentSave: locate('div.react-tiny-popover-container button').withText('Save'),
            CommentDelete: locate('div.comment-actions div.ms-Icon.ms-Icon--Delete'),
            CommentEdit: locate('div.comment-actions div.ms-Icon.ms-Icon--Edit'),
            Commentdropdown: locate('div#Comments'),
            CommentFootNoteToggle: {xpath:'//*//span[text()="Footnote"]/preceding-sibling::label'},
            CommentColumnToggle: {xpath:'//*//span[text()="Comment column"]/preceding-sibling::label'},
            CommentHideAll: {xpath:'//*//span[text()="Hide All Comments"]/preceding-sibling::label'},
            CondFormatdropdown: locate('div#conditionalFormat'),
            CondFormatSegmentationToggle: {xpath:'//*//span[text()="Segmentation"]/preceding-sibling::label'},
            CondFormatSideBarClose: locate('span.sidebar-header-close'),
            CondFormatHeatMapToggle: {xpath:'//*//span[text()="Heat Map"]/preceding-sibling::label'},
            CondFormatABCClassifyToggle: {xpath:'//*//span[text()="ABC classification"]/preceding-sibling::label'},
            CondFormatRatingToggle: {xpath:'//*//span[text()="Rating"]/preceding-sibling::label'},
            CondFormatIconsToggle: {xpath:'//*//span[text()="Icons"]/preceding-sibling::label'},

        },
       

    },
    AdvancedTab: {
        Reporting:{
            Paginationdropdown: locate('span#pagination-d'),
            PaginationResponsive: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Responsive'),
            PaginationFixedRows: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Fixed Rows'),
            PaginationFixedNone: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('None'),
            Breaksdropdown: locate('span#breaks-d'),
            BreaksInsertPageBreak: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Insert page break'),
            BreaksPageBreakType: 'div.sub-menu-icon-display span.toolbar-icon-title',
            BreaksRemovePageBreak: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Remove page break'),
            BreaksInsertSectionBreak: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Insert section break'),
            BreaksRemoveSectionBreak: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Remove section break'),
            HeaderFooter: locate('span#headerFooterConfig-b'),
            ReportLayout: locate({xpath: '//div[contains(@aria-label,"summaryLayout")] | //span[contains(@id,"summaryLayout")]'}),
            

        },
        Customize:{
            ReorderRows: locate('span#reorderRows-b'),
            CategorySign: locate('span#categorySign-b'),
            CategorySignOptions: {xpath:'//div[contains(@id,"table-col-0")]//span[contains(@class,"icon-equal")] | //div[contains(@id,"table-col-0")]//span[contains(@class,"icon-plus")] | //div[contains(@id,"table-col-0")]//span[contains(@class,"icon-minus")]'},
            InvertSign: locate('div[aria-label="invertSigns-b"]'),
            InvertSignApply: locate('div.ib_container div[role="button"]').withText('Apply'),
            Invertdropdown: locate('div#Invert div.ms-Icon.ms-Icon--ChevronDownSmall'),
            InvertInfluenceTotals: locate('//*//span[text()="Influence Totals"]/preceding-sibling::label'),
            InsertRow: locate('span#insertRow-d'),
            InsertRowOptions: locate('div.sub-menu-icon-display span.toolbar-icon-title'),
            //InsertRowLabel: 'div.column-sidebar-container div.sidebar-form-control input',
            InsertRowLabel: {xpath:'//input[@placeholder="Enter column name"]'},
            //InsertRowFormula: 'div.sidebar-form-control div.CodeMirror',
            InsertRowFormula: {xpath:'//div[@class="sidebar-form-control"]//div[contains(@class,"CodeMirror-lines")]'},
            //InsertRowFormulaOptions: 'li.CodeMirror-Tern-completion',
            InsertRowFormulaOptions: {xpath:'//li[contains(@class,"CodeMirror-Tern-completion")]'},
            //InsertRowIncludeinTotalCheckBox: 'div.sidebar-form-control input[type="checkbox"]',
            InsertRowIncludeinTotalCheckBox: {xpath:'//input[@placeholder="Enter column name"]'},
            //InsertRowDescription: 'div.sidebar-form-control textarea.description',
            InsertRowDescription: {xpath:'//textarea[@placeholder="Formula description"]'},
            InsertRowApplyBtn: locate('div.column-sidebar-container button').withText('Apply'),
            InsertRowCloseBtn: locate('div.sidebar-footer button').withText('Close'),
            InsertColumn: locate('span#insertColumn-d'),
            CellEditing: locate('span#insertCell-d'),
            StaticRowDelete: locate('div[title="Static Row"] div.delete'),
            ContributionRowDelete: locate('div[title="%Contrib Row"] div.delete'),
            MatrixRowLabel: '//*[contains(@id,"table-col-0")]//span[text()="labelname"]//ancestor::div[contains(@class,"table-row")]',
            ViewInsertRowEdit: '//div[@class="list-content"]/span[@class="content-title" and text()="labelname"]/parent::div/following-sibling::div/div[@class="edit"]',
            ViewInsertRowDelete: '//div[@class="list-content"]/span[@class="content-title" and text()="labelname"]/parent::div/following-sibling::div/div[@class="delete"]',
            InsertMeasureLabel: {xpath:'//input[@placeholder="Enter measure name"]'},
            InsertMeasureSelectCalculation: {xpath:'//div[contains(@class,"sidebar-body-content")]//select'},
            InsertMeasureSelectCalculationOption: {xpath:'//div[contains(@class,"sidebar-body-content")]//select/option'},
            InsertMeasureSelectAgg: {xpath:'(//div[contains(@class,"sidebar-body-content")]//select)[2]'},
            InsertMeasureSelectAggOption: {xpath:'(//div[contains(@class,"sidebar-body-content")]//select)[2]/option'},
            MatrixColumnLabel: '//div[@role="columnHeader"]//span[contains(text(),"labelname")]//ancestor::div[@role="columnHeader"]',
            CellEditingDiv: locate('div.ib_container div.calc-cell-edit span'),
            CellEditingUpdateBtn: locate('div.ib_container div.calc-cell-edit button'),
        },
        Analytics:{
            RowAggregationdropdown: locate('span#aggregationType-d'),
            RowAggregationType: locate('div.sub-menu-icon-display span.toolbar-icon-title'),
            RowAggregationNative: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Native'),
            RowAggregationSum: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Sum'),
            RowAggregationMinimum: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Minimum'),
            RowAggregationMaximum: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Maximum'),
            RowAggregationAverageChildren: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Average (children)'),
            RowAggregationAverageLeaf: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Average (Leaf)'),
            RowAggregationStandardDeviation: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Standard Deviation'),
            SmartAnalysisdropdown: locate('span#smartAnalysis-d'),
            SmartAnalysisType: '//div[contains(@class,"sub-menu-icon-display")]//span[text()="analysistype"]',
            SmartAnalysisContribution: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Contribution'),
            SmartAnalysisVariance: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Variance'),
            SmartAnalysisClear: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Clear'),
            Alert: locate('span#alert-d'),
            AddNewAlert: locate('div.ibcs-addNewRule-button-div'),
            AlertPanel: {xpath:'//div[@class="bf-ui-draggable-list"]'},
            EditAlertName: {xpath:'//div[@class="alert-filter-edit-panel"]//input[@type="text"]'},
            EditAlertEmail: {xpath:'//div[@class="alert-filter-edit-panel"]//input[@type="email"]'},
            EditAlertApplyBtn: {xpath:'//div[@class="alert-filter-edit-panel"]//button[text()="Apply"]'},
            EditAlertBackBtn: {xpath:'//div[@class="alert-filter-edit-panel"]//button[text()="Back"]'},
            EditAlertConfigBtn:{xpath:'//div[@class="alert-filter-edit-panel"]//div[text()="Edit config"]'},
            EditConfigApplyBtn: {xpath:'//div[@class="bf-ui-flex filterFooter"]//div[text()="Apply"]'},
            DuplicateRule: '//span[@class="ibcs-rule-label" and text()="alertname"]//ancestor::div[@class="list-content"]//following-sibling::div//button[@title="Duplicate rule"]',
            OffRule: '//span[@class="ibcs-rule-label" and text()="alertname"]//ancestor::div[@class="list-content"]//following-sibling::div//button[@title="Off"]',
            AlertSearch: '//span[@class="ibcs-rule-label" and text()="alertname"]',
            AlertLabelList: locate('div.bf-ui-draggable-list span.ibcs-rule-label'),
            AlertList: 'div.bf-ui-draggable-list div[role="link"]',
            EditRuleBtn: '(//div[@class="bf-ui-draggable-list"]//div[@role="link"])[ind]//button[@title="Edit rule"]',
            OffRuleBtn: '(//div[@class="bf-ui-draggable-list"]//div[@role="link"])[ind]//button[@title="Off"]',
            Audit: locate('span#auditLog-s'),
            AuditClose: locate('div.sidebar-footer button').withText('Close'),
            AuditDataEditing: {xpath:'//div[contains(@class,"history-logs")]//div[@role="button" and text()="Data Editing"]'},
            AuditFormatting: {xpath:'//div[contains(@class,"history-logs")]//div[@role="button" and text()="Formatting"]'},
            AuditCalculatedRows: {xpath:'//div[contains(@class,"accordion-header")]//h3[contains(text(),"Calculated Rows")]'},
            AuditItemslist: '//div[@class="accordion-body"]//div[@class="title"]/span[contains(text(),"labelname")]',
            DeleteAuditItemlist: '//div[@class="accordion-body"]//div[@class="title"]/span[contains(text(),"labelname")]/parent::div/following-sibling::div[@class="delete"]',
            WarningPopupDeleteButton: locate('div.confirm-popup-modal div[role="button"]').withText('Confirm'),
            WarningPopupCancelButton: locate('div.confirm-popup-modal div[role="button"]').withText('Cancel'),
            AuditCalculatedColumns: {xpath:'//div[contains(@class,"accordion-header")]//h3[contains(text(),"Visual Columns")]'},
            SmartAnalysisColumnLabelAC: '//div[@role="columnHeader"]//span[contains(text(),"labelname") and not(contains(text(),"Variance"))]//ancestor::div[@role="columnHeader"]',
        },
        Display:{
            Templates: locate('span#template-b'),
            TemplateType: '//div[@class="template-detail"]//div[text()="templatetype"]',
            Apperancedropdown: locate('div#appearance div.ms-Icon.ms-Icon--ChevronDownSmall'),
            AppearanceLight: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Light'),
            AppearanceDark: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Dark'),
            Appearance: locate('span#theme-s'),
            AppearanceTabs: locate('div.tab-selector div.tab-label'),
            AppearanceTableThemeSelectType: '//div[@class="theme-editor-option"]/div[@class="theme-editor-label" and text()="ThemeType"]//following-sibling::div/div[@class="themeSelect"]',
            AppearanceTableThemeInputType: '//div[@class="theme-editor-option"]/div[@class="theme-editor-label" and text()="ThemeType"]//following-sibling::div//input',
            ThemeSelectOption: '//div[@class="filterOption"]/span',
            MatrixContainer: '//div[contains(@class,"matrix-container")]',
            HeaderContainer: '//div[contains(@id,"header-container")]',
            RegionHeading: '//span[@aria-label="Expand/Collapse"]//ancestor::div[@role="cell"]/div',
            NonHeading: '//div[@class="sticky-columns"]//span[@role="cell"]/parent::div/span[position()=1 and @role="cell"]//ancestor::div[@role="cell"]/div',
            CompactLineCells: '//div[@class="sticky-columns"]//div[@role="cell"]/div',
            statusBardisabled: 'div.statusBar.footer_Disabled',
            statusBarenabled: 'div.statusBar.footer_Enabled',
            ChildCount: '//span[@aria-label="Expand/Collapse"]/following-sibling::span/span',
            StatusBarTotal: 'div.statusbar_RowTotal span',
            Celllist: '//div[starts-with(@id,"table-row")]/parent::div',
        },
        Header_Footer:{
            HeaderEditor: locate('div.ql-editor'),
            FooterEditor: locate('div.footerEditor div.ql-editor'),
            EnableHeader: locate('div[title="Enable Header"]'),
            DisableHeader: locate('div[title="Disable Header"]'),
            EnableFooter: locate('div[title="Enable Footer"]'),
            FooterLabel: locate('span.footerLabelTag'),
            DisableFooter: locate('div[title="Disable Footer"]'),
            PageNumberdropdown: locate('div#pageNumber div.ms-Icon.ms-Icon--ChevronDownSmall'),
            PageXofY: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Page X of Y'),
            PageXbyY: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Page X/ Y'),
            PageX: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Page X').at(3),
            PageXofYeditor: locate('div.ql-editor span').withText('[page:pageXofY]'),
            FooterPageXofYeditor: locate('div.footerEditor div.ql-editor span').withText('[page:pageXofY]'),
            PageXbyYeditor: locate('div.ql-editor span').withText('[page:pageXbyY]'),
            FooterPageXbyYeditor: locate('div.footerEditor div.ql-editor span').withText('[page:pageXbyY]'),
            PageXeditor: locate('div.ql-editor span').withText('[page:pageX]'),
            FooterPageXeditor: locate('div.footerEditor div.ql-editor span').withText('[page:pageX]'),
            PageXofYDelete: {xpath:'//span[text()="[page:pageXofY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FooterPageXofYDelete: {xpath:'//div[contains(@class,"footerEditor")]//span[text()="[page:pageXofY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            PageXbyYDelete: {xpath:'//span[text()="[page:pageXbyY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FooterPageXbyYDelete: {xpath:'//div[contains(@class,"footerEditor")]//span[text()="[page:pageXbyY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            PageXDelete: {xpath:'//span[text()="[page:pageX]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FooterPageXDelete: {xpath:'//div[contains(@class,"footerEditor")]//span[text()="[page:pageX]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            DateTimedropdown: locate('div#dateTime div.ms-Icon.ms-Icon--ChevronDownSmall'),
            DateTimeType: 'div.sub-menu-icon-display span.toolbar-icon-title',
            DateTimeMMDDYYYY: locate('div.ql-editor span').withText('[date:MM DD,YYYY]'),
            FooterDateTimeMMDDYYYY: locate('div.footerEditor div.ql-editor span').withText('[date:MM DD,YYYY]'),
            DateTimeSlashMMDDYYYY: locate('div.ql-editor span').withText('[date:MM/DD/YYYY]'),
            FooterDateTimeSlashMMDDYYYY: locate('div.footerEditor div.ql-editor span').withText('[date:MM/DD/YYYY]'),
            DateTimeHyphenMMDDYYYY: locate('div.ql-editor span').withText('[date:YYYY-MM-DD]'),
            FooterDateTimeHyphenMMDDYYYY: locate('div.footerEditor div.ql-editor span').withText('[date:YYYY-MM-DD]'),
            DateTimeMMDDYYYYDelete: {xpath:'//span[text()="[date:MM DD,YYYY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FooterDateTimeMMDDYYYYDelete: {xpath:'//div[contains(@class,"footerEditor")]//span[text()="[date:MM DD,YYYY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            DateTimeSlashMMDDYYYYDelete: {xpath:'//span[text()="[date:MM/DD/YYYY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FooterDateTimeSlashMMDDYYYYDelete: {xpath:'//div[contains(@class,"footerEditor")]//span[text()="[date:MM/DD/YYYY]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            DateTimeHyphenMMDDYYYYDelete: {xpath:'//span[text()="[date:YYYY-MM-DD]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FooterDateTimeHyphenMMDDYYYYDelete: {xpath:'//div[contains(@class,"footerEditor")]//span[text()="[date:YYYY-MM-DD]"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            InsertImage: locate('div[title="Insert Image"]'),
            Imageuploadicon: locate('div.image-upload-container div.ms-Icon.ms-Icon--Upload.upload-icon'),
            ImageCanvas: locate('div.canvas-image'),
            ImageCanvasFooter: locate('div.footerEditor div.canvas-image'),
            ImageDelete: {xpath:'//div[contains(@class,"canvas-image")]//following-sibling::div[contains(@class,"deleteButton")]'},
            ImageDeleteFooter: {xpath:'//div[contains(@class,"footerEditor")]//div[contains(@class,"canvas-image")]//following-sibling::div[contains(@class,"deleteButton")]'},
            Fielddropdown: locate('div#dataFields div.ms-Icon.ms-Icon--ChevronDownSmall'),
            FieldName: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Data Selection'),
            FieldNameValue: 'div.ql-editor span',
            FieldNameValueFooter: 'div.footerEditor div.ql-editor span',
            FieldDelete: {xpath:'//div[contains(@class,"ql-editor")]//span[contains(text(),"America")]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            FieldValue: locate('div.sub-menu-icon-display span.toolbar-icon-title').withText('Field Value'),
            FieldValueValue: 'div.sub-menu-icon-display span.toolbar-icon-title',
            TextBox: locate('div[title="Insert Text"]'),
            TextBoxeditor: locate('div.ql-editor span').withText('Sample'),
            FooterTextBoxeditor: locate('div.footerEditor div.ql-editor span').withText('Sample'),
            TextBoxDelete:{xpath:'//span[text()="Sample"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            TextBoxDeleteFooter:{xpath:'//div[contains(@class,"footerEditor")]//span[text()="Sample"]//ancestor::div[contains(@class,"quill quill-container")]/following-sibling::div[contains(@class,"deleteButton")]'},
            Bold: locate('span#fontBold-b'),
            italic: locate('span#fontItalic-b'),
            Underline: locate('span#fontUnderline-b'),
            fontDropdown: locate('#scroll-container div.toolbar-select div.ms-Icon.ms-Icon--ChevronDown.downArrow').at(1),
            fontSizeDropdown: locate('#scroll-container div.toolbar-select div.ms-Icon.ms-Icon--ChevronDown.downArrow').at(2),
            fillcolorDropdown: locate('i.icon.icon--ChevronDown.icons8-ChevronDown.bf-er-colorpicker-icon-dropdown').at(1),
            fillcolorElement: '(//div[contains(@class,"ql-editor")])[index]//ancestor::div[contains(@class,"quill quill-container")]/parent::div',
            fillcolorElementFooter: '(//div[contains(@class,"footerEditor")]//div[contains(@class,"ql-editor")])[index]//ancestor::div[contains(@class,"quill quill-container")]/parent::div',
            fontcolorDropdown: locate('i.icon.icon--ChevronDown.icons8-ChevronDown.bf-er-colorpicker-icon-dropdown').at(2),
            resettodefault: locate('div.bf-er-colopicker-Palette-reset'),
            HeaderParaSpan: '(//div[@class="ql-editor"])[index]//p/*[contains(@style,"font")]',
            FooterParaSpan: '(//div[contains(@class,"footerEditor")]//div[@class="ql-editor"])[index]//p/*[contains(@style,"font")]',
            HeaderParaStrong: '(//div[@class="ql-editor"])[index]//p//strong',
            FooterParaStrong: '(//div[contains(@class,"footerEditor")]//div[@class="ql-editor"])[index]//p//strong',
            HeaderParaItalic: '(//div[@class="ql-editor"])[index]//p//em',
            FooterParaItalic: '(//div[contains(@class,"footerEditor")]//div[@class="ql-editor"])[index]//p//em',
            HeaderParaUnderline: '(//div[@class="ql-editor"])[index]//p//u',
            FooterParaUnderline: '(//div[contains(@class,"footerEditor")]//div[@class="ql-editor"])[index]//p//u',
            fontname: '#fontSizeIncrement-b span',
            fontsize: '#fontSizeIncrement-d span',
            HeaderEditordiv: '(//div[contains(@class,"ql-editor")])[index]//ancestor::div[contains(@class,"quill quill-container")]',
            FooterEditordiv: '(//div[contains(@class,"footerEditor")]//div[contains(@class,"ql-editor")])[index]//ancestor::div[contains(@class,"quill quill-container")]',
            
        }

    },
    SettingsTab: {
        PageSetup:{

        },
        Editing:{

        },
        Appearance:{

        },
        Matrix:{

        }

    },
    ExportTab: {
        PageOrder:{

        },
        Export:{

        },
        Layout:{

        },
        Custom:{

        },
        Create:{

        }

    },
    CustomizeTab:{
        Type:{

        },
        Marker:{

        },
        Label:{

        }
    },
    ShortcutIcons:{
        AutoFit:{

        },
        ManageColumns:{

        },
        Reset:{

        }

    }
    




}