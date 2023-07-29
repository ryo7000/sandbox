#!/usr/bin/env bash

set -e -o pipefail

LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH ./a.out
