import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() url: string;
  @Input() keyName: string;
  @Input() inputName = '';
  @Input() buttonColor = '';
  @Input() title = '';

  @Output() uploadedEvent = new EventEmitter<boolean>(false);


  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.uploadService.uploaded$.subscribe(uploadedStatus => {
      this.uploadedEvent.emit(uploadedStatus);
    });
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        url: this.url,
        keyName: this.keyName,
        title: this.title
      }
    });
  }

  updateUploadStatus(): void {
    this.uploadedEvent.emit(true);
  }

}
