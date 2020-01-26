import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  onSubmit() {
    if (this.searchChangedCallback) {
      this.searchChangedCallback(this.searchForm.value.search);
    }
  }

}
