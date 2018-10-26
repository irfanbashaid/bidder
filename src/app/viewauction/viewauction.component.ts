import { Component, OnInit } from '@angular/core';
import { GrabitService } from "../service/grabit.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
 selector: 'app-viewauction',
 templateUrl: './viewauction.component.html',
 styleUrls: ['./viewauction.component.css']
})

export class ViewauctionComponent implements OnInit {

  public hour_shower;
  public min_shower;
  public sec_shower;
  public btn_show:boolean;
  public btn_show_upcoming:boolean;
  public btn_show_closed:boolean;
  public bidder_history=[];
  public current_id;

  constructor(private grabit:GrabitService,private spinner:NgxSpinnerService) {
    this.startTimer();
  }

  startTimer() {
    let meta =this;
    let auctionid = meta.grabit.prod_zoom["Auction_Id"];
    meta.get_history(auctionid);
    meta.grabit.auctionDetails(auctionid).then(auc_det => {
      meta.grabit.currentTime().then(now_time => {
        if(now_time > auc_det[0][1] ) {
          meta.btn_show_closed=true;      
        }  
        else if(now_time > auc_det[0][0]) {
          meta.btn_show=true;
          meta.grabit.lastBidderDetails(auctionid).then(lastbid => {
            let timeLeft = Number(auc_det[0][1]) - Number(now_time);
            meta.sec_shower=timeLeft%60;
            meta.min_shower=Number((timeLeft/60).toString().split(".")[0]);
            let hours_str:string = (timeLeft/3600).toString();
            let hours= hours_str.split(".");
            meta.hour_shower = Number(hours[0]);
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
                      meta.grabit.prod_zoom['Bidder_name']=username['fullName'];
                      meta.grabit.prod_zoom['last_Bidded_amount']=newbid['returnValues'].amount;
                      meta.grabit.prod_zoom['buttonbid']=Number(auc_det['bidIncrement'])+Number(newbid['returnValues'].amount);
                      checker = newbid.returnValues.bidder;
                      clearInterval(looper);
                      meta.startTimer();
                    })
                  }
                }
              })
              if(meta.sec_shower!=0){
                meta.sec_shower--;
              }
              else{
                if(meta.hour_shower !=0 || meta.min_shower !=0 ){
                  meta.sec_shower=59;
                  if(meta.min_shower != 0){
                    meta.min_shower--;
                  }
                  else{
                    if(meta.hour_shower !=0){
                      meta.min_shower = 59;
                      meta.hour_shower--;
                    }
                    else{
                      clearInterval(looper);
                      // meta.live_bids();
                    }
                  }
                }
              }
            },1000);
          })
        }
        else{ // Upcoming
          meta.btn_show=true;
          meta.btn_show_upcoming=true;
          let timeLeft = Number(auc_det[0][0]) - Number(now_time);
          meta.sec_shower=timeLeft%60;
          meta.min_shower=Number((timeLeft/60).toString().split(".")[0]);
          let hours_str:string = (timeLeft/3600).toString();
          let hours= hours_str.split(".");
          meta.hour_shower = Number(hours[0]);
          var looper = setInterval(()=>{
            if(meta.sec_shower!=0){
              meta.sec_shower--;
            }
            else{
              if(meta.hour_shower !=0 || meta.min_shower !=0 ){
                meta.sec_shower=59;
                if(meta.min_shower != 0){
                  meta.min_shower--;
                }
                else{
                  if(meta.hour_shower !=0){
                    meta.min_shower = 59;
                    meta.hour_shower--;
                  }
                  else{
                    console.log("bet started")
                    clearInterval(looper);
                  }
                }
              }
            }
          },1000);
        }
      })
    })
  }

  manualBidding(_aID){
    let meta = this;
    meta.grabit.lastBidderDetails(_aID).then(res=>{
      if(res == 'No Bid Logs Found'){
        console.log('Congratualtions You are the First Bidder...')
        meta.grabit.auctionDetails(_aID).then(result => {
          let amount=0;
          if(result[5][0] != 0){
            meta.spinner.show();
            meta.grabit.manualBidding(_aID,Number(result[5][0])+Number(result[2])).then(res => {
              meta.spinner.hide();
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
                meta.spinner.show();
                meta.grabit.manualBidding(_aID,amount).then(res => {
                  meta.spinner.hide();
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
            }
          }
        })
        return;
      }
      else if(res['returnValues'].bidder==meta.grabit._etherumAccountAddress){
        swal('Already Placed a bid');
        return;
      }
      else{
        meta.grabit.auctionDetails(_aID).then(result => {
          let amount=0;
          if(result[5][0] != 0){
            meta.spinner.show();
            meta.grabit.manualBidding(_aID,Number(result[5][0])+Number(result[2])).then(res => {
              meta.spinner.hide();
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
                meta.spinner.show();
                meta.grabit.manualBidding(_aID,amount).then(res => {
                  meta.spinner.hide();
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
            }
          }
        })
      }    
    })
  }

  get_history(id){
    let meta = this;
    meta.bidder_history.length=0;
    meta.grabit.Particular_bid_details(id).then(result=>{
      result.forEach(element => {
        meta.grabit.getUserName(element["returnValues"].bidder).subscribe(res=>{
          let obj={};
          obj['Price']=element["returnValues"].amount;
          obj['Name']=res['fullName'];
          meta.bidder_history.push(obj);
        })
      });
    })
  }

  ngOnInit() {
  }

}