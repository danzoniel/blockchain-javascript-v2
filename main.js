const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

     calculateHash(){
         return SHA256(this.index + this.previousHash + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
     }

     mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce ++;
            this.hash = this.calculateHash();
        } 
        console.log("Block mined: " + this.hash);
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

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++ ){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log("Hash error");
                return false;
            }

            
            if(currentBlock.hash !== previousBlock.hash){
                console.log("Hash error2");
                return false;
            }
        }

        return true;
    }
}
let fesaCoin = new Blockchain();
fesaCoin.addBlock(new Block(1, "06/10/2021", {amount:4}));
fesaCoin.addBlock(new Block(2, "07/10/2021", {amount:10}));

console.log('Is blockchain valid?', fesaCoin.isChainValid());

//console.log(JSON.stringify(fesaCoin, null, 4))
