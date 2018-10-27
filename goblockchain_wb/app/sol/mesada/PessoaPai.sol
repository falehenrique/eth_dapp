pragma solidity ^0.4.24;

import "./InterfaceFilhoContrato.sol";
import "./FilhoContrato.sol";
import "./DonoContrato.sol";

contract PessoaPai is DonoContrato {

    uint public idade;
    string nome;
    string email;

    InterfaceFilhoContrato[] public filhoContrato;
    
    event emailAlterado(address adr,string email);
    
    constructor(uint _idade, string _nome) public {
        idade = _idade;
        nome = _nome;
    }

    function enviarMesada(address _filho) public payable apenasDono {
        FilhoContrato filho = FilhoContrato(_filho);
        
        address(filho).transfer(msg.value);
    }
    

    function adicionarFilho(address _address, string _nome) public apenasDono {
        InterfaceFilhoContrato filho = new FilhoContrato(_nome, _address);
        //criar evento que recebe o endereco do filho criado
        filhoContrato.push(filho);
    }
    
    function consultarContratoFilho(address _enderecoContratoFilho) public view returns(string){
        InterfaceFilhoContrato filho = FilhoContrato(_enderecoContratoFilho);
        return filho.getNome();
    }    

    function alterarEmail(string _email) public apenasDono {
        
        email = _email;
        emit emailAlterado(msg.sender,_email);
    }

   
}