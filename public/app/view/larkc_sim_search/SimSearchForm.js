Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.SimSearchForm',
    requires: [
        'LSP.view.mol_editor_forms.KetcherForm'
    ],
    closable: true,
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
     initComponent: function() {
    
        this.items = [
                   {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                height: '100%',
                style: 'background-color: #fff;',
                items: [                      
                      {
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                      },
                      {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                      },
                      {
                        name: 'molfile',
                        xtype: 'hidden',
                        value: ''
                      },
                      {
                      xtype: 'fieldcontainer',
                      layout: 'column',
                      collapsible: false,
                      defaults: {anchor: '100%'},
                    //  layout: 'anchor',
                      items :[                         
                         {
                          xtype: 'textfield',
                          name: 'smiles',
                          emptyText: 'Enter SMILES here or use the molecular editor to draw structure - click button ->',
                          fieldLabel: 'Search for compounds similar to SMILES',
                          labelWidth: 230,                        
                          width: 650
                        },
                        {
                          xtype: 'button',
                          action: 'ketcher_editor',
                          text: 'Draw structure'
                         }
                         ]
                      },
                      {                      
                          xtype: 'radiogroup',
                          fieldLabel: 'Search type',
                          items: [
                              {boxLabel: 'Exact structure search', name: 'search_type', inputValue: 1, checked: true},
                              {boxLabel: 'Substructure seach', name: 'search_type', inputValue: 2},
                              {boxLabel: 'Structural similarity search', name: 'search_type', inputValue: 3}                              
                          ]
                      },
                      {
                          xtype: 'button',
                          action: 'query',
                          text: 'Start search'
                      },
                      {
                    xtype: 'dynamicgrid3',
                    title: 'Structure search results',
                    gridBaseTitle: 'Structure search results',                    
                    flex: 1,
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                             xtype: 'button',
                            iconCls: 'icon-mol_dv',
                            text: 'Data View',
                            action: 'data_view'
                        }]
                    }]
                    } 
                      ]
                  }           
                ];
                
        this.callParent(arguments);
    }    
});
