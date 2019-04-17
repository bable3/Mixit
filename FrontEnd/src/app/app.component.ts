import { Component } from '@angular/core';
//import du component depuis le paquet source

// Définition du composant 2 el obligatoire selector et template
@Component({
  selector: 'app-root', //nom
  templateUrl: './app.component.html', // URL du code Html du composant
  styleUrls: ['./app.component.css'] // URL du code css du composant
})

//export du composant de la class du composant
export class AppComponent {
  title = 'app';

  public assets_path: "./assets/";
  public images_path: "./assets/images/";
  public ingrendients_path: "./assets/images/ingredients/";
  public cocktails_path: "./assets/images/cocktails/";
  public globals_path: "./assets/images/globals/";

}
