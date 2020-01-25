import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() search: string
  @Input() searchChangedCallback: Function

  searchForm = new FormGroup({
    search: new FormControl(
      this.search || ''
    )
  });

  onSubmit() {
    if (this.searchChangedCallback) {
      this.searchChangedCallback(this.searchForm.value.search);
    }
  }

}
