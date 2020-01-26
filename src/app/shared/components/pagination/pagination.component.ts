import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { rangeValidator } from '../../validators/range.validator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input()
  set currentPage(currentPage: number) {
    this.paginationForm.get('currentPage').setValue(currentPage);
    this.changeDetectorRef.detectChanges();
  }
  @Input() pagesCount: number
  @Input() pageChangedCallback: Function

  paginationForm = new FormGroup({
    currentPage: new FormControl(
      this.currentPage || 1,
      [rangeValidator(() => 1, () => this.pagesCount)]
    )
  });

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onSubmit() {
    if (this.pageChangedCallback) {
      this.pageChangedCallback(this.paginationForm.value.currentPage);
    }
  }

}
