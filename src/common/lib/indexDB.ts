import Dexie, { Table } from 'dexie';

export interface Book {
    id?: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    text: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  library!: Table<Book>; 

  constructor() {
    super('localBookStore');
    this.version(1).stores({
      books: '++id, title, author' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();