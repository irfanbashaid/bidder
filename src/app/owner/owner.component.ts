import { Component, OnInit } from '@angular/core';
import { GrabitService } from "../service/grabit.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  public credit_balance;
  public tabSelected:number=1;
/*
  <li (click)="chooseTab(1)"><a>Create Auction</a></li>
  <li (click)="chooseTab(2)"><a>Send Credits</a></li>
  <li (click)="chooseTab(3)"><a>Change Ownership</a></li>
  <li (click)="chooseTab(4)"><a>Finalize Auction</a></li>*/
  constructor(private grabit:GrabitService,private route:Router) { 
    this.acc_balance();
  }

  chooseTab(selected){
    this.tabSelected = selected;
  }
 
  acc_balance(){
    let meta = this;
    meta.grabit.balanceOf().then(bal => {
      this.credit_balance = bal;
    })
  }
  onLogout(){
    this.grabit.deleteToken();
    this.route.navigate(['/login']);
  }
  top_up_credits(){
    
  }

  transferOwnership(){

  }

  ngOnInit() {

  }

}
