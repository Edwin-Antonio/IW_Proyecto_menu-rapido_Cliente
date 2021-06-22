import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Platillo } from "../models/platillo";
import { PlatilloService } from "../services/platillo.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public platillos: Platillo[];
  public platillos_2: Platillo[];
  search: string;

  constructor(private platilloService: PlatilloService, private router: Router) {
    this.platillos = []
    this.platillos_2 = []
    this.platilloService.getPlatillo().subscribe(data => {
      this.platillos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Platillo
        };
      });
    });
    this.platilloService.getPlatillo().subscribe(data => {
      this.platillos_2 = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Platillo
        };
      });
    });

    this.platillos_2 = this.platillos;
  }

  getAll(): void {
    this.platillos = this.platillos_2;
  }

  detail(platillo: []) {
    const navext: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(platillo)
      }
    };
    this.router.navigate(['/detail'], navext);
  }

  filter(): void {
    this.getAll();
    if (this.search && this.search.trim()) {
      this.platillos = this.platillos.filter((platillo) => {
        return (platillo.name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
      });
    }
  }
}
