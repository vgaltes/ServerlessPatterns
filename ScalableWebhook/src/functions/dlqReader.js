let counter = 1
let messageCount = 0
let funcId = 'id'+parseInt(Math.random()*1000)
 
module.exports.handler = async (event) => {
    // Record number of messages received
    if (event.Records) {
        messageCount += event.Records.length
    }
    console.log(funcId + ' REUSE: ', counter++)
    console.log('Message Count: ', messageCount)
    console.log(JSON.stringify(event))
    return 'done'
};