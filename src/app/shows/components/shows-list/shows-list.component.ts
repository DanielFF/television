
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Show } from './../../models/index';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss']
})
export class ShowsListComponent {

  @Input() shows$: Observable<Show[]>;

  constructor() { }
  
}
