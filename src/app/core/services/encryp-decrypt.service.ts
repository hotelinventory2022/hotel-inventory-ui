import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { Constants } from '../models/constants';
@Injectable({
  providedIn: 'root',
})
export class EncrypDecryptService {
  private AESSecretKey: string = Constants.aesSecretKey;
  constructor() {}
  encryptAES(textToEncrypt: string): string {
    return crypto.AES.encrypt(
      textToEncrypt,
      this.AESSecretKey.trim()
    ).toString();
  }
  decryptAES(textToDecrypt: string): string {
    return crypto.AES.decrypt(textToDecrypt, this.AESSecretKey.trim()).toString(
      crypto.enc.Utf8
    );
  }
}
