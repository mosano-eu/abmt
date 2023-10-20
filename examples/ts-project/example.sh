#!/bin/sh

alias abmt="node `pwd`../../packages/cli/dist/cjs/cli.min.js"

abmt list;
abmt checkout;
abmt list;
abmt checkout "1697782119926-seed-countries";
abmt list;
abmt checkout "1697782119926-seed-countries";