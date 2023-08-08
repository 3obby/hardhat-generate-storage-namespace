import { ethers } from "ethers";
import { extendEnvironment } from "hardhat/config";

// We're extending the Hardhat Runtime Environment, adding our hashing functionality
import "./type-extensions";

function getHash(input: string) {
  const id = ethers.toUtf8Bytes(input);

  // ERC-7201 proposes keccak256(uint256(keccak256(id)) - 1)
  const kecUintKec = ethers.keccak256(
    ethers.toBeHex(ethers.getUint(ethers.keccak256(id)) - 1n)
  );

  return kecUintKec;
}

extendEnvironment((hre) => {
  hre.getHash = getHash;
});
