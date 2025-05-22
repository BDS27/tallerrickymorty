import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SaveService } from '../services/data.service'; 

@Component({
  selector: 'app-api-details',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApirickandmortyDetailsPage implements OnInit {
  id = '';
  details: any = null;
  comment: string = '';
  savedComment: string = '';
  savedSuccessfully = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.fetchMortyDetails(this.id);
    }
  }

  fetchMortyDetails(id: string) {
    this.http
      .get<any>(`https://rickandmortyapi.com/api/character/${id}`)
      .subscribe({
        next: (data) => {
          this.details = {
            id: data.id,
            name: data.name,
            status: data.status,
            type: data.type || 'Desconocido',
            species: data.species,
            gender: data.gender,
            imageUrl: data.image,
          };
        },
      });
  }

  saveComment() {
    this.savedComment = this.comment.trim();
    this.comment = '';
  }

  saveCharacter() {
    if (this.details) {
      this.saveService.saveCharacter(this.details).then(() => {
        this.savedSuccessfully = true;
        setTimeout(() => (this.savedSuccessfully = false), 3000); 
      });
    }
  }
}
