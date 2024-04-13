import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/heroes.interface';

@Component({
  selector: 'app-card-heroes',
  templateUrl: './card-heroes.component.html',
  styleUrls: ['./card-heroes.component.css']
})
export class CardHeroesComponent implements OnInit {

  @Input() hero: Result

  constructor() { }

  ngOnInit(): void {
  }
  /**
  * Método get que retorna la url completa de la imagen del heroe
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  get imageHero() {
    return `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}`
  }

}
