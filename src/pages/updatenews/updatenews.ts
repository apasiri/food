import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-updatenews',
  templateUrl: 'updatenews.html',
})
export class UpdatenewsPage {

  news_topic : string;
  news_story : string;
  news_date : any;
  user_id : any;
  newsList : any;
  user_status : any;
  img : any;
  news_id : any;

  public base64Image: string;
  imageData : any;

  news: Array<{title: string, component: any, icon: string}> = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
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
      user_status : this.user_status = localStorage.getItem('user_status')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.getNews(body)
    promise.then((data:any) => {
      this.newsList = data;
      loader.dismiss(); 
    },(error)=>{})
  }


  
  addNews(){

    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      news_topic : this.news_topic,
      news_story : this.news_story,
      news_img : this.imageData,
      news_date : this.news_date = new Date().toISOString(),
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage

    }
    
    let promise;
        promise = this.ServerCtrl.UpdateNews(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.news_topic=""
              this.news_story=""
              this.news_date=""             
              this.imageData=""
              this.user_id=""
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(UpdatenewsPage);
            }else{
                loader.dismiss();
                this.presentAlertfail();             
            }
        },(error)=>{})
  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'อัพเดตข่าวสารสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  presentAlertfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด กรุณาเพิ่มรูปประกอบข่าวสาร',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

  /////////// img ////////////////////
  takePicture() {
    let Option: CameraOptions = {
      destinationType: 0,
      sourceType: 1,
      targetHeight: 960,
      targetWidth: 960, //what widht you want after capaturing
     
    };
    this.camera.getPicture(Option).then((ImageData) => {
      this.imageData = ImageData;
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;
    }, (err) => {
      //Handle error
    });
  }


  browsePicture() {
    let Option: CameraOptions = {
      destinationType: 0,
      sourceType: 0,
      targetHeight: 960,
      targetWidth: 960, //what widht you want after capaturing
      
    };
    this.camera.getPicture(Option).then((ImageData) => {
      this.imageData = ImageData;
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;

    }, (err) => {
      //Handle error
    });
  }

  removePicture() {
    this.imageData = undefined
    this.base64Image = undefined
  }

  //รับค่า news_id เพื่อทำการ ลบ รายการ
  changNews(Itemnews_id){
    console.log(Itemnews_id);
    let actionSheet = this.actionSheetCtrl.create({
        title: 'เลือก "ลบรายการ" เพื่อลบรายการข่าว',
        buttons: [
          {
            text: 'ลบรายการ',
            role: 'Delete',
            handler: () => {
              let loader = this.LoadingController.create({
                content: 'กำลังโหลด',spinner: 'crescent'
              })
              loader.present();
              this.news_id = Itemnews_id
              let body = {
                news_id : this.news_id
              }
              
              let promise;
                  promise = this.ServerCtrl.DeleteNews(body)   
                  promise.then((data: any)=>{
                      if(data[0]['Alert']==1){
                        loader.dismiss();
                        this.DeleteNewsItem();
                        this.navCtrl.setRoot(UpdatenewsPage);
                      }else{
                          loader.dismiss();
                          this.DeleteNewsfail();             
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

    

    DeleteNewsItem() {
      let alert = this.alertCtrl.create({
        subTitle: 'ลบรายการข่าวสำเร็จ',
        buttons: ['ยืนยัน']
      });
      alert.present();
    }
    DeleteNewsfail() {
      let alert = this.alertCtrl.create({
        subTitle: 'ผิดพลาด',
        buttons: ['ยืนยัน']
      });
      alert.present();
    }
}

    

