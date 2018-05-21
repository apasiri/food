import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewstorePage } from './viewstore';

@NgModule({
  declarations: [
    ViewstorePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewstorePage),
  ],
})
export class ViewstorePageModule {}
