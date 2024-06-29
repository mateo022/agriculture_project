import { Component, Input } from '@angular/core';
import { Lot } from '../../models/lot.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LotService } from '../../services/lots.service';
import { LotCreateComponent } from '../lot-create/lot-create.component';

@Component({
  selector: 'app-lot-main-view',
  templateUrl: './lot-main-view.component.html',
  styleUrl: './lot-main-view.component.css'
})
export class LotMainViewComponent {
  lots: Lot[] = [];

  constructor(
    private modalService: NgbModal,
    private lotService: LotService
  ) {
    this.loadLots();
  }

  loadLots(): void {
    this.lotService.getAllLots().subscribe(lots => {
      this.lots = lots;
    });
  }

  openAddLotModal(): void {
    const modalRef = this.modalService.open(LotCreateComponent, { centered: true });
    modalRef.result.then(
      (result) => {
        console.log(`Modal result: ${result}`);
        // Recargar los lotes después de agregar uno nuevo
        this.loadLots();
      },
      (reason) => {
        console.log(`Modal dismissed: ${reason}`);
      }
    );
  }

  editLot(lot: Lot): void {
    // Implementar la lógica para editar una finca aquí
  }

  deleteLot(lot: Lot): void {
    // Implementar la lógica para eliminar una finca aquí
  }
}