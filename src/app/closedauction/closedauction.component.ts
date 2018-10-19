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
  public ProductName='Appliances';
  public Amount='$ 4'
  public Auction_Id='GBTA:4548';
  public Time='5:45:33';
  public Bidder_name='Sri ram Prasad';

  constructor(private grabit:GrabitService) {
  console.log('Displaying Closed Products...');
 this.grabit.getauctiondetails().then(details=>{   
  details[0].forEach(a=>{
    let i=a+1;
    this.grabit.auctionDetails(i).then(result=>{
          this.grabit.currentTime().then(now=>{
            this.grabit.lastBidderDetails(i).then(res=>{
            if(now > result['times'][1])
            {
                let data={};
                data['Auction_Id']=details[1][a]['auctionid']
                data['Url']='https://ipfs.infura.io/ipfs/'+details[1][a]['ipfshash'];
                data['ProductName']=details[1][a]['productname'];
                data['Amount']=result['basePrice'];
                if(res == 'No Bid Logs Found')
                {
                  data['Last_Bidded_amount']=0;
                }
                else{
                data['Last_Bidded_amount']=res['returnValues'].amount;
                this.grabit.getUserName(res.returnValues.bidder).subscribe(username =>{
                  data['Bidder_name']=username['fullName'];
                })
                }
                data['Time']='5:45:33';
                data['Bidder_name']='No One';
                this.images.push(data);
            }
          })
        })
      })
    })
  })
}


  ngOnInit() {
  }

}
