import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader } from './directives/sortable-header.directive';

@NgModule({
  declarations: [DatepickerComponent, NgbdSortableHeader],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [DatepickerComponent, NgbdSortableHeader],
})
export class SharedModule {}
