/*########################################################################################
#  
#  Copyright H. Lundbeck A/S
#  This file is part of LSP4All.
#  
#  LSP4All is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or (at
#  your option) any later version.
#  
#  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE 
#  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\" 
#  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT  
#  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
#  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
#  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
#  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT 
#  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM 
#  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
#  
#  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE 
#  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
#  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
#  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
#  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO 
#  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE 
#  POSSIBILITY OF SUCH DAMAGES.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
#  
########################################################################################*/

Ext.define('LSP.view.larkc_pharm_by_target.PharmEnzymeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PharmEnzymeForm',

    requires: [
        'LSP.view.tree_selector_forms.EnzymeTreeForm'
    ],                         
    closable: true,
    
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
                        width: 488,
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
                ]
            },
            {
                xtype: 'fieldset',
          //      width: 600,
                layout: {
                    type: 'auto'
                },
                title: 'Variables',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        height: 31,
                        width: 601,
                        layout: {
                            type: 'column'
                        },
                        fieldLabel: 'Filter by activity (mM)',
                        labelWidth: 125,
                        items: [
                            {
                                xtype: 'numberfield',
                                name: 'min_filter',
                                margin: '0 5 0 5',
                                padding: '',
                                width: 190,
                                fieldLabel: 'exclude below (<)',
                                labelWidth: 110,
                                autoStripChars: true,
                                maxValue: 1000000,
                                minValue: 0.00000,
                                decimalPrecision: 6,
                                value: 0.00000,
                                allowDecimals: true
                            },
                            {
                                xtype: 'numberfield',
                                name: 'max_filter',
                                margin: '0 5 0 5',
                                width: 190,
                                fieldLabel: 'exclude above (>)',
                                labelWidth: 110,
                                maxValue: 10000000,
                                minValue: 0.000001,
                                decimalPrecision: 6,
                                value: 1000000,
                                allowDecimals: true
                            }
                        ]
                    },
                    {
                        xtype: 'checkboxgroup',
                        height: 34,
                        width: 600,
                        fieldLabel: 'Species',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Human',
                                inputValue: 'Homo+sapiens',
                                name: 'species_1'
                            },
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Mouse',
                                inputValue: 'Mus+musculus',
                                name: 'species_2'
                            },
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Rat',
                                inputValue: 'Rattus+norvegicus',
                                name: 'species_3'
                            }
                        ]
                    }
                ]
            },
                   {
                       xtype: 'button',
                       action: 'query',
                       text: 'Start search'
                   },
			             pharenz_grid = Ext.widget('dynamicgrid2')
        ];
        pharenz_grid.setTitle('Inhibitors for enzyme class: no selection yet');
       // pharenz_grid.setHeight('70%');                  
        me.callParent(arguments);
    }
});