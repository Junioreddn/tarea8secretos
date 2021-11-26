import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private objectSource = new BehaviorSubject<{}>({});
  // eslint-disable-next-line @typescript-eslint/member-ordering
  $getObjectSource = this.objectSource.asObservable();
  constructor() { }

  sendObjectSource(data: any){
    this.objectSource.next(data);
  }

}
