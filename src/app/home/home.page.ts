import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton }

  from '@ionic/angular/standalone';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton],
})
export class HomePage {

  tasks: Task[] = [
    {
      id: 1, titulo: 'Configuracion de Ionic',
      descripcion: 'Instalar Node.js, AngularCLI',
      finalizado: true,
      prioridad: 'Alta'

    },

    {
      id: 2,
      titulo: 'Crear app tasklist',
      descripcion: 'Desarrollar la interfaz de la pagina principal',
      finalizado: false,
      prioridad: 'Alta'
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