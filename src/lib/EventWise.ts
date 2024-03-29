import ContractAbi from '../abi/EventWiseAbi.json';
import ERCTokenAbi from '../abi/ERC20TokenAbi.json';
import { parseEther } from 'ethers';

const EVENTWISE_CONTRACT_ADDRESS = '0xe433E96c77B524EB730705Cd609d7E09756822B5';
const TOKEN_CONTRACT_ADDRESS = '0xABDb0E084eCf355Fda82332d2BcB13316952b97B';

class EventWise {
  contract;
  client;
  fromAddress;
  token;
  tokenAddress;

  constructor(_client: any, _fromAddress: string) {
    this.client = _client;
    this.fromAddress = _fromAddress;
    this.tokenAddress = TOKEN_CONTRACT_ADDRESS;
    this.contract = new this.client.eth.Contract(
      ContractAbi.abi,
      EVENTWISE_CONTRACT_ADDRESS.trim()
    );
    this.token = new this.client.eth.Contract(ERCTokenAbi.abi, TOKEN_CONTRACT_ADDRESS.trim());
  }

  async viewPolicy() {
    return await this.contract.methods.InsurancePolicy(this.fromAddress).call();
  }

  async viewUserEvents() {
    let events = [],
      status = true;

    for (let i = 1; status; i++) {
      let event = await this.contract.methods.Events(this.fromAddress, i).call();
      if (event.isExists == false) {
        status = false;
        break;
      }
      events.push(event);
    }

    return events;
  }

  async viewPremiumPayments() {
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

  async viewClaims() {

    let claims = [];
    let events = await this.contract.getPastEvents('ClaimInitiated', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    events = events.filter((e:any) => e.returnValues.user === this.fromAddress);

    for (const e of events) {
      let event = await this.contract.methods
        .Events(this.fromAddress, e.returnValues.eventId)
        .call();
      let claim = await this.contract.methods
        .Claims(this.fromAddress, e.returnValues.eventId)
        .call();
      e.returnValues.status = claim.status == '0' ? 'pending' : 'claimed';
      e.returnValues.name = event.name;
      e.returnValues.eventDate = event.date;
      e.returnValues.eventCost = event.cost;
      claims.push(e.returnValues);
    }
    return claims;
  }

  async createPolicy(_avgEventCost: any) {
    try {
      let action = await this.contract.methods.createPolicy(parseEther(_avgEventCost));
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas, EVENTWISE_CONTRACT_ADDRESS);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async payPremium() {
    try {
      let policy = await this.contract.methods.InsurancePolicy(this.fromAddress).call();

      let approveAction = await this.token.methods.approve(
        EVENTWISE_CONTRACT_ADDRESS,
        policy.premiumAmount
      );
      let approveGas = Math.floor(
        (await approveAction.estimateGas({ from: this.fromAddress })) * 1.4
      );
      let approveTxn = await this._sendTransaction(
        approveAction,
        approveGas,
        TOKEN_CONTRACT_ADDRESS
      );
      console.log({ approveTxn });

      let action = await this.contract.methods.payPremium();
      let payPremiumGas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);
      let payPremiumTxn = await this._sendTransaction(
        action,
        payPremiumGas,
        EVENTWISE_CONTRACT_ADDRESS
      );
      console.log({ payPremiumTxn });

      return { ok: true, data: payPremiumTxn };
    } catch (error) {
      console.log(error);
      return { ok: false, data: error };
    }
  }

  async createEvent(
    name: string,
    lat: string,
    long: string,
    attendees: any,
    cost: any,
    date: string | number
  ) {
    try {
      let _cost = parseEther(cost);
      let action = await this.contract.methods.createEvent(name, lat, long, attendees, _cost, date);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas, EVENTWISE_CONTRACT_ADDRESS);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async registerClaim(eventId: any, reason: string) {
    try {
      let action = await this.contract.methods.initiateClaim(eventId, reason);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas, EVENTWISE_CONTRACT_ADDRESS);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async completeClaim(eventId: any) {
    try {
      let action = await this.contract.methods.completeClaim(eventId);
      let gas = Math.floor((await action.estimateGas({ from: this.fromAddress })) * 1.4);

      let txn = await this._sendTransaction(action, gas, EVENTWISE_CONTRACT_ADDRESS);
      console.log({ txn });

      return { ok: true, data: txn };
    } catch (error) {
      return { ok: false, data: error };
    }
  }

  async _sendTransaction(action: any, gas: any, to: string) {
    return await this.client.eth.sendTransaction({
      from: this.fromAddress,
      to,
      data: action.encodeABI(),
      gas, //   300000 GAS
      gasPrice: 500000000000 //  wei
    });
  }
}

export default EventWise;
