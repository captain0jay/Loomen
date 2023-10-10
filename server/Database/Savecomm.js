const mongoose = require('mongoose');
const connectdb = require('./db/connect');
const commModel = require('./Models/Comm');
//require('dotenv').config();

async function getComm(selfid){
    try {
        const commdata = await commModel.find({ selfid: selfid });
        //console.log('user fetched');
        return commdata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

async function createComm(self,to,selfid,toid,as,agsent){//,date){
    var commmodel = new commModel({self: self,to: to,selfid : selfid,toid: toid,as:as,agsent: agsent});//,date : date});
    commmodel.save()
    .then(() => console.log('comm data inserted'))
    .catch(err => console.log(err));
}

async function updateComm(self,producturl){
    await commModel.updateOne({ self : self},{$set: { producturl :producturl }});
    console.log("updated communication...");
}

async function updateCommtwo(self,toid){
    await commModel.updateOne({ self : self},{toid : toid},{$set: { agsent : "yes" }});
    console.log("updated communication...");
}

module.exports = { getComm,createComm,updateComm,updateCommtwo}