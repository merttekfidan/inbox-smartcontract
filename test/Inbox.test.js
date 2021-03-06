const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('Web3')
const {interface,bytecode} = require('../compile')

const web3 = new Web3(ganache.provider())
let accounts;
let inbox;
// https://rinkeby.infura.io/v3/c9f0a049027845e9a6a5e1c06238cdad
beforeEach(async()=>{
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['Hi there!']})
    .send({from:accounts[0],gas:'1000000'})
})

describe('Inbox',()=>{
    it('Deploys contract', ()=>{
        assert.ok(inbox.options.address)
    })

    it('Has a default message',async()=>{
        const message =await inbox.methods.message().call()
        assert.equal(message,'Hi there!')
    })
    
    it('can change the message', async ()=>{
        await inbox.methods.setMessage('bye').send({from:accounts[1]})
        const message = await inbox.methods.message().call()
        assert.equal(message,'bye')
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