pragma solidity ^0.4.24;

import "./StandardToken.sol"; 

contract MeuToken is StandardToken {
    string public name = "GOBlockchain";
    string public symbol = "GBC";
    uint256 public constant decimals = 2;
    uint256 public INITIAL_SUPPLY = 500 * (10 ** decimals);

    uint256 public tokenPrice = 1;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function salesToken(uint8 _qtd) public payable {
        require(_qtd > 0, "Valor maior que zero");
        require(msg.value > 0, "Ether maior que zero");
        require((_qtd * tokenPrice) >= msg.value, "Valor enviado maior que o valor solicitado");
        require(balances[owner] >= _qtd, "Balanço de saldo precisa ser maior que a quantidade");

        balances[owner] = balances[owner].sub(_qtd);
        balances[msg.sender] = balances[msg.sender].add(_qtd);

        address(owner).transfer(msg.value);

        emit Transfer(owner, msg.sender, _qtd);
    }

    function changePrice(uint256 _tokenPrice) public onlyOwner {
        tokenPrice = _tokenPrice;
    }
}