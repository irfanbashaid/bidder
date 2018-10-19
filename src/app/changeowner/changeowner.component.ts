import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';

@Component({
  selector: 'app-changeowner',
  templateUrl: './changeowner.component.html',
  styleUrls: ['./changeowner.component.css']
})
export class ChangeownerComponent implements OnInit {

  constructor(private grabit:GrabitService) { }

  transferOwnership(toaddress){
      var instance = this;
      instance.grabit.transferOwnership(toaddress).then(res =>{
        if(res == 0){

        }
        else if(res == 1){

        }
        else if(res == 2){

        }
      })
  }

  ngOnInit() {
  }

}
