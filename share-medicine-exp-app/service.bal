import ballerina/http;
import ballerinax/rabbitmq;
import ballerina/log;
// import ballerinax/mysql.driver as _;
// import ballerinax/mysql;


public type Medicine record{|
    int id?;
    string email;
    string created?;
    string medicine_name;
    int medicine_qty;
    string medicine_validity;
    boolean expired;
    string msg?;
    string send_to?;
|};

public type Response record{
    int code;
    string message;
};

string SYS_APP_HOST="https://c219fb60-f3b7-4aca-a7d2-d62a3e1f1a5d-prod.e1-us-east-azure.choreoapis.dev";
string SYS_APP_BASEPATH="/fwzo/sharemedicinesysapp/public-5c6/v1.0";


string MQ_HOST="fish-01.rmq.cloudamqp.com";
int MQ_PORT=5672;
string MQ_USERNAME="aannimrm";
string MQ_PASSWORD="B40g83-bYXRfan3MSsyi1DuQzvH_Nves";
string MQ_VHOST="aannimrm";



configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

service / on new http:Listener(9090) {
    private final rabbitmq:ConnectionConfiguration connectionConfig;
    private final rabbitmq:Client mqClient;

    function init() returns error?{
        self.connectionConfig={
            username: MQ_USERNAME,
            password: MQ_PASSWORD,
            virtualHost: MQ_VHOST
        };
        self.mqClient=check new (MQ_HOST,MQ_PORT,self.connectionConfig);
        log:printInfo("********** Service Initialized **********");
    }

    resource function get health() returns Response|error{
        Response r={
            code: 200,
            message: "Up & Running."
        };
        return r;
    }
    
    resource function post medicines(Medicine medicine) returns Response|error{
        check self.mqClient->publishMessage({
            content: medicine,
            routingKey: "MEDICINE.QUEUE"
        });

        log:printInfo("********** Medicine information posted successfully **********");
        Response r={
            code: 201,
            message: "Sent data to Rabbit MQ"
        };
        return r;
    }

    resource function get medicines(string token) returns Medicine[]|error? {
        log:printInfo("Token: "+token);
        map<string|string> headers={
            "Authorization": "Bearer " + token
        };
        http:Client httpClient = check new (SYS_APP_HOST);
        string path=SYS_APP_BASEPATH + "/medicines";
        Medicine[] med=check httpClient-> get(path,headers);
        log:printInfo("********** MEDICINES **********"+med.toJsonString());
        return med;
    }

    resource function get search(string token,string medicine_name) returns Medicine[]|error{
        string path= SYS_APP_BASEPATH + "/medicines/search";
        string params="medicine_name="+medicine_name;
        string fullPath=path+"?"+params;

        log:printInfo("Token: "+token);
        log:printInfo("Full Path: "+fullPath);
        map<string|string> headers={
            "Authorization": "Bearer " + token
        };

        http:Client httpClient = check new (SYS_APP_HOST);
        Medicine[] med=check httpClient-> get(fullPath,headers);
        log:printInfo("********** MEDICINES **********"+med.toJsonString());
        return med;
    }

    resource function post pick(Medicine medicine) returns Response|error{
        check self.mqClient->publishMessage({
            content: medicine,
            routingKey: "PICK.MEDICINE.QUEUE"
        });

        log:printInfo("********** Picked Medicine information posted successfully **********");
        Response r={
            code: 201,
            message: "Sent data to Rabbit MQ"
        };
        return r;
    }

    resource function post deletemed(Medicine medicine) returns Response|error{
        check self.mqClient->publishMessage({
            content: medicine,
            routingKey: "DELETE.MEDICINE.QUEUE"
        });

        log:printInfo("********** Medicine information posted successfully for deletion **********");
       
        Response r={
            code: 201,
            message: "Success"
        };
        return r;
    }

    resource function get messages(string token,string email) returns Medicine[]|error{
        string path= SYS_APP_BASEPATH + "/medicines/messages";
        string params="email="+email;
        string fullPath=path+"?"+params;

        log:printInfo("Token: "+token);
        log:printInfo("Full Path: "+fullPath);
        map<string|string> headers={
            "Authorization": "Bearer " + token
        };

        http:Client httpClient = check new (SYS_APP_HOST);
        Medicine[] med=check httpClient-> get(fullPath,headers);
        log:printInfo("********** MESSAGES **********"+med.toJsonString());
        return med;
    }

    resource function post approve(Medicine medicine) returns Response|error{
        check self.mqClient->publishMessage({
            content: medicine,
            routingKey: "APPROVE.MEDICINE.QUEUE"
        });

        log:printInfo("********** Medicine information posted successfully for approval **********");
       
        Response r={
            code: 201,
            message: "Success"
        };
        return r;
    }

    // resource function get expired_meds() returns Medicine[]|error{
    //     final mysql:Client dbClient = check new(host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE);
    //     Medicine[] data=[];
    //     stream<Medicine,error?> result=dbClient->query(`SELECT * FROM med_data`);
    //     check from Medicine m in result
    //         do {
    //             data.push(m);
    //         };
        
    //     return data;
    // }

}