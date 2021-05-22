import Unit from './unit.type';
import { Account } from './account.model';
import { FK } from '../../shared/common/persistance/db.types';

export default interface Character /* = player */ extends Unit {
    accountId: FK<Account>;
}
