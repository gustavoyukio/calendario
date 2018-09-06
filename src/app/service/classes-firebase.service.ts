import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesFirebaseService {

  items: Observable<any[]>;
  path: string = "/assignments"

  constructor(private db: AngularFireDatabase) {
    
  }

  getValues () {
    return this.db.list(this.path).valueChanges();
  }

  addItems (obj: object) {
    this.db.list('/'+this.path).push(obj);
  }

}
