
# Introduction

```
Developed by: ANUPAM GOGOI
Email: anupamgogoi@gmail.com
```

Share Medicine is a SPA for sharing your extra medicines with anyone in need. The idea came to my mind
as we buy many medicines that we don't even use and they get expired. Using this application we can share 
the medicines.

SPA Application: https://cbf4bd14-4706-4786-8ae3-67cd680b4909.e1-us-east-azure.choreoapps.dev

# Architecture
I have used the API Led Connectivity approach in the application.
![](https://github.com/cloudintegrator/tesla/blob/main/docs/share-medicine.jpeg) 

### Experience Layer
The SHARE-MEDICINE-EXP-APP is working as an experience API for the integration and it's endpoints are exposed as Public endpoint to be consumed.The service is implemented using Ballerina.

The API connects to a Cloud MQ for POST operations and for GET it invokes the SHARE-MEDICINE-SYS-APP.

### System Layer
The SHARE-MEDICINE-SYS-APP is working as system API.It's responsible for connecting to the MySQL instance for CRUD operatins. Also, it fetches data from a MQ.

The SHARE-MEDICINE-SCHEDULED-JOB checks for any expired medicines and updates the expired flag in the MySQL database.

# Usage

### Login
The application does SSO with Asgardeo. If you don't have an account just register yourself.

### Home 
In the Home page you can see all the medicines shared by other users. Click the Pick Button to pick your medicine.
![](https://github.com/cloudintegrator/tesla/blob/main/docs/home.png)

Also, you can Search for medicine and you can Delete your shared medicines.
![](https://github.com/cloudintegrator/tesla/blob/main/docs/pick.png)

### Share
Here you can add information of the medicine you wish to share.
![](https://github.com/cloudintegrator/tesla/blob/main/docs/share.png)

### Messages
In this page, you receive the messages sent my anyone who picked the medicines shared by you.
![](https://github.com/cloudintegrator/tesla/blob/main/docs/approve.png)

You can approve or cancel the request also.
