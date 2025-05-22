import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,IonicModule,FormsModule], 
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  searchName = '';
  selectedapi: any = null;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  searchMorty() {
  this.errorMessage = '';
  this.selectedapi = null;

  const name = this.searchName.toLowerCase().trim();
  if (!name) return;

  this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${name}`).subscribe({
    next: (data) => {
      const character = data.results[0]; 
      this.selectedapi = {
        id: character.id,
        name: character.name,
        imageUrl: character.image,
      };
    },
    error: () => {
      this.errorMessage = 'Personaje no encontrado.';
    },
  });
}

goToDetails(id: number) {
  this.router.navigate(['/api', id]); 
}
}
