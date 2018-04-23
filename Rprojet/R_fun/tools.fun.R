
#    ----------------------------------------------------------------------
#
#    Fonctions
#
#    ----------------------------------------------------------------------


geomXYToLatLong = function(geom_xy)  {
  
  split = strsplit(geom_xy, split = ", ")
  split = list(
     lat  = sapply(split, "[[", i = 1),
     long = sapply(split, "[[", i = 2)
  )
  
  split = lapply(split, as.numeric)
  split
}

