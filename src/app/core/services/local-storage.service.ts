import { Injectable } from '@angular/core';
import { EncrypDecryptService } from './encryp-decrypt.service';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private encryptDecryptService: EncrypDecryptService) {}
  set(key: string, value: string) {
    localStorage.setItem(key, this.encryptDecryptService.encryptAES(value));
  }
  get(key: string) {
    const item = localStorage.getItem(key);
    return item !== null && item !== undefined
      ? this.encryptDecryptService.decryptAES(item)
      : '';
  }
  delete(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
