import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICommercial } from './models/commercial.model';
import { CreateCommercialsService } from './services/create-commercials.service';
import { StorageService } from './SupabaseStorage/storage.service';

@Component({
  selector: 'app-create-commercials',
  templateUrl: './create-commercials.component.html',
  styleUrls: ['./create-commercials.component.css']
})
export class CreateCommercialsComponent implements OnInit {

  message!: string;
  status!: boolean;
  bucket!: string;
  eventt!: Event;
  supabase: string = "https://pdphmpovyeiqspzsxqzq.supabase.co/storage/v1/object/public/photos/";

  public commercial:ICommercial = <ICommercial>{};
  constructor(private storageService: StorageService,private commercialService: CreateCommercialsService, 
    private readonly toastService: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.bucket = "photos";
    this.message = "";
    this.status = false;
    this.commercial.title = "";
    this.commercial.text = "";
    this.commercial.pictureUrl = "";
  }

  public createCommercial() {
    this.commercialService.createCommercial(this.commercial).subscribe(res => {
        this.toastService.success("Your commercial recorded!")
    });
  }
  clearForm()
  {
    this.commercial.title = "";
    this.commercial.text = "";
    this.commercial.pictureUrl = "";
  }
 rememberEvent(ev : Event)
 {
  this.eventt = ev;
  const input = ev.target as HTMLInputElement;
  if (!input.files || input.files.length == 0) {
    this.message = 'You must select an image to upload.';
    return;
  }

  this.status = true;
  const file: File = input.files[0];
  const name = file.name.replace(/ /g, '');
  console.log(name);
  this.commercial.pictureUrl = name;
  this.storageService.upload(this.bucket, name, file).then((data) => {
    if (data.error) {
      this.message = `Error send message ${data.error.message}`;
    } else {
      this.commercial.pictureUrl = name;
      this.message = `File ${file.name} uploaded with success!`;
    }
    this.status = false;
  });
 }
  
 selectFile() {
    const input = this.eventt.target as HTMLInputElement;

    if (!input.files || input.files.length == 0) {
      this.message = 'You must select an image to upload.';
      return;
    }

    this.status = true;
    const file: File = input.files[0];
    const name = file.name.replace(/ /g, '');

    this.storageService.upload(this.bucket, name, file).then((data) => {
      if (data.error) {
        this.message = `Error send message ${data.error.message}`;
      } else {
        this.commercial.pictureUrl = name;
        this.message = `File ${file.name} uploaded with success!`;
      }
      this.status = false;
    });
  }

}
