import { Entity } from '../persistance/db.types';

export default interface ItemPrototype extends Entity {
    name: string;
}
