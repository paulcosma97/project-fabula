import { FK } from 'src/shared/common/persistance/db.types';
import ItemPrototype from './item-prototype.model';

export default interface Item extends ItemPrototype {
    prototypeId: FK<ItemPrototype>;
}
