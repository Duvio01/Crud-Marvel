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

  getHeroes():void{
    this.loading = true
    this.heroesService.getHeroes(this.configPaginator, this.nameSearchHeore).subscribe((resp:ResponseHeroes) => {
      this.heroes = resp.data.results
      this.configPaginator.length = resp.data.total
      this.loading = false
    })
  }

  onChangePage(event: PageEvent):void{
    this.configPaginator.pageSize = event.pageSize
    this.configPaginator.pageIndex = event.pageIndex
    this.getHeroes()
  }

  setSearchHeroe(event:string): void {
    this.nameSearchHeore = event
    this.getHeroes()
  }

}
