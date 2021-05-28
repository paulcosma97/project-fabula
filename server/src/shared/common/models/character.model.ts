import Unit from './unit.type';
import { Account } from './account.model';
import { FK } from '../persistance/db.types';
import Inventory from './embeds/inventory.embed';
import Class from './embeds/class.embed';

export default interface Character /* = player */ extends Unit {
    accountId: FK<Account>;
    inventory: Inventory;
    class: Class;
}
