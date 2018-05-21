import { Component , ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';

import { AddleasePage } from '../addlease/addlease';

@IonicPage()
@Component({
  selector: 'page-listlease',
  templateUrl: 'listlease.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      ion-tabs {
        margin-bottom: 20px;
      }
    `,
    `
      ion-tabs,
      ion-tabs .tabbar {
        position: relative;
        top: auto;
        height: auto;
        visibility: visible;
        opacity: 1;
      }
    `
  ]
})
export class ListleasePage {

  user_id : any;
  payList : any;
  pay_detail : any;
  pay_id : any;
  leaseList : any;

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
    
    console.log()
    let body = {
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
    }
    
    let promisePay;
    promisePay = this.ServerCtrl.getPayAdmin(body)
    promisePay.then((data:any) => {
      this.payList = data;
    },(error)=>{})

    let promiseLease;
    promiseLease = this.ServerCtrl.getLeaseAdmin(body)
    promiseLease.then((data:any) => {
      this.leaseList = data;
          var iarray = 0;
            for (var i = 0; i < data.length; i++){
              if(this.leaseList[iarray].lease_addtime == "0"){
                this.leaseList[iarray].lease_addtime = "Success"
                iarray++;
              }
              else{
                this.leaseList[iarray].lease_addtime = "Non-Success"
                iarray++;
              }
            }
      
    },(error)=>{})

    loader.dismiss();
  }
  //ลบรายการจ่ายเงิน
  delectpayAdmin(_id){
    console.log(_id);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'เลือก "ลบรายการ" เพื่อลบรายการ',
      buttons: [
        {
          text: 'ลบรายการ',
          role: 'Delete',
          handler: () => {
            let loader = this.LoadingController.create({
              content: 'กำลังโหลด',spinner: 'crescent'
            })
            loader.present();
            this.pay_id = _id
            let body = {
              pay_id : this.pay_id
            }
            
            let promise;
                promise = this.ServerCtrl.DeletePayAdmin(body)   
                promise.then((data: any)=>{
                    if(data[0]['Alert']==1){
                      loader.dismiss();
                      this.DeleteItem();
                      this.navCtrl.setRoot(ListleasePage);
                    }else{
                        loader.dismiss();
                        this.Deletefail();             
                    }
                },(error)=>{

                })
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
  DeleteItem() {
    let alert = this.alertCtrl.create({
      subTitle: 'ลบรายการสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  Deletefail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  //เพิ่มรายการจ่ายเงิน
  doPayment(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      pay_detail : this.pay_detail,
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage

    }
    
    let promise;
        promise = this.ServerCtrl.AddPayAdmin(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.pay_detail=""
              this.user_id=""
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
      subTitle: 'เพิ่มช่องทางการชำระเงินสำเร็จ',
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

  addTime(_id){
    console.log(_id);
    this.navCtrl.push(AddleasePage,{item:_id});
  }

  
}
