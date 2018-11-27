pragma solidity ^0.4.24;

import "./InterfaceERC20.sol";

contract StandardTokenERC20 is InterfaceERC20 {

    function transfer(address to, uint256 value) public {
        to.transfer(value);
    }
}