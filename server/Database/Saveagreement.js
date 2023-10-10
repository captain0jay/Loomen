const mongoose = require('mongoose');
const connectdb = require('./db/connect');
const agreementModel = require('./Models/Agreement');
//var agreementModel = mongoose.model('user')

async function createAgreement(name,url,github_id,description){//,date){
    var agreementmodel = new agreementModel({name: name,url: url,github_id: github_id,description: description});//,date : date});
    agreementmodel.save()
    .then(() => console.log('agreement inserted'))
    .catch(err => console.log(err));
}

async function getAgreement(github_id){
    try {
        const agreementdata = await agreementModel.find({ github_id: github_id });
        //console.log('user fetched');
        return agreementdata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

module.exports = {createAgreement,getAgreement}