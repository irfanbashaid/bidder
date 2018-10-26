import { Component, OnInit } from '@angular/core';
import { GrabitService } from '../service/grabit.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-changeowner',
  templateUrl: './changeowner.component.html',
  styleUrls: ['./changeowner.component.css']
})
export class ChangeownerComponent implements OnInit {

  constructor(private grabit:GrabitService,private route:Router,private spinner:NgxSpinnerService) { }

  transferOwnership(toaddress:string){
      var instance = this;
      instance.spinner.show();
      instance.grabit.transferOwnership(toaddress.trim()).then(res =>{
        instance.spinner.hide();
        if(res == 0){
          alert('Please Try again with valid details')
        }
        else if(res == 1){
          alert('Ownership Transferred Successfully');
          this.route.navigate(['/login']);
        }
        else if(res == 2){
          alert('Unable to Transfer')
        }
      })
  }

  ngOnInit() {
    (document.getElementById("addr")as HTMLInputElement).value=this.grabit._etherumAccountAddress;
  }

}
