import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {

  ShowMultiplication: boolean = false;
  ShowDivision: boolean = false;
  ShowFractions: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var type = this.activatedRoute.snapshot.paramMap.get("type");
    console.log(type);

    switch(type){
      case ("multiplication") :
        this.ShowMultiplication = true;
        break;
      case ("division"):
        this.ShowDivision = true;
        break;
      case ("fractions"):
        this.ShowFractions = true;
        break;
    }
  }

}
