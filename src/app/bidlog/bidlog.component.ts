import { Component, OnInit } from '@angular/core';
import { GrabitService} from '../service/grabit.service';

@Component({
 selector: 'app-bidlog',
 templateUrl: './bidlog.component.html',
 styleUrls: ['./bidlog.component.css']
})
export class BidlogComponent implements OnInit {

 constructor(private grabit:GrabitService) {
   this.bidlog();
   this.fetch_address();
 }

 public bidhistory = [];
 public eth_address;

 fetch_address(){
   this.eth_address = this.grabit._etherumAccountAddress;
 }

 bidlog(){
   let instance = this;
   instance.grabit.event_Bidding().then(result => {
     result.forEach(element=>{
       if(element["returnValues"]["bidder"] == this.eth_address){
         instance.grabit.getAuctionById(element["returnValues"]['auctionID']).subscribe(
           res=>{
             let obj={};
             obj['auctionid'] =element["returnValues"]['auctionID'];
             obj['productname'] = res["productname"];
             obj['amount'] = element["returnValues"]['amount'];
             this.bidhistory.push(obj);
           },
           err=>{

           }
         );
       }
     });
   })
 }


 ngOnInit() {
 }

}