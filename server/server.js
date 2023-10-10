const express = require('express');
const app = express();
var cors = require('cors');
const { createUser,getUser,updateUser,getUserwid } = require('./Database/Saveuser');
const { createAgreement,getAgreement } = require('./Database/Saveagreement');
const {getComm,createComm, updateComm,updateCommtwo} = require('./Database/Savecomm');
const { v4: uuidv4 } = require('uuid');

app.use(express.json())
app.use(cors())

const CLIENT_SECRET = '';
const CLIENT_ID = '';

//chat element running on 8000 port
const { Server } = require("socket.io");

const io = new Server(8000);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('join room', (room) => {
      // Join a room named after the user ID or any other identifier
      socket.join(room);
    });
    socket.on('chat message', (data) => {
      const { room, message } = data;
      console.log(message);
      // Send the message to all sockets in the specified room
      io.to(room).emit('chat message', message);
      console.log("aftererer")
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

app.get('/accessToken', async function (req,res){
    console.log(req.query.code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;// + "&redirect_uri=" + REDIRECT_URL;
    await fetch("https://github.com/login/oauth/access_token" + params,{
        method: "POST",
        headers: {
            "Accept" : "application/json"
        }
    }).then((response)=>{
        //console.log(response);
        return response.json();
    }).then((data)=>{
        //console.log(data);
        res.json(data);
    });
});

app.get('/validateuser',async function (req,res){ 
    req.get("Authorization");
    await fetch("https://api.github.com/user",{
        method: 'GET',
        headers:{
            "Authorization" : req.get("Authorization")
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        res.json(data);
    })
})

app.get('/saveuser', async function(req,res){
    console.log(req.get("token"));
    console.log(req.get("username"));
    req.get("id");
    var userpresence = await getUser(req.get("username"),req.get("id"));
    console.log(userpresence);
    console.log(userpresence.length);
    if(userpresence.length!=0){
        updateUser(userpresence[0].webid,req.get("token"))
    }
    else{
        createUser(req.get("username"),req.get("id"),req.get("token"),uuidv4(),req.get("as"));
    }
})

app.get('/savecomm', async function(req,res){
    var clientuser = await getUserwid(req.get("client_id"));
    console.log(clientuser)
    if(req.get("agsent")===null){const agsent = "no";}
    createComm(req.get("github_username"),clientuser[0].username,req.get("github_id"),req.get("client_id"),req.get("asitem"),agsent);
    createComm(clientuser[0].username,req.get("github_username"),req.get("client_id"),req.get("github_id"),req.get("asitem"),agsent);
})

app.get('/getcomm',async function(req,res){
    var Comms = await getComm(req.get("github_id"));
    res.send(Comms);
})

app.get('/add',async function(req,res){
    createAgreement(req.get("name"),req.get("url"),req.get("github_id"),req.get("description"))
})

app.get('/getadds',async function(req,res){
    var Adds = await getAgreement(req.get("github_id"));
    res.send(Adds);
})

app.get('/updatecomm',async function(req,res){
    updateComm(req.get("self"),req.get("producturl"))
})

app.get('/updateclient',async function(req,res){
    updateCommtwo(req.get('current_chat'),req.get("github_id"));
})

app.listen(4000,function(){
    console.log("listening to port 4000...")
})