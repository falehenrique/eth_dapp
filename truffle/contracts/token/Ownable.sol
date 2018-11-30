pragma solidity ^0.4.24;

contract Ownable {
    address public owner = msg.sender;

    modifier onlyOwner() {
        require(msg.sender == owner, "Somente dono.");
        _;
    }

    function kill() public onlyOwner {
        selfdestruct(owner);
    }
}
