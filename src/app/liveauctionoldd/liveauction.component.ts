import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
@Component({
  selector: 'app-liveauction',
  templateUrl: './liveauction.component.html',
  styleUrls: ['./liveauction.component.css']
})
export class LiveauctionComponent implements OnInit {
  public canshow:boolean;

  constructor(private grabit:GrabitService) {

   }
  changestate(){
    this.grabit.imgshow=!this.grabit.imgshow;
  }
  ngOnInit() {
    
  }

}
