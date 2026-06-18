import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonButton,
  IonItem, IonLabel, IonInput, IonList, IonIcon,
  IonItemSliding, IonItemOptions, IonItemOption,
  IonReorderGroup, IonReorder,
  AlertController
} from '@ionic/angular/standalone';
import { ReorderEndCustomEvent } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

import { Task } from '../../models/task.model';
import { addIcons } from 'ionicons';
import { addOutline, addCircleOutline, trashOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class Alert {
  private alertController: AlertController = inject(AlertController);

  async showAlert(headerText: string, messageText: string) {
    const alert = await this.alertController.create({
      header: headerText,
      message: messageText,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmAlert(
    header: string,
    message: string,
    funcionOk: Function,
    cancelText: string = 'Cancelar',
    confirmText: string = 'Aceptar'
  ) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
        },
        {
          text: confirmText,
          role: 'confirm',
          handler: () => {
            funcionOk();
          }
        }
      ],
    });

    await alert.present();
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonButton,
    IonItem, IonLabel, IonInput, IonList, IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption,
    IonReorderGroup, IonReorder
  ],
})
export class HomePage {

  newTaskStr: string = '';

  tasks: Task[] = [];

  private readonly KEY_TASK = 'local_key_task';

  public alertService: Alert = inject(Alert);

  constructor() {
    addIcons({ addOutline, addCircleOutline, trashOutline });
  }

  async ionViewWillEnter() {
    const taskPreferences = await Preferences.get({ key: this.KEY_TASK });

    if (taskPreferences.value) {
      const tasks = JSON.parse(taskPreferences.value);
      if (Array.isArray(tasks)) {
        this.tasks = tasks;
      }
    }
  }

  addTask() {
    console.log(this.newTaskStr);

    const title = this.newTaskStr.trim();

    if (!title) {
      return;
    }

    const exists = this.tasks.some(
      task => task.title.trim().toLowerCase() === title.toLowerCase()
    );

    if (exists) {
      alert('Tarea repetida');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title,
      description: '',
      completed: false,
      priority: 'medium'
    };

    this.tasks.push(newTask);

    console.log(this.tasks);
    this.alertService.showAlert('Exito.', 'Tarea agregada.');
    this.saveTaskOnLocal();
    this.newTaskStr = '';
  }

  confirmDelete(task: Task) {
    this.alertService.confirmAlert(
      'Aviso',
      `¿Desea borrar la tarea ${task.title}?`,
      () => this.deleteTask(task),
      'NO',
      'SI'
    );
  }

  deleteTask(taskRemove: Task) {
    const index = this.tasks.findIndex(task => task.id === taskRemove.id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.saveTaskOnLocal();
    }
  }

  actualizarPosiciones(event: ReorderEndCustomEvent) {
    console.log("El arreglo antes del cambio:", this.tasks);
    this.tasks = event.detail.complete(this.tasks);
    console.log("El arreglo despues del cambio:", this.tasks);
    this.saveTaskOnLocal();
  }

  saveTaskOnLocal() {
    Preferences.set({
      key: this.KEY_TASK,
      value: JSON.stringify(this.tasks)
    });
  }

}