const AWS = require('aws-sdk');
const SQS = new AWS.SQS();

module.exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const times = parseInt(body.times);
    const queue = process.env.queueUrl;

    console.log(`Queue is: ${queue}`);

    for (let i=0; i<times; i++) {
        await SQS.sendMessageBatch({ Entries: createMessages(), QueueUrl: queue }).promise()
    }

    return {
        statusCode: 200,
        body: JSON.stringify("all done")
    };
}

const createMessages = () => {
    let entries = []
   
    for (let i=0; i<10; i++) {
        entries.push({
          Id: 'id'+parseInt(Math.random()*1000000),
          MessageBody: 'value'+Math.random()
        })
    }
    return entries
}