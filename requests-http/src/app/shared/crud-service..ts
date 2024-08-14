import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs';
import { HasId } from './HasId';

export class CrudService<T extends HasId> {

  constructor(protected http: HttpClient, private API_URL: string) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id: string) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  update(record: T) {
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

}
