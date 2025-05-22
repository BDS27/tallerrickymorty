import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  constructor(private firestore: Firestore) {}

  async saveCharacter(character: any) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'Character'), character);
      console.log('Personaje guardado:', docRef.id);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
