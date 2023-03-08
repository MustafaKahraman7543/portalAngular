import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/models/agendaModels';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  items:Agenda[]=[]  
  dataLoaded=false;

  constructor(){}
  ngOnInit(): void {
   
  }

  getAgenda(){
    
  }

}
