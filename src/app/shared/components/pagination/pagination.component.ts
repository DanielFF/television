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
  @Input() onPageChanged: Function

  paginationForm = new FormGroup({
    currentPage: new FormControl(
      this.currentPage || 1,
      [rangeValidator(() => 1, () => this.pagesCount)]
    )
  });

  onSubmit() {
    if (this.onPageChanged) {
      this.onPageChanged(this.paginationForm.value.currentPage);
    }
  }

}
