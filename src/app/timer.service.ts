import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new BehaviorSubject<number>(0);
  private colorSubject = new BehaviorSubject<string>('');

  setTimer(seconds: number) {
    this.timerSubject.next(seconds);
  }

  getTimer(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  setColor(color: string) {
    this.colorSubject.next(color);
  }

  getColor(): Observable<string> {
    return this.colorSubject.asObservable();
  }

  constructor() { }
}
