pragma solidity ^0.4.24;

contract DonoContrato {
    address public endereco;
    
    constructor() public {
        endereco = msg.sender;
    }
    
    modifier apenasDono() {
        require(msg.sender == endereco);
        _;
    }
    
    function destruirContrato() public apenasDono {
        selfdestruct(endereco);    
    }
}