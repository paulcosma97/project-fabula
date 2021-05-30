import Stats from './embeds/stats.embed';
import Orientation from './orientation.enum';
import { ActiveAura } from './active-aura.embed';
import { Entity, FK } from '../persistance/db.types';
import Ability from './ability.model';
import Vector from '../../types/math.types';

export default interface Unit extends Entity {
    name: string;
    stats: Stats;
    knownAbilityIds: FK<Ability[]>;
    activeAuras: ActiveAura[];
    position: Vector;
    orientation: Orientation;
}
