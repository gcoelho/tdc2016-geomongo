db.locations.find(
   {
     location: {
        $nearSphere: {
           $geometry: {
              type : "Point",
              coordinates : [ -46.676827, -23.599942 ]
           },
           $minDistance: 1000,
           $maxDistance: 2000
        }
     }
   },
  {"_id" : 0}
)
