pragma solidity ^0.4.24;

contract FundoICO {
    address public owner;
    
    event TokenComprado(address comprador);
    
    constructor(address dono) public {
        owner = dono;
    }
    
    modifier apenasDono() {
        require(msg.sender == owner);
        _;
    }
    
    function() public payable {
        emit TokenComprado(tx.origin);   
    }
    
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function kill() public apenasDono {
        selfdestruct(owner);
    }
    
}