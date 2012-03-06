Ext.define('LSP.view.larkc_pharm_by_target.PharmEnzymeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmEnzymeForm',

    requires: [
        'LSP.view.tree_selector_forms.EnzymeTreeForm'
    ],                         
    closable: true,
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'container',
                height: 34,
                name: 'form_fields',
          //      width: 600,
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'displayfield',
                        name: 'enzyme_family',
                        margin: '5 5 5 5',
                        width: 688,
                        value: 'No enzyme class selected - press button ->',
                        fieldLabel: 'Enzyme family class',
                        labelWidth: 130
                    },
                    {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Browse EC codes',
                        action: 'enz_tree'
                    },
                    {
                        name: 'enz_name',
                        xtype: 'hidden',
                        value: ''
                    },
                    {
                        name: 'ec_number',
                        xtype: 'hidden',
                        value: ''
                    }
                ]
            },
//             {
//                 xtype: 'fieldset',
//           //      width: 600,
//                 layout: {
//                     type: 'fit'
//                 },
//                 title: 'Variables',
//                 items: [
//                     {
//                         xtype: 'fieldcontainer',
//                         height: 31,
//                         width: 601,
//                         layout: {
//                             type: 'column'
//                         },
//                         fieldLabel: 'Filter by activity (mM)',
//                         labelWidth: 125,
//                         items: [
//                             {
//                                 xtype: 'numberfield',
//                                 name: 'min_filter',
//                                 margin: '0 5 0 5',
//                                 padding: '',
//                                 width: 190,
//                                 fieldLabel: 'exclude below (<)',
//                                 labelWidth: 110,
//                                 autoStripChars: true,
//                                 maxValue: 1000000,
//                                 minValue: 0.00000,
//                                 decimalPrecision: 6,
//                                 value: 0.00000,
//                                 allowDecimals: true
//                             },
//                             {
//                                 xtype: 'numberfield',
//                                 name: 'max_filter',
//                                 margin: '0 5 0 5',
//                                 width: 190,
//                                 fieldLabel: 'exclude above (>)',
//                                 labelWidth: 110,
//                                 maxValue: 10000000,
//                                 minValue: 0.000001,
//                                 decimalPrecision: 6,
//                                 value: 1000000,
//                                 allowDecimals: true
//                             }
//                         ]
//                     },
//                     {
//                         xtype: 'checkboxgroup',
//                         height: 34,
//                         width: 600,
//                         fieldLabel: 'Species',
//                         items: [
//                             {
//                                 xtype: 'checkboxfield',
//                                 boxLabel: 'Human',
//                                 inputValue: 'Homo+sapiens',
//                                 name: 'species_1'
//                             },
//                             {
//                                 xtype: 'checkboxfield',
//                                 boxLabel: 'Mouse',
//                                 inputValue: 'Mus+musculus',
//                                 name: 'species_2'
//                             },                            
//                             {
//                                 xtype: 'checkboxfield',
//                                 boxLabel: 'Rat',
//                                 inputValue: 'Rattus+norvegicus',
//                                 name: 'species_3'
//                             }
//                         ]
//                     }
//                 ]
//            },
                   {
                       xtype: 'button',
                       action: 'query',
                       itemId: 'submitEnzymePharm_id',
                       text: 'Start search...'
                   },                   
			            {
                    xtype: 'dynamicgrid3',
                    title: 'Inhibitors for enzyme class: no selection yet',
                    gridBaseTitle: 'Inhibitors for enzymes in class: ',
                    readUrl: '/core_api_calls/pharm_enzyme_fam.json',
                    flex: 1
                    }  
        ];                  
        me.callParent(arguments);
    }
});