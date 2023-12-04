import { Injectable, inject } from '@angular/core';
import { ToastOptions, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toastController = inject(ToastController);

  constructor() { }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
}
