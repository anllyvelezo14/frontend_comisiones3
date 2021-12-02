import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader } from './directives/sortable-header.directive';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

@NgModule({
  declarations: [NgbdSortableHeader, CompareValidatorDirective, UploadFilesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [NgbdSortableHeader, UploadFilesComponent],
})
export class SharedModule {}
