import Web3 from 'web3';
// const { abi: eventWiseAbi } = require('./artifacts/contracts/EventWise.sol/EventWise.json');
import { abi } from '../abi/EventWise.json';
console.log('abi', abi);
// console.log({ xxx: process.env.SEPOLIA_RPC }); return;

const EVENTWISE_CONTRACT_ADDRESS = '0xde40650D6222470F5e19228eD3593e41Edf20804';
const USDT_CONTRACT_ADDRESS = '0x16deb4eeffda58D481F8348c63902156270eB226';

// WETH deployed to: 0x2b2498C69120CdD77FAA92bEa37F48a1Ba0D97F9
// eventWise deployed to: 0xde40650D6222470F5e19228eD3593e41Edf20804

class EventWise {
  contract;
  client;
  fromAddress;

  constructor(_client: any, _fromAddress: string) {
    this.client = _client;
    this.contract = new this.client.eth.Contract(abi, EVENTWISE_CONTRACT_ADDRESS.trim());
    this.fromAddress = _fromAddress;
  }

  async viewPolicy(address: any) {
    return await this.contract.methods.InsurancePolicy(address).call();
  }

  async viewUserEvents(user: string) {
    let events = [],
      status = true;
    for (let i = 1; status; i++) {
      let event = await this.contract.methods.Events(user, i).call();
      if (event.isExists == false) {
        status = false;
        break;
      }
      events.push(event);
    }

    return events;
  }

  async viewPremiumPayments(user: string) {
    let payments: any = [];
    const events = await this.contract.getPastEvents('PremiumPaid', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    events.forEach((event: any) => {
      payments.push(event.returnValues);
    });
    return payments;
  }

  async viewClaims(user: string) {
    let claims = [];
    const events = await this.contract.getPastEvents('ClaimInitiated', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    for (const e of events) {
      let event = await this.contract.methods.Events(user, e.returnValues.eventId).call();
      let claim = await this.contract.methods.Claims(user, e.returnValues.eventId).call();
      e.returnValues.status = claim.status === 0 ? 'pending' : 'claimed';
      e.returnValues.eventDate = event.date;
      e.returnValues.eventCost = event.cost;
      claims.push(e.returnValues);
    }
    return claims;
  }

  async createPolicy(_avgEventCost: any) {
    try {
      let action = await this.contract.methods.createPolicy(_avgEventCost);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async payPremium() {
    try {
      let action = await this.contract.methods.payPremium();
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async createEvent(name: string, lat: string, long: string, cost: any, date: string) {
    try {
      let action = await this.contract.methods.createEvent(name, lat, long, cost, date);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async registerClaim(eventId: string, reason: string) {
    try {
      let action = await this.contract.methods.initiateClaim(eventId, reason);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async completeClaim(eventId: string) {
    try {
      let action = await this.contract.methods.completeClaim(eventId);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async _sendTransaction(action: any, gas: any) {
    return await this.client.eth.sendTransaction({
      from: this.fromAddress,
      to: EVENTWISE_CONTRACT_ADDRESS,
      data: action.encodeABI(),
      gas, //   300000 GAS
      gasPrice: 500000000000 //  wei
    });
  }
}

export default EventWise;

// console.log({ xxx: new Web3 }); return;
// const client = Web3(process.env.SEPOLIA_RPC);

// let client = new Web3(process.env.SEPOLIA_RPC)
// new EventWise(client).viewPolicy('0x10B3fA7Fc49e45CAe6d32A113731A917C4F1755a').then((viewPolicy) => {

//     console.log({ viewPolicy })
// });
