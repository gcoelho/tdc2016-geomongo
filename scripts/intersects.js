db.locations.find(
  {
    location : {
      $geoIntersects : {
        $geometry: {
          type : "Point",
          coordinates : [ -46.677014, -23.599981 ]
        }
      }
    }
  },
  {"_id" : 0}
)
