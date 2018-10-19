import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GrabItAuction';


   
  //  hourglass() {
  //   var a;
  //   a = document.getElementById("target");
  //   document.body.style.backgroundColor = "#668cff";
  //   a.innerHTML = "&#xf254;";
  //   setTimeout(function () {
  //       a.innerHTML = "&#x00F7;";
  //     }, 1000);
  //   setTimeout(function () {
  //       a.innerHTML = "&#xf252;";
  //     }, 2000);
  //   setTimeout(function () {
  //       a.innerHTML = "&#xf251;";
  //     }, 3000);
  //   setTimeout(function () {
  //       a.innerHTML = "welcome";
  //     }, 4000);
  //   setTimeout(function () {
  //     document.getElementById("target").hidden=true;
  //     document.getElementById("project").hidden=false;
  //     document.body.style.backgroundColor = "white";
  //   }, 5000);
    
      
  // }

  // ngOnInit() {
  //   document.getElementById("project").hidden=true;

  //   this.hourglass();
  // }   
  chargebattery() {
    var a;
    a = document.getElementById("target");
    let timer=4;
    var looper = setInterval(function () {
      if(document.readyState === 'complete') {
        document. body.style.backgroundColor = "white";
        document.getElementById("mainid").hidden=false;
        document.getElementById("target").hidden=true;
        clearInterval(looper);
      }
      a.innerHTML = "&#xF203"+timer+";"
      if(timer == 0){
        timer = 4;
      }
      timer--;
    }, 1000);
 
  }
 
  ngOnInit() {
    document.getElementById("mainid").hidden=true;
    this.chargebattery();
  }
  }