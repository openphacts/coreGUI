Ext.define('LSP.view.concept.SummeryForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SummeryForm',
    closable: true,
    
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'container',
                height: '6%',
                margin: '5 5 5 5',
                name: 'form_fields',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'combo',
                        valueField:'concept',
                      	store:  Ext.create('Ext.data.Store',{
                                      fields: [
                                        {type: 'string', name: 'object'},
                                        {type: 'string', name: 'concept'}
                                      ],
                                      proxy: {
                                          type: 'ajax',
                                          api: {
                                              read: 'sparql_endpoint/concept_name_lookup.json'
                                          },
                                          reader: {
                                              type: 'json',
                                              root: 'objects',
                                              totalProperty: 'totalCount'
                                          }
                                      }
                                  }),
                      	queryMode: 'remote',
                      	displayField: 'object',
                      	minChars:4,
                      	hideTrigger:true,
                      	forceSelection:true,
                      	typeAhead:true,
                        emptyText: 'Start typing...',
                        name: 'concept_uuid',
                        margin: '5 5 5 5',
                        width: 800,
                        fieldLabel: 'Concept',
                        labelWidth: 120,
                        listConfig: {
                          loadingText: 'Searching...',
                          emptyText: 'No matching concepts found.',
                        },
                        listeners: {
                            select: function(combo, selection) {
                            var post = selection[0];
                              if (post) {
                                 var fields = this.up().items.items;
                                 fields.forEach(function(item) { if(item.name == 'concept_uuid'){item.setValue(post.data.concept);}});
                              }
                            }
                        }
                      },
                    {
                        xtype: 'button',
                        padding: '5 5 5 5',
                        text: 'Look up',
                        action: 'look_up_concept'
                    },
                    {
                        name: 'utf8',
                        xtype: 'hidden',
                        value: '&#x2713;'
                    },
                    {
                        name: 'authenticity_token',
                        xtype: 'hidden',
                        value: $$('meta[name=csrf-token]')[0].readAttribute('content')
                    }
                ]},
                  object_grid = Ext.widget('dynamicgrid2'),
                  subject_grid = Ext.widget('dynamicgrid2')
        ];
        object_grid.setTitle('Concept Properties');
        object_grid.setHeight('47%'); 
        subject_grid.setTitle('Concept Relations');
        subject_grid.setHeight('47%'); 
        me.callParent(arguments);
    }
});