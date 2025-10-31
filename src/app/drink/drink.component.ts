import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { TypeapiService } from '../shared/typeapi.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PackageapiService } from '../shared/packageapi.service';

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
  types: any;
  pack: any;

  addMode=true;

  constructor(
    private api: DrinkapiService,
    private typeapi: TypeapiService,
    private packageapi: PackageapiService,
    private build: FormBuilder
  ){}


  ngOnInit() {
    this.getDrinks();
    this.getTypes();
    this.getPackages();
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
        // console.log(result.data);
        this.drinks = result.data;
      },
      error: () => {}
    })
  }
  getTypes(){
    this.typeapi.getTypes$().subscribe({
      next:(result:any)=>{
        this.types = result.data
      }
    })
  }
  getPackages(){
    this.packageapi.getPackages$().subscribe({
      next:(result:any)=> {
          this.pack=result.data;
      },
      error:(err:any)=>{console.error(err)}
    })
  }

  modify_load(){

  }
  update(){}
  delete(id:number){
    this.api.deleteDrink$(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.getDrinks()
      }
    })
  }
}
