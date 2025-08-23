import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./idl.json"; // export your Anchor IDL after deploy

// Your program ID from Anchor.toml or solana explorer
const programID = new PublicKey("YOUR_PROGRAM_ID");

// Choose network
const network = "https://api.devnet.solana.com"; // or mainnet, localnet

// Commitment level
const opts = {
  preflightCommitment: "processed",
};

export const getProgram = (wallet) => {
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new anchor.AnchorProvider(
    connection,
    wallet, // wallet adapter signer
    opts
  );

  return new anchor.Program(idl, programID, provider);
};
