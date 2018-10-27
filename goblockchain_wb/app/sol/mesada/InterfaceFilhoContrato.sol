pragma solidity ^0.4.24;

contract InterfaceFilhoContrato {
    event MesadaRecebida();
    event MesadaSacada();
    function getNome() external view returns(string nome);
    function sacar() public returns(bool);
    function verificarSaldo() public view returns(uint256);
}