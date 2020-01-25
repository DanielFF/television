import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { rangeValidator } from '../../validators/range.validator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() currentPage: number
  @Input() pagesCount: number
  @Input() pageChangedCallback: Function

  paginationForm = new FormGroup({
    currentPage: new FormControl(
      this.currentPage || 1,
      [rangeValidator(() => 1, () => this.pagesCount)]
    )
  });

  onSubmit() {
    if (this.pageChangedCallback) {
      this.pageChangedCallback(this.paginationForm.value.currentPage);
    }
  }

}
