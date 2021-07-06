import { closeAuction } from "../lib/closeAuctions";
import { getEndedAuction } from "../lib/getEndedAuctions";
import createError from "http-errors";

async function processAuctions(event, context) {
  try {
    console.log("processing auctions");
    const auctionsToClose = await getEndedAuction();
    console.log(auctionsToClose);

    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction)
    );
    await Promise.all(closePromises);

    return { closes: closePromises.length };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = processAuctions;
