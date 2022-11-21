import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utlis/errors";
import {fight} from "../utlis/fight";

export const arenaRouter = Router()

arenaRouter
    .get('/fight-form',async (req,res) => {
        const warriors = await WarriorRecord.listAll()

        res.render('arena/fight-form.hbs',{
            warriors
        })
    })
    .post('/fight',async(req,res) => {
        const {warrior1: warrior1Id, warrior2: warrior2Id} = req.body

        if(warrior1Id === warrior2Id){
            throw new ValidationError('Proszę wybrac dwoch róznych przeciwników!')
        }
        const warrior1 = await WarriorRecord.getOne(warrior1Id)
        const warrior2 = await WarriorRecord.getOne(warrior2Id)

        if(!warrior1){
            throw new ValidationError('Nie znaleziona przeciwnika numer 1.')
        }
        if(!warrior2){
            throw new ValidationError('Nie znaleziona przeciwnika numer 2.')
        }

        const {log,winner} =fight(warrior1,warrior2);
        winner.wins++;
        await winner.update();

        res.render('arena/fight.hbs',{
            log
        })
    }) //doczytaj dokaldnie o metodah post,get itd