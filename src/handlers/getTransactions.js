import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getTransactions(event) {
  const TransactionsTable = process.env.TRANSACTIONS_TABLE_NAME;

  const params = {
    TableName: TransactionsTable,
  };

  try {
    const result = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
}

export const handler = getTransactions;
