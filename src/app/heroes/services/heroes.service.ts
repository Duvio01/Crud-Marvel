import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as md5 from 'md5-js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseHeroes } from 'src/app/interfaces/heroes.interface';
import { Comics } from 'src/app/interfaces/comics.interface';
import { Paginator } from '../config/table-comics.config';


@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl
  private apiKeyPublic: string = environment.apiKeyPublic
  private apiKeyPrivate: string = environment.apiKeyPrivate
  private ts = new Date().getTime();
  private hash = md5(this.ts + this.apiKeyPrivate + this.apiKeyPublic);
  private keyHash: string = `?apikey=${this.apiKeyPublic}&ts=${this.ts}&hash=${this.hash}`

  /**
  * Método que construye la url segun los parametros definidos
  * @param pagination objeto con la informacion de la paginacion
  * @param nameHeroe string con el nombre del heroe
  * @param id id del heroe
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  buildUrl(pagination: Paginator, nameHeroe: string, id: number): string {
    const offset = pagination.pageIndex * pagination.pageSize
    let url = `${this.apiUrl}`

    if (id) {
      url += `/${id}/comics`
    }

    url += `${this.keyHash}&limit=${pagination.pageSize}`

    if (offset > 0) {
      url += `&offset=${offset}`
    }
    if (nameHeroe) {
      url += `&nameStartsWith=${nameHeroe}`;
    }
    return url
  }

    /**
  * Método que realiza la consulta de los heroes
  * @param pagination objecto con la informacion de la paginacion
  * @param nameHeroe string con el nombre del heroe
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  getHeroes(pagination: Paginator, nameHeroe: string): Observable<ResponseHeroes> {
    return this.http.get<ResponseHeroes>(this.buildUrl(pagination, nameHeroe, null))
  }

    /**
  * Método que realiza la consulta de los comics de un heroe
  * @param pagination objecto con la informacion de la paginacion
  * @param id id del heroe
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  getComics(id: number, pagination: Paginator): Observable<Comics> {
    return this.http.get<Comics>(this.buildUrl(pagination, null, id))
  }

}