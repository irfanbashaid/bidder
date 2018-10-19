import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
public _credits;
  constructor(private grabit:GrabitService,private route:Router) { 
    this.grabit.balanceOf().then(res=> this._credits=res)
   
  }

  public optionselected = 0;

  check(selected){
    this.optionselected = selected;
    this.grabit.imgshow=false;
  }

  onLogout(){
    this.grabit.deleteToken();
    this.route.navigate(['/login']);
  }

  ngOnInit() {
  }

}
