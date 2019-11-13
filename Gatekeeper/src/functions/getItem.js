const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  const id = event.pathParameters.itemId;

  const req = {
    TableName: tableName,
    Key: {
        'id': parseInt(id)
      }
  };

  const resp = await dynamodb.get(req).promise();

  const res = {
    statusCode: 200,
    body: JSON.stringify(resp.Item)
  };

  return res;
};