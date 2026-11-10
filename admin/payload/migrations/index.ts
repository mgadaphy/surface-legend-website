import * as migration_20261110_025146_initial from './20261110_025146_initial';

export const migrations = [
  {
    up: migration_20261110_025146_initial.up,
    down: migration_20261110_025146_initial.down,
    name: '20261110_025146_initial'
  },
];
