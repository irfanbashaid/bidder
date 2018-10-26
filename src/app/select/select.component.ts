import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements OnInit {
  
  public auction = [];
  public selected_aid=[];
  
  constructor(private grabit:GrabitService) {
   
  }
  
  table_data(){
    let instance = this;
    instance.selected_aid.length=0;
    instance.auction.length = 0;
    instance.grabit.getauctiondetails().then(res => {
      var data = Object.keys(res[1]).length;
      for(let i = 0;i<data;i++){
        if(res[1][i]['Auctionstatus'] == true){
          let obj = {};
          obj['auctionId'] = res[1][i]['auctionid'];
          obj['productname'] =res[1][i]['productname'];
          instance.selected_aid.push(obj);
        }
        else if(res[1][i]['Auctionstatus'] == false){
          let obj = {};
          obj['auctionId'] = res[1][i]['auctionid'];
          obj['productname'] =res[1][i]['productname'];
          instance.auction.push(obj);
        }
      }
    });
  }
  
  storeaid(selected){
    let instance = this;
    let obj={};
    obj["auctionid"]=selected;
    instance.grabit.storeselectedproduct(obj).subscribe(res=> {           
      instance.table_data();
    },
    err=>{
      console.log(err)
    })
  }

  myFunction() {
    let input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("select");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  
  ngOnInit() {
    this.table_data();
  }
  
}