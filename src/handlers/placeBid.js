import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const { id } = event.pathParameters;
  const { amount } = event.body;
  console.log(amount);
  console.log({ body: event });

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  };

  let updateAuction;

  try {
    const result = await dynamodb.update(params).promise();
    updateAuction = result.Attributes;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  if (!updateAuction) {
    throw new createError.NotFound(`Auction with ID {id} not found`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updateAuction }),
  };
}

export const handler = commonMiddleware(placeBid);
