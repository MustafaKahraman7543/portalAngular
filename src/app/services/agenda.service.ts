import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agenda } from '../models/agendaModels';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private appService:AppService, private http: HttpClient) { }

  getAgenda():Observable<ResponseModel<Agenda>>{
    return this.http.get<ResponseModel<Agenda>>(this.appService.apiUrl+"/Agendas/GetList?Page=0&PageSize=99"); 
  }

  add(agenda:Agenda){
    return this.http.post(this.appService.apiUrl+"/agendas",agenda)
  }
  update(agenda:Agenda){
    return this.http.put(this.appService.apiUrl+"/agendas",agenda)
  }
  delete(agenda:Agenda){
    return this.http.request('delete',this.appService.apiUrl+"/agendas",{body: agenda})
  }
  
  getAgendaById(Id:number):Observable<Agenda> {
    return this.http.get<Agenda>(this.appService.apiUrl+"/agendas/"+Id);
   }
}
