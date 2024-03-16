import ballerina/io;
import ballerina/http;

const string SYS_APP_HOST="http://sharemedicinesysapp-3337726626:8080";




public function main() returns error? {
    http:Client httpClient = check new (SYS_APP_HOST);
    http:Response response = check httpClient -> get("/trigger");
    io:println(response);
}
