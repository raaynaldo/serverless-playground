import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function updateTransaction(event) {
  const TransactionsTable = process.env.TRANSACTIONS_TABLE_NAME;

  const body = JSON.parse(event.body);
  const { id, textMessage } = body;

  let run = true;
  while (run)
    try {
      const getParams = {
        TableName: TransactionsTable,
        Key: { id },
      };
      const { Item: transaction } = await dynamodb.get(getParams).promise();
      const { textMessage: currentTextMessage, version } = transaction;

      const updateParams = {
        ...getParams,
        UpdateExpression:
          'set textMessage = :textMessage, version = :newVersion',
        ConditionExpression: 'version = :version',
        ExpressionAttributeValues: {
          ':textMessage': [...currentTextMessage, textMessage],
          ':newVersion': version + 1,
          ':version': version,
        },
      };

      console.log({ currentTextMessage }, { textMessage }, { version });

      await dynamodb.update(updateParams).promise();
      run = false;
    } catch (error) {
      console.log({ textMessage }, error);
      if (error.code !== 'ConditionalCheckFailedException') {
        return {
          statusCode: 400,
          body: JSON.stringify(error),
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
      }
    }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'success',
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

export const handler = updateTransaction;
