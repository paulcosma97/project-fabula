import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { Logger } from '@nestjs/common';

const YAML_CONFIG_FILENAME = `config.${
    process.env.FABULA_CONFIG_PROFILE || (process.env.PRODUCTION && 'production') || 'development'
}.yaml`;

export default () => {
    Logger.log(`Loading profile ${YAML_CONFIG_FILENAME}`, 'ConfigLoader');
    return yaml.load(readFileSync(join(__dirname, '../../../profiles', YAML_CONFIG_FILENAME), 'utf8')) as Record<
        string,
        any
    >;
};
