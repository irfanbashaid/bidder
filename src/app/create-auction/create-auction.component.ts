import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
declare let require:any;
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!
// import  ipfs  from "ipfs";
import IpfsApi from "ipfs-api";
import { NgxSpinnerService } from 'ngx-spinner';
declare let window:any;
// var _ipfs = new IpfsApi('ipfs.infura.io', '5001',{"protocol":"https"});

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  filepath;
  public selectedFile: any;
  fd = new FormData();
public _ipfs:any;
  constructor (private grab:GrabitService,private spinner:NgxSpinnerService) {
    // console.log(_ipfs)
     this._ipfs = new IpfsApi('ipfs.infura.io', '5001', { "protocol": 'https' });
       console.log(this._ipfs)
  }

  onFileChanged(event){
      this.selectedFile = event.target.files[0]
  }    

  // openFile(event,_productname){
  //   console.log(event);
 
  //   console.log(_productname);
  //   var ins=this;
 
  //   ins.selectedFile = <File>event.target.files[0];
 
  //   let temp:any={};
  //   temp['imgbuf']=ins.fd.append('file', ins.selectedFile, ins.selectedFile.name);
  //     ins.grab.upload(ins.fd,_productname)
 
  //      // output.src = dataURL;
  //   };

  upload(productname,start,end,base_price,bid_increment,minimum_bid,reset_time){
    let ins=this;
    let temp:any={};
    temp['imgbuf']=ins.fd.append('file', ins.selectedFile, ins.selectedFile.name);
    console.log(ins.selectedFile);
    ins.grab.send_file(ins.fd).then(hash=>{
    var t=new Date(start).getTime() / 1000;
    var a:any = Math.round(t);
    var _starttime:number = parseInt(a);
    var t1=new Date(end).getTime() / 1000;
    var a1:any = Math.round(t1);
    var _endtime:number = parseInt(a1);
    ins.spinner.show();
    ins.grab.createAuction(_starttime,_endtime,base_price,bid_increment,minimum_bid,reset_time).then(res=>{
      ins.spinner.hide();
      if(res==1){  

         ins.grab.upload(hash,productname);
      }
      else if(res==2){
        console.log('Error...');
        swal('Enter valid details ')
      }
      else{
        swal('Enter valid details');
      }
    })  
      })     
  }
   
  ngOnInit() {
  }

}
// console.log("gonna store")    
// let fr = new FileReader(); 
// fr.onload = function(e){
//  console.log("onloadcalled")
// ins._ipfs.add(Buffer(fr.result),(error,data)=>{
//    console.log("noifnoelse");
//    if(!error)
//    {
//      console.log("data[0].hash")
//      console.log(data[0].hash)
    
//      swal('Auction Created Successfully');  
//    }
//    else{
//      console.log("errorblock")
//      console.log(error);
//      swal('Auction Created Successfully but Auction Image not stored in Ipfs node');
//    }
//  })        
// }
// fr.readAsArrayBuffer(this.selectedFile)