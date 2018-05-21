import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController } from 'ionic-angular';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 

@IonicPage()
@Component({
  selector: 'page-myfollow',
  templateUrl: 'myfollow.html',
})
export class MyfollowPage {

  report_toid : any;
  report_comment : any;
  report_date : any;
  report_fromeid : any;
  user_id : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public ServerCtrl: ServerconnectProvider,
     private alertCtrl: AlertController,
     public LoadingController: LoadingController,
     public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyfollowPage');
  }

  doneReport(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      report_toid : this.report_toid,
      report_comment : this.report_comment,
      report_date : this.report_date = new Date().toISOString(),
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage

    }
    
    let promise;
        promise = this.ServerCtrl.doneReport(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.report_toid=""
              this.report_comment=""
              this.report_fromeid=""             
              this.report_date=""
              this.user_id=""
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(MyfollowPage);
            }else{
                loader.dismiss();
                this.presentAlertfail();             
            }
        },(error)=>{})
  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'ส่งรายงานสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  presentAlertfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

}
