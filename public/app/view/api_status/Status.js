Ext.define('LSP.view.api_status.Status', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Status',
    closable: true,
    header: false,
    layout:'fit',
    border:false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'hbox'
            },
            //style: 'background-color: #fff;',
            items: [{
                     xtype: 'label',
                     text: 'Linked Data API',
                     margin: '0 0 0 10'
                   }, {
        xtype:'image',
        name:'lda_image',
        itemId:'status_form_lda_image',
        width:15,
        height:15,
        hidden: false,
        src:'./assets/question_mark.png'
    }]}, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [{
        xtype: 'label',
        text: 'Concept Wiki',
        margin: '0 0 0 10'
    }, {
        xtype:'image',
        name:'cw_image',
        itemId:'status_form_cw_image',
        width:15,
        height:15,
        hidden: false,
        src:'./assets/question_mark.png'
    }]}, {
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [{
        xtype: 'label',
        text: 'Chemspider',
        margin: '0 0 0 10'
    }, {
        xtype:'image',
        name:'cs_image',
        itemId:'status_form_cs_image',
        width:15,
        height:15,
        hidden: false,
        src:'./assets/question_mark.png'
    }]},{
            xtype: 'container',
            margin: '0 5 5 5',
            name: 'form_fields',
            layout: {
                type: 'hbox'
            },
            style: 'background-color: #fff;',
            items: [{
        xtype: 'label',
        text: 'IMS',
        margin: '0 0 0 10'
    }, {
        xtype:'image',
        name:'ims_image',
        itemId:'status_form_ims_image',
        width:15,
        height:15,
        hidden: false,
        src:'./assets/question_mark.png'
    }]}]
});
