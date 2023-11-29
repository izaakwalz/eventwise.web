'use client';

import Web3 from 'web3';
import { useRouter } from 'next/navigation';
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

export default function ContractProvider({ children }: ContractProps) {}
