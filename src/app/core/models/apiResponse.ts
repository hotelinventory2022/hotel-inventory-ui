import { HttpStatusCode } from '@angular/common/http';

export class apiResponse {
  public data!: any;
  public message!: string;
  public statusCode!: HttpStatusCode;
}
