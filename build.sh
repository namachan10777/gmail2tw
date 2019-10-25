#!/bin/bash

echo -n "consumer_key: "
read CONSUMER_KEY
echo -n "consumer_secret: "
read CONSUMER_SECRET

mkdir -p dist
cat ./gmail2tw.gs \
	| sed -e 's/<-CONSUMER_KEY->/'$CONSUMER_KEY'/' \
	| sed -e 's/<-CONSUMER_SECRET->/'$CONSUMER_SECRET'/' \
	> ./dist/gmail2tw.gs
