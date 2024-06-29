import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Farm } from '../../models/farm.model';
import { FarmService } from '../../services/farms.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FarmCreateComponent } from '../farm-create/farm-create.component';
import { FarmEditComponent } from '../farm-edit/farm-edit.component';

@Component({
  selector: 'app-farm-main-view',
  templateUrl: './farm-main-view.component.html',
  styleUrl: './farm-main-view.component.css'
})
export class FarmMainViewComponent {

  farms: any[] = [];
  selectedFarm: Farm | null = null;
  private modalRef: NgbModalRef | null = null;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  constructor(private farmService: FarmService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadFarms();
  }

  loadFarms(): void {
    this.farmService.getFarms().subscribe({
      next: (response: any) => {
        const data = response.data;
        if (data) {
          console.log(data);
          this.farms = data;
        }
      },
      error: (error: any) => {
        console.error('Error en la solicitud:', error);
      },
  
    });
  }

  editFarm(farm: Farm): void {
    const modalRef = this.modalService.open(FarmEditComponent, { size: 'lg' });
    modalRef.componentInstance.farm = farm;

    modalRef.result.then(
      (result) => {
        if (result === 'updated') {
          this.loadFarms();
        }
      },
    ).catch((error) => {
      console.log('Modal dismissed with error:', error);
    });
  }

  openDeleteModal(farm: Farm): void {
    this.selectedFarm = farm;
    this.modalRef = this.modalService.open(this.deleteModal, { size: 'lg' });
  }

  confirmDelete(modal: any): void {
    if (this.selectedFarm) {
      this.farmService.deleteFarm(this.selectedFarm.id).subscribe(
        () => {
          this.loadFarms();
          modal.close('deleted');
        },
        error => {
          console.error('Error al eliminar la finca:', error);
          modal.dismiss('error');
        }
      );
    }
  }

  addFarm(): void {
    const modalRef = this.modalService.open(FarmCreateComponent, { size: 'lg' });

    modalRef.result.then(result => {
      if (result === 'saved') {
        this.loadFarms();
      }
    }).catch((error) => {
      console.log('Modal dismissed with error:', error);
    });
  }
}
