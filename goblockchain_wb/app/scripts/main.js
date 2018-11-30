// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//geth --dev --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

//load
window.addEventListener('load', function() {
    //abrir conexao
    // conexaoURL();
    conexaoMetamask();

    checkWeb3();

});

function conexaoURL() {
    //
    var urlNode = "http://localhost:8545";
    window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
}

function conexaoMetamask() {
    //
    window.web3 = new Web3(web3.currentProvider)
}

//Check the web3 connection
function checkWeb3(){
    //
    if(web3 && web3.isConnected()) {
        $('#no_status').text("Conectado");
        console.info("Conectado");
        
        setWeb3Version();
        checkNodeStatus();

    } else {
        $('#no_status').text("Desconectado");
        console.info("Não Conectado");        
    }
}

//Get web3 version
function setWeb3Version() {
    //
    web3.version.getNode(function(error, result){
        if (error) {
            console.info(error);
        } else {
            $("#versionGeth").text(result);
            console.info(result);
        }
    });
}

//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    web3.net.getListening(function(error, result) {
        if(error) {
            console.error(error);
        } else {
            web3.net.getPeerCount(function(error, result) {
                if(error) {
                    console.error(error);
                } else {
                    console.info(result);
                    $("#nodes").text(result);
                }                
            });
            listAccounts();
        }
    })
}

function listAccounts() {
    web3.eth.getAccounts(function(error, result) {
        if(error){
            console.info('accounts ' + error);
        } else {
            var accounts = result;
            $('#sizeAccounts').text(result.length);

            var accounts_ul = $("#accounts_ul");
            accounts_ul.empty;

            for (var i = 0;  i < accounts.length; i++) {
                accounts_ul.append('<li>' + result[i] + "</li>");
            }
        }
    });
}

$("#btnBalance").click(function() {
    //
    var account = $("#account").val();
    console.info(account);
    web3.eth.getBalance(account, function(error, result) {
        if(error) {
            console.error(error);
        } else {
            $("#accountBalance").val(web3.fromWei(result, 'ether').toFixed(2));
        }
    });
})


$("#btnSendEther").click(function() {
    var from = $("#from").val();
    var to = $("#to").val();
    var value = $("#valueToSend").val();

    var transacao = {
        "from": from,
        "to" : to,
        "value" : web3.toWei(value, "ether"),
        "gas" : 30000
    }

    web3.eth.sendTransaction(transacao, function (error, result) {
        console.info(result);
       $("#labelResultSendEther").text(result);
    });
})



$("#btnTransaction").click(function() {
    var transacao = $("#transaction").val();
    web3.eth.getTransactionReceipt(transacao, function (error, result) {
        console.log(result.status);
        $("#resultTransaction").val(JSON.stringify(result, null, '\t' ));
    });
})

// var endereco
var enderecoToken = "0x71664261dd1b6ffa4a79f4112a4096c5c1fba4b5";
var abiToken = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "INITIAL_SUPPLY",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokenPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_qtd",
        "type": "uint8"
      }
    ],
    "name": "salesToken",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_tokenPrice",
        "type": "uint256"
      }
    ],
    "name": "changePrice",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function carregarInstanciaToken() {
    
    var tokenContrato = web3.eth.contract(abiToken);

    var TokenInstance = tokenContrato.at(enderecoToken);

    return TokenInstance;
}
carregarToken();
function carregarToken() {
    var instance = carregarInstanciaToken();

    instance.totalSupply(function(error, result){
        $("#totalSupply").text(result)
    });

    instance.name(function(error, result){
      $("#nomeToken").text(result)
    });

    instance.tokenPrice(function(error, result){
      $("#valorToken").text(result)
    });      

    instance.symbol(function (error, symbol) {
      $("#simbol").text(symbol);
    })    

    web3.eth.getAccounts(function (error, result) {
      instance.balanceOf(result, function (error, saldo) {
          $("#meuSaldo").text(saldo)
      });
    });
}

function transferirTokens() {
  var instance = carregarInstanciaToken();

  var to = $("#transferirPara").val();
  var value = $("#quantidadeTransferir").val();

  instance.transfer.sendTransaction(to, value, function(error, result) {
    console.info(result);
  });
}

function consultarTokens() {
    var instance = carregarInstanciaToken();

    var endereco = $("#enderecoPessoa").val();
    instance.balanceOf(endereco, function (error, saldo) {
      $("#quantidadePessoa").text(saldo)
    });
}

function comprarTokens() {
    var instance = carregarInstanciaToken();

    var quantidadeComprar = $("#quantidadeComprar").val();
    var valorToken = $("#valorToken").text();

    var transacao = {
      value : quantidadeComprar * 1,
      gas: "400000",
      data: "GBC"
    }
    console.info(transacao);

    instance.salesToken.sendTransaction(quantidadeComprar, transacao, function(error, result) {
      console.info(result);
    });  
}

function kill() {
  var instance = carregarInstanciaToken();

  instance.kill.sendTransaction(function(error, result) {
    console.info(result);
  });
}


// web3.eth.getTransactionReceipt(hash [, callback])

