import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinkForm!: any;
  drinks: any;
  addMode=true;

  constructor(
    private api: DrinkapiService,
    private build: FormBuilder
  ){}


  ngOnInit() {
    this.getDrinks();
    this.drinkForm = this.build.group({
      id : [''],
      drink : [''],
      amount : [''],
      price : [''],
      type : [''],
      package : ['']
    });
  }
  save(){
    console.log("Mentés eljárás");
    console.log(this.drinkForm.value)
    this.api.createDrink$(this.drinkForm.value).subscribe({
      next: (res) =>{
        console.log(res)
        this.drinkForm.reset()
        this.getDrinks()
      },
      error(err){console.log(err)}
    })
  }

  getDrinks() {
    this.api.getDrinks$().subscribe({
      next: (result: any) => {
        console.log(result.data);
        this.drinks = result.data;
      },
      error: () => {}
    })
  }
}
