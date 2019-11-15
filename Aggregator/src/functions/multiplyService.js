module.exports.handler = async (event) => {
    const numberA = parseInt(event.pathParameters.numberA);
    const numberB = parseInt(event.pathParameters.numberB);

    console.log(`returning multiply of ${numberA} and ${numberB}`);

    const total = numberA * numberB;

    return {
        statusCode: 200,
        body: JSON.stringify(total)
    }
}