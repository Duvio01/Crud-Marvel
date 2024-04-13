import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ResponseHeroes, Result } from 'src/app/interfaces/heroes.interface';
import { PageEvent } from '@angular/material/paginator';
import { Paginator } from '../../config/table-comics.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  public heroes:Result[] = []
  public configPaginator: Paginator = { length: 0, pageIndex: 0, pageSize: 6 };
  public loading:boolean = false
  public nameSearchHeore:string = null

  ngOnInit(): void {
    this.getHeroes()
  }

  /**
  * Método que consulta los herores y setea la data a mostrar
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  getHeroes():void{
    this.loading = true
    this.heroesService.getHeroes(this.configPaginator, this.nameSearchHeore).subscribe((resp:ResponseHeroes) => {
      this.heroes = resp.data.results
      this.configPaginator.length = resp.data.total
      this.loading = false
    })
  }
  /**
  * Método de paginacion
  * @param event event que emite el paginador
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  onChangePage(event: PageEvent):void{
    this.configPaginator.pageSize = event.pageSize
    this.configPaginator.pageIndex = event.pageIndex
    this.getHeroes()
  }
  /**
  * Método setea el nombre y realiza la busqueda
  * @param event string con el nombre del heroe
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  setSearchHeroe(event:string): void {
    this.nameSearchHeore = event
    this.getHeroes()
  }

}
