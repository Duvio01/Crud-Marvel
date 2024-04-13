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

  onSearch(clean: boolean):void{
    clean && this.nameHeroe.setValue(null)
    this.searchHeroe.emit(this.nameHeroe.value)
  }

}
