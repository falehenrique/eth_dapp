// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//geth --dev --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

//load
window.addEventListener('load', function() {
    //
});

function conexaoURL() {
    //
}

function conexaoMetamask() {
    //
}

//Check the web3 connection
function checkWeb3(){
    //
}

//Get web3 version
function setWeb3Version() {
    //
}

//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    //
}

function listAccounts() {
    //
}

$("#btnBalance").click(function() {
    //
})


$("#btnSendEther").click(function() {
    //
})

$("#btnTransaction").click(function() {
    var transacao = $("#transaction").val();
    web3.eth.getTransactionReceipt(transacao, function (error, result) {
        console.log(result.status);
        $("#resultTransaction").val(JSON.stringify(result, null, '\t' ));
    });
})

// var endereco
var enderecoToken = "";
var abiToken = [];

function carregarInstanciaToken() {
    //
    return TokenInstance;
}

function carregarToken() {
    //

}

function transferirTokens() {
    //
}

function consultarTokens() {
    //
}

function comprarTokens() {
    //
}


// web3.eth.getTransactionReceipt(hash [, callback])