import { FK } from '../../../shared/common/persistance/db.types';
import { Int } from '../../../shared/types/base.types';
import Item from '../item.model';

type Inventory = Array<{ item: FK<Item>; stacks: Int }>;
export default Inventory;
