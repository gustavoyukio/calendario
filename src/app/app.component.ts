import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClassesFirebaseService } from './service/classes-firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  @ViewChild("form") form: ElementRef; 

  title = 'calendario';

  defaultDate : string = "04092018";

  classes = [
    {
      name: 'Banco de Dados II',
      code: 'BDII',
      style: 'bdii'
    },{
      name: 'Desenvolvimento de Software',
      code: 'DSII',
      style: 'dsii'
    },{
      name: 'Sistemas Operacionais',
      code: 'so',
      style: 'so'
    },{
      name: 'Fundamentos para certificação',
      code: 'FC',
      style: 'fc'
    },{
      name: 'Pesquisa, Ordenação e Técnicas de anlgoritimos',
      code: 'POTA',
      style: 'pota'
    },{
      name: 'EAD',
      code: 'EAD',
      style: 'ead'
    }
  ];

  ordered: any;

  constructor(private http: ClassesFirebaseService) {
    
  }

  ngOnInit () {

    this.http.getValues()
      .subscribe( value => {
        this.orderAssigments(value);
      });
    
  }

  orderAssigments (obj) {

    let orderedAssigments = [];
    let current:string = "";
    let index = -1;

    obj.sort(function(a, b){
      var keyA = a.date,
          keyB = b.date;
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
    });

    for( let i=0; i < obj.length; i++) {

      if ( current == '' || current != obj[i].date) {
        current = obj[i].date;
        index++;
        orderedAssigments[index] = [];
      }
      
      orderedAssigments[index].push(obj[i]);

    }

    this.ordered = orderedAssigments;

  }

  setDate (date: string) {
    
    let bkp = date;
    let day = bkp.slice(0,2);

    bkp = date;
    let month = bkp.slice(0,4).slice(2,4);

    bkp = date;
    let year = bkp.slice(4,8);
      
    return day+"/"+month+"/"+year;
  }

  showForm () {
    this.form.nativeElement.classList.toggle('active');
  }

  sendObjectToFirebase () {

    let form = this.form.nativeElement;
    
    let aula = form[0].value.split('/')[0];
    let style = form[0].value.split('/')[1];

    let date = form[2].value.replace(/\//g , "");
    let arr = new Array();
    let names = form[3].value.split(',');

    for(let i=0; i < names.length; i++) {
      arr.push(names[i]);
    }

    let obj = {
      date: date,
      name: form[1].value,
      info: form[4].value,
      class: aula,
      style: style,
      group: arr
    }

    this.http.addItems(obj);
    this.checkNewAssignments();
    this.showForm();
    
  }

  checkNewAssignments () {
    this.http.getValues()
      .subscribe( value => {
        this.orderAssigments(value);
      });
  }

}
