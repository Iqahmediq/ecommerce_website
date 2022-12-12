const main = async () => {
    await require('../config/db');
    
    console.log('removing Users...')
    await require('./Users').deleteMany({});
    console.log('user removed')

    console.log('removing Articles...')
    await require('./Article').deleteMany({});
    console.log('Articles removed ')

    console.log('removing Commandes...')
    await require('./Commande').deleteMany({});
    console.log('commandes removed')
    
    process.exit();
}

main();