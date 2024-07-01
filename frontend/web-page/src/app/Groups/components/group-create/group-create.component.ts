import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lot } from '../../../Lots/models/lot.model';
import { GroupService } from '../../services/groups.service';
import { LotService } from '../../../Lots/services/lots.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.css'
})
export class GroupCreateComponent implements OnInit {
  groupForm: FormGroup;
  lots: Lot[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private lotService: LotService,
    public activeModal: NgbActiveModal
  ) {
    this.groupForm = this.formBuilder.group({
      lotId: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLots();
  }

  loadLots(): void {
    this.lotService.getAllLots().subscribe(lots => {
      this.lots = lots;
    });
  }

  onSubmit(): void {
    this.groupService.createGroup(this.groupForm.value).subscribe(
      () => {
        this.activeModal.close('saved');
      },
      error => {
        console.error('Error al crear el lote:', error);
      }
    );
  }

  cancel(): void {
    this.activeModal.close('close');
  }
}