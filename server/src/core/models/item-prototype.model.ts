import { Entity } from '../../shared/common/persistance/db.types';

export default interface ItemPrototype extends Entity {
    name: string;
}
