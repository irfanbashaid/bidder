import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OwnerComponent } from './owner/owner.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { ChangeownerComponent } from './changeowner/changeowner.component';
import { SetresultComponent } from './setresult/setresult.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { BidlogComponent } from './bidlog/bidlog.component';
import { WinhistoryComponent } from './winhistory/winhistory.component';
import { LiveauctionComponent } from './liveauction/liveauction.component';
import { ClosedauctionComponent } from './closedauction/closedauction.component';
import { UpcomingauctionComponent } from './upcomingauction/upcomingauction.component';
import { MeetwinnersComponent } from './meetwinners/meetwinners.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SendcreditsComponent } from './sendcredits/sendcredits.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewauctionComponent } from "./viewauction/viewauction.component";
import { SelectComponent } from './select/select.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    OwnerComponent,
    CreateAuctionComponent,
    ChangeownerComponent,
    SetresultComponent,
    MyaccountComponent,
    BidlogComponent,
    WinhistoryComponent,
    LiveauctionComponent,
    ClosedauctionComponent,
    UpcomingauctionComponent,
    MeetwinnersComponent,
    SendcreditsComponent,
    ViewauctionComponent,
    SelectComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
