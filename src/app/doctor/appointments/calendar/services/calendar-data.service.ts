import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  private dataSubject = new Subject<number>();

  updater$ = this.dataSubject.asObservable();

  updateData(updater: number) {
    this.dataSubject.next(updater);
  }
}