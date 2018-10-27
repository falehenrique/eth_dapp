// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//geth --dev --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

//load
window.addEventListener('load', function() {
    //abrir conexao
    conexaoURL();
    // conexaoMetamask();

    checkWeb3();

});

function conexaoURL() {
    //
    var urlNode = "HTTP://127.0.0.1:7545";
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