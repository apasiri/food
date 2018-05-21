import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';


import { ListleasePage } from '../listlease/listlease';

@IonicPage()
@Component({
  selector: 'page-addlease',
  templateUrl: 'addlease.html',
})
export class AddleasePage {

  lease_id : any;
  lease_img : any;
  lease_addtime : any;
  lease_user_id : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public ServerCtrl: ServerconnectProvider,
     private alertCtrl: AlertController,
     public LoadingController: LoadingController,
     public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {

    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    
    
    let body = {
      lease_id : this.lease_id = this.navParams.get('item')
    }
    
    let promisePay;
    promisePay = this.ServerCtrl.getLeaseforAddTime(body)
    promisePay.then((data:any) => {

      this.lease_img = 'data:image/jpeg;base64,' + data[0].lease_imgshow
      this.lease_addtime = data[0].lease_addtime
      this.lease_user_id = data[0].lease_user_id

    },(error)=>{})

    loader.dismiss();
  }

  doAddTime(id){
    this.lease_user_id = id
    console.log(this.lease_user_id)
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      lease_user_id : this.lease_user_id,
      lease_addtime : this.lease_addtime
    }
    
    let promise;
        promise = this.ServerCtrl.AddLeaseforTime(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.lease_addtime=""
              this.lease_user_id=""
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(ListleasePage);
            }else{
                loader.dismiss();
                this.presentAlertfail();             
            }
        },(error)=>{})

  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'เพิ่มระยะเวลาสำเร็จ',
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
