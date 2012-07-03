#!/bin/bash
sencha create jsb -a http://localhost:3000/ -p public/app.jsb3
sencha build -p public/app.jsb3 -d public/
