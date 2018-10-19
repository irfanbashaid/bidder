import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';

@Component({
  selector: 'app-sendcredits',
  templateUrl: './sendcredits.component.html',
  styleUrls: ['./sendcredits.component.css']
})
export class SendcreditsComponent implements OnInit {

  public sendCreditsArray =[];

  constructor(private grabit:GrabitService) { }

  loadSendCreditsArray(){
    let meta = this;
    meta.sendCreditsArray.length = 0;

    let obj={};
    obj["receiver"]="0x4535";
    obj["credit"]=767;
    meta.sendCreditsArray.push(obj);

  }

  sendcredits(receiver,credit){
    var meta=this;
    meta.grabit.mint(receiver,credit).then(res=>{
      if(res == 1) {
        swal("Creadits sent")
      }
      else if(res == 0) {
        swal("You Rejected this Transaction")
      }
      else if(res == 2) {
        swal("Transaction Failed")
      }
    })
    
  }
  ngOnInit() {
  }

}
