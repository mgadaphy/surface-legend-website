import * as migration_20261106_091342_initial from './20261106_091342_initial';

export const migrations = [
  {
    up: migration_20261106_091342_initial.up,
    down: migration_20261106_091342_initial.down,
    name: '20261106_091342_initial'
  },
];
