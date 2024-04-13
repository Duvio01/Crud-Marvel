import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs/operators';
import { Comics } from 'src/app/interfaces/comics.interface';
import * as moment from 'moment';
import { Paginator, configTable, tableComics } from '../../config/table-comics.config';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-heroes-page',
  templateUrl: './comics-heroes-page.component.html',
  styleUrls: ['./comics-heroes-page.component.css']
})
export class HeroesPageComponent implements OnInit {


  public columnsComics: configTable[] = tableComics
  public dataTables: any[] = [];
  public keyColumns: string[] = [];
  public configPaginator: Paginator = { length: 0, pageIndex: 0, pageSize: 5 };
  public loading:boolean = true

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.keyColumns = this.columnsComics.map(column => column.key);
    this.getComicsHeroe()
  }
  /**
  * Método que realzia consulta de los comics del heroe
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  getComicsHeroe(): void {
    this.dataTables = []
    this.loading = true
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getComics(id, this.configPaginator)), delay(2000))
      .subscribe((comics: Comics) => {
        if (!comics) return this.router.navigate(['/heroes']);
        this.loading = false
        this.configPaginator.length = comics.data.total
        let table = []
        comics.data.results.forEach((result) => {
          const data = {
            image: `${result.images[0]?.path}.${result.images[0]?.extension}`,
            title: result.title,
            onsaleDate: result.dates[0].date,
            description: result.description?.length > 0 ? result.description : 'Sin Descripción',
            upc: result.upc.length > 0 ? result.upc : 'Sin UPC',
            modified: result.modified,
            printPrice: result.prices[0].price,
            creators: result.creators.items,
            characters: result.characters.items
          }
          table.push(data)
        })
        this.dataTables = table
      });
  }
  /**
  * Método que valida si la fecha es valida y la formatea
  * @param date string con la fecha
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  isValidDate(date: string): string {
    const dateValid = moment(date).isValid();
    return dateValid ? moment(date).format('MMMM D, YYYY, hh:mm:ss A [GMT]Z') : moment.parseZone('-0001-11-30T00:00:00-0500').format('MMMM D, YYYY, hh:mm:ss A [GMT]Z');
  }
  /**
  * Método que retorna a la vista anterior
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  goBack(): void {
    this.router.navigateByUrl('heroes')
  }
  /**
  * Método que stetea la data de paginacion
  * @param event event que emite el campo de paginacion
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  onChangePage(event: PageEvent): void {
    this.configPaginator.pageSize = event.pageSize
    this.configPaginator.pageIndex = event.pageIndex
    this.getComicsHeroe()
  }

}
