var contract;
const CB = "0x803AD8DaBf3906D2FABeAdD04A92E8f00d706361";
$(document).ready(function()
{
    web3=new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/caef7ce620e040a19bcf5e52f4dfcf1c"));

var address = "0x29F664fB43Ba768BfDF5F4f8Cd2aF85e5Fd93340";


		var abi=[
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
						"name": "success",
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
				"name": "getOwnerAddress",
				"outputs": [
					{
						"name": "ownad",
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
				"name": "balanceOfSender",
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
			}
		]
        contract=new web3.eth.Contract(abi, address);
        const pay = document.getElementById('pay');
		const solde = document.getElementById('solde');
		var amountEURXCN = document.getElementById('amountEURXCN');
		const withdrawXCN = document.getElementById('withdrawXCN');
		const amountXCNEUR = document.getElementById('amountXCNEUR');
		const payXCN = document.getElementById('payXCN');
		var amount = document.getElementById('amount');
		var destination = document.getElementById('destination');
		const transfer = document.getElementById('transfer');
		var acc;
		async function comptes(){
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			acc = accounts[0];
			contract.methods.balanceOf(acc).call().then(function(tot){
				solde.innerHTML = tot + " XCN";
			})
		}
	
		comptes();
		
        pay.addEventListener('click', async () => {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
			var owner = await contract.methods.getOwnerAddress().call();
            var amt=0;
            amt=parseInt(amountEURXCN.value);
            var acc = accounts[0];
			const approveFunction = contract.methods.approve(acc,amt);
			const gas = await approveFunction.estimateGas({from: acc});
			const gasPrice = await web3.eth.getGasPrice();
			const data = approveFunction.encodeABI();
			const nonce = await web3.eth.getTransactionCount(acc);
			const transactionParameters = {
				nonce: nonce.toString(), // ignored by MetaMask
				gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
				gas: gas.toString(), // customizable by user during MetaMask confirmation.
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
		})
		withdrawXCN.addEventListener('click', async () => {	
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			var amt=0;
            amt=parseInt(amountEURXCN.value);
			var owner = await contract.methods.getOwnerAddress().call();
			var acc = accounts[0];
			  const transferFromFunction = contract.methods.transferFrom(owner,acc,amt);
			  const gas = await transferFromFunction.estimateGas({from: acc});
			  const gasPrice2 = await web3.eth.getGasPrice();
			  const data2 = transferFromFunction.encodeABI();
			  const nonce2 = await web3.eth.getTransactionCount(acc);
			  const transactionParameters2 = {
				  nonce: nonce2.toString(), // ignored by MetaMask
				  gasPrice: gasPrice2, // customizable by user during MetaMask confirmation.
				  gas: gas.toString(), // customizable by user during MetaMask confirmation.
				  to: address, // Required except during contract publications.
				  from: acc, // must match user's active address.
				  //value: '0x00', // Only required to send ether to the recipient from the initiating external account.
				  data:data2 // Optional, but used for defining smart contract creation and interaction.
				};
			
				// txHash is a hex string
				// As with any RPC call, it may throw an error
				const txHash2 = await ethereum.request({
				  method: 'eth_sendTransaction',
				  params: [transactionParameters2],
				});
    })
	payXCN.addEventListener('click', async () => {	
		var owner = await contract.methods.getOwnerAddress().call();
		const accounts = await ethereum.request({ method: 'eth_accounts' });
		var amt=0;
		amt=parseInt(amountXCNEUR.value);
		var acc = accounts[0];
		const XCNtoEUR = contract.methods.transfer(owner,amt);
		const gas = await XCNtoEUR.estimateGas({from: acc});
		const gasPrice = await web3.eth.getGasPrice();
		const data = XCNtoEUR.encodeABI();
		const nonce = await web3.eth.getTransactionCount(acc);
		const transactionParameters = {
			nonce: nonce.toString(), // ignored by MetaMask
			gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
			gas: gas.toString(), // customizable by user during MetaMask confirmation.
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
	})

	transfer.addEventListener('click', async () => {
		const accounts = await ethereum.request({ method: 'eth_accounts' });
		var amt=0;
		amt=parseInt(amount.value);
		dest = destination.value;
		var acc = accounts[0];
		const tr = contract.methods.transfer(dest,amt);
		const gas = await tr.estimateGas({from: acc});
		const gasPrice = await web3.eth.getGasPrice();
		const data = tr.encodeABI();
		const nonce = await web3.eth.getTransactionCount(acc);
		const transactionParameters = {
			nonce: nonce.toString(), // ignored by MetaMask
			gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
			gas: gas.toString(), // customizable by user during MetaMask confirmation.
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
	})


})