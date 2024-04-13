import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public nameHeroe:FormControl = new FormControl(null)
  @Output() searchHeroe: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  /**
  * Método que envia al componente padre el nombre del heroe a buscar
  * @param cleab booleano que valida si se limpia la busqueda
  * @author Duvan Ramirez
  * @createdate 2024-04-13
  */
  onSearch(clean: boolean):void{
    clean && this.nameHeroe.setValue(null)
    this.searchHeroe.emit(this.nameHeroe.value)
  }

}
