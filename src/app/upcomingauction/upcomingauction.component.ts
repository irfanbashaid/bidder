import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';

@Component({
  selector: 'app-upcomingauction',
  templateUrl: './upcomingauction.component.html',
  styleUrls: ['./upcomingauction.component.css']
})
export class UpcomingauctionComponent implements OnInit {
  public canshow:boolean;
  public images=[];
  

  public sec_shower:number[]=[];
  public min_shower:number[]=[];
  public hour_shower:number[]=[];

  constructor(private grabit:GrabitService) {
    console.log('Displaying Upcoming Products...')
    this.upcoming_table();
}

  startTimer(auctionid) {
    let meta =this;
    meta.grabit.auctionDetails(auctionid).then(auc_det => {
      meta.grabit.currentTime().then(now_time => {
        let timeLeft = Number(auc_det[0][0]) - Number(now_time);
        meta.sec_shower[auctionid]=timeLeft%60;
        meta.min_shower[auctionid]=(timeLeft%3600)%60;
        let hours_str:string = (timeLeft/3600).toString();
        let hours= hours_str.split(".");
        meta.hour_shower[auctionid] = Number(hours[0]);
        var looper = setInterval(()=>{
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
                if(meta.hour_shower[auctionid] !=0){
                  meta.min_shower[auctionid] = 59;
                  meta.hour_shower[auctionid]--;
                }
                else{
                  clearInterval(looper);
                  this.upcoming_table();
                }
              }
            }
          }
        },1000);
      })
    })
  }

  upcoming_table(){
    this.grabit.getauctiondetails().then(details=>{   
      details[0].forEach(a=>{
        let i=a+1;
        this.grabit.auctionDetails(i).then(result=>{
          this.grabit.currentTime().then(now=>{
            if(now  < result['times'][0]){
              let data={};
              data['Auction_Id']=details[1][a]['auctionid']
              data['Url']='https://ipfs.infura.io/ipfs/'+details[1][a]['ipfshash'];
              data['ProductName']=details[1][a]['productname'];
              data['Amount']=result['basePrice'];
              this.startTimer(i);
              this.images.push(data);
            }
          })
        })
      })
    })
  }
  ngOnInit() {
  }

}
