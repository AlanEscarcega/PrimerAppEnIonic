import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonButton,
  IonItem, IonLabel, IonInput, IonList, IonIcon
} from '@ionic/angular/standalone';

import { Task } from '../../models/task.model';
import { addIcons } from 'ionIcons';
import { addOutline, addCircleOutline } from 'ionicons/icons';


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
    IonItem, IonLabel, IonInput, IonList, IonItem, IonIcon
  ],
})
export class HomePage {

  newTaskStr: string = '';

  tasks: Task[] = [

  ];

  constructor() {

    addIcons({ addOutline, addCircleOutline });
    console.log(this.tasks);
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
    this.newTaskStr = ''; // Limpia el input

    console.log(this.tasks);
  }

}