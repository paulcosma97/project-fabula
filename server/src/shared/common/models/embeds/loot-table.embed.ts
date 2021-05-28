import ItemTemplate from '../item-prototype.model';
import { FK } from '../../persistance/db.types';
import { Int, Percentage } from '../../../types/base.types';

type LootTable = Array<{ item: FK<ItemTemplate>; min: Int; max: Int; chance: Percentage }>;
export default LootTable;
