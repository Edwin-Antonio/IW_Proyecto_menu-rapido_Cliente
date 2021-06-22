import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Platillo } from '../models/platillo';
import { PlatilloService } from '../services/platillo.service';
import { PedidosService } from '../services/pedidos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tab1Page } from "../tab1/tab1.page";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public platillo: Platillo;
  public myForm: FormGroup;
  public total = 0;

  constructor(private actroute: ActivatedRoute, private platillosService: PlatilloService, private fb: FormBuilder, private pedidosService: PedidosService, private router: Router) {
    this.actroute.queryParams.subscribe(
      params => {
        if (params && params.special) {
          this.platillo = JSON.parse(params.special) as Platillo;
          console.log(this.platillo);
        }
      }
    );
  }

  ngOnInit() {
    this.myForm = this.fb.group({ cantidad: 0 });
    this.cleanInputs();
  }

  create() {
    this.platillosService.addPlatillo(this.platillo, this.myForm.controls.cantidad.value);
    this.cleanInputs();
    this.pedidosService.total += this.platillo.price;
    alert('Pedido agregado con exito'); 
  }

  back(){
    this.router.navigate([Tab1Page]);
  }

  private cleanInputs(): void {
    this.myForm = this.fb.group({
      cantidad: [1, Validators.compose([Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)])]
    });
  }
}