// Load required modules
var https   = require("https");     // https server core module
var fs      = require("fs");        // file system core module
var express = require("express");   // web framework external module
var io      = require("socket.io"); // web socket external module
var cors = require('cors');

var rtclib = require("open-easyrtc");

var port = process.env.PORT || 8443;

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();

httpApp.use(cors());

httpApp.get('/', (req, res) => {
    res.send('Welcome to RTC Server');
});

// Start Express https server on port 8443
var webServer = https.createServer({
	key: fs.readFileSync(__dirname + "/certnew/private.key"),
    cert:  fs.readFileSync(__dirname + "/certnew/certificate.crt")
    
}, httpApp);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

var myIceServers = [
 {urls: ["stun:stun.l.google.com:19302"]},
    {urls: ["stun:stun.sipgate.net"]},
    {urls: ["stun:217.10.68.152"]},
    {urls: ["stun:stun.sipgate.net:10000"]},
    {urls: ["stun:217.10.68.152:10000"]},
	{urls: ["stun:relay.backups.cz"]},
  {
     url: 'turn:relay.backups.cz',
     credential: 'webrtc',
     username: 'webrtc'
 },
 {
     url: 'turn:relay.backups.cz?transport=tcp',
     credential: 'webrtc',
     username: 'webrtc'
 },
 {
     url: 'turn:13.250.13.83:3478?transport=udp',
     credential: 'YzYNCouZM1mhqhmseWk6',
     username: 'YzYNCouZM1mhqhmseWk6'
 },
 {
     url: 'turn:192.158.29.39:3478?transport=tcp',
     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
     username: '28224511:1379330808'
 },
 {
     url: 'turn:turn.anyfirewall.com:443?transport=tcp',
     credential: 'webrtc',
     username: 'webrtc'
 },
 {
     url: 'turn:turn.bistri.com:80',
     credential: 'homeo',
     username: 'homeo'
 }
];

rtclib.setOption("appIceServers", myIceServers);
// Start RTC server
var rtc = rtclib.listen(httpApp, socketServer);

// Listen on port 8443
webServer.listen(8443, function () {
    console.log('listening on https://localhost:8443');
});
