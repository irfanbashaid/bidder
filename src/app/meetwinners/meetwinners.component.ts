import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
@Component({
  selector: 'app-meetwinners',
  templateUrl: './meetwinners.component.html',
  styleUrls: ['./meetwinners.component.css']
})
export class MeetwinnersComponent implements OnInit {
  
  public winners=[];

  constructor(private grabit:GrabitService) { }
  
  
  public async meetwinners():Promise<any>{
    return new Promise((resolve,reject)=>{
      let count=0;
      let instance=this;
      instance.winners.length=0;
      instance.grabit.auctionList().then(aids=>{
        var det = aids.reverse()  
        det.forEach(aid=>{
          instance.grabit.auctionDetails(aid).then(auctionDetails=>{    
            if(auctionDetails[6]==1){
              instance.grabit.lastBidderDetails(aid).then(publickey=>{
                if(publickey!='No Bid Logs Found'){
                  count++;
                  instance.grabit.getUserName(publickey.returnValues.bidder).subscribe(userdetails=>{
                    if(count<=10){
                      var win={};
                      win["winner_name"]=userdetails["fullName"]
                      instance.winners.push(win);
                    }
                  })
                  document.getElementById("winnerlistdisplay").innerHTML=String(count);
                }
              })
            }
          })
        })
      })
      resolve(count)
    }) as Promise<any>
  }

  ngOnInit() {
    this.meetwinners().then();
  }

}