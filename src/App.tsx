import ReactXnft, { Text, View, LocalStorage} from "react-xnft";
import React, {useEffect, useState }from "react";
import {
  IDL_JSON as UNSTAKE_IDL_JSON,
  findProtocolFeeAccount,
  previewUnstake,
  unstakeTx,
  deactivateStakeAccountTx,
} from "@unstake-it/sol";
import type { Unstake } from "@unstake-it/sol";

export function App() {


  const PROG_ID = new PublicKey("unpXTU2Ndrc7WWNyEhQWe4udTzSibLPi25SXv2xbCHQ");

  // construct new Program with provider set to anchor's default getProvider()
  const UNSTAKE_PROGRAM: Program<Unstake> = new Program(
    UNSTAKE_IDL_JSON as Unstake,
    PROG_ID
  );

  useEffect(()  => {
   
  }, []);

  return (
    <View>
      <Text>Hello, World!</Text>
      <Text>Cache Returned?: {JSON.stringify(cache)}</Text>
    </View>
  );
}
