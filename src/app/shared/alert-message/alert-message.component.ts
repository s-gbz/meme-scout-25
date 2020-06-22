import { Component, OnInit, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class AlertMessage {

  constructor(public alertController: AlertController) { }

  async presentAlert(message: string){
    const alert = await this.alertController.create({
      cssClass: 'custom-alert', // global css
      message: message
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
