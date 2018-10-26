import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrabitService } from '../service/grabit.service';
import swal from 'sweetalert';
import $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public _web3;
  public  show_signup;
  public show_create_account;
  public show_account_details;
  public account_address;
  public private_key;
  public text1="Private Key:";
  public text2='Ethereum Acc Address:';
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public showSucessMessage: boolean;
  public show_error:boolean
  public error_message: string;
  public publickey_;
  public serverErrorMessages;
  public show_login_error:boolean;
  public login_error_message;
  public images = [];
  public show_create_eth_account:boolean;
  show_signup_:boolean;
  emails;

  constructor(private grab:GrabitService,private route:Router){
    this._web3 = this.grab._web3;
    this.show_create_account=true;
  }

  // checkValue(event: any){
  //   if(event == 0){
  //     this.show_create_account=false;
  //     this.show_account_details=true;
  //     let object=this._web3.eth.accounts.create();
  //     this.account_address=object['address'];
  //     this.private_key=object['privateKey']; 
  //   }
  //   else{
  //     this.Change_content();
  //   }
  // }

  Change_content(){
   this.show_create_account=false;
   this.show_signup=true;
  }

  navigate(){
    this.show_account_details=false;
    this.show_signup=true;
  }  

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    alert('Account details copied!')
  }

  sign_up(name,email,password,private_key){
    let access=this;
    let detail={};
    var privatekey=private_key.trim();
    if(privatekey.length!=64){
      privatekey=privatekey.substring(2,privatekey.length)
    }
    detail['fullName']=name;
    detail['email']=email;
    detail['password']=password;
    detail['publickey']=privatekey;
    let user:any =detail;
    access.grab.setPrivateKey(privatekey).then(res=>{
      detail['publickey']=access.grab._etherumAccountAddress;
      if(res==true){
        access.grab.postUser(user).subscribe(
          res => {
            access.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
            swal("Account created successfully please login to continue");
          },
          err => {
            if (err.status === 422) {
              access.show_error=true;
              access.error_message = err.error.join('<br/>');
            }
            else{
              access.error_message = 'Something went wrong.Please contact admin.';
            }
          }
        );
      }
      else if(res== false){
        swal('Enter valid privatekey')
      }
    })    
  }

  create(){
    let object=this._web3.eth.accounts.create();
    this.account_address=object['address'];
    this.private_key=object['privateKey'].substring(2); 
  }

  showCreateAccount(num){
    var instance=this;
    if(num==1){
      instance.show_signup_=true;
      instance.show_create_eth_account=false;
    }
    else if(num==2){    
      instance.show_create_eth_account=true;
      instance.show_signup_=false;
      instance.create();
    }
    else if(num==3){
      if(instance.show_signup_==true){
        instance.show_signup_=false;
      }
      else if(instance.show_create_eth_account==true){
        instance.show_create_eth_account=false;
      }
    }
  }

  login(name,password,privatekey){
    let _detail:any={};
    _detail['email']=name;
    _detail['password']=password;
    _detail['publickey']=privatekey;
    var access = this;
    access.grab.setPrivateKey(privatekey).then(res=>{
      _detail['publickey']=access.grab._etherumAccountAddress;
      if(res==true){
        access.grab.login(_detail).subscribe(
          res => {
            access.grab.setToken(res['token']);
            access.grab.owner().then(owneraddress=>{
              if(owneraddress==access.grab._etherumAccountAddress){
                access.route.navigate(['/owner']);
              }
              else{
                access.route.navigate(['/user']);
              }
            })
          },
          err => {        
            access.show_login_error=true;
            access.login_error_message=err.error.message;
            access.serverErrorMessages = err.error.message;
          }
        );
      }
      else if(res== false){
        swal('Enter valid privatekey')
      }
    })    
  }

  forgotpassword(email,privatekey,newpass){
    var instance=this;
    instance.grab.setPrivateKey(privatekey).then(res=>{
      var temp1={}
      temp1['email']=email;
      temp1['publickey']=instance.grab._etherumAccountAddress;;
      temp1['password']=newpass;
      instance.grab.forgotpassword(temp1).subscribe(
        res=>{
          swal("Password changed successfully")
          window.location.reload();
        },
        err=>{
          console.log(err.error.message)
        }
      );
    })
  }

  resetForm()
  {

  }

  check(){
    $("window").scrollTop(0);
  }

  show_auctions(){
    let instance = this;
    instance.grab.getauctiondetails().then(res=>{
      let data = Object.keys(res[1]).length;
      for(let i=0;i<data;i++){
        if(res[1][i]['Auctionstatus']==true){
          instance.grab.auctionDetails(res[1][i]['auctionid']).then(pro_det => {
            let obj ={};
            obj['ProductName'] = res[1][i]['productname'];
            obj['Auction_Id'] = res[1][i]['auctionid'];
            obj['ipfshash']='https://ipfs.infura.io/ipfs/'+res[1][i]['ipfshash'];
            obj['Amount'] = pro_det['basePrice'];
            obj['bidIncrement'] = pro_det['bidIncrement'];
            obj['Bidder_name'] = res[1][i]['biddername'];
            instance.images.push(obj);
          })
        }
      }
    })
  }

  move(){
    document.documentElement.scrollTop = 0;
    swal('Please Sign-up (or) Login to Continue !');
  }

  ngOnInit() { 
    this.show_auctions();
  }
}
