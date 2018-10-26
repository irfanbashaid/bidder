import { Routes } from '@angular/router';
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
import { AuthGuard } from './auth/auth.guard';
import { SelectComponent } from './select/select.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,canActivate:[AuthGuard]

  },
  {
    path: 'owner',
    component:OwnerComponent,canActivate:[AuthGuard]
  },
  {
    path: 'createAuction',
    component:CreateAuctionComponent,canActivate:[AuthGuard]
  },
  {
    path: 'changeowner',
    component:ChangeownerComponent,canActivate:[AuthGuard]
  },
  {
    path: 'setresult',
    component:SetresultComponent,canActivate:[AuthGuard]
  },
  {
    path: 'select',
    component:SelectComponent,canActivate:[AuthGuard]
  },
  {
    path: 'myaccount',
    component:MyaccountComponent,canActivate:[AuthGuard]
  },
  {
    path: 'bidlog',
    component:BidlogComponent,canActivate:[AuthGuard]
  },
  {
    path: 'winhistory',
    component:WinhistoryComponent,canActivate:[AuthGuard]
  },
  {
    path: 'live',
    component:LiveauctionComponent,canActivate:[AuthGuard]
  },
  {
    path: 'closed',
    component:ClosedauctionComponent,canActivate:[AuthGuard]
  },
  {
    path: 'upcoming',
    component:UpcomingauctionComponent,canActivate:[AuthGuard]
  },
  {
    path: 'winners',
    component:MeetwinnersComponent,canActivate:[AuthGuard]
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];