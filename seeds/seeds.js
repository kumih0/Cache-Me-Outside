//import sequelize, models db tables
const sequelize = require('../config/connection');
const { User, Caches, FoundCaches, TimesFound } = require('../models');
//import seed data for users, caches, found caches
const userData = require('./userData.json');
const cacheData = require('./cacheData.json');
// const foundCacheData = require('./foundCacheData.json');
// const timesFoundData = require('./timesFoundData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const caches = await Caches.bulkCreate(cacheData);

    //in order to have caches stored inside the found caches table, they must be found in (and the instance of "finding" recorded inside) the timesfound table
    
    //declaring empty array for the all timesfound instance objects to be stored, essentially the .json file but dynamically created
    const timesFound = [];
    //creating a random number of timesfound instances
    timesFound.length = Math.floor(Math.random() * 30 + 1);
    console.log(timesFound.length);
    //for loop within that array length to create seed data
    for(let i = 0; i < timesFound.length; i++) {
        timesFound[i] = await TimesFound.create({
            id: i + 1,
            //randomly assigning a user id to each instance
            finder_id: users[Math.floor(Math.random() * users.length)].id,
            //randomly assigning a cache id to each instance
            cache_id: caches[Math.floor(Math.random() * caches.length)].id
        });
        console.log(timesFound[i], 'it worked idiot');
    }
    //mapping the timesfound array to extract data
    const timesFoundSeed = timesFound.map((timefind) => timefind.get({ plain: true }));
    console.log(timesFoundSeed);




    // let foundCaches = [];
    // for (const foundCache of caches){
    //     await FoundCaches.create({
    //         ...foundCache,
    //         cache_id: caches[Math.floor(Math.random() * caches.length)].id
    //     });
    //     console.log(foundCache);
    //     foundCaches.push(foundCache);
    // }
    // const foundSeed = foundCaches.map((foundCache) => foundCache.get({ plain: true }));
    // console.log(foundSeed);



    // await TimesFound.bulkCreate(timesFoundData);
    // for(const timeFound of timesFoundData) {
    //     await TimesFound.create({
    //         ...timeFound,
    //         finder_id: users[Math.floor(Math.random() * users.length)].id,
    //         cache_id: caches[Math.floor(Math.random() * caches.length)].id
    //     });

    // await FoundCaches.bulkCreate(foundCacheData);



//    for(const timeFound of timesFoundData) {
//         let id = Math.floor(Math.random() * 15);
//         if(!timeFound.found_cache_id) {
//             let foundCache = await FoundCaches.findByPk(timeFound.cache_id);

//             await TimesFound.update(
//                 {
//                     found_cache_id: foundCache.id
//                 },
//                 {
//                     where: {
//                         id: id
//                     }
//                 }
//             );
//             console.log(timeFound, foundCache, "u done it");

//         } else {
//             console.log("u done goofed");
//         }
//     }



    process.exit(0);
};

seedDatabase();