import Dexie, { Table } from 'dexie';
import { indexedDB, IDBKeyRange } from "fake-indexeddb";

export interface IndexBook {
    _id?: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    text: string;
}

export class LocalBookStore extends Dexie {
  // 'library' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  library!: Table<IndexBook>; 

  constructor() {
    super('localBookStore', {
      indexedDB,
      IDBKeyRange
    });
    this.version(1).stores({
      library: '++_id, title, author' // Primary key and indexed props
    });
  }
}
const dexie = new LocalBookStore()

dexie.on('ready', () => {
  console.log('IndexedDB ready');
})

export default dexie;