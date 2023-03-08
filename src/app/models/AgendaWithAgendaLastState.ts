import { AgendaLastState } from "./agendaLastState";

export interface AgendaWithAgendaLastState{
    id:number;
    name:string;
    description:string;
    finish:string;
    createdDate:Date;
    ownerFullName:string;
    agendaLastStates:AgendaLastState[];
}