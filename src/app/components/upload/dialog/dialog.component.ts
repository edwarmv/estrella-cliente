import { Component, OnInit, ViewChild, Inject, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from '../upload.service';
import { Subscription } from 'rxjs';

type Data = { url: string, keyName: string, title: string };

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('inputFile') inputFile: ElementRef;
  file: File;

  @ViewChild('img') img: ElementRef;

  @Output() uploadedEvent = new EventEmitter<boolean>(false);

  subscription = new Subscription();

  progress = 0;
  canBeClosed = true;
  primaryButtonText = 'Agregar archivo';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  preview = new FileReader();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  ngOnInit(): void { }

  addFiles(): void {
    this.inputFile.nativeElement.click();
  }

  onFileAdded(): void {
    this.file = this.inputFile.nativeElement.files[0];
    this.preview.onload = (img) => {
      this.img.nativeElement.src = img.target.result;
    };
    this.preview.readAsDataURL(this.file);
    this.primaryButtonText = 'Subir';
  }

  closeDialog(): void {
    if (!this.file) {
      this.addFiles();
      return;
    }
    if (this.uploadSuccessful) {
      this.uploadService.completeUploadedSubject();

      return this.dialogRef.close();
    }

    this.uploading = true;


    this.primaryButtonText = 'Completado';

    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    this.showCancelButton = false;

    this.subscription = this.uploadService.upload(this.file, this.data.url, this.data.keyName)
    .subscribe(progress => {
      this.progress = progress;
    }, error => {
      console.log(error);
      this.uploadService.updateUploadedStatus(false);
    }, () => {
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      this.uploadSuccessful = true;

      this.uploading = false;

      this.uploadService.updateUploadedStatus(true);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
