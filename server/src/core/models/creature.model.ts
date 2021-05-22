import CreaturePrototype from './creature-prototype.model';
import { FK } from '../../shared/common/persistance/db.types';

export default interface Creature extends CreaturePrototype {
    prototypeId: FK<CreaturePrototype>;
}
