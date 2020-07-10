TeleMd RTC Server
==========
The server should use HTTPS.

Files and Folders:
------------------

 - package.json - Provides project information allowing npm to find and install required modules.
 - server_ssl.js - Server code for doing ssl using included self-signed keys (for testing purposes0
 - localhost.(key/crt) - self-signed keys for local host.

 
Installing Required Modules:
----------------------------

 - Type `npm install` in console.
 - This will read the package.json file to find and install the required modules including EasyRTC, Express, and Socket.io.
 - Required modules will go into a new 'node_modules' subfolder


Running the Server:
-------------------

 - Type `npm start server` in console.


Test the server
---------------------

 - In your WebRTC enabled browser, visit your server address including the port. By default port 8443 is used.
 - http://localhost:8443/

To deploy the server in production
----------------------------------

 - We need a domain name and valid ssl cerificates (the server doesnt work properly using self-signed certificate)
 - We need AWS EC2 or Azure or GCP to deploy server with Static IP
 
 

