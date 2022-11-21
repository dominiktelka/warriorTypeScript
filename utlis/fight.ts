import {WarriorRecord} from "../records/warrior.record";

/** mozesz jeszcze sprobwoac zrobic ladne logi ktore beda wyswietlane na zasadzie zmiany tla ikonek itd
export enum LogEntryType{
    Attack,
    Defense,
    DefenseBroken,
}
export interface LogEntry{
    txt: string;
    type: LogEntryType;
}
 wtedy zamiast const log: string[]=[] piszesz const log: LogEntry[]=[]
 **/



export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {
    log: string[];
    winner: WarriorRecord;
} =>{
    const log: string[] = [];

    const warrior1Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.defence,
        warrior: warrior1,
    }
    const warrior2Obj = {
        hp: warrior2.stamina * 10,
        dp: warrior2.defence,
        warrior: warrior2,
    }

    let attacker = warrior1Obj;
    let defender = warrior2Obj;

    do{
    const attackStrength = attacker.warrior.power;
    log.push(`${attacker.warrior.name} will attack ${defender.warrior.name} with strength of ${attackStrength}`);

    //DP:5, HP: 5, attackStrength = 7
    if(defender.dp + defender.warrior.agility > attackStrength){
        log.push(`${defender.warrior.name} broni sie przed ${attacker.warrior.name}.`);
        defender.dp -= attackStrength;
        //DP: -2, HP:5

        if(defender.hp < 0){
            log.push(`${attacker.warrior.name} przełamał obronę ${defender.warrior.name} zadając mu ${-defender.dp} obrażen.`)
            defender.hp += defender.dp;
            // HP =5 -2 =3
        }
    } else{
        log.push(`${attacker.warrior.name} zadał ${attackStrength} obrażeń ${defender.warrior.name}.`)
        defender.hp -=attackStrength;
    }

    [defender,attacker] = [attacker, defender];
    } while(warrior1Obj.hp >0)

    const winner = defender.warrior;
    log.push(`${winner.name} zwyciężył!`)

    return{
        log,
        winner
    }
}