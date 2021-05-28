import { Entity, FK } from '../persistance/db.types';
import EffectType from './embeds/effect-type.embed';
import TargetType from './embeds/target-type.embed';
import { Int, Meter, UInt } from '../../types/base.types';
import Aura from './aura.model';

export default interface Ability extends Entity {
    name: string;
    description: string;
    effectType: EffectType;
    targetType: TargetType;
    range: Meter;
    appliesAuras?: Array<{ aura: FK<Aura>; stacks: UInt }>;

    /**
     * Either damage of healing, based on <em>Ability.effectType<em>.
     */
    values: {
        min: Int;
        max: Int;
    };
}
