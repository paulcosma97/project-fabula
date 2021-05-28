import CreaturePrototype from './creature-prototype.model';
import { FK } from '../persistance/db.types';

export default interface Creature extends CreaturePrototype {
    prototypeId: FK<CreaturePrototype>;
}
