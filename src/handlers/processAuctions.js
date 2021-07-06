import { getEndedAuction } from "../lib/getEndedAuctions";

async function processAuctions(event, context) {
  console.log("processing auctions");
  const auctionToClose = await getEndedAuction();
  console.log(auctionToClose);
}

export const handler = processAuctions;
