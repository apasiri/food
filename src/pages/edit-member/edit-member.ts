import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { MemberPage } from '../member/member';

@IonicPage()
@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html',
})
export class EditMemberPage {

  detail : any;
  user_name: any;
  user_phone: any;
  user_Email: any;
  user_personalID: any;
  user_sex: any;
  img: string;
  user_id: any;
  memberdata : any;
  user_store_id : any;
  user_status : any;
  user_username : any;
  user_password : any;
  store_IsActive : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController,
    private camera: Camera,
    private alertCtrl: AlertController) {
      //this.detail = this.navParams.get('item');
  }

  ionViewDidLoad() {
    this.detail = this.navParams.get('item');
    console.log(this.detail);
    
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    
    console.log()
    let body = {
      user_id : this.detail
    }
    

    /////////////////// refresh profile ///////////////////
    let promise;
    promise = this.ServerCtrl.getMemberaccount(body)
    promise.then((data: any)=>
    {

      loader.dismiss();
      this.img = 'data:image/jpeg;base64,' + data[0].img

      this.user_name = data[0].user_name
      this.user_Email = data[0].user_email
      this.user_sex = data[0].user_sex
      this.user_phone = data[0].user_phonenumber
      this.user_personalID = data[0].user_personalID
      this.user_store_id = data[0].user_store_id
      this.user_status = data[0].user_status
      this.user_username = data[0].user_username
      this.user_password = data[0].user_password

      this.store_IsActive = data[0].store_IsActive

    })
  }


  doEdit(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      user_name : this.user_name,
      user_Email : this.user_Email,
      user_sex : this.user_sex,
      user_phone : this.user_phone,
      user_personalID :this.user_personalID,
      user_id : this.detail,
      user_store_id : this.user_store_id, 
      user_status : this.user_status, 
      user_username : this.user_username,
      user_password : this.user_password, 
      store_IsActive : this.store_IsActive
    }
    
    let promise;
        promise = this.ServerCtrl.EditAccountFormAdmin(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(MemberPage);
            }else{
                loader.dismiss();
                this.presentAlertfail();             
            }
        },(error)=>{})

  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'บันทึกข้อมูลสำเร็จ',
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
