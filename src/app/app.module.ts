import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
////////Import page//////////////////////////
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { ViewstorePage } from '../pages/viewstore/viewstore';
import { MyfollowPage } from '../pages/myfollow/myfollow';
import { MystorePage } from '../pages/mystore/mystore';
import { MybookingPage } from '../pages/mybooking/mybooking';
import { SearchstorePage } from '../pages/searchstore/searchstore';
import { RegisterstorePage } from '../pages/registerstore/registerstore';
import { BooklistPage } from '../pages/booklist/booklist';
import { ReportstorePage } from '../pages/reportstore/reportstore';
import { ListleasePage } from '../pages/listlease/listlease';
import { UpdatenewsPage } from '../pages/updatenews/updatenews';
import { ShowstorePage } from '../pages/showstore/showstore';
import { MemberPage } from '../pages/member/member';
import { EditaccountPage } from '../pages/editaccount/editaccount';
import { EditMemberPage } from '../pages/edit-member/edit-member';
import { EditstorePage } from '../pages/editstore/editstore';
import { AddmenuPage } from '../pages/addmenu/addmenu';
import { EditMenuPage } from '../pages/edit-menu/edit-menu';
import { SendleasePage } from '../pages/sendlease/sendlease';
import { AddleasePage } from '../pages/addlease/addlease';
import { ViewstoremenuPage } from '../pages/viewstoremenu/viewstoremenu';
import { ShowlistbookingPage } from '../pages/showlistbooking/showlistbooking';
import { ShowbooklistPage } from '../pages/showbooklist/showbooklist';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServerconnectProvider } from '../providers/serverconnect/serverconnect';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
//import { AgmCoreModule } from 'angular2-google-maps/core';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ViewstorePage,
    MyfollowPage,
    MystorePage,
    MybookingPage,
    SearchstorePage,
    RegisterstorePage,
    BooklistPage,
    ReportstorePage,
    ListleasePage,
    UpdatenewsPage,
    ShowstorePage,
    MemberPage,
    EditaccountPage,
    EditMemberPage,
    EditstorePage,
    AddmenuPage,
    EditMenuPage,
    SendleasePage,
    AddleasePage,
    ViewstoremenuPage,
    ShowlistbookingPage,
    ShowbooklistPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdrrmJqQ4MIDDbWljHNbkPDfDMK27rVHE'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ViewstorePage,
    MyfollowPage,
    MystorePage,
    MybookingPage,
    SearchstorePage,
    RegisterstorePage,
    BooklistPage,
    ReportstorePage,
    ListleasePage,
    UpdatenewsPage,
    ShowstorePage,
    MemberPage,
    EditaccountPage,
    EditMemberPage,
    EditstorePage,
    AddmenuPage,
    EditMenuPage,
    SendleasePage,
    AddleasePage,
    ViewstoremenuPage,
    ShowlistbookingPage,
    ShowbooklistPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerconnectProvider,
    Camera,
    Geolocation,
    LaunchNavigator
  ]
})
export class AppModule {}
