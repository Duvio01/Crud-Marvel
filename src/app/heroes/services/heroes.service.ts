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

  buildUrl(data: Paginator, nameHeroe: string, id:number): string {
    const offset = data.pageIndex * data.pageSize
    let url =  `${this.apiUrl}`

    if(id){
      url += `/${id}/comics`
    }

    url += `${this.keyHash}&limit=${data.pageSize}`

    if (offset > 0) {
      url += `&offset=${offset}`
    }
    if (nameHeroe) {
      url += `&nameStartsWith=${nameHeroe}`;
    }
    return url
  }

  getHeroes(data: Paginator, nameHeroe: string): Observable<ResponseHeroes> {
    return this.http.get<ResponseHeroes>(this.buildUrl(data, nameHeroe, null))
  }

  getComics(id: number, data: Paginator): Observable<Comics> {
    return this.http.get<Comics>(this.buildUrl(data, null, id))
  }

}