# Hestia api

![example workflow](https://github.com/iamzr/hestia-api/actions/workflows/docker-image.yml/badge.svg)

## Swagger documentation

Docs can be found at localhost:3000/api-docs

## K6 load test
To run the load test locally, install k6 and then run the following command
```
k6 run tests/loadTest.js
````
The test is set to 50 VUs for 1m, this can easily be changed by editing the options object in tests/loadTest.js 
