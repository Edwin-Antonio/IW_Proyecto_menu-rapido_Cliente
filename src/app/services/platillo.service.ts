import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Platillo } from '../models/platillo';

@Injectable({
  providedIn: 'root'
})
export class PlatilloService {

  public name: string[];
  public cantidad: number[];
  public platillos: Platillo[];

  constructor(private firestore: AngularFirestore) {
    this.name = [];
    this.cantidad = [];
    this.platillos = [{
      name: '',
      image: '',
      price: 0
    }];
  }

  getPlatillo() {
    return this.firestore.collection('platillos').snapshotChanges();
  }

  addPlatillo(platillo: Platillo, cantidad: number) {
    this.cantidad.push(cantidad);
    this.name.push(platillo.name);
    this.platillos.push({
      name: platillo.name,
      image: platillo.image,
      price: platillo.price
    });
    console.log(this.cantidad);
    console.log(this.name);
    console.log(this.platillos);
  }

  deletePlatillo(platillo: Platillo) {
    this.platillos.forEach(e => {
      if (e.name == platillo.name) {
        this.platillos.splice(this.platillos.indexOf(e), 1);
      }
    });
    console.log(this.platillos);
  }
}
