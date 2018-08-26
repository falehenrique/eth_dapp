// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//geth --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

//load
window.addEventListener('load', function() {
    // conexaoURL();
    conexaoMetamask();
    checkWeb3();
    carregarToken();
});

function conexaoURL() {
    // var urlNode = 'http://127.0.0.1:7545';
    var urlNode = 'http://localhost:8080';
    window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
}

function conexaoMetamask() {
    window.web3 = new Web3(web3.currentProvider)
}

//Check the web3 connection
function checkWeb3(){
    // Set the connect status on the app
    if (web3 && web3.isConnected()) {
        console.info('Connected');
        $('#no_status').text("Conectado");
        // Set version
        setWeb3Version();
        checkNodeStatus();
    } else {
        console.info('Not Connected');
        $('#no_status').text("Desconectado");
    }
}

//Get web3 version
function setWeb3Version() {
    var versionJson = {};
    // Asynchronous version
    web3.version.getNode(function(error, result){
        if(error){
            console.info(error);
        } else {
            $('#versionGeth').text(result);
            console.info(result);
        }
    });
}

//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    web3.net.getListening(function(error, result){
        if(error) {
            console.info('get_peer_count ' + error);
        } else {
            // get the peer count
            web3.net.getPeerCount(  function(  error,  result ) {
                if(error){
                    console.info('get_peer_count ' + error);
                } else {
                    $('#nodes').text(result);
                    console.info('Peer Count: ' + result);
                }
            });
            listAccounts();
        }
    });
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
    })
}

$("#btnBalance").click(function() {
    var account = $("#account").val();
    web3.eth.getBalance(account, web3.eth.defaultBlock, function(error, result) {
        if(error){
            console.error('getBalance ' + error);
        } else {
            console.info(result);
            var balance = web3.fromWei(result, 'ether').toFixed(2);
            // var balance = result;
            $("#accountBalance").val(balance);
        }
    })
})


$("#btnSendEther").click(function() {
    var from = $("#from").val();
    var to = $("#to").val();
    var value = $("#valueToSend").val();

    var transacao = {
        "from": from,
        "to": to,
        "value": web3.toWei(value, 'ether'),
        "gas": 300000
    }
    
    web3.eth.sendTransaction(transacao, function(error, result) {
        if(error){
            console.error('sendTransaction ' + error);
        } else {
            console.info(result);
            $("#labelResultSendEther").text(result);
        }
    })
})

$("#btnTransaction").click(function() {
    var transacao = $("#transaction").val();
    web3.eth.getTransactionReceipt(transacao, function (error, result) {
        console.log(result.status);
        $("#resultTransaction").val(JSON.stringify(result, null, '\t' ));
    });
})

// var endereco
var enderecoToken = "0x2378fbe23856507843da0c92ce7498ecf11cc3d8";
var abiToken = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_qtd","type":"uint8"}],"name":"comprarTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundoICO","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenPrice","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];

function carregarInstanciaToken() {
    var TokenContrato = web3.eth.contract(abiToken);
    var TokenInstance = TokenContrato.at(enderecoToken);
    return TokenInstance;
}

function carregarToken() {
    var instance = carregarInstanciaToken();

    web3.eth.getAccounts(function (error, result) {

        instance.balanceOf(result, function (error, saldo) {

            instance.symbol(function (error, symbol) {
                $("#quantidade").val(symbol + " " + saldo);
            });

        });

    });

    instance.tokenPrice(function (error, valor) {
        $("#valorToken").val(valor);
    });

}

function transferirTokens() {
    var endereco = $("#transferirPara").val();
    var quantidade = $("#quantidadeTransferir").val();
    var instance = carregarInstanciaToken();

    instance.transfer.sendTransaction(endereco, quantidade, function (error, result) {
       console.info(result); 
    });
}

function consultarTokens() {
    var endereco = $("#enderecoPessoa").val();
    var instance = carregarInstanciaToken();

    instance.balanceOf(endereco, function (error, result) {
       console.info(result); 
       $("#quantidadePessoa").val(result);
    });
}

function comprarTokens() {
    let quantidadeComprar = $("#quantidadeComprar").val();
    let valorToken = $("#valorToken").val();    
    let instance  = getInstanceToken();

    var tx = {
        value: quantidadeComprar * valorToken,
        gas: "470000"
    }

    instance.comprarTokens.sendTransaction(quantidadeComprar, tx, function(error, result){
        if (error) {
            alert("Ocorreu um erro " + error);
        } else {
            console.info(result);
        }
    });
}


// web3.eth.getTransactionReceipt(hash [, callback])