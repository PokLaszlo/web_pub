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

  setMode(){
    this.drinkForm.reset();
    this.addMode=true;
  }

  save(){
    console.log("Mentés eljárás");
    if(this.addMode==true){
      this.create_drink();
    }else{
      this.update_drink();
    }

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

  modify_load(drink:any){
    // console.log(drink)
    this.addMode=false;
    //akkor kell az alábbi, ha a backend nem egyezne meg a frontend mezőivel
    // this.drinkForm.patchValue({
    //   id: drink.id,
    //   drink:drink.drink,
    //   amount:drink.amount,
    //   price: drink.price,
    //   type:drink.type,
    //   package:drink.package,
    // })
    this.drinkForm.patchValue(drink)
  }

  create_drink(){
    this.api.createDrink$(this.drinkForm.value).subscribe({
      next: (res) =>{
        // console.log(res)
        this.setMode()
        this.getDrinks()
      },
      error(err){console.log(err)}
    })
  }

  update_drink(){
    console.log("Update eljárás");
    // console.log(this.drinkForm.value);
    this.api.updateDrink$(this.drinkForm.value).subscribe({
      next: (res:any)=>{
        console.log(res.data);
        this.setMode()
        this.getDrinks();
      },
      error: (err:any)=>{console.log(err)}
    })

  }
  
  delete(id:number){
    this.api.deleteDrink$(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.getDrinks()
      }
    })
  }
}
