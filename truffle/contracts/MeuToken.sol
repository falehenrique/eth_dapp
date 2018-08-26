pragma solidity 0.4.24;

import "./StandardToken.sol";
import "./FundoICO.sol";

contract MeuToken is StandardToken {
    string public name;
    string public symbol;
    uint256 public constant decimals = 2;
    uint256 public constant INITIAL_SUPPLY = 500 * (10 ** decimals);
    
    uint256 public tokenPrice;
    address public owner;
    FundoICO public fundoICO;
    
    constructor(uint256 _tokenPrice) public {
        name = "MeuToken";   
        symbol = "$";
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        tokenPrice = _tokenPrice;
        owner = msg.sender;
        fundoICO = new FundoICO();
    }

    function comprarTokens(uint8 _qtd) public payable {
        require(_qtd > 0);
        require(msg.value > 0);
        require(msg.value == (_qtd * tokenPrice));
        
        balances[owner] = balances[owner].sub(_qtd);
        balances[msg.sender] = balances[msg.sender].add(_qtd);
        address(fundoICO).transfer(msg.value);
        
        emit Transfer(owner, msg.sender, _qtd);
    }

}