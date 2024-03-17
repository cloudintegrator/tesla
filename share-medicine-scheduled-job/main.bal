import ballerina/io;
import ballerina/http;

const string SYS_APP_HOST="http://sharemedicinesysapp-3675440384:8080/";
// const string SYS_APP_HOST="https://c219fb60-f3b7-4aca-a7d2-d62a3e1f1a5d-prod.e1-us-east-azure.choreoapis.dev/fwzo/sharemedicinesysapp/health-5c6/v1.0";



public function main() returns error? {
    http:Client httpClient = check new (SYS_APP_HOST);
    http:Response response = check httpClient -> get("/trigger");

    json jsonResponse = check response.getJsonPayload();
    io:println(jsonResponse);
}

public function getToken() returns string {

    return "";
}