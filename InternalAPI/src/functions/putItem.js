const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  const id = parseInt(event.id);
  const name = event.name;

  const params = {
    TableName: tableName,
    Item: {
      'id' : id,
      'name' : name
    }
  };

  const resp = await dynamodb.put(params).promise();

  const res = {
    statusCode: 200,
    body: JSON.stringify(resp)
  };

  return res;
};