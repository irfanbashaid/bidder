import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Tx from 'ethereumjs-tx';
import { Buffer } from "buffer";
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import Web3 from "web3";

declare let require:any;
let json = require('./grabit.json');

@Injectable({
  providedIn: 'root'
})
export class GrabitService {

  public  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  public _privateKey;
  public _grabItContractAddress: string = "0x6a4b3fc85e4df2687bff778dfb20d430890cd62e";//"0xb20518f123b8acf672e5be8910e4d39319dc221d";
  public _etherumAccountAddress ;
  public _grabItContract: any;
  public _web3;
  public imgshow:boolean;
  constructor(private http:HttpClient) {
    this._web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/Vr1GWcLG0XzcdrZHWMPu'));//'https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'
    this._grabItContract = new this._web3.eth.Contract(json,this._grabItContractAddress,{gaslimit:3000000});
    this.setPrivateKey('b044f80e680c1e9f66adb75ab2708a8b9abdc93073f1d27e5593f4eac425d0b6');
  }


   storeselectedproduct(selected) {
    return this.http.put(environment.api +'/storeselectedproduct',selected);
  }
 

public async lastBidderDetails(_aID):Promise<any>{
  return new Promise((resolve,reject)=>{
      this._grabItContract.getPastEvents('Bidding',{fromBlock:0, toBlock: 'latest'}, function(error, result){ 
        if(!error){
           let array=[];
           result.find(function(element) {
            if(element['returnValues'].auctionID == _aID)
            {
              array.push(element)
            }
          });

          if(array.length!=0)
          {
            resolve(array[array.length-1]);
          }
        else{
          resolve('No Bid Logs Found')
        }
        }
        else{
          console.log(error)
        }
      })
  }) as Promise<any>;
 }

public async event_Bidding():Promise<any>{
  return new Promise((resolve,reject)=>{
    this._grabItContract.getPastEvents('Bidding',{fromBlock:0, toBlock: 'latest'},function(error,result){
      resolve(result);
    })  
  }) as Promise<any>;
}
   public async event_OwnershipTransferred():Promise<any>{
    return new Promise((resolve,reject)=>{
      this._grabItContract.getPastEvents('OwnershipTransferred',{fromBlock:0, toBlock: 'latest'},function(error,result){
        console.log(result)
        resolve(result);
      })  
    }) as Promise<any>;
   }

   public async event_Mint():Promise<any>{
     let meta = this;
    return new Promise((resolve,reject)=>{
      meta._grabItContract.getPastEvents('Mint',{fromBlock:0, toBlock: 'latest'},function(error,result){
        console.log(result)
        resolve(result);
      })  
    }) as Promise<any>;
   }

   public async event_Transfer():Promise<any>{
    return new Promise((resolve,reject)=>{
      this._grabItContract.getPastEvents('Transfer',{fromBlock:0, toBlock: 'latest'},function(error,result){
        console.log(result)
        resolve(result);
      })  
    }) as Promise<any>;
   }

   public async event_AuctionFinalized():Promise<any>{
    return new Promise((resolve,reject)=>{
      this._grabItContract.getPastEvents('AuctionFinalized',{fromBlock:0, toBlock: 'latest'},function(error,result){
        console.log(result)
        resolve(result);
      })  
    }) as Promise<any>;
   }

   public async event_AuctionCreated():Promise<any>{
    return new Promise((resolve,reject)=>{
      this._grabItContract.getPastEvents('AuctionCreated',{fromBlock:0, toBlock: 'latest'},function(error,result){
        console.log(result)
        resolve(result);
      })  
    }) as Promise<any>;
   }

  postUser(user: User){
    return this.http.post(environment.api+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.api + '/authenticate', authCredentials,this.noAuthHeader);
  }

  forgotpassword(temp1) {
    return this.http.put(environment.api + '/forgotpassword',temp1,this.noAuthHeader);
  }



  getUserName(public_key) {
    var temp={}
    temp['publickey']=public_key
 
    return this.http.post(environment.api + '/getUserName',temp,this.noAuthHeader);
  }

  getAuctionById(id) {
    var obj={};
    obj["auctionid"]=id;
    return this.http.post(environment.api +'/getAuctionById',obj,this.noAuthHeader);
  }

 
   
  public async getauctiondetails(): Promise<any> {   
    return new Promise((resolve, reject) => {
      {
     this.http.get(environment.api + '/productDetails').subscribe(res=>{
//       console.log(res[1]["auctionid"])
       let temp:any=res;
       let array=[];
       for(let a=0;a<temp.length;a++)
       {
         array.push(a);
       }
          let result=[];
          result.push(array);
          result.push(res);
         resolve(result)
       
    },err=>{
      console.log(err);
      
    });
  }
}) as Promise<any>;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
 
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  // send_image(file_path:Auction){
  //   console.log(file_path);
    
  //   return this.http.post(environment.api+'/createAuction',file_path,this.noAuthHeader);
  // }

  upload(ipfs_hash,product_name) {
    let obj={};
        obj['ipfs_hash']=ipfs_hash;
        obj['product_name']=product_name;
        this.http.post(environment.api+'/productdetailssave',obj,this.noAuthHeader)
        .subscribe(res=>{
          alert('Stored in DB...')
        },err=>{
          console.log(err);
        })
  }

  
  changepassword(change){
    console.log("inservice"+ change['passwordold']);
    return this.http.put(environment.api+'/changepassword',change,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.api + '/userDetails',this.noAuthHeader);
  }

  public async setPrivateKey(privateKey): Promise<boolean> {   
    let instance = this;
    instance._privateKey=privateKey;
    return new Promise((resolve, reject) => {
        let obj = instance._web3.eth.accounts.privateKeyToAccount('0x'+privateKey);
        instance._etherumAccountAddress=obj["address"];
        resolve(true);
    }) as Promise<boolean>;
  }
  
  public async getEtherumAccountBalance(): Promise<number> {
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getBalance(instance._etherumAccountAddress,function(err,result){
        if(err != null) {
          reject(err);
        }
        else{
          resolve(instance._web3.utils.fromWei(result,'ether'));
        }
      })
    }) as Promise<number>;
  }

  public async owner(): Promise<string> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._grabItContract.methods.owner().call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<string>;
  }

  public async transferOwnership(newOwner):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._grabItContract.methods.transferOwnership(newOwner);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._grabItContractAddress,
          value: '0x00',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async transfer( _to,_value):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._grabItContract.methods.transfer(_to,_value);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._grabItContractAddress,
          value: '0x00',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async mint( _to,_tokens):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._grabItContract.methods.mint(_to,_tokens);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._grabItContractAddress,
          value: '0x00',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async balanceOf(): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._grabItContract.methods.balanceOf().call({from:instance._etherumAccountAddress},function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result);//instance._web3.utils.fromWei(result,'ether')
        }
      });
    }) as Promise<number>;
  }

  public async currentTime(): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._grabItContract.methods.currentTime().call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<number>;
  }

  public async createAuction(_startTime,_endTime,_basePrice,_bidIncrement,_minBid,_resetTime) :Promise<number>{
    console.log(_startTime,_endTime,_basePrice,_bidIncrement,_minBid,_resetTime);
    
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._grabItContract.methods.createAuction(_startTime,_endTime,_basePrice,_bidIncrement,_minBid,_resetTime);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._grabItContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        console.log(txParams);
        
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          console.log(result);
          
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            console.log('Hashing...');
            
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
                console.log('Deployed...');
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async auctionDetails(_aID): Promise<any> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._grabItContract.methods.auctionDetails(_aID).call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<any>;
  }

  public async bidDetails(_aID): Promise<any> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._grabItContract.methods.bidDetails(_aID).call({from:instance._etherumAccountAddress},function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<any>;
  }

  public async auctionList(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._grabItContract.methods.auctionList().call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<number[]>;
  }

  public async manualBidding(_aID,_amount) :Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._grabItContract.methods.manualBidding(_aID,_amount);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._grabItContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        console.log(txParams);
 
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          console.log(result);
 
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            console.log('Hashing...');
 
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
                console.log('Deployed...');
 
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }
  public async finalizeAuction(_aID) :Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._grabItContract.methods.finalizeAuction(_aID);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._grabItContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async hash(a): Promise<number> {
    let meta = this;
    return new Promise((resolve, reject) => {
      var accountInterval = setInterval(function()
      {
        meta._web3.eth.getTransactionReceipt(a,function(err,result){
          if(err != null) {
            console.log("hash err");
            resolve(0);
          }
          if(result !== null)
          {
            clearInterval(accountInterval);
            if(result.status == 0x1)
            {
              console.log("hash result.status == 0x1");
              resolve(1);
            }
            else
            {           
              console.log("hash result.status == else");
              resolve(2);
            }
          }
        })
      },100)
    }) as Promise<number>;
  }
}

