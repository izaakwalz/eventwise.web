'use client';

import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import EventWise from '@/lib/EventWise';
import { getAddress, getChainID, loadProvider } from '@/lib/web3-utils';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IAccount {
  address: string;
  provider: any;
  isNetwork: boolean;
  isAuthenticated: boolean;
}

const initialState: IAccount = {
  address: '',
  provider: null,
  isNetwork: false,
  isAuthenticated: false
};

export interface ContractProps {
  children: React.ReactNode;
}

const ContractContext = createContext<any | null>(initialState);

export const useContractContext = () => useContext(ContractContext);

export default function ContractProvider({ children }: ContractProps) {
  const router = useRouter();
  const [account, setAccount] = useState<IAccount>(initialState);
  const ChainId = '0xaa36a7'; // String, hex code of the chainId of the  network

  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast.error('No ethereum wallet found, Please install metamask');
        return;
      }

      if (ethereum) {
        window.web3 = new Web3(ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }

      const provider = await loadProvider();
      const address = await getAddress();
      const userChainID = await getChainID();

      // const policy = await new EventWise(provider, address).viewPolicy();

      if (userChainID !== ChainId) {
        setAccount({
          ...initialState,
          address,
          isAuthenticated: true,
          isNetwork: false
        });
      }

      // if (userChainID === ChainId) {
      //   router.push('/register');
      // }

      setAccount({
        ...initialState,
        address,
        provider,
        isNetwork: true,
        isAuthenticated: true
      });
    } catch (error: any) {
      if (error.code === 4001) {
        toast.error('Please connect your wallet');
        return;
      }
    }
  }, []);

  // Disconnect wallet
  const disconnect = async () => {
    setAccount(initialState);
  };

  useEffect(() => {
    connectWallet();
    // router.refresh();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      setAccount({ ...account, address: accounts[0] });
    });

    window.ethereum.on('networkChanged', (network: string) => {
      setAccount({ ...account });
      window.location.reload();
    });

    window.ethereum.on('disconnect', () => {
      setAccount(initialState);
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, [account, router]);

  const contextValue = useMemo(() => {
    return { account, connectWallet, disconnect };
  }, [account, connectWallet]);

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
}
