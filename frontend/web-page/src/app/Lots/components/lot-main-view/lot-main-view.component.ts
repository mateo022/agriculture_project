import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Lot } from '../../models/lot.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LotService } from '../../services/lots.service';
import { LotCreateComponent } from '../lot-create/lot-create.component';
import { FarmService } from '../../../Farms/services/farms.service';
import { LotEditComponent } from '../lot-edit/lot-edit.component';

@Component({
  selector: 'app-lot-main-view',
  templateUrl: './lot-main-view.component.html',
  styleUrl: './lot-main-view.component.css'
})
export class LotMainViewComponent {
  lots: Lot[] = [];
  farms: any[] = [];
  selectedLot: Lot | null = null;
  private modalRef: NgbModalRef | null = null;
  
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private lotService: LotService,
    private farmService: FarmService
  ) {
    this.loadLots();
    this.fetchFarms();
  }

  loadLots(): void {
    this.lotService.getAllLots().subscribe(lots => {
      this.lots = lots;
    });
  }

  fetchFarms() {
    this.farmService.getFarms().subscribe(
      (data: any) => {
        this.farms = data.data; // Asignar el array de fincas del servicio
      },
      error => {
        console.error('Error fetching farms:', error);
      }
    );
  }

  getFarmName(farmId: number): string {
    const farm = this.farms.find(f => f.id === farmId);
    return farm ? farm.name : 'FInca Desconocida'; // Si no encuentra la finca, devuelve un valor por defecto
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
editLot(lot: any): void {
    const modalRef = this.modalService.open(LotEditComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.lot = lot; // Pasar el lote seleccionado al modal

    modalRef.result.then(
      (result) => {
        if (result) {
          // Manejar la respuesta si es necesario
          console.log('Lote actualizado:', result);
          this.loadLots();
          // Actualizar el array de lotes o realizar alguna acción de actualización
        }
      },
      (reason) => {
        console.log('Modal cerrado sin cambios:', reason);
      }
    );
  }
  openDeleteModal(lot: Lot): void {
    this.selectedLot = lot;
    this.modalRef = this.modalService.open(this.deleteModal, { size: 'lg' });
  }

  confirmDelete(modal: any): void {
    if (this.selectedLot) {
      this.lotService.deleteLot(this.selectedLot.id).subscribe(
        () => {
          this.loadLots();
          modal.close('deleted');
        },
        error => {
          console.error('Error al eliminar la finca:', error);
          modal.dismiss('error');
        }
      );
    }
  }
}