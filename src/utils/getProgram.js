import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./idl.json"; // your Anchor IDL

export const getProgram = (wallet) => {
  const connection = new Connection("https://api.devnet.solana.com", "processed");

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });

  return new Program(idl, provider);
};
