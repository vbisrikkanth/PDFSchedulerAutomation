#!/bin/bash

rm -r output # I want to give allure a fresh start
npx codeceptjs run --steps --plugins allure
#npx codeceptjs run-workers 2 
#npx codeceptjs run-workers --suites 2 --plugins allure
#--steps --plugins allure

allure serve output
