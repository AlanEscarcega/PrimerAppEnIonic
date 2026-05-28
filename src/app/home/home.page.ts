import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonButton
} from '@ionic/angular/standalone';

import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonButton
  ],
})
export class HomePage {

  tasks: Task[] = [
    {
      id: 1,
      title: 'Configuracion de Ionic',
      description: 'Instalar Node.js, Angular CLI',
      completed: true,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Crear app tasklist',
      description: 'Desarrollar la interfaz de la pagina principal',
      completed: false,
      priority: 'high'
    }
  ];

  constructor() {
    console.log(this.tasks);
  }

  saludar() {
    console.log('Este es mi primer boton en Ionic');
    console.log(this.tasks);
  }
}