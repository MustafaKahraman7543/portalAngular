import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agenda } from 'src/app/models/agendaModels';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {
  isUpdate: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  i!: Agenda;
  agendaForm!: FormGroup;
  id: number = 0;
  constructor(private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router) {
    this.isUpdate = activatedRoute.snapshot.params['mode'] == "edit";
    this.isAdd = activatedRoute.snapshot.params['mode'] == "add";
    this.isDelete = activatedRoute.snapshot.params['mode'] == "delete";

    if (this.isUpdate) {
      this.id = activatedRoute.snapshot.params['id'];
      this.createAgendaUpdateForm();
      this.getAgendaById(this.id);
    } else if (this.isAdd) {
      this.id = activatedRoute.snapshot.params['id'];
      this.createAgendaAddForm();
      this.id = 0;
    } else if (this.isDelete) {
      this.id = activatedRoute.snapshot.params['id'];
      this.createAgendaUpdateForm();
      this.getAgendaById(this.id);
    }

  }


  ngOnInit(): void {
    //this.createagendaForm();

  }

  createAgendaAddForm() {
    this.agendaForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      finish: [false, Validators.required]
    })
  }

  createAgendaUpdateForm() {// aynı zamanda delete form
    this.agendaForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      name: ["", Validators.required],
      description: ["", Validators.required],
      finish: [false, Validators.required]
    })
  }


  add() {
    if (this.agendaForm.valid) {
      let agendaModel = Object.assign({}, this.agendaForm.value)
      this.agendaService.add(agendaModel).subscribe(response => {
        this.toastrService.success("Gündem Eklendi")
        console.log(response)

      }, responseError => {
        this.toastrService.error(responseError.error.Detail);
        console.log(responseError)
      })
    } else {
      this.toastrService.error("Form Eksik")
    }
  }

  update() {

    if (this.agendaForm.valid) {
      let agendaModel = Object.assign({}, this.agendaForm.value)
      this.agendaService.update(agendaModel).subscribe(response => {
        this.toastrService.success("Gündem Güncellendi")
        console.log(response)

      }, responseError => { console.log(responseError) })
    } else {
      this.toastrService.error("Form Eksik")
    }
  }

  delete() {
      let agendaModel = Object.assign({}, this.agendaForm.value)
      this.agendaService.delete(agendaModel).subscribe(response => {
        this.toastrService.success("Gündem Silindi")
        this.router.navigate(["agenda"])
        console.log(response)
      }, responseError => { console.log(responseError) })
  }
  show() {
    this.toastrService.warning("mesaj");
  }

  getAgendaById(Id: number) {
    this.agendaService.getAgendaById(Id).subscribe(response => {
      this.i = response;
      this.agendaForm.patchValue({
        id: response.id,
        name: response.name,
        description: response.description,
        finish: response.finish
      });

      console.log(this.agendaForm.value);
    })
  }
}
