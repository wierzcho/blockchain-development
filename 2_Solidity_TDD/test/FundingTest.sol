// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/Funding.sol";
import "truffle/DeployedAddresses.sol";

contract FundingTest {
  function testSettingAnOwnerOfDeployedContract() public {
    Funding funding = Funding(DeployedAddresses.Funding());
    assert(funding.owner() == msg.sender);
  }
}