# hardhat-generate-storage-namespace plugin

Hardhat TS plugin to generate a storage namespace for multi/proxy contracts to avoid collision.
Extends the hre with hre.getHash, which you can use in scripts/tasks

ERC-7201 Draft proposal implementation: keccak256(uint256(keccak256(id)) - 1)

```
yarn hardhat getHash --input hello
```

output = keccak256(uint256(keccak256("example.main")) - 1):

```
0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab5da
```

## Quick Start

1. Install the Hardhat plug-in

```npm
npm install hardhat-generate-storage-namespace
```

```yarn
yarn add hardhat-generate-storage-namespace
```

2. Add this to your hardhat.config.js

```js
require("hardhat-generate-storage-namespace");
```

```ts
import "hardhat-generate-storage-namespace";
```

3. Use this as a script/task. As an example of a Task, You'll need to import 'task' from hardhat to your config:

```bash
...other imports...
import { task } from "hardhat/config";

...your config...

task("getHash", "Gets the hash of an input string")
  .addParam("input", "The input string")
  .setAction(async (taskArgs, hre) => {
    const result = await hre.getHash(taskArgs.input);
    console.log(result);
  });

  export default config;
```

Now you're able to to generate a unique storage slot with:

```bash
npx hardhat getHash --input hello
```

```bash
yarn hardhat getHash --input hello
```

You can also now include this in scripts/tests:

```
import { getHash } from "hardhat"
console.log(getHash("example.main"));
```

Solidity implementation:

```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract Hasher {
    function getHash(string calldata _input) public pure returns (bytes32) {
        bytes32 finalHash = keccak256(abi.encodePacked(uint256(keccak256(abi.encodePacked(_input))) -1));
        return finalHash;
    }
}
```
