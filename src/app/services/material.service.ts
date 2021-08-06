import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from '../../../functions/interfaces/material';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  categoryOptions: string[] = [
    '床材',
    '壁材',
    '屋根材',
    '天井材',
    '断熱材',
    '防音材',
    '手すり材',
    '不燃材',
  ];
  constructor(
    private db: AngularFirestore,
    private storageService: StorageService
  ) {}

  async createMaterial(data: Omit<Material, 'id'>) {
    const id = this.db.createId();
    data.thumbnail = await this.storageService.uploadString(
      data.thumbnail,
      `materials/${id}`
    );
    const materialData: Material = {
      id,
      ...data,
    };
    return this.db.doc(`materials/${id}`).set(materialData);
  }
}
