# ALoLStats-Web

[![Build status](https://git.abyle.org/hps/alolstats-web/badges/master/pipeline.svg)](https://git.abyle.org/hps/alolstats-web/commits/master)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

## Description

This is the front-end for [ALoLStats](https://git.abyle.org/hps/alolstats).

It is written in JavaScript with the help of [React](https://reactjs.org/) and [Material-UI](https://material-ui.com/).

## How to run it

For testing call

```
npm start
```

after checking out the repository. It will need a running ALoLStats on localhost:8000 to work.

To build a container for production deployment call

```
docker build .
```

Make sure to edit package.json first to have it point to the correct backend (ALoLStats) URL and change other parameters there to your liking.
