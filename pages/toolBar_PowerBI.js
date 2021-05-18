const { I } = inject();

module.exports = {

    HomeTab: {
        Common: {
            displaygrid: 'div.mrx-grid__will_change_auto',
            Home_header: '#header-container li.tab-list-item span',
        },
        Style: {

            //Home Style Locators
            bold: '#scroll-container .ms-Icon.ms-Icon--Bold.selection-icon',
            italic: '#scroll-container .ms-Icon.ms-Icon--Italic.selection-icon',
            fontDropdown: locate('#scroll-container div.bf-ui-flex.font-select div.ms-Icon.ms-Icon--ChevronDown.downArrow').at(1),
            fontSizeDropdown: '#scroll-container div.bf-ui-flex.font-size-select div.ms-Icon.ms-Icon--ChevronDown.downArrow',
            //faceSegui: '#fontSizeIncrement-b  option[value=""Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif"]',
            faceSegui: locate('#fontSizeIncrement-b  option').withText('Segoe UI'),
            faceTahoma: locate('#fontSizeIncrement-b option').withText('Arial'),
            faceTimesNewRoman: '#fontSizeIncrement-b option[value="Times New Roman"]',
            faceCorbel: '#fontSizeIncrement-b option[value="Corbel"]',
            faceCourierNew: '#fontSizeIncrement-b option[value="Courier New"]',
            faceGeorgia: '#fontSizeIncrement-b option[value="Georgia"]',
            size16: '#fontSizeIncrement-d option[value="16"]',
            size14: '#fontSizeIncrement-d option[value="14"]',
            size12: '#fontSizeIncrement-d option[value="12"]',
            sizeIncrement: '#fontSizeIncrement-b',
            sizeDecrement: '#fontSizeDecrement-b',
            bgColorDropdown: '#scroll-container [class^="icon icon--ChevronDown icons8-ChevronDown bf-er-co"]',
            bgColorBlue: '#scroll-container svg.bf-rx-colorpicker-svg g:nth-child(1) :nth-child(3)',
            bgColorWhite: '#scroll-container svg.bf-rx-colorpicker-svg g:nth-child(1) :nth-child(1)',
            colorDropdown: locate('#scroll-container [class^="icon icon--ChevronDown icons8-ChevronDown bf-er-co"]').at(1),
            headerOrientationdrop: locate('#headerOrientation-d'),
            fillcolorDropdown: locate('i.icon.icon--ChevronDown.icons8-ChevronDown.bf-er-colorpicker-icon-dropdown').at(1),
            fontcolorDropdown: locate('i.icon.icon--ChevronDown.icons8-ChevronDown.bf-er-colorpicker-icon-dropdown').at(2),
            resettodefault: locate('div.bf-er-colopicker-Palette-reset'),
            headerOrientationHorizontal: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal span.ms-Icon.ms-Icon--TextRotateHorizontal.headerLabelOrient'),
            headerOrientationDiagonalTopBottom: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal span.ms-Icon.ms-Icon--TextRotate90Degrees.bottomRight.headerLabelOrient'),
            headerOrientationVertical: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal span.ms-Icon.ms-Icon--TextRotate90Degrees.top.headerLabelOrient'),
            headerOrientationDiagonalBottomTop: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal span.ms-Icon.ms-Icon--TextRotate90Degrees.topRight.headerLabelOrient'),
           
            
        },

        //Home Format Locators
        Format: {            
            leftalign: locate('#scroll-container #labelAlignLeft-b'),
            centeralign: locate('#scroll-container #labelAlignCenter-b'),
            rightalign: locate('#scroll-container #labelAlignRight-b'),

            topalign: locate('#scroll-container #labelAlignTop-b'),
            middlealign: locate('#scroll-container #labelAlignMiddle-b'),
            bottomalign: locate('#scroll-container #labelAlignBottom-b'),

            showHide: locate('#scroll-container div.compound-button.showHide_icon div#showHide-b'),
            percentage: locate('#scroll-container #convertPercentage-b'),
            prefixsuffix: locate('#scroll-container #prefixSuffixModal-m'),
            valueprefix: locate('#ibcsChart div.prefix-value input'),
            valuesuffix: locate('#ibcsChart div.suffix-value input'),
            prefixsuffixApply: locate('#ibcsChart div.ib_footer div').withText('Apply'),
            prefixsuffixCancel: locate('#ibcsChart div.ib_footer div').withText('Cancel'),
            scalingdropdown: locate('#scalingFactor span.ms-Icon.ms-Icon--ChevronDownSmall.dropdown-chevron'),
            scalingOption: locate('div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title'),
            increaseDecimal: locate('#ibcsChart #increaseDecimal-b'),
            decreaseDecimal: locate('#ibcsChart #decreaseDecimal-b'),
            increaseIndent: locate('#ibcsChart span#rightIndent-b'),
            decreaseIndent: locate('#ibcsChart span#leftIndent-b'),
            numberFormattingdropdown: locate('#ibcsChart span#numberFormatting-b'),
            numberFormattingOptions: '#ibcsChart div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title',
           
            borderdropdown: locate('#ibcsChart div.toolbar-column span#lineStyle-d'),
            borderdefaultline: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="defaultLine"]'),
            borderoverlineSolid: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="overlineSolid"]'),
            borderunderlineSolid: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="underlineSolid"]'),
            borderoverlineDouble: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="overlineDouble"]'),
            borderunderlineOverline: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="underlineOverline"]'),
            borderleft: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="left"]'),
            borderright: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="right"]'),
            borderlineAll: locate('div.bf-ui-flex.dropdownOption-toolbar.extrenal.line-style-dropdown span[aria-label="lineAll"]'),
        },
        Visualization: {
            barChartdropdown: locate('#ibcsChart div.toolbar-column span#bulletBarChart-b'),
            barChartIntegrated: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Integrated'),

            barChart: '#ibcsChart #barChart-b',
            waterflowChart: '#ibcsChart #waterflowChart-b',
            pinChartDropDown: '#ibcsChart div.toolbar-column span#pinChart-b',
            pinChart: locate('#ibcsChart div.sub-menu-icon-display span').withText('Pin'),
            lollipopChart: locate('#ibcsChart div.sub-menu-icon-display span').withText('Lollipop'),

            waterfallChartdropdown: '#ibcsChart div.toolbar-column span#waterfallOptions-d',
            waterfallChartRegular: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Regular'),
            waterfallChartContinuous: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Continuous'),

            bulletChartdropdown: '#ibcsChart div.toolbar-column span#bulletButton-b',
            bulletChartSimple: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Simple'),
            bulletChartCustom: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Custom'),

            sparklinesChartdropdown: '#ibcsChart div.toolbar-column div#sparklineType',
            LineChart: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Line'),
            AreaChart: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Area'),
            ColumnChart: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Column'),
            WinLossChart: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Win / Loss'),



            waterfallChart: '#ibcsChart #waterfallChart-b',
            sparklineChart: '#ibcsChart #sparkLineOptions-d',
            barChart_svg_g: '#ibcsChart div.table-row-1.table-col-1 svg g',
            barChart_svg_rect_chart: '#ibcsChart div.table-row-1.table-col-1 svg rect',
            barChart_svg_text_chart: '#ibcsChart div.table-row-1.table-col-1 svg text',
            showAsNumber: '#ibcsChart #showAsNumbers-b',
            waterflowChart_svg_line: '#ibcsChart div.table-row-1.table-col-1 svg line',
            PinChart_svg_line: '#ibcsChart div.table-row-1.table-col-1 svg line',
            PinChart_svg_circle: '#ibcsChart div.table-row-0.table-col-0 svg circle',


        },
        Column: {
            dataTotal: locate('#ibcsChart #totals-d'),
            dataTotalSubMenu: locate('#ibcsChart div.toolbar.dropdownOption-toolbar div span'),
            dataTopsubMenu: locate('#ibcsChart div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title').withText('Top'),
            dataBottomsubMenu: locate('#ibcsChart div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title').withText('Bottom'),
            dataClearsubMenu: locate('#ibcsChart div.toolbar.dropdownOption-toolbar div span.toolbar-icon-title').withText('Clear'),
            
            
            Totaldropdown: '#ibcsChart div span#totals-d',
            InsertGrantTotalColumn: locate('#ibcsChart div.sub-menu-icon-display.active label.bf-ui-form-switch.form-switch').at(2),
            Enablerowsubtotalsplit: locate('#ibcsChart div.sub-menu-icon-display.active label.bf-ui-form-switch.form-switch').at(3),
            Positions: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Position(s)'),
            
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

            Sortdropdown: locate('#ibcsChart div span#sort-d'),
            SortAscending: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Ascending'),
            SortDescending: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Descending'),
            SortClear: locate('#ibcsChart div.toolbar.dropdownOption-toolbar span.toolbar-icon-title').withText('Clear'),

            Filterdropdown: locate('#ibcsChart div span#filter-d'),
            AddFilter: locate('#ibcsChart span.queryBuilder-footer-title').withText('Add Filter'),
            FilterField: locate('#ibcsChart div.dropdown-root.rule-fields'),
            FilterFieldValue: locate('#ibcsChart div.dropdown-root.rule-fields div.dropdown-menu  div.dropdown-option span'),
            FilterOperator: locate('#ibcsChart div.dropdown-root.rule-operators'),
            FilterOperatorValue: locate('#ibcsChart div.dropdown-root.rule-operators div.dropdown-menu  div.dropdown-option span'),
            FilterValue: locate('#ibcsChart div.bf-ui-form-auto-complete.form-auto-complete.rule-value'),
            FilterValueSelect: locate('#ibcsChart div.bf-ui-form-auto-complete.form-auto-complete.rule-value ul li span'),
            FilterClear: locate('#ibcsChart div button.ruleGroup-clearRule span'),
            FilterDelete: locate('#ibcsChart div button.rule-remove'),

            AdvancedFilter: locate('#ibcsChart span.queryBuilder-footer-title').withText('Advanced'),
            Advanced_Filter_Apply: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Apply'),
            Advanced_Filter_AddGroup: locate('#ibcsChart button.ruleGroup-addGroup span'),
            Advanced_Filter_RuleCombinatorAnd: locate('#ibcsChart span.ruleGroup-combinators.betweenRules label.radio span.radio-title').withText('And'),
            Advanced_Filter_RuleCombinatorOr: locate('#ibcsChart span.ruleGroup-combinators.betweenRules label.radio span.radio-title').withText('Or'),
            Advanced_Filter_ResetAll: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Reset all'),

            TopN: locate('#ibcsChart div#ranking-b'),
            TopNtopbottom: locate('#ibcsChart div.ranking-rule-topbottom div.dropdown-control'),
            TopNtopbottomValue: locate('#ibcsChart div.ranking-rule-topbottom div.dropdown-menu span'),
            TopNInput: locate(' #ibcsChart input.ranking-rule-topNInput'),
            TopNType: locate('#ibcsChart div.ranking-rule-topNType div.dropdown-control'),
            TopNTypeValue: locate('#ibcsChart div.ranking-rule-topNType div.dropdown-menu span'),
            TopNField: locate('#ibcsChart div.ranking-rule-topNField div.dropdown-control'),
            TopNFieldValue: locate('#ibcsChart div.ranking-rule-topNField div.dropdown-menu span'),
            TopN_Apply: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Apply'),
            TopN_ResetAll: locate('div.ib_footer.ib_preSuffix div[role="button"]').withText('Reset all'),
            TopNClose: locate('div span.ms-Icon.ms-Icon--ChromeClose.closePopup'),
        },
        Focus: {
            CommentAdd: locate('div.compound-button.comment-dropdown div.ms-Icon.ms-Icon--CommentAdd.compound-button-icon'),
            CommentName: locate('div.modal-user-name.comment-list input'),
            CommentInput: locate('div.modal-editor div.ql-editor p'),
            CommentColorlist: locate('div.bf-ui-flex.colors-list div.colors-select div.color-div'),
            CommentSave: locate('div.react-tiny-popover-container button').withText('Save'),
            CommentDelete: locate('div.comment-actions div.ms-Icon.ms-Icon--Delete'),
            CommentEdit: locate('div.comment-actions div.ms-Icon.ms-Icon--Edit'),
            Commentdropdown: locate('#ibcsChart div#comment'),
            CommentFootNoteToggle: {xpath:'//*[@id="ibcsChart"]//span[text()="Footnote"]/preceding-sibling::label'},
            CommentColumnToggle: {xpath:'//*[@id="ibcsChart"]//span[text()="Comment column"]/preceding-sibling::label'},
            CommentHideAll: {xpath:'//*[@id="ibcsChart"]//span[text()="Hide All Comments"]/preceding-sibling::label'},
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