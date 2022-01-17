import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createTransaction(event, context) {
  const TransactionsTable = process.env.TRANSACTIONS_TABLE_NAME;

  const transaction = {
    id: uuid(),
    status: 'new',
    textMessage: ['created'],
    version: 1,
  };

  try {
    await dynamodb
      .put({
        TableName: TransactionsTable,
        Item: transaction,
      })
      .promise();
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(transaction),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

export const handler = createTransaction;
