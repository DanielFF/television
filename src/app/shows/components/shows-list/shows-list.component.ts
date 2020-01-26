
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Show } from './../../models/index';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowsListComponent {

  @Input() shows$: Observable<Show[]>;

  constructor() { }

  trackById(index, { id }) {
    return id;
  }

}
