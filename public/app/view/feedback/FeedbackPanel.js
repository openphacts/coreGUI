/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 24/04/2012
 * Time: 12:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.feedback.FeedbackPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.FeedbackPanel',
    layout:'anchor',
    bodyCls:'fb-panel',
    border:false,

    items:[
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer1'
        },
        {
            xtype:'displayfield',
            anchor:'100%',

            value:'Open PHACTS Explorer <a href="http://www.openphacts.org/explorer" target="_blank">homepage</a>',
            fieldCls:'fb-message',
            itemId:'homepage'
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer2'
        },
        {
            xtype:'displayfield',
            fieldCls:'fb-message',
            value:'Watch <a href="http://www.openphacts.org/tutorials" target="_blank">tutorials</a>',
            itemId:'tutorial'
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer3'
        },
        {
            xtype:'displayfield',
            anchor:'100%',
            itemId:'fpUserMessage1',
            fieldCls:'fb-message',
            //fieldCls:'fb-message',
            //value:'Please provide your feedback here. Unfortunately we can\'t promise to respond to every piece of feedback but we will read them.'
            value: 'Give us <a href="http://www.openphacts.org/explorer/160" target="_blank">feedback</a>.'
        },
        {
            xtype:'displayfield',
            fieldCls:'fb-message',

            value:'Please note that we read everything, but can\'t always respond.',
            itemId:'feedbackText'
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer4'
        },
        {
            xtype:'displayfield',
            fieldCls:'fb-message',
            value:'See <a href="http://www.openphacts.org/known-issues-with-beta-open-phacts-explorer" target="_blank">known issues</a>',
            itemId:'issues'
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer5'
        },
        {
            xtype:'displayfield',
            anchor:'100%',
            itemId:'fbVersionId',
            fieldCls:'fb-message',

            value: 'version: ' + explorer_version
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer6'
        }/*,     OLD INLINE EXPLORE FEEDBACK MECHANISM
        {
            xtype:'textfield',
            anchor:'100%',
            vtype:'email',
            cls:'fb-email',
            labelAlign:'top',
            itemId:'fpUserEmail',
            fieldLabel:'Your contact email',
            allowBlank:false

        },

        {
            xtype:'textarea',
            anchor:'100% 60%',
            labelAlign:'top',
            itemId:'fpFeedbackText',
            fieldLabel:'Your feedback',
            allowBlank:false
        },
        {
            xtype:'button',
            cls:'fb-button',
            text:'Submit',
            handler:function () {

                var userEmailField = Ext.ComponentQuery.query('#fpUserEmail')[0];
                if (!userEmailField.isValid()) {
                    Ext.Msg.show({
                        title:'Missing Information',
                        msg:'Please supply a contact email address',
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    return;
                }
                var feedbackTextArea = Ext.ComponentQuery.query('#fpFeedbackText')[0];
                if (!feedbackTextArea.isValid()) {
                    Ext.Msg.show({
                        title:'Missing Information',
                        msg:'Please supply some feedback text',
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    return;
                }
                var feedbackData = Ext.create('LSP.model.Feedback', {
                    userEmail:userEmailField.getValue(),
                    feedbackText:feedbackTextArea.getValue(),
                    versionNumber: explorer_version,
                    technicalInfo:Ext.History.getToken()
                });
                var fp = this.up('FeedbackPanel');
                fp.setLoading(true);
                Ext.Ajax.request({
                    url:'feedback.json',
                    method:'POST',
                    params:feedbackData.data,
                    success:function (response) {
                        fp.setLoading(false);
                        var jsonObj = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title:'Feedback sent',
                            msg:jsonObj.message,
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });

                    },
                    failure:function (response) {
                        fp.setLoading(false);
                        Ext.Msg.show({
                            title:'Error',
                            msg:'Your feedback could not be sent',
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });
                    }
                });
            }
        } */
    ]
});
