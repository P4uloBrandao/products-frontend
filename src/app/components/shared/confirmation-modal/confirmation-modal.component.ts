import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirmation-modal-2',
  standalone: true,
  imports: [
    NgClass,
    MatButton
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  public title: string;
  public reason: string;
  public actionBtn: string;
  public closeBtn: string;
  public actionBtnClass: string;
  public hideBtn: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data?.title ? data.title : 'Are you sure?';
    this.reason = data?.reason ? data.reason : 'Are you sure?';
    this.actionBtn = data?.actionBtn ? data.actionBtn : 'Yes';
    this.actionBtnClass = data?.actionBtnClass ? data.actionBtnClass : '';
    this.closeBtn = data?.closeBtn ? data.closeBtn : 'Cancel';
    this.hideBtn = data?.hideBtn ? data.hideBtn : false;
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.dialogRef.close(true);
  }
}
