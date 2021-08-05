import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadString(image: string, path: string): Promise<string> {
    const task = await this.storage
      .ref(path)
      .putString(image, 'data_url', { contentType: 'image/png' });
    return task.ref.getDownloadURL();
  }
}
