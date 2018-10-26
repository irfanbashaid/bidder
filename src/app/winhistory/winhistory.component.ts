import { Component, OnInit } from '@angular/core';
import { GrabitService} from '../service/grabit.service'

@Component({
 selector: 'app-winhistory',
 templateUrl: './winhistory.component.html',
 styleUrls: ['./winhistory.component.css']
})
export class WinhistoryComponent implements OnInit {

  public history = [];

  constructor(private grabit:GrabitService) {
    this.winhistory();
  }

  winhistory(){
    let instance = this;
    instance.grabit.auctionList().then(ids => {
      ids.forEach(id => {
        instance.grabit.auctionDetails(id).then(element=>{
          instance.grabit.bidDetails(id).then(amount => {        
            if(element[5][0] !=0 && element[5][0]==amount && element[6]==1 ){
              instance.grabit.getAuctionById(id).subscribe(res=>{
                let obj = {};
                obj['auctionid'] = id;
                obj['productname'] = res['productname'];
                obj['amount'] = element[5][0];
                let t2:any =element[0][1];
                let time2:any = new Date(t2*1000);
                obj['time'] =time2;
                instance.history.push(obj);
              },
              err =>{
                console.log(err);
              })
            }
          })
        })
      });
    })
  }

  ngOnInit() {
  }

}