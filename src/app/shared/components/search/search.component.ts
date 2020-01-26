import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  @Input()
  set search(search: string) {
    this.searchForm.get('search').setValue(search);
    this.changeDetectorRef.detectChanges();
  }
  @Input() searchChangedCallback: Function

  searchForm = new FormGroup({
    search: new FormControl(
      this.search || ''
    )
  });

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onCancelClick() {
    if (this.searchChangedCallback) {
      this.searchChangedCallback('');
    }
  }

  onSubmit() {
    if (this.searchChangedCallback) {
      this.searchChangedCallback(this.searchForm.value.search);
    }
  }

}
