import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DrinkComponent } from './drink/drink.component';
import { NopageComponent } from './nopage/nopage.component';

export const routes: Routes = [
    {path: "",component: HomeComponent},
    {path: "home",component: HomeComponent},
    {path: "about",component: AboutComponent},
    {path: "drink",component: DrinkComponent},
    {path: "**", component: NopageComponent}
];
