import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyfollowPage } from './myfollow';

@NgModule({
  declarations: [
    MyfollowPage,
  ],
  imports: [
    IonicPageModule.forChild(MyfollowPage),
  ],
})
export class MyfollowPageModule {}
