'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { formatDate, formatNumber } from '@/lib/utils';
import { formatEther } from 'ethers';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [transactions, setTransactions] = useState<any>();
  const {
    account: { address, provider }
  } = useContractContext();

  // console.log(address);

  async function getTransactions(provider: any, address: any) {
    setIsLoading(true);
    let transactions = await new EventWise(provider, address).viewPremiumPayments();
    setTransactions(transactions);
    setIsLoading(false);
  }

  useEffect(() => {
    if (provider && address) {
      getTransactions(provider, address);
    }
  }, [provider, address]);

  return (
    <>
      <section className="mb-6 flex w-full items-start gap-6 rounded-lg bg-[#EAEAEA] px-4 py-6">
        <div className=" space-y-2">
          <h4>Last premium payment status</h4>
          <dl className="text- 0.75rem] flex space-x-2 font-normal">
            <dt className="font-medium">Last Payment Date:</dt>
            <dd>October 15 - 17, 2023</dd>
          </dl>
          <dl className="text- 0.75rem] flex space-x-2 font-normal">
            <dt className="font-medium">Amount Paid:</dt>
            <dd>$0.00</dd>
          </dl>
        </div>
        <div className="space-y-2">
          <h4>Upcoming payment date</h4>
          <p className="text- 0.75rem] flex space-x-2 font-normal">
            Your next payment of $500.00 is due on November 15, 2023
          </p>
        </div>
      </section>

      <section className="w-full max-w-[570px]">
        <ul className="my-6 flex w-full  items-start justify-between">
          <li className="text[1.125rem] font-medium">Payment date</li>
          <li className="text[1.125rem] font-medium">Payment amount</li>
          <li className="text[1.125rem] font-medium">Status</li>
        </ul>

        {transactions && transactions.length === 0 ? (
          <p>You do not have any transaction</p>
        ) : (
          <>
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <div key={index} className="mb-6 flex w-full items-start justify-between py-2">
                    <Skeleton className="h-[20px] w-[120px]" />
                    <Skeleton className="h-[20px] w-[120px]" />
                    <Skeleton className="h-[20px] w-[120px]" />
                  </div>
                ))
              : transactions &&
                transactions.map((transaction: any, key: any) => (
                  <div key={key}>
                    <TransactionItem
                      date={transaction.date}
                      amount={formatNumber(formatEther(transaction.amount))}
                      status={'paid'}
                    />
                  </div>
                ))}
          </>
        )}

        {/* <TransactionItem date="October 15 - 17, 2023" amount={'500'} status={'pending'} />
        <TransactionItem date="October 15 - 17, 2023" amount={'500'} status={'pending'} /> */}
      </section>
    </>
  );
}

type TransactionItemProp = {
  date: string;
  amount: any;
  status: any;
};

const TransactionItem = ({ date, amount, status }: TransactionItemProp) => (
  <ul className="mb-6 flex  w-full items-start justify-between border-b py-2">
    <li className="text[1.125rem]">{formatDate(date)}</li>
    <li className="text[1.125rem]">${amount}</li>
    <li className="text[1.125rem]">{status}</li>
  </ul>
);
