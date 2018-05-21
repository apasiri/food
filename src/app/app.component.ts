import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ServerconnectProvider } from '../providers/serverconnect/serverconnect'; 

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// Import page 
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
import { SendleasePage } from '../pages/sendlease/sendlease';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage : any = HomePage;
  buttonlogout : boolean;
  btnstore : boolean; 
  btnfollow : boolean;
  btnbooklist : boolean;
  btnbooking : boolean;
  btnlistlease : boolean;
  btnreport : boolean;
  btnreportfrommrmber : boolean;

  checklogin : any;
  userstatus : any;
  user_id : any;
  datecurrent : any;

  pages: Array<{title: string, component: any, icon: string}> = [];

  constructor(
     public platform: Platform,
     public statusBar: StatusBar, 
     public splashScreen: SplashScreen,
     public ServerCtrl: ServerconnectProvider,
     private alertCtrl: AlertController,
     public LoadingController: LoadingController) {
    this.initializeApp();

    var statuslogin = localStorage.getItem('Statuslogin');
    var Checkuserstatus = localStorage.getItem('user_status');
    // checklogin statuslogin 1 มีสมาชิก 0 ไม่มี
    this.pages = [];
    if( statuslogin == "1" || statuslogin =='1'){
      //ตรวจสอบ user_status 1 = member 2 = member have store 3 = admin
      if(Checkuserstatus == "3"){
        this.rootPage = HomePage;
        this.pages.push({title: 'Reviwe', component: HomePage , icon :"md-home"},
        {title: 'อัพเดตข่าวสาร', component: UpdatenewsPage , icon :"md-cloud-upload"},
        {title: 'ข้อมูลส่วนตัว (Status : Admin)', component: AccountPage , icon :"md-person"},
        {title: 'ข้อมูลสมาชิก', component: MemberPage , icon :"md-people"}
        );
        this.btnlistlease = !this.btnlistlease;
        this.btnreport = !this.btnreport;
        this.buttonlogout = !this.buttonlogout;
      }
      else{
        this.rootPage = HomePage;
        this.pages.push({title: 'Reviwe', component: HomePage, icon :"md-home"},
        {title: 'ข้อมูลส่วนตัว', component: AccountPage, icon :"md-person"},
        {title: 'รายการอาหาร', component: ShowstorePage, icon :"md-list"}
        );
        this.btnbooking = !this.btnbooking;
        this.btnstore = !this.btnstore;
        this.btnbooklist = !this.btnbooklist;
        this.btnreportfrommrmber = !this.btnreportfrommrmber
        this.buttonlogout = !this.buttonlogout;
      }
    }
    else{
      this.pages.push({title: 'Reviwe', component: HomePage, icon :"md-home"},
      { title: 'สมัครสมาชิก', component: RegisterPage, icon :"md-build"},
      { title: 'เข้าสู่ระบบ', component: LoginPage, icon :"md-log-in"});
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){

    localStorage.removeItem('UserLogin');
    localStorage.setItem('Statuslogin',JSON.stringify(0)); 
    localStorage.removeItem('user_status');
    localStorage.removeItem('user_id');
    localStorage.removeItem('UserPass');
    this.nav.setRoot(HomePage);
    window.location.reload(true);
  }

  goStore(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    let alertwarning = this.alertCtrl.create({
      subTitle: 'ระบบทำการระงับการใช้งานร้านค้าของคุณ "ชั่วคราว" เนื่องจากได้รับรายงานเกี่ยวกับการกระทำความผิด',
      buttons: ['OK']
    });
    let confirmExp = this.alertCtrl.create({
      title: 'ร้านค้าของคุณหมดอายุ!!',
      message: 'คุณต้องการต่ออายุการเปิดร้านกับเราหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.nav.push(SendleasePage);
          }
        }
      ]
    });
   
    let body = {     
      user_id : this.user_id = localStorage.getItem('user_id'),//get ค่า user_id จาก localstorage
      datecurrent : this.datecurrent = new Date().toISOString(),
    }
    
    let promise;
        promise = this.ServerCtrl.goStore(body)   
        promise.then((data: any)=>{
          // 0 ไม่มีร้านให้ทำการสมัครเปิดร้าน มากกว่า 0 เปิดร้าน ให้ทำการตรวจสอบ -1 ร้านค่าหมดอายุ -2 IsActive ถูกระงับ
            if(data[0]['Alert'] != "0"){
              if(data[0]['Alert'] < "0"){
                if(data[0]['Alert'] == "-1"){
                  confirmExp.present();
                  loader.dismiss();
                }
                else{
                  alertwarning.present();
                  this.nav.setRoot(ShowstorePage);
                  loader.dismiss();
                }
              }
              else{
                loader.dismiss();
                this.nav.setRoot(MystorePage);
              }
            }else{
                loader.dismiss(); 
                this.presentAlertfail(); 
                this.nav.setRoot(RegisterstorePage);           
            }
        },(error)=>{}) 
  }

  presentAlertfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ไม่พบข้อมูลร้าน คุณต้องการเปิดร้านกับเราหรือไม่ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            this.nav.setRoot(HomePage); 
          }
        },
        {
          text: 'ตกลง',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }
    
  

  goReportfrommember(){
    this.nav.setRoot(MyfollowPage);
  }

  gobooking(){
    this.nav.setRoot(MybookingPage);
  }

  gobooklist(){
    this.nav.setRoot(BooklistPage);
  }

  goListlease(){
    this.nav.setRoot(ListleasePage);
  }

  goReport(){
    this.nav.setRoot(ReportstorePage);
  }
 
}
