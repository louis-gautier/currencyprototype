var contract;
const CB = "0x803AD8DaBf3906D2FABeAdD04A92E8f00d706361";
$(document).ready(function()
{
    web3=new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/caef7ce620e040a19bcf5e52f4dfcf1c"));
var address = "0xae721eE03fF85c5Df0dEDCaB7dcc22AB5687e67d";
var abi = [
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
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
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
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
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
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
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
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
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
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "_totalSupply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
        contract=new web3.eth.Contract(abi, address);
        contract.methods.totalSupply().call().then(function(tot){
            $('#totalSupply').html(tot);
        })
        const deposit = document.getElementById('deposit');
        var amount = document.getElementById('amount');
        deposit.addEventListener('click', async () => {
            //we use eth_accounts because it returns a list of addresses owned by us.
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            var amt=0;
            amt=parseInt(amount.value);
            var acc = accounts[0];
			const transferFunction = contract.methods.transfer(acc,amt);
			//const gas = await transferFunction.estimateGas({from: acc});
			//window.alert(gas);
			const gasPrice = await web3.eth.getGasPrice();
			const data = transferFunction.encodeABI();
			const nonce = await web3.eth.getTransactionCount(acc);
			const transactionParameters = {
				nonce: nonce, // ignored by MetaMask
				gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
				//gas: gas, // customizable by user during MetaMask confirmation.
				to: address, // Required except during contract publications.
				from: acc, // must match user's active address.
				//value: '0x00', // Only required to send ether to the recipient from the initiating external account.
				data:data // Optional, but used for defining smart contract creation and interaction.
			  };
			  
			  // txHash is a hex string
			  // As with any RPC call, it may throw an error
			  const txHash = await ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			  });
            window.alert("wow");
    })

})