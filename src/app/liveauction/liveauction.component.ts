import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-liveauction',
  templateUrl: './liveauction.component.html',
  styleUrls: ['./liveauction.component.css']
})
export class LiveauctionComponent implements OnInit {
public canshow:boolean;
public images=[];
public canstop:boolean;

  constructor(private grabit:GrabitService,private spinner:NgxSpinnerService) {
      this.live_bids();
  }

  public sec_shower:number[]=[];
  public min_shower:number[]=[];
  public hour_shower:number[]=[];
  

  expiry_timer(auctionid,arr_index) {
    let meta =this;
    meta.grabit.lastBidderDetails(auctionid).then(lastbid => {
      meta.grabit.auctionDetails(auctionid).then(auc_det => {
        meta.grabit.currentTime().then(now_time => {
          let timeLeft = Number(auc_det[0][1]) - Number(now_time);
          meta.sec_shower[auctionid]=timeLeft%60;
          meta.min_shower[auctionid]=Number((timeLeft/60).toString().split(".")[0]);
          let hours_str:string = (timeLeft/3600).toString();
          let hours= hours_str.split(".");
          meta.hour_shower[auctionid] = Number(hours[0]);
          let checker = lastbid;
          if(typeof(lastbid)==typeof("string")){
            checker = "";
          }
          else{
            checker = lastbid.returnValues.bidder;
          }
          var looper = setInterval(()=>{
            meta.grabit.lastBidderDetails(auctionid).then(newbid => {
              if(newbid.returnValues !== undefined){
                if(checker != newbid.returnValues.bidder){
                  meta.grabit.getUserName(newbid.returnValues.bidder).subscribe(username =>{
                    meta.images[arr_index]['Bidder_name']=username['fullName'];
                    meta.images[arr_index]['last_Bidded_amount']=newbid['returnValues'].amount;
                    meta.images[arr_index]['buttonbid']=Number(auc_det['bidIncrement'])+Number(newbid['returnValues'].amount);
                    checker = newbid.returnValues.bidder;
                    clearInterval(looper);
                    meta.expiry_timer(auctionid,arr_index);
                  })
                }
              }
            })
            if(meta.hour_shower[auctionid] ==0 && meta.min_shower[auctionid]==0 && meta.sec_shower[auctionid]==0)
            {
              meta.images[arr_index]['buttonbid']=0;
              // (document.getElementById(meta.images[arr_index]['buttonbid']) as HTMLButtonElement).value='Closed';
              // (document.getElementById(meta.images[arr_index]['buttonbid']) as HTMLButtonElement).disabled=true;
              clearInterval(looper); 
            }
            if(meta.sec_shower[auctionid]!=0){
              meta.sec_shower[auctionid]--;
            }
            else{
              if(meta.hour_shower[auctionid] !=0 || meta.min_shower[auctionid] !=0 ){
                meta.sec_shower[auctionid]=59;
                if(meta.min_shower[auctionid] != 0){
                  meta.min_shower[auctionid]--;
                }
                else{
                  alert(meta.hour_shower[auctionid])
                  if(meta.hour_shower[auctionid] !=0){
                    meta.min_shower[auctionid] = 59;
                    meta.hour_shower[auctionid]--;
                  } 
                  else {
                    console.log('call');
                  }
                }
              }
            }
          },1000);
        })
      })
    })
  }
 
  live_bids(){
    console.log('Displaying Live Bids...');
    this.grabit.getauctiondetails().then(details=>{
      details[0].forEach(a=>{
        let i=a+1;
        this.grabit.auctionDetails(i).then(result=>{
          this.grabit.lastBidderDetails(i).then(res=>{
            this.grabit.currentTime().then(now=>{
              if((now >= result['times'][0]) && (now <result['times'][1])){
                let data={};
                data['Auction_Id']=details[1][a]['auctionid']
                data['Url']='https://ipfs.infura.io/ipfs/'+details[1][a]['ipfshash'];
                data['ProductName']=details[1][a]['productname'];
                data['Amount']=result['basePrice'];
                data['resetTime']=result['resetTime'];
                data['bidIncrement']=result['bidIncrement'];
                if(res == 'No Bid Logs Found'){
                  data['last_Bidded_amount']=0;
                  data['buttonbid']=Number(result['bidIncrement'])+Number(result['minBid'])
                }
                else{
                  data['last_Bidded_amount']=res['returnValues'].amount;
                  data['buttonbid']=Number(result['bidIncrement'])+Number(res['returnValues'].amount);
                  this.grabit.getUserName(res.returnValues.bidder).subscribe(username =>{
                    data['Bidder_name']=username['fullName'];
                  })
                }
                this.expiry_timer(i,this.images.length);
                this.images.push(data);
              }
            })
          })
        })
      })
    })
  }
  
  zoom_product(ProductName,Amount,Url,Auction_Id,bidIncrement,last_Bidded_amount,Bidder_name,buttonbid,resetTime){
    let obj ={};
    obj["ProductName"]=ProductName;
    obj["Amount"]=Amount;
    obj["Url"]=Url;
    obj["Auction_Id"]=Auction_Id;
    obj["bidIncrement"]=bidIncrement;
    obj["last_Bidded_amount"]=last_Bidded_amount;
    obj["Bidder_name"]=Bidder_name;
    obj["buttonbid"]=buttonbid;
    obj["resetTime"]=resetTime;
    this.grabit.prod_zoom = obj;
    this.grabit.imgshow=!this.grabit.imgshow;
  }
  
  manualBidding(_aID){
    let instance = this;
    instance.grabit.lastBidderDetails(_aID).then(res=>{
      if(res == 'No Bid Logs Found'){
        console.log('Congratualtions You are the First Bidder...')
        instance.grabit.auctionDetails(_aID).then(result => {
          let amount=0;
          if(result[5][0] != 0){
            instance.spinner.show();
            instance.grabit.manualBidding(_aID,Number(result[5][0])+Number(result[2])).then(res => {
              instance.spinner.hide();
              if(res==1){
                swal("Your Bid is placed")
              }
              else if(res ==2){
                swal("Bid not successfully placed")
              }
              else{
                swal("Bid not successfully placed")
              }
            })
          }
          else{
            while(amount<=result[3]){
              amount = Number(amount)+Number(result[2]);
              if(amount>result[3]){
                instance.spinner.show();
                instance.grabit.manualBidding(_aID,amount).then(res => {
                  instance.spinner.hide();
                  if(res==1){
                    swal("Your Bid is placed")
                  }
                  else if(res ==2){
                    swal("Bid was not successfully placed")
                  }
                  else{
                    swal("Bid was not successfully placed")
                  }
                })
              }
            }
          }
        })
        return;
      }
      else if(res['returnValues'].bidder==this.grabit._etherumAccountAddress){
        swal('You are currently the last Bidder');
        return;
      }
      else{
        instance.grabit.auctionDetails(_aID).then(result => {
          let amount=0;
          if(result[5][0] != 0){
            instance.spinner.show();
            instance.grabit.manualBidding(_aID,Number(result[5][0])+Number(result[2])).then(res => {
              instance.spinner.hide();
              if(res==1){
                swal("Your Bid is placed")
              }
              else if(res ==2){
                swal("Bid was not successfully placed")
              }
              else{
                swal("Bid was not successfully placed")
              }
            })
          }
          else{
            while(amount<=result[3]){
              amount = Number(amount)+Number(result[2]);
              if(amount>result[3]){
                instance.spinner.show();
                instance.grabit.manualBidding(_aID,amount).then(res => {
                  instance.spinner.hide();
                  if(res==1){
                    swal("Your Bid is placed")
                  }
                  else if(res ==2){
                    swal("Bid was not successfully placed")
                  }
                  else{
                    swal("Bid was not successfully placed")
                  }
                })
              }
            }
          }
        })
      }
    })
  }

  ngOnInit() {
  }

}