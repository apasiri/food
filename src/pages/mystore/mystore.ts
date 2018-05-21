import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { EditstorePage } from '../editstore/editstore';
import { AddmenuPage } from '../addmenu/addmenu';
import { EditMenuPage } from '../edit-menu/edit-menu';
import { SendleasePage } from '../sendlease/sendlease';


@IonicPage()
@Component({
  selector: 'page-mystore',
  templateUrl: 'mystore.html',
})
export class MystorePage {

  user_id: any;

  store_id : any;
  store_name : string;
  store_address : string;
  store_Subarea : string;
  store_area : string;
  store_Province : string;
  store_contact : string;
  store_img : any;
  store_createdate : any;
  store_status : any;
  store_modifydate : any;

  store_longitude : any;
  store_latitude : any;

  newstore_id : any;
  PayChannel_detail : any;
  Payid_delect : any;

  menuList : any;
  PayChannelList : any;
  newsList : any;
  user_status : any;
  menu_store_id : any;

  menu_id : any;

  public base64Image: string;
  imageData : any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController,
    private camera: Camera,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private geolocation: Geolocation) {
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
    
    /////////////////// refresh profile ///////////////////
    let promise;
    promise = this.ServerCtrl.getStore(body)
    promise.then((data: any)=>
    {
      this.store_img = 'data:image/jpeg;base64,' +  data[0].img

      this.store_id = data[0].store_id
      this.store_name = data[0].store_name
      this.store_address = data[0].store_address
      this.store_contact = data[0].store_contact
      this.store_area = data[0].store_Area
      this.store_status = data[0].store_status
      this.store_Province = data[0].store_Province
      this.store_Subarea = data[0].store_Subarea
      this.store_modifydate = data[0].store_modifydate

    })

    //get payment
    let promisePay;
    promisePay = this.ServerCtrl.getPaymentCh(body)
    promisePay.then((data:any) => {
      this.PayChannelList = data;
    },(error)=>{})

    //get menu
    let promiseMenu;
    promiseMenu = this.ServerCtrl.getMenu(body)
    promiseMenu.then((data:any) => {
      this.menuList = data;
    },(error)=>{})

    loader.dismiss();
  }

  EditStore(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    this.navCtrl.push(EditstorePage);
    loader.dismiss();
  }

  doLease(){
    this.navCtrl.push(SendleasePage);
  }

  updateLocation(){
    //เก็บค่า Location ปัจจุบัน
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.store_latitude = resp.coords.latitude 
      this.store_longitude = resp.coords.longitude
      //this.destination = this.store_latitude + ' ' + this.store_longitude
      console.log(this.store_latitude);
      let loader = this.LoadingController.create({
        content: 'กำลังโหลด',spinner: 'crescent'
      })
      loader.present();
     
      let body = {
        store_latitude : this.store_latitude,
        store_longitude : this.store_longitude,
        user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
      }
      
      let promise;
          promise = this.ServerCtrl.updateLocation(body)   
          promise.then((data: any)=>{
              if(data[0]['Alert']==1){
                loader.dismiss();
                this.presentLocationsSuecess();
                this.navCtrl.setRoot(MystorePage);
              }else{
                  loader.dismiss();
                  this.presentLocationsfail();             
              }
          },(error)=>{})

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }
  presentLocationsSuecess() {
    let alert = this.alertCtrl.create({
      subTitle: 'อัพเดตตำแหน่งปัจจุบันสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  presentLocationsfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

  delectPayCh(_id){

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
              this.Payid_delect = _id
              let body = {
                Payid_delect : this.Payid_delect
              }
              
              let promise;
                  promise = this.ServerCtrl.DeletePayCh(body)   
                  promise.then((data: any)=>{
                      if(data[0]['Alert']==1){
                        loader.dismiss();
                        this.DeletePayItem();
                        this.navCtrl.setRoot(MystorePage);
                      }else{
                          loader.dismiss();
                          this.DeletePayfail();             
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

  DeletePayItem() {
    let alert = this.alertCtrl.create({
      subTitle: 'ลบรายการสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  DeletePayfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }


  doPayment(item_store_id){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    //รับค่า store_id มาเก็บไว้ newstore_id
    this.newstore_id = item_store_id
    console.log(item_store_id)
    let body = {
      store_id : this.newstore_id,
      PayChannel_detail : this.PayChannel_detail
    }

    let promise;
        promise = this.ServerCtrl.addPayment(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.PayChannel_detail=""
              this.store_id=""
              loader.dismiss();
              this.paymentSuccess();
              this.navCtrl.setRoot(MystorePage);
            }else{
                loader.dismiss();
                this.paymentfail();             
            }
        },(error)=>{})
  }
  paymentSuccess() {
    let alert = this.alertCtrl.create({
      subTitle: 'เพิ่มช่องทางการชำระเงินสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  paymentfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

  goAddMenu(_id){
    //this.navCtrl.push(EditMemberPage,{item:_Itemuser});
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    this.navCtrl.push(AddmenuPage,{item:_id});
    loader.dismiss();
  }

  EditMenu(_id){

    let confirmDelectMember = this.alertCtrl.create({
      title: '',
      message: 'โปรดกดยืนยันหากต้องการลบรายการ',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            let loader = this.LoadingController.create({
              content: 'กำลังโหลด',spinner: 'crescent'
            })
            loader.present();
            this.menu_id = _id
            let body = {
              menu_id : this.menu_id
            }
            
            let promise;
                promise = this.ServerCtrl.DeleteMenu(body)   
                promise.then((data: any)=>{
                    if(data[0]['Alert']==1){
                      loader.dismiss();
                      this.DeleteMenuItem();
                      this.navCtrl.setRoot(MystorePage);
                    }else{
                        loader.dismiss();
                        this.DeleteMenufail();             
                    }
                },(error)=>{

                })
          }
        }
      ]
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: 'กดเลือกเพื่อทำรายการ ',
      buttons: [
        {
          text: 'ลบรายการ',
          role: 'Delete',
          handler: () => {
            confirmDelectMember.present();
          }
        },
        {
          text: 'เรียกดูข้อมูลรายการอาหาร',
          role: 'Edit',
          handler: () => {
            this.navCtrl.push(EditMenuPage,{item:_id});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

  actionSheet.present();
  }

  DeleteMenuItem() {
    let alert = this.alertCtrl.create({
      subTitle: 'ลบรายการอาหารสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  DeleteMenufail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }


}
