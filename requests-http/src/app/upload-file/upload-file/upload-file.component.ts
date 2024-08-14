import { Component } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
// import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  files!: Set<File>;
  progress: number = 0;

  constructor(private service: UploadFileService) { }

  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event?.srcElement.files;
    this.files = new Set();

    for(let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

    this.progress = 0;
  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      // this.service.upload(this.files, "/api/upload")
      this.service.upload(this.files, "http://localhost:8000/upload")
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => {
          console.log("Upload Concluído!");
        });
        // .subscribe((event: HttpEvent<Object>) => {
        //   console.log(event);
        //   if(event.type == HttpEventType.Response) {
        //     console.log("Upload Concluído!");
        //   } else if(event.type == HttpEventType.UploadProgress) {
        //     if(event.total) {
        //       const percentDone = Math.round((event.loaded * 100) / event.total);
        //       this.progress = percentDone;
        //       console.log("Progreso", percentDone);
        //     }
        //   }
        // });
    }
  }

  onDownloadExcel() {
    this.service.download("http://localhost:8000/downloadExcel")
      .subscribe((res: any) => {
        this.service.handleFile(res, "report.xlss");
      });
  }

  onDownloadPDF() {
    this.service.download("http://localhost:8000/downloadPDF")
    .subscribe((res: any) => {
      this.service.handleFile(res, "report.pdf");
    });
  }

}
