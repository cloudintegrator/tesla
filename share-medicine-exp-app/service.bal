import ballerina/http;
import ballerinax/rabbitmq;
import ballerina/log;

public type Medicine record{|
    int id?;
    string email;
    string created;
    string medicine_name;
    int medicine_qty;
    string medicine_validity;
|};

public type Response record{
    int status;
    string message;
};

service / on new http:Listener(9090) {
    private final rabbitmq:ConnectionConfiguration connectionConfig;
    private final rabbitmq:Client mqClient;

    function init() returns error?{
        self.connectionConfig={
            username: "aannimrm",
            password: "B40g83-bYXRfan3MSsyi1DuQzvH_Nves",
            virtualHost: "aannimrm"
        };
        self.mqClient=check new ("fish-01.rmq.cloudamqp.com",5672,self.connectionConfig);
        log:printInfo("********** Service Initialized **********");
    }

    resource function get health() returns string{
        return "OK";
    }
    
    resource function post medicines(Medicine medicine) returns Response|error{
        check self.mqClient->publishMessage({
            content: medicine,
            routingKey: "MEDICINE.QUEUE"
        });

        log:printInfo("********** Medicine information posted successfully **********");
        Response r={
            status: 201,
            message: "Sent data to Rabbit MQ"
        };
        return r;
    }

    resource function get medicines(@http:Header {name: "Authorization"} string token) returns Medicine[]|error? {
        log:printInfo("Token: "+token);
        map<string|string> headers={
            "Authorization": token
        };
        http:Client httpClient = check new ("https://c219fb60-f3b7-4aca-a7d2-d62a3e1f1a5d-prod.e1-us-east-azure.choreoapis.dev");
        Medicine[] med=check httpClient-> get("/fwzo/sharemedicinesysapp/health-5c6/v1.0/medicines",headers);
        log:printInfo("********** MEDICINES **********"+med.toJsonString());
        return med;
        
    }

}