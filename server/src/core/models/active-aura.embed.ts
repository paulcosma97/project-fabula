import { Timestamp, UInt } from '../../shared/types/base.types';
import Aura from './aura.model';

export class ActiveAura {
    aura: Aura; // Copy of Aura instead of ID for faster computes.
    activatedAt: Timestamp;
    expiresAt: Timestamp;
    stacks: UInt;
}
