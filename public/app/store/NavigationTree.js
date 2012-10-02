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
Ext.define('LSP.store.NavigationTree', {
    extend:'Ext.data.TreeStore',
    // proxy:{
    //         type:'ajax',
    //         url:'application_modules.json'
    //     }
    root:{
        expanded:true,
        children:[
            {
                xtype:"",
                home:"",
                leaf:false,
                text:"Compound",
                cls:"folder",
                children:[
                    {
                        xtype:"CmpdByNameForm",
                        home:"Compound by name",
                        leaf:true,
                        text:"Compound by name",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"SimSearchForm",
                        home:"Compound Structure Search",
                        leaf:true,
                        text:"Compound by structure",
                        cls:"file",
                        application_type:'grid'
                    }

                ]
            },
            {
                xtype:"",
                home:"",
                leaf:false,
                text:"Target",
                cls:"folder",
                children:[
                    {
                        xtype:"TargetByNameForm",
                        home:"Target by name",
                        leaf:true,
                        text:"Target by name",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"temp",
                        home:"",
                        leaf:true,
                        text:"X-Target by sequence",
                        cls:"file",
                        application_type:'grid'
                    }
                ]
            },
            {
                xtype:"",
                leaf:false,
                text:"Pharmacology",
                cls:"folder",
                children:[
                    {
                        xtype:"PharmEnzymeForm",
                        home:"Compounds active against enzyme family",
                        leaf:true,
                        text:"Pharmacology by Enzyme family",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"PharmByCmpdNameForm",
                        home:"Pharmacology by Compound name",
                        leaf:true,
                        text:"Pharmacology by Compound",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"PharmByTargetNameForm",
                        home:"Pharmacology by Target Name",
                        leaf:true,
                        text:"Pharmacology by Target",
                        cls:"file",
                        application_type:'grid'
                    }
                ]
            },
            {
                xtype:"",
                cls:"folder",
                text:"Exemplars",
                leaf:false,
                children:[
                    {
                        xtype:"temp",
                        leaf:true,
                        text:"X-Chem-Bio Navigator",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"temp",
                        leaf:true,
                        text:"X-Target Dossier",
                        cls:"file",
                        application_type:'grid'
                    },
                    {
                        xtype:"temp",
                        leaf:true,
                        text:"X-Polypharmacology Browser",
                        cls:"file",
                        application_type:'grid'
                    }
                ]
            }


        ]


    }
});


//			,{
//				xtype: "",
//		        home: "",
//		        leaf: false,
//		        text: "Searching",
//		        cls: "folder",
//				children: [{
//					xtype: "queryform",
//			        home: "SPARQL form",
//			        leaf: true,
//			        text: "SPARQL",
//			        cls: "file",
//			        url: "rdf.json"
//				}]
//			}
// Summmary form is hidden for the moment
// {
// 					xtype: "",
// 			        leaf: false,
// 			        text: "Concept",
// 			        cls: "folder",
// 					children: [{
// 						xtype: "SummeryForm",
// 						home: "Concept properties and relations",
// 				        leaf: true,
// 				        text: "Summary",
// 				        cls: "file",
// 						application_type : 'grid'
// 					}]
// 				},