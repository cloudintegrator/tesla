import ballerina/io;
import ballerina/http;

const string SYS_APP_HOST="http://sharemedicinesysapp-3675440384:8080";
// const string SYS_APP_HOST="https://c219fb60-f3b7-4aca-a7d2-d62a3e1f1a5d-prod.e1-us-east-azure.choreoapis.dev/fwzo/sharemedicinesysapp/public-5c6/v1.0";


const string ASGARDEO_HOST="https://api.asgardeo.io/t/demoltda/oauth2";
const string AUTH="Basic U3ZFRmJzMWZxY0Ztazk0ODVMUFVaWGlqd3pBYTo5VDNlY0NtbVV2SnBrWE52THdtWVdEc3VkV0RpV05GclBCa0VnNHJFd0s4YQ==";

type Token record{
    string access_token;
    string token_type;
    int expires_in;
};

public function main() returns error? {
  error? e=updateExpiredMedicines();
  io:println(e);
}

public function updateExpiredMedicines() returns error? {
    // Get a token.
    http:Client httpClient = check new (ASGARDEO_HOST);
    http:Response response = check httpClient -> post("/token",
                            {"grant_type":"client_credentials"},
                            {"Authorization": AUTH});
    json jsonResponse = check response.getJsonPayload();    
    Token  result = check jsonResponse.fromJsonWithType(Token);

    // Trigger the SYS APP.
    string token=result.access_token;
    error? e=trigger(token);
    io:println(e);                 
}
public function trigger(string token) returns error? {
    io:println(token);
    http:Client httpClient = check new (SYS_APP_HOST,{timeout:180000});
    map<string|string> headers={
            "Authorization": "Bearer " + token
        };
    http:Response response = check httpClient -> get("/trigger",headers);

    json jsonResponse = check response.getJsonPayload();
    io:println(jsonResponse);
}