import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  reason: string
}

@Component({
  selector: 'app-reason-dialog',
  templateUrl: 'reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.css']
})
export class ReasonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}