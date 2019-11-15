const superagent = require('superagent');
const AWS = require('aws-sdk');
var lambda = new AWS.Lambda();

module.exports.handler = async (event) => {
    //{original}/{add}/{multiply}/{substract}
    console.log(event.pathParameters);

    const original = parseInt(event.pathParameters.original);
    const add = parseInt(event.pathParameters.add);
    const multiply = parseInt(event.pathParameters.multiply);
    const substract = parseInt(event.pathParameters.substract);
    
    const addUrl = process.env.addUrl;
    const multiplyUrl = process.env.multiplyUrl;
    const substractFunctionName = process.env.substractFunctionName;

    const addResult = (await superagent.get(`${addUrl}/${original}/${add}`)).text;
    console.log(`Called add with ${original} and ${add}, got ${addResult}`);
    const multiplyResult = (await superagent.get(`${multiplyUrl}/${parseInt(addResult)}/${multiply}`)).text;
    console.log(`Called mult with ${addResult} and ${multiply}, got ${parseInt(multiplyResult)}`);
    const total = await callSubstract(substractFunctionName, multiplyResult, substract);
    console.log(`Called substract with ${multiplyResult} and ${substract}, got ${JSON.stringify(total)}`);

    return {
        statusCode: 200,
        body: JSON.stringify(total)
    }
}

const callSubstract = async (substractFunctionName, numberA, numberB) => {
    const base64data = Buffer.from('{"AppName" : "InternalAPIApp"}').toString('base64');

    var params = {
        ClientContext: base64data, 
        FunctionName: substractFunctionName, 
        InvocationType: " RequestResponse ", 
        LogType: "None",
        Payload: `{"numberA": ${numberA}, "numberB": ${numberB}}`
    };

    const result = await lambda.invoke(params).promise();

    console.log(result);
    const payload = JSON.parse(result.Payload);
    return payload.body;
}

