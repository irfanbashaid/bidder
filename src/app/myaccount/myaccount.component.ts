import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-myaccount',
 templateUrl: './myaccount.component.html',
 styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
 public username;
 public emails;
 public publickey;
 public balance;
 public paticipatedcount;
 public woncount;
 public credits;
 constructor(private grabit:GrabitService,private route:Router) {
   this.fetch_user_balance();
   this.fetch_user_address();
   this.paticipatedandwon();
   this.credit_balance();
   this.mydetails();
 }

 fetch_user_balance(){
   var instance =this;
   this.grabit.getEtherumAccountBalance().then(res =>{
     instance.balance = res;
   });
 }

 fetch_user_address(){
   var instance =this;
   instance.publickey=this.grabit._etherumAccountAddress;
 }

 paticipatedandwon(){
   let instance = this;
   instance.paticipatedcount=0;
   instance.woncount=0;
   instance.grabit.auctionList().then(a_ids=>{
     a_ids.forEach(id => {
       instance.grabit.auctionDetails(id).then(auctiondetails=>{
         instance.grabit.bidDetails(id).then(bitteramount=>{
           if(bitteramount!=0){
           instance.paticipatedcount++;
           }
           if(auctiondetails[6]==1 && auctiondetails[5][0]==bitteramount){
             instance.woncount++;
           }
         })
       })
     });
   })
 }

 credit_balance(){
   let meta = this;
   meta.grabit.balanceOf().then(result =>{
     this.credits  = result;
   })
 }

 mydetails(){
   var instance =this;
   instance.grabit.getUserProfile().subscribe(
     res => {
      console.log(res);
       instance.username = res['fullName'];
       instance.emails = res['email'];
     },
     err => {
       console.log(err.message);
     }
   );
 }

 changepassword(oldpassword,newpassword,confirmpassword){
   var instance = this;
   var temp1={}
   temp1['email']=instance.emails;
   temp1['passwordold']=oldpassword;
   temp1['password']=newpassword;
   console.log(temp1);
   console.log(typeof(temp1));
   instance.grabit.changepassword(temp1).subscribe(
     res => {
       alert("Password changed Successfully");
       instance.grabit.deleteToken();
       instance.route.navigate(["/login"])
      //  window.location.reload();
     },
     err => {
       console.log(err.error.message)
     }
   );
 }

 passwordchange(newpass,confirmpass) {
   if(newpass==confirmpass){
     document.getElementById("passwordmessage").style.color="green";
     document.getElementById("passwordmessage").innerHTML = "Good";
     (document.getElementById("changebtn")as HTMLButtonElement).disabled=false
   }
   else{
     document.getElementById("passwordmessage").style.color="red";
     document.getElementById("passwordmessage").innerHTML = "miss match";
   }

 }

 ngOnInit() {
 }

}