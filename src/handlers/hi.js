async function hi(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello Harshit" }),
  };
}

export const handler = hi;
