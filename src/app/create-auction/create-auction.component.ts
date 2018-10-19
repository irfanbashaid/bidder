import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
declare let require:any;
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!
import  ipfs  from "ipfs";
 var _ipfs = new ipfs();
@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  filepath;
  public selectedFile: any;
  fd = new FormData();

  constructor (private grab:GrabitService) {}


onFileChanged(event){
    this.selectedFile = event.target.files[0]
}


upload(productname,start,end,base_price,bid_increment,minimum_bid,reset_time)
{    
    let ins=this;

    var t=new Date(start).getTime() / 1000
    var a:any = Math.round(t)
    var _starttime:number = parseInt(a)


    var t1=new Date(end).getTime() / 1000
    var a1:any = Math.round(t1)
    var _endtime:number = parseInt(a1)
    //console.log(_starttime,_endtime,base_price,bid_increment,minimum_bid,reset_time)
    ins.grab.createAuction(_starttime,_endtime,base_price,bid_increment,minimum_bid,reset_time).then(res=>{
      if(res==1){      
         let fr = new FileReader(); 
        fr.onload = function(e){
          _ipfs.files.add(Buffer(fr.result),(error,data)=>{
            if(!error)
            {console.log(data[0].hash)
              ins.grab.upload(data[0].hash,productname);  
            }
            else{
              console.log(error);
            }
          })        
        }
        fr.readAsArrayBuffer(this.selectedFile)
      }
      else if(res==2){
        console.log('Error...');
      }
      else{
      }
    })       
}
   
  ngOnInit() {
  }

}
