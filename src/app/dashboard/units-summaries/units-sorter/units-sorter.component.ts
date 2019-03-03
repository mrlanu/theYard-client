import { Component, OnInit } from '@angular/core';
import {UnitsService} from '../../../units.service';
import {Trailer} from '../../../models/trailer.model';

@Component({
  selector: 'app-units-sorter',
  templateUrl: './units-sorter.component.html',
  styleUrls: ['./units-sorter.component.css']
})
export class UnitsSorterComponent implements OnInit {

  units: Trailer[] = [];

  constructor(private unitsService: UnitsService) { }

  ngOnInit() {
    this.units = this.unitsService.getTrailers();
  }

}
