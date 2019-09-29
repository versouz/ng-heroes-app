import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { map } from "rxjs/operators";

import * as config from "../../config.json";

@Injectable({
  providedIn: "root"
})
export class HeroesService {
  baseUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = config["default"].firebaseUrl;
    this.apiKey = config["default"].firebaseApikey;

    console.log(this.baseUrl, this.apiKey);
  }

  crearHeroe(heroe: HeroeModel) {
    const newHeroe = {
      ...heroe
    };

    return this.http.post(`${this.baseUrl}/heroes.json`, newHeroe).pipe(
      map((res: any) => {
        newHeroe.id = res.name;
        return newHeroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const newHeroe = {
      ...heroe
    };
    delete newHeroe.id;

    return this.http.put(`${this.baseUrl}/heroes/${heroe.id}.json`, newHeroe);
  }

  removeHeroe(id) {
    return this.http.delete(`${this.baseUrl}/heroes/${id}.json`);
  }

  getHeroe(id) {
    return this.http.get(`${this.baseUrl}/heroes/${id}.json`).pipe(
      map((res: any) => {
        res.id = id;
        return res;
      })
    );
  }

  getHeroes() {
    return this.http
      .get(`${this.baseUrl}/heroes.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroesObj: object) {
    if (heroesObj === null) return [];
    const heroes: HeroeModel[] = [];

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
