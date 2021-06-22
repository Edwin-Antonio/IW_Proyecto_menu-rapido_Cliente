import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  public total = 0;

  constructor(private firestore: AngularFirestore) { }

  createPedido(pedido: Pedido) {
    return this.firestore.collection('apprestaurante').add(pedido);
  }

}
