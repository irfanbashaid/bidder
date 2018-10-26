import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';

@Component({
  selector: 'app-closedauction',
  templateUrl: './closedauction.component.html',
  styleUrls: ['./closedauction.component.css']
})
export class ClosedauctionComponent implements OnInit {
  public canshow:boolean;
  public images=[];

  constructor(private grabit:GrabitService) {
    this.closed_bids();
  }

  closed_bids(){
    console.log('Displaying Closed Bids...');
    this.grabit.getauctiondetails().then(details=>{   
      details[0].forEach(a=>{
        let i=a+1;
        this.grabit.auctionDetails(i).then(result=>{
          this.grabit.currentTime().then(now=>{
            this.grabit.lastBidderDetails(i).then(res=>{
              if(now > result['times'][1]){
                let data={};
                data['Auction_Id']=details[1][a]['auctionid']
                data['Url']='https://ipfs.infura.io/ipfs/'+details[1][a]['ipfshash'];
                data['ProductName']=details[1][a]['productname'];
                data['Amount']=result['basePrice'];
                data["bidIncrement"]=result['bidIncrement'];
                data["resetTime"]=result['resetTime'];
                if(res == 'No Bid Logs Found')
                {
                  data['Last_Bidded_amount']=0;
                  data['Bidder_name']='No One';
                }
                else{
                  data['Last_Bidded_amount']=res['returnValues'].amount;
                  this.grabit.getUserName(res.returnValues.bidder).subscribe(username =>{
                    data['Bidder_name']=username['fullName'];
                  })
                }
                this.images.push(data);
              }
            })
          })
        })
      })
    })
  }

  zoom_product(ProductName,Amount,Url,Auction_Id,bidIncrement,last_Bidded_amount,Bidder_name,resetTime){
    let obj ={};
    obj["ProductName"]=ProductName;
    obj["Amount"]=Amount;
    obj["Url"]=Url;
    obj["Auction_Id"]=Auction_Id;
    obj["bidIncrement"]=bidIncrement;
    obj["last_Bidded_amount"]=last_Bidded_amount;
    obj["Bidder_name"]=Bidder_name;
    obj["resetTime"]=resetTime;
    this.grabit.prod_zoom = obj;
    this.grabit.imgshow=!this.grabit.imgshow;
  }

  ngOnInit() {
  }

}
