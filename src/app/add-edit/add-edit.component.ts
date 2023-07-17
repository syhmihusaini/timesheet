import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { TimesheetService } from '../services/timesheet.service';

@Component({
  selector: 'add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  empForm: FormGroup;

  status: string[] = [
    'Open',
    'In Progress',
    'Closed',
  ];

  assignTo: string[] = [
    'Mohd Johan',
    'Abdul Sarif',
    'Nur Suraya',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: TimesheetService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      project: '',
      task: '',
      dateFrom: '',
      dateTo: '',
      status: '',
      assignTo: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  //trigger when input change
  onChange(event : any){
    //put ur configuration
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      if (this.data) {
        this._empService
          .updateTimesheet(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addTimesheet(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }

  }

  getServices(){
    
  }
}
