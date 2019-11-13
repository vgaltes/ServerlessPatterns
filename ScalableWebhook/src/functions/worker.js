let counter = 1
let messageCount = 0
let funcId = 'id'+parseInt(Math.random()*1000)
 
module.exports.handler = async (event) => {
    counter++;

    if (counter % 10 === 0){
        throw new Error('Simulating error');
    }
    
    // Record number of messages received
    if (event.Records) {
        messageCount += event.Records.length
    }
    console.log(funcId + ' REUSE: ', counter)
    console.log(funcId + ' Message Count: ', messageCount)
    console.log(JSON.stringify(event))
    console.log(funcId + ' processing...');
    await sleep(2000);
    console.log(funcId + ' job done!');
    return 'done'
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  