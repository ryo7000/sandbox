#!/usr/bin/env bash

set -eu -o pipefail

go build -buildmode=c-shared -o libcabi.so cabi.go
