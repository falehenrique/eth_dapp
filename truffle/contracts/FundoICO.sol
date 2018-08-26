pragma solidity ^0.4.24;

contract FundoICO {
    address public owner;
    
    event TokenComprado(address comprador);
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier apenasDono() {
        require(msg.sender == owner);
        _;
    }
    
    function() public payable {
        emit TokenComprado(msg.sender);   
    }
    
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function kill() public apenasDono {
        selfdestruct(owner);
    }
    
}