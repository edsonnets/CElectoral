import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control!:FormControl;
  @Input() type!:string;
  @Input() label!:string;
  @Input() autocomplete!:string;
  @Input() icon!:string;

  top: boolean=true;
  hide:boolean=true;
  constructor() { }

  ngOnInit() {
    console.log('EL type es :', this.type);
   if (this.type==='password') this.top=true;

  }

  hidePassword(){
    this.hide = !this.hide
    if (this.hide) this.type="password"
    else this.type ="text"
  }

}
