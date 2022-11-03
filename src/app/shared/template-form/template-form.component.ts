import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @Input() title: string = '';
  @Input() error: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
