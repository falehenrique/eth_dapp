pragma solidity ^0.4.24;

import "../libs/StringUtils.sol";

contract ContaCorrenteMuseu {
    using StringUtils for string;

    string public nome = "GBC";
    address public responsavel = msg.sender;

    mapping (bytes32=>uint256) doacaoQuadros;    

    event DoacaoRealizada(address _doador);
    event SaqueEfetuado(address _sacador);
    event DoacaoRecebidaQuadro(string _quadro);

    function() public payable {
        emit DoacaoRealizada(msg.sender);
    }

    function receberDoacaoQuadro(string _quadro) public payable {
        bytes32 hashQuadroByte32 = _quadro.stringToBytes32();
        doacaoQuadros[hashQuadroByte32] = ( doacaoQuadros[hashQuadroByte32] + msg.value);
        emit DoacaoRecebidaQuadro(_quadro);
    }

    function saldoQuadro(string _quadro) public view returns(uint256) {
        require(doacaoQuadros[_quadro.stringToBytes32()] != 0x0, "Quandro deve ser válido");
        return doacaoQuadros[_quadro.stringToBytes32()];
    }

    function consultarSaldoTotal() public view returns(uint) {
        return address(this).balance;
    }

    function saqueContaCorrente(uint256 _valorSaque) public {
        require(msg.sender == responsavel, "Somente responsavel pode realizar o saque.");
        assert(_valorSaque <= address(this).balance);
        address(msg.sender).transfer(_valorSaque);

        emit SaqueEfetuado(msg.sender);
    }
}
