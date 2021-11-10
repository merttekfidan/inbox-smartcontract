const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('Web3')
const {interface,bytecode} = require('../compile')

const web3 = new Web3(ganache.provider())
let accounts;
let inbox;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['Hi there !']})
    .send({from:accounts[0],gas:'1000000'})
})

describe('Inbox',()=>{
    it('Deploys contract', ()=>{
        console.log(inbox)
    })
})
/*class Car{
    park(){
        return 'Parked'
    }

    drive(){
        return 'vroom'
    }
}

let car ;

beforeEach(()=>{
    car = new Car()
})

describe('Car Test',()=>{
    it('can park',()=>{
        assert.equal(car.park(),'Parked')
    })
    it('can drive',()=>{
        assert.equal(car.drive(),'vroom')
    })
})*/