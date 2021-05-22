import Stats from './embeds/stats.embed';
import { Entity } from '../../shared/common/persistance/db.types';

export enum AuraType {
    Harm,
    Heal,
}

export default interface Aura extends Entity {
    type: AuraType;
    scriptName: string;
    statsDiff: Stats;
}
