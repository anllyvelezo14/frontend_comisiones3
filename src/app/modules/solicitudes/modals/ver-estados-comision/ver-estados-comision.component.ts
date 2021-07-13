import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-estados-comision',
  templateUrl: './ver-estados-comision.component.html',
  styleUrls: ['./ver-estados-comision.component.css'],

  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class VerEstadosComisionComponent {
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content);
  }
}
