module.exports.handler = (event, context) => {
  const message = event.Records[0].Sns.Message;

  console.log(`Message received via SNS. ${message}`);

  return "all done";
};
