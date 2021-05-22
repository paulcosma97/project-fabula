import { Float, Int, Percentage } from '../../../shared/types/base.types';

export default class Stats {
    strength: Int;
    dexterity: Int;
    constitution: Int;
    perception: Int;
    intellect: Int;
    charisma: Int;
    critMultiplier: Float;
    hitChance: Percentage;
    reflection: Percentage;
    multistrike: Percentage;
    baseHP: Int;
    baseEnergy: Int;
}
