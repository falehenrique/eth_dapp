var abi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"comprador","type":"address"}],"name":"TokenComprado","type":"event"}];
// var abi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"}],"name":"buyedToken","type":"event"}];

function carregarInstanciaFundo() {
    var FundoContrato = web3.eth.contract(abi);
    var FundoInstance = FundoContrato.at($("#enderecoContratoFundo").val());
    return FundoInstance;
}

function carregarFundo() {
    var instance = carregarInstanciaFundo();
    instance.getBalance(function(error, result){
        $("#saldo").val(result);
    });
    instance.owner(function(error, result){
        $("#responsavel").val(result);
    });
    startEvents();
}

function startEvents() {
    var instance = carregarInstanciaFundo();
    var evento  = instance.TokenComprado();
    evento.watch(function(error, result){
        console.info(result);
        $("#compras").val("Token comprado por: " + result.args.comprador);
    });
}