async function hello(event, context) {
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'yoo' }),
  };
}

export const handler = hello;
