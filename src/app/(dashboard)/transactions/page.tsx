'use client';

import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { useEffect, useState } from 'react';

export default function Page() {
  const [transactions, setTransactions] = useState<any>();
  const {
    account: { address, provider }
  } = useContractContext();

  // console.log(address);

  // const events = new EventWise(provider && provider, address && address).viewUserEvents();

  // async function getEvents(provider: any, address: any) {
  //   let events = await new EventWise(provider, address).();
  //   setEvents(events);
  // }

  useEffect(() => {
    if (provider && address) {
      setTransactions([]);
    }
  }, [provider, address]);

  console.log(transactions);

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

        <TransactionItem date="October 15 - 17, 2023" amount={'500'} status={'pending'} />
        <TransactionItem date="October 15 - 17, 2023" amount={'500'} status={'pending'} />
        <TransactionItem date="October 15 - 17, 2023" amount={'500'} status={'pending'} />
        <TransactionItem date="October 15 - 17, 2023" amount={'500'} status={'pending'} />
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
    <li className="text[1.125rem]">{date}</li>
    <li className="text[1.125rem]">${amount}</li>
    <li className="text[1.125rem]">{status}</li>
  </ul>
);
