'use client';

import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import EventWise from './lib/EventWise';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

declare global {
  interface Window {
    ethereum?: any;
    web3: any;
  }
}

export interface IAccount {
  address: string;
  provider: any;
  isAuthenticated: boolean;
}

export interface ContractState {
  account: IAccount;
}

const initialState: ContractState = {
  account: {
    address: '',
    provider: null,
    isAuthenticated: false
  }
};

const ContractContext = createContext<any | null>(initialState);

export interface ContractProps extends React.PropsWithChildren {}

export default function ContractProvider({ children }: ContractProps) {
  const router = useRouter();
  const [account, setAccount] = useState<IAccount>(initialState.account);

  /**
   * Connect user wallet and sign up user
   */
  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast.warning('No ethereum wallet found, Please install metamask');
        return;
      }

      if (ethereum) {
        window.web3 = new Web3(ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }

      await confirmUserNetwork();

      let address = await getAddress();
      const provider = await loadProvider();

      const policy = await new EventWise(provider, address).viewPolicy(address);

      console.log(policy);
      // console.log({ address });
      // return address;

      // const accounts: any = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];

      setAccount({
        ...initialState.account,
        address,
        provider,
        isAuthenticated: true
      });
      toast.success('Connected!');
    } catch (error: any) {
      toast.error('Please connect your wallet');
      return;
    }
  }, []);

  // Disconnect wallet
  const disconnect = async () => {
    setAccount(initialState.account);

    localStorage.removeItem('chain_network');
  };

  const _updateWalletConnection = useCallback(async () => {
    try {
      // const { ethereum } = window;
      // const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      let address = await getAddress();
      const provider = await loadProvider();

      if (!address) {
        disconnect();
        return;
      }

      setAccount({
        ...initialState.account,
        address,
        provider,
        isAuthenticated: true
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    _updateWalletConnection();
    router.refresh();
  }, [_updateWalletConnection, router]);

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      setAccount({ ...account, address: accounts[0] });
    });

    window.ethereum.on('networkChanged', (network: string) => {
      setAccount({ ...account });

      window.location.reload();
    });

    window.ethereum.on('disconnect', disconnect);

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, [account, router]);

  const contextValue = useMemo(() => {
    return { account, connectWallet, disconnect };
  }, [account, connectWallet, disconnect]);

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
}

export const useContractContext = () => useContext(ContractContext);

async function confirmUserNetwork() {
  const { ethereum } = window;

  if (!ethereum) {
    toast.error('Not web3 Browser. Install MetaMask!');
    return;
  }
  let userChainId = await ethereum.request({ method: 'eth_chainId' });
  toast.warning('User is connected to chain ' + userChainId);

  // console.log('chainId', userChainId);

  // String, hex code of the chainId of the  network
  let ChainId = '0xaa36a7';

  if (userChainId !== ChainId) {
    toast.error('You are not connected to the Sepolia Network!');
    // console.log('You are not connected to the Sepolia Network!');
    return;
  } else {
    toast.success('Connected to Sepolia Network');
    // console.log('Connected to Sepolia Network');
    return;
  }
}

const getAddress = async () => {
  const accounts = await window.web3.eth.getAccounts();
  return accounts[0];
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
