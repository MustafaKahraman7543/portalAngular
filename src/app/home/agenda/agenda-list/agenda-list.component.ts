import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agenda } from 'src/app/models/agendaModels';
import { ResponseModel } from 'src/app/models/responseModel';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {
  _response!:ResponseModel<Agenda>;
  sizes!:number[];
  agendas!:Agenda[];
  dataLoaded=false;

  textWithSpans: string="";
  link1:string="<a class='page-link' >Next</a>";
  constructor(private agendaService:AgendaService, private router:Router, private toastrService:ToastrService){}
 
  ngOnInit(): void {
    this.getAgendas();
    //const originalText = '<a href="#">link</a> <a href="#">link</a>';
    //this.textWithSpans = this.convertLinksToSpans(originalText);
  }

  getAgendas(){
    this.agendaService.getAgenda().subscribe(response=>{
        this._response=response
        this.agendas=this._response.items
        this.dataLoaded=true
    },responseError=>{console.log(responseError.error.Detail)
      this.toastrService.error("Yetkiniz yok")
      this.dataLoaded=true
      this.router.navigate(["home"])})
  }

  getSizes(){

  }
  convertLinksToSpans(text: string): string {
    return text.replace(/<a /g, '<span ').replace(/<\/a>/g, '</span>');
  }

}
