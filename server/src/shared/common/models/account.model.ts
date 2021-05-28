import Character from './character.model';
import { Entity, FK } from '../persistance/db.types';

export interface Account extends Entity {
    email: string;
    password: string;
    characterIds: FK<Character[]>;
}

export const AccountCollection = 'account';
