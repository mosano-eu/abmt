#!/bin/sh

alias abmf="node `pwd`../../packages/cli/dist/cjs/cli.min.js"

abmf list;
abmf checkout;
abmf list;
abmf checkout "1697782119926-seed-countries";
abmf list;
abmf checkout "1697782119926-seed-countries";