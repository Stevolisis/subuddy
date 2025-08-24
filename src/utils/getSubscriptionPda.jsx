import * as anchor from "@coral-xyz/anchor";
import { BN } from "bn.js";
  
export const getSubscriptionPDA = (creator, id, programId) => {
  const subscriptionId = new BN(id,16);
  return anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("subscription"),
      creator.toBuffer(),
      subscriptionId.toArrayLike(Buffer, "le", 8),
    ],
    programId
  );
};

