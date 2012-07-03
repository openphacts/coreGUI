/*
Copyright(c) 2011 Company Name
*/
Ext.Loader.setConfig({enabled:true});Ext.create("Ext.app.Application",{name:"LSP",appFolder:"app",controllers:["Users","grids.DynamicGrid","Grid","NavigationTree","Queryform","SimSearchForm","CmpdByNameForm","TargetByNameForm","PharmByTargetNameForm","PharmByCmpdNameForm","PharmEnzymeForm","SummeryForm","Settings","pmidTextMiningHitsForm","pathwayByCompoundForm","pathwayByProteinForm"],autoCreateViewport:true,launch:function(){Ext.Loader.setConfig({enabled:true,paths:{CS:"chemspider/lib"}})}});
