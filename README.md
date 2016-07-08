# TDC 2016 - Usage of geospatial data with MongoDB

Sample application presented at The Developers Conference 2016 São Paulo - NoSQL Track
http://www.thedevelopersconference.com.br/tdc/2016/saopaulo/trilha-nosql

Checklist to run app:
* Install NodeJS and MongoDB
* Clone repo
* Run npm install
* Add your Google Maps API access token to public/index.html replacing 'KEY'
* Import sample data on Mongo
    * mongoimport --db=tdc2016 --collection=locations scripts/locations.json
    * mongoimport --db=tdc2016 --collection=checkins scripts/checkins.json
    * mongo < scripts/create-indexes.js
* Start app using npm start
* Open browser at http://localhost:3000/

References

http://geojson.org/

https://docs.mongodb.com/manual/reference/geojson/

Code developed by Luiz Svoboda and Gustavo Coelho

This code is licensed under

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
