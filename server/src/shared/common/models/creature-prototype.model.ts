import Unit from './unit.type';
import LootTable from './embeds/loot-table.embed';
import Faction from './embeds/faction.embed';

export default interface CreaturePrototype extends Unit {
    lootTable: LootTable;
    faction: Faction;
}
