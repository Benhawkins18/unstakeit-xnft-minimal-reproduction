# xnft-quickstart

Quickstart repo for building your own xNFT.

## Developing

Once you've installed Backpack, get started building your xNFT with these steps. Note that the packages here will always use the latest, which correspond to the latest tagged build of Backpack. If you have unexepected issues, make sure your package versions match the app version.

### Install

First, install dependencies.

```
yarn
```

### Run the dev server

Then, run the dev server with hot reloading

```
yarn dev
```

### Open the Simulator in Backpack

Now that you have your xNFT dev server running, open it in the Backpack simulator to see it run.

That's it!


Error:

```@parcel/core: Failed to resolve '@soceanfi/solana-stake-sdk' from './node_modules/@unstake-it/sol/dist/fetch.js'

  /Users/ben.hawkins/Projects/staking-xnft/node_modules/@unstake-it/sol/dist/fetch.js:13:36
    12 | exports.fetchLiquidityPoolStakeAccounts = void 0;
  > 13 | const solana_stake_sdk_1 = require("@soceanfi/solana-stake-sdk");
  >    |                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    14 | const bn_js_1 = require("bn.js");
    15 | const pda_1 = require("./pda");

build changed
build error {"type":"buildFailure","diagnostics":[{"message":"Failed to resolve '@soceanfi/solana-stake-sdk' from './node\\_modules/@unstake-it/sol/dist/fetch.js'","origin":"@parcel/core","codeFrames":[{"filePath":"/Users/ben.hawkins/Projects/staking-xnft/node_modules/@unstake-it/sol/dist/fetch.js","code":"\"use strict\";\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.fetchLiquidityPoolStakeAccounts = void 0;\nconst solana_stake_sdk_1 = require(\"@soceanfi/solana-stake-sdk\");\nconst bn_js_1 = require(\"bn.js\");\nconst pda_1 = require(\"./pda\");\n/**\n * Fetch all stake accounts owned by a liquidity pool\n * @param program\n * @param liquidityPool\n * @param commitment\n * @returns\n */\nfunction fetchLiquidityPoolStakeAccounts(program, liquidityPool, commitment) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const [solReserves] = yield (0, pda_1.findPoolSolReserves)(program.programId, liquidityPool);\n        // TODO: check that sending both requests at the same time\n        // doesnt overload RPC servers\n        const [stakeAccs, currentEpoch] = yield Promise.all([\n            (0, solana_stake_sdk_1.findAllStakeAccountsByAuth)(program.provider.connection, { withdrawer: solReserves }, commitment),\n            program.provider.connection\n                .getEpochInfo(commitment)\n                .then(({ epoch }) => new bn_js_1.BN(epoch)),\n        ]);\n        // filter out stake accs with no stake acc records\n        const stakeAccRecordKeys = yield Promise.all(stakeAccs.map(({ accountId }) => (0, pda_1.findStakeAccountRecordAccount)(program.programId, liquidityPool, accountId).then(([pubkey]) => pubkey)));\n        const stakeAccRecords = yield program.account.stakeAccountRecord.fetchMultiple(stakeAccRecordKeys, commitment);\n        const stakeAccsWithRecord = stakeAccs.filter((_ksa, i) => Boolean(stakeAccRecords[i]));\n        return stakeAccsWithRecord.reduce((res, ksa) => {\n            const state = (0, solana_stake_sdk_1.stakeAccountState)(ksa.accountInfo.data, currentEpoch);\n            res[state].push(ksa);\n            return res;\n        }, {\n            active: [],\n            inactive: [],\n            activating: [],\n            deactivating: [],\n        });\n    });\n}\nexports.fetchLiquidityPoolStakeAccounts = fetchLiquidityPoolStakeAccounts;\n","codeHighlights":[{"start":{"line":13,"column":36},"end":{"line":13,"column":63}}]}]}]}```