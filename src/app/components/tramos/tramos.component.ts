import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDbService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-tramos',
  templateUrl: './tramos.component.html',
  styleUrls: ['./tramos.component.scss'],
})
export class TramosComponent implements OnInit {
  dateForm!: FormGroup;
  startDate: string = '';
  endDate: string = '';
  loading = false;
  consumos = [];
  costos = [];
  perdidas = [];

  constructor(private apiDbService: ApiDbService) {}

  ngOnInit() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.loading = true;
    this.startDate = this.dateForm.get('startDate')!.value;
    this.endDate = this.dateForm.get('endDate')!.value;
    console.log(this.startDate, this.endDate);

    if (this.startDate != '' && this.endDate != '') {
      this.filterByDateTramos();
    }
  }

  filterByDateTramos() {
    this.apiDbService
      .getCostoTramo(this.startDate, this.endDate)
      .then((responseCosto) => {
        this.costos = responseCosto.data.recordset;

        this.apiDbService
          .getConsumoTramo(this.startDate, this.endDate)
          .then((responseConsumo) => {
            this.consumos = responseConsumo.data.recordset;

            this.apiDbService
              .getPerdidaTramo(this.startDate, this.endDate)
              .then((responsePerdida) => {
                this.perdidas = responsePerdida.data.recordset;
                this.loading = false;
              });
          });
      });
  }
}
