# Introduction
Share Medicine is a SPA for sharing your extra medicines with anyone in need. The idea came to my mind
as we buy many medicines that we don't even use and they get expired. Using this application we can share 
the medicines.


# Architecture
I have used the API Led Connectivity approach in the application. 

### Experience Layer
The SHARE-MEDICINE-EXP-APP is working as an experience API for the integration and it's endpoints are exposed as Public endpoint to be consumed.The service is implemented using Ballerina.

The API connects to a Cloud MQ for POST operations and for GET it invokes the SHARE-MEDICINE-SYS-APP.

### System Layer
The SHARE-MEDICINE-SYS-APP is working as system API.It's responsible for connecting to the MySQL instance for CRUD operatins. Also, it fetches data from a MQ.

The SHARE-MEDICINE-SCHEDULED-JOB checks for any expired medicines and updates the expired flag in the MySQL database.

