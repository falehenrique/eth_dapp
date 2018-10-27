pragma solidity ^0.4.24;

import "./InterfaceFilhoContrato.sol";

contract FilhoContrato is InterfaceFilhoContrato {
    string nome;
    address enderecoCarteira;

    constructor(string _nome, address _endereco) public {
        nome = _nome;
        enderecoCarteira = _endereco;
    }
    
    function() public payable{
        emit MesadaRecebida();    
    }
    
    function getNome() view external returns(string) {
        return nome;
    }
    
    function sacar() public returns(bool){
        require (enderecoCarteira == msg.sender);
        address(enderecoCarteira).transfer(address(this).balance);
        emit MesadaSacada();
        return false;
    }
    
    function verificarSaldo() public view returns(uint256) {
        return address(this).balance;
    }
    
}