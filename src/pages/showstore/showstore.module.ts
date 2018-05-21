import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowstorePage } from './showstore';

@NgModule({
  declarations: [
    ShowstorePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowstorePage),
  ],
})
export class ShowstorePageModule {}
