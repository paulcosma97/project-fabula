import { Entity } from '../../shared/common/persistance/db.types';

export default interface Ability extends Entity {
    name: string;
    description: string;
}
