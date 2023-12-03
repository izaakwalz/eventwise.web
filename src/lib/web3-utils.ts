'use client';

import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
    web3: any;
  }
}

export async function getAddress() {
  const accounts = await window.web3.eth.getAccounts();
  return accounts[0];
}

export const getChainID = async () => {
  const { ethereum } = window;
  const chain = await ethereum.request({ method: 'eth_chainId' });
  return chain;
};

export async function loadProvider() {
  const { ethereum } = window;

  if (!ethereum) {
    console.log('Install browser wallet.');
    return;
  }

  if (ethereum) {
    window.web3 = new Web3(ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  }
  return window.web3;
}

// const connectWallet = useCallback(async () => {
//   try {
//     const { ethereum } = window;

//     if (!ethereum) {
//       toast.error('No ethereum wallet found, Please install metamask');
//       return;
//     }

//     if (ethereum) {
//       window.web3 = new Web3(ethereum);
//       await window.ethereum.enable();
//     } else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider);
//     }

//     let ChainId = '0xaa36a7'; // String, hex code of the chainId of the  network
//     let address = await getAddress();
//     const provider = await window.web3;
//     const userChainID = await ethereum.request({ method: 'eth_chainId' });

//     if (userChainID !== ChainId) {
//       setAccount({
//         ...initialState.account,
//         address,
//         provider: null,
//         isAuthenticated: true,
//         isNetwork: false
//       });
//     }

//     const policy = await new EventWise(provider, address).viewPolicy(address);

//     if (policy?.isExist === false) {
//       router.push('/register');
//     }

//     setAccount({
//       ...initialState.account,
//       address,
//       provider,
//       isNetwork: true,
//       isAuthenticated: true
//     });
//     router.push('/dashboard');
//   } catch (error: any) {
//     if (error.code === 4001) {
//       toast.error('Please connect your wallet');
//       return;
//     }
//   }
// }, []);
