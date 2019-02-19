import { config as cloud } from './cloud';
import { config as localhost } from './localhost';

export interface IEnvConfig {
    baseUrl: string;
}

const env = process.env.ENV; // run "export ENV=cloud" to set variable and be able to run on cloud environment
let conf: IEnvConfig;

switch (env) {
    case 'cloud':
        conf = cloud;
        break;
    case 'localhost':
    default:  // will run on localhost by default
        conf = localhost;
        break;
}

export { conf };
