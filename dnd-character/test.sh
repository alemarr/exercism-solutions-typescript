#!/bin/sh

test_fn () { yarn test; }

while test_fn
do
  echo "Try again"
done
