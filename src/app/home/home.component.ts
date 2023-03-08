import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.createAgendaAddForm();
  }
  agendaAddForm!: FormGroup;

  createAgendaAddForm(){
    this.agendaAddForm=this.formBuilder.group({
      id:[1,Validators.required],
      finish:[false,Validators.required]
    })
  }
  
  add(){
    console.log(this.agendaAddForm.value);
    if (this.agendaAddForm.get('finish')?.value){
      this.agendaAddForm.setValue({'finish':true});
    console.log(this.agendaAddForm.value);}
    else{
      this.agendaAddForm.setValue({'finish':false});
    console.log(this.agendaAddForm.value);}
  }
}
