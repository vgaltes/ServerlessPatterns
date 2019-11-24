module.exports.handler = (event, context) => {
  const message = JSON.stringify(event.Records[0]);

  console.log(`Message received in DLQ. ${message}`) ;

  return "all done";
};
