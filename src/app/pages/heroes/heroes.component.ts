import { Component, OnInit } from "@angular/core";
import {
  faPlus,
  faSyncAlt,
  faExclamation,
  faPen,
  faTrash,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { HeroesService } from "src/app/services/heroes.service";
import { HeroeModel } from "src/app/models/heroe.model";

import Swal from "sweetalert2";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  faPlus = faPlus;
  faSyncAlt = faSyncAlt;
  faExclamation = faExclamation;
  faPen = faPen;
  faSave = faSave;
  faTrash = faTrash;

  loading = true;

  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.loading = true;
    this.heroesService.getHeroes().subscribe(res => {
      this.heroes = res;
      this.loading = false;
    });
  }

  async removeHeroe(heroe: HeroeModel, index: number) {
    const deletedHeroe = { ...this.heroes[index] };
    try {
      const res = await Swal.fire({
        title: "¿Está seguro?",
        text: `Está seguro que desea borrar a ${heroe.nombre}`,
        type: "question",
        showConfirmButton: true,
        showCancelButton: true
      });
      if (res.value) {
        this.heroes.splice(index, 1);
        this.heroesService.removeHeroe(heroe.id).subscribe(
          data => {},
          err => {
            this.heroes.splice(index, 0, deletedHeroe);
          }
        );
      }
    } catch (err) {
      console.log(err);
      this.heroes.splice(index, 0, deletedHeroe);
    }
  }
}
