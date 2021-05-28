import { FK } from '../../persistance/db.types';
import { Int } from '../../../types/base.types';
import Item from '../item.model';

type Inventory = Array<{ item: FK<Item>; stacks: Int }>;
export default Inventory;
