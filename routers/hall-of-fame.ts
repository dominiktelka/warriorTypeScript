import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";

export const hallOfFameRouter = Router()

hallOfFameRouter
    .get('/',async (req,res) => {
        const warrior = (
            await WarriorRecord.listTop(10)
        ).map((warrior,index) => {
            return{
                place: index +1,
                warrior,
            }
            // after map on warriorList and created place and obj warrior, we need to use this on warrior from return and later call parametr which we need in list.hbs. Something like this: this.warrior.name
        })
        res.render('hall-off-fame/list.hbs',{
            warrior
        })
    })
