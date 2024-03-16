import ballerina/io;
import ballerina/http;

const string SYS_APP_HOST="http://sharemedicinesysapp-3337726626:8080/medicines"


http:Client httpclient = check new (SYS_APP_HOST);

public function main() returns error? {
    check httpClient -> patch(SYS_APP_BASEPATH)
}
