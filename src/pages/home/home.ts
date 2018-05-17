import { Component } from '@angular/core';

import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  animales: Animal[] = []
  audio = new Audio();
  audioTime: any;
  ordenando: boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir( animal: Animal ) {
    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    
    animal.reproduciendo = true;

    this.audioTime = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000 );

  }

  pausarAudio (animal: Animal) {

    clearTimeout( this.audioTime );

    this.audio.pause();
    this.audio.currentTime = 0;

    this.animales.map( (valor) => {
      if (valor.audio !== animal.audio) {
        valor.reproduciendo = false;
      }
    });

  }

  borrarAudio(idx: number) {
    this.audio.pause();
    this.animales.splice(idx, 1);
  }

  recargarAnimales( recargar:Refresher) {
    setTimeout( () => {
      this.animales = ANIMALES.slice(0);
      recargar.complete();
    }, 1500);
  }

  reordenarAnimales(indices: any) {
    this.animales = reorderArray(this.animales, indices);
  }

}
