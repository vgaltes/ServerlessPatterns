const AWS = require('aws-sdk');

AWS.config.region = "eu-west-1";
var lambda = new AWS.Lambda();

const base64data = Buffer.from('{"AppName" : "InternalAPIApp"}').toString('base64');

var params = {
    ClientContext: base64data, 
    FunctionName: "InternalHandoff-dev-GetItem", 
    InvocationType: " RequestResponse", 
    LogType: "Tail", // Set to Tail to include the execution log in the response.
    Payload: '{"id": 1}'
};

lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});
