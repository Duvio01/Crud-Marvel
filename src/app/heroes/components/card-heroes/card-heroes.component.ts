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

  get imageHero() {
    return `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}`
  }

}
