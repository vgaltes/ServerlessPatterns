module.exports.handler = async (event) => {
    const numberA = parseInt(event.numberA);
    const numberB = parseInt(event.numberB);

    console.log(`returning substraction of ${numberA} and ${numberB}`);
    
    const total = numberA - numberB;

    return {
        statusCode: 200,
        body: JSON.stringify(total)
    }
}