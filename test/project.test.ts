// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Hash of 'hello' should return 0xd9c...", async function () {
      const result = await this.hre.getHash("hello");
      assert.equal(
        result,
        "0xd9ce4ddf4612212cce747861d797e4673537b3bd39bbf004b69b2bc28b58c2c0"
      );
    });
  });
});
