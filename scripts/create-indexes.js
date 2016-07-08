use tdc2016
db.checkins.createIndex({"position" : "2dsphere"})
db.locations.createIndex({"location" : "2dsphere"})

