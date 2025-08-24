import * as anchor from "@coral-xyz/anchor";

export  const getEscrowPDA = (subscription, programId) => {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), subscription.toBuffer()],
      programId
    );
};
