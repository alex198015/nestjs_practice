import Ormconfig from '@app/typeOrm.config'



const ormseedconfig = Ormconfig.setOptions({
    migrations: [__dirname + '/seeds/**/*{.ts,.js}']
}) 


export default ormseedconfig