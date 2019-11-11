const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  console.log(event);

  const id = event.authorizationToken;

  const req = {
    TableName: tableName,
    Key: {
        'id': parseInt(id)
      }
  };

  const dynamodbResp = await dynamodb.get(req).promise();

  console.log(dynamodbResp);

  if (!dynamodbResp.Item){
    throw new Error('Not authorised!');
  }

  const resp = 
  {
    "principalId": dynamodbResp.Item.name,
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow",
          "Resource": event.methodArn
        }
      ]
    },
    "context": {
      "org": "my-org",
      "role": "admin",
      "createdAt": "2019-11-11T12:15:42"
    }
  };

  return resp;
};