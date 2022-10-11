const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

     calculateHash(){
         return SHA256(this.index + this.previousHash + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
     }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "05/10/2022", "Genesis block", 0)
    }

    getLatesBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
let fesaCoin = new Blockchain();
fesaCoin.addBlock(new Block(1, "06/10/2021", {amount:4}));
fesaCoin.addBlock(new Block(2, "07/10/2021", {amount:4}));

console.log(JSON.stringify(fesaCoin, null, 4))

