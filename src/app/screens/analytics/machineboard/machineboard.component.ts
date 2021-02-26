import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MachineBoard } from '../../../models/machineBoard';

interface SelectInterFace {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-machineboard',
  templateUrl: './machineboard.component.html',
  styleUrls: ['./machineboard.component.scss']
})
export class MachineboardComponent implements OnInit {

  currentUser!: MachineBoard;
  constructor(
   private formBuilder: FormBuilder
 ) { }
 colorAvailability: ThemePalette = 'primary';
 colorPerformance: ThemePalette = 'accent';
 colorQuality: ThemePalette = 'warn';

 searchForm!: FormGroup;

 // fot data
 groupList: SelectInterFace[] = [
   {value: 'OIG', viewValue: 'OIG'},
   {value: 'JJK', viewValue: 'JJK'},
   {value: 'GRP', viewValue: 'grp'}
 ];
 lineList: SelectInterFace[] = [
   {value: 'die-cutting', viewValue: 'Die Cutting'},
   {value: 'pie-cutting', viewValue: 'Pie Cutting'},
   {value: 'lie-cutting', viewValue: 'Lie Cutting'}
 ];
 barOptionsBobst41 = {
   barType: 'radial',
   color: '#F4B63E',
   secondColor: '#E5E5E5',
   progress: 66,
   radial: {
     depth: 9,
     size: 96,
     label: {
       enable: true,
       color: '#09608c',
     }
   }
 };

 barOptionsBobst55 = {
   barType: 'radial',
   color: '#FF3535',
   secondColor: '#E5E5E5',
   progress: 15,
   radial: {
     depth: 9,
     size: 96,
     label: {
       enable: true,
       color: '#09608c'
     }
   }
 };

 barOptionsBobst81 = {
   barType: 'radial',
   color: '#F4B63E',
   secondColor: '#E5E5E5',
   progress: 44,
   radial: {
     depth: 9,
     size: 96,
     label: {
       enable: true,
       color: '#09608c',
     }
   }
 };
 barOptionsBobst21 = {
   barType: 'radial',
   color: '#10CE9C',
   secondColor: '#E5E5E5',
   progress: 85,
   radial: {
     depth: 9,
     size: 96,
     label: {
       enable: true,
       color: '#09608c',
     }
   }
 };

 ngOnInit(): void {
   // search form
   this.searchForm = this.formBuilder.group({
     groupList: [''],
     lineList: [''],
   });
 }

}
