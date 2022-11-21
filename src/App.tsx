import ReactXnft, { Text, View, LocalStorage} from "react-xnft";
import React, {useEffect, useState }from "react";
import {PublicKey} from "@solana/web3.js";
import {
  IDL_JSON as UNSTAKE_IDL_JSON,
  findProtocolFeeAccount,
  previewUnstake,
  unstakeTx,
  deactivateStakeAccountTx,
  Program,
  Unstake
} from "@unstake-it/sol";

const PROG_ID = new PublicKey("unpXTU2Ndrc7WWNyEhQWe4udTzSibLPi25SXv2xbCHQ");

export function App() {
  // construct new Program with provider set to anchor's default getProvider()
  const UNSTAKE_PROGRAM: Program<Unstake> = new Program(
    // @ts-ignore
    UNSTAKE_IDL_JSON as Unstake,
    PROG_ID,
    // if last arg is undefined, anchor attemps to load defaultprovider
    "fake-provider" as any
  );

  useEffect(() => {
    console.log(UNSTAKE_PROGRAM);
  }, []);

  return (
    <View>
      <Text>Hello, World!</Text>
      {/* <Text>Cache Returned?: {JSON.stringify(cache)}</Text> */}
    </View>
  );
}
