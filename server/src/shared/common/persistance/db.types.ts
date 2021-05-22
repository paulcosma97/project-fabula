import { Db, ObjectId } from 'mongodb';

export const DatabaseConnectionToken = 'DatabaseConnection';
export type DatabaseConnection = Db;
export type PK = ObjectId;
export type FK<T> = T extends Array<any> ? PK[] : PK;
export interface Entity {
    _id: PK;
}
export type InsertableEntity<T extends Entity> = Omit<T, keyof Entity>;
