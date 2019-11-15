module.exports.handler = async (event) => {
    const numberA = parseInt(event.pathParameters.numberA);
    const numberB = parseInt(event.pathParameters.numberB);

    console.log(`returning sum of ${numberA} and ${numberB}`);

    const total = numberA + numberB;

    const res = {
        statusCode: 200,
        body: JSON.stringify(total)
      };

    return res;
}