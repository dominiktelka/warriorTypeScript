import * as express from "express"
import 'express-async-errors';
import * as methodOverride from "method-override";
import {static as eStatic, urlencoded} from "express";
import {engine} from "express-handlebars";
import {homeRouter} from "./routers/home";
import {warriorRouter} from "./routers/warior";
import {arenaRouter} from "./routers/arena";
import {hallOfFameRouter} from "./routers/hall-of-fame";
import {WarriorRecord} from "./records/warrior.record";
import './utlis/db'
import {handleError} from "./utlis/errors";

const app = express();

app.use(methodOverride('_method')); // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it. It need to be declared in the _method
app.use(urlencoded({
    extended:   true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    //helpers: ???,
}));
app.set('view engine','.hbs');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter)
app.use('/hall-of-fame',hallOfFameRouter)


app.use(handleError);

app.listen(3000,'localhost', ()=>{
    console.log('Listening on http://localhost:3000');
})