module.exports.handler = (event) => {
    const message = event.Records[0].Sns.Message;

    console.log(`received message in the DLQ ${message}`);

    return "all done";
}