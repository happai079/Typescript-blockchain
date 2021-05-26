/* 
*   해쉬를 만들기 위한 라이브러리
*     - typescript는 'npm i --dev @type/cripto-js' 추가
*/
import * as CryptoJS from 'crypto-js';

/*
*   인터페이스와 클래스
*     - 속성이나 메소드를 정의하는 것
*     - 변수의 타입을 체크하는 용도로 사용
*
*   인터페이스
*     - 자바스크립트 코드를 생성하지 않음, 타입 체크만 가능
*   클래스
*     - 자바스크립트 코드를 생성, 새로운 인스턴스를 만들 수 있다.  
*/ 
class Block {

    // static method : 클래스 안에서 클래스가 호출되지 않아도 사용할 수 있음
    // 블록의 hash계산
    static calculateBlockHash = (
        index:number, 
        previousHash:string,
        data:string,
        timestamp:number
    ): string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

    // 블록의 구조(타입) 점검
    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" && 
        typeof aBlock.timestamp === "number" && 
        typeof aBlock.data === "string";

    // 사용할 속성 정의
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    // 생성자
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    };
};

// 초기 블록 생성
const genesisBlock: Block = new Block(0, "202120212021", "", "Hello", 123456);

// 블록이 담길 블복체인
let blockchain: Block[] = [genesisBlock];

// 블록체인 보기
const getBlockchain = (): Block[] => blockchain;

// 마지막 블록 보기
const getLatestBlock = (): Block => blockchain[blockchain.length -1];

// 타임스템프 계산
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// 새 블록 만들기
const createNewBlock = (data:string): Block => {
    const previousBlock: Block =  getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimstamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        data, 
        newTimstamp
    );
    
    const newBlock: Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data, 
        newTimstamp
    );
    
    addBlock(newBlock);
    return newBlock;
};

// 블록 해쉬 만들기
const getHashforBlock = (aBlock: Block): string => 
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash, 
        aBlock.data, 
        aBlock.timestamp
    );

// 블록 점검
const isBlockVaild = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    }else if(previousBlock.index +1 !== candidateBlock.index) {
        return false;
    }else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }else {
        return true;
    }
};

// 블록 추가
const addBlock = (candidateBlock: Block): void => {
    if(isBlockVaild(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

createNewBlock("sencond block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(getBlockchain());