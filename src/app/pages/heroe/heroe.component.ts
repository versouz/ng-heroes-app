import { Component, OnInit } from "@angular/core";
import {
  faArrowLeft,
  faSmileWink,
  faDizzy,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { HeroeModel } from "src/app/models/heroe.model";
import { NgForm } from "@angular/forms";
import { HeroesService } from "src/app/services/heroes.service";

import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faSmileWink = faSmileWink;
  faDizzy = faDizzy;
  faSave = faSave;

  heroe = new HeroeModel();

  constructor(
    private heroeService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "nuevo") {
      this.heroeService
        .getHeroe(id)
        .subscribe((res: HeroeModel) => (this.heroe = res));
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) return;

    Swal.fire({
      title: "Espere",
      text: "Guardado información",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroeService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe(res => {
      if (!this.heroe.id) this.heroe = res;

      Swal.fire({
        title: this.heroe.nombre,
        text: "Se actualizó correctamente",
        type: "success"
      });
    });
  }
}
