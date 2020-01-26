import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Show } from './../../models/index';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowItemComponent {

  @Input() show: Show

  constructor() { }

}
