$(".contractAddress").text(contract_address);

window.addEventListener('load', () => {
	if(typeof(web3) === 'undefined') {
		return console.log("Metamask is not installed");
	}
	
	var account =
	web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
		? web3.eth.accounts[0]
		: '0x0000000000000000000000000000000000000001';
		
	contract = web3.eth.contract(abi).at(contract_address);
});

if (window.ethereum !== undefined) {
	window.ethereum.enable();
};

function buy() {
	if ($("#lgeKey").val() == "") {
		$("#lgeKey").css('box-shadow', '0px 0px 10px #CC0000');
		$("#lgeKey").attr("placeholder", "INPUT KEY!");
		return;
	} else {
		$("#lgeKey").css('box-shadow', '0px 0px 0px #CC0000');
	}
	
	if ($("#lgeAmount").val() == "") {
		$("#lgeAmount").css('box-shadow', '0px 0px 10px #CC0000');
		$("#lgeAmount").attr("placeholder", "INPUT AMOUNT!");
		return;
	} else {
		$("#lgeAmount").css('box-shadow', '0px 0px 0px #CC0000');
	}
	
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	var key = $("#lgeKey").val();
	var amount = $("#lgeAmount").val();
	if (amount.lastIndexOf(".") != -1) {
		var dotPos = amount.lastIndexOf(".");
		var amountOfZeroesNeeded = 18 - (amount.length - (dotPos+1));
		for (i = 0; i < amountOfZeroesNeeded; i++) {
			amount = amount.concat("0");
		}
		amount = amount.replace(/[^-+\d]/g, "")
	} else {
		if (amount.length < 18) {
			amount = amount.concat("000000000000000000");
		}
	}
	
	contract.buyTokens.sendTransaction(key, {
		from: web3.eth.accounts[0],
		value: amount/100
	 },function(error , result){
		 if(!error)
			 console.log(result);
		 else
			 console.log(error.code)
	});
}