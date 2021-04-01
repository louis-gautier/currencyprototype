const forwarderOrigin = 'http://localhost:9010'

const initialize = () => {
   
  //Basic Actions Section
  const onboardButton = document.getElementById('connectButton');
  const getAccountButton = document.getElementById('getAccount');
  const getAccountResult = document.getElementById('getAccountResult');

  //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const onClickConnect = async () => {
      try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error(error);
      }
    };
  
    const MetaMaskClientCheck = () => {
      //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            window.alert("Installe Metamask !");
        } else {
            //If it is installed we change our button text
            onboardButton.innerText = 'Connect';
            //When the button is clicked we call this function to connect the users MetaMask Wallet
            onboardButton.onclick = onClickConnect;
            //The button is now disabled
            onboardButton.disabled = false;
        }
    };
    MetaMaskClientCheck();
    getAccountButton.addEventListener('click', async () => {
      //we use eth_accounts because it returns a list of addresses owned by us.
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      //We take the first address in the array of addresses and display it
      getAccountResult.innerHTML = accounts[0] || 'Not able to get accounts';
    });
  };
window.addEventListener('DOMContentLoaded', initialize)