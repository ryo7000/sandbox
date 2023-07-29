#!/usr/bin/env bash

set -eu -o pipefail

gcc -L. -lcabi test.c
