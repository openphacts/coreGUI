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
            anchor:'100%',
            itemId:'fpUserMessage',
            fieldCls:'fb-message',
            value:'Please provide your feedback here. Unfortunately we can\'t promise to respond to every piece of feedback but we will read them.'
        },

        {
            xtype:'textfield',
            anchor:'100%',
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
                    technicalInfo:Ext.History.getToken()
                });
                Ext.Ajax.request({
                    url:'feedback.json',
                    method:'POST',
                    params:feedbackData.data,
                    success:function (response) {
                        var jsonObj = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title:'Feedback sent',
                            msg:jsonObj.message,
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });

                    },
                    failure:function (response) {
                        Ext.Msg.show({
                            title:'Error',
                            msg:'Your feedback could not be sent',
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });
                    }
                });
            }
        }
    ]
});