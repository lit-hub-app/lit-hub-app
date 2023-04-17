import Dexie, { Table } from 'dexie';

export interface IndexBook {
    _id?: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    text: string;
}

export class localBookStore extends Dexie {
  // 'library' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  library!: Table<IndexBook>; 

  constructor() {
    super('localBookStore');
    this.version(1).stores({
      library: '++_id, title, author' // Primary key and indexed props
    });
  }
}
const indexedDB = new localBookStore();

export default indexedDB;