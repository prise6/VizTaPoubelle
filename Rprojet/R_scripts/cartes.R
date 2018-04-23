
#   -----------------------------------------------------------------------
#
#   Quelques cartes, comme ci
#
#   -----------------------------------------------------------------------




# Ajout de propriete dans un geojson --------------------------------------

# geojson = geojsonR::FROM_GeoJson(file.path(varglobale$dir$opendata, "GeoJson", "arrondissements_osm_paris.geojson"))
geojson = geojsonio::geojson_read(file.path(varglobale$dir$opendata, "GeoJson", "arrondissements_osm_paris.geojson"))

for(i in 1:20) {
  geojson$features[[i]]$properties$c_arr = i
  # geojson$features[[i]]$geometry$coordinates = geojson$features[[i]]$geometry$coordinates[[1]]
}

cat(geojsonio::as.json(geojson), file = file.path(varglobale$dir$opendata, "GeoJson", "arrondissement_paris_enrichis.geojson"))
geojson$features[[1]]$geometry$coordinates

# 1- visualisation des arrondissements ------------------------------------


arrondissements = readRDS(file.path(varglobale$dir$datas, "arrondissements.RDS"))

arrondissements_poly = geojsonio::geojson_read(file.path(varglobale$dir$opendata, "GeoJson", "arrondissement_paris_enrichis.geojson"), what = "sp")


pal <- colorNumeric("viridis", NULL)
leaflet(arrondissements_poly) %>% 
  # addTiles() %>%
  setView(lng = 2.333333, lat = 48.866667, zoom = 12) %>%
  addPolygons(stroke = T, weight = 3, fill = T, fillColor = ~pal(c_arr), color = "#444444")

leaflet() %>% 
  addTiles() %>%
  setView(lng = 2.333333, lat = 48.866667, zoom = 12) %>%
  addGeoJSON(geojson = arrondissements$Geometry[1], stroke = F, weight = 1, fill = T, color = "#444444")



# 2 - nombre de poubelles par arrondissements ----------------------------- 

mobilier_environnement = readRDS(file.path(varglobale$dir$datas, "mobilier_environnement.RDS"))
poubelles_loc = mobilier_environnement[`Type Mobilier` == "POU"]

# leaflet(data = poubelles_loc) %>% 
#   addTiles() %>%
#   addMarkers(lng = ~lat, lat = ~long, clusterOptions = markerClusterOptions()) %>% 
#   setView(lng = 2.333333, lat = 48.866667, zoom = 12)

## a quel arrondissement appartient la poubelle ?

poubelles_loc_sp = sp::SpatialPointsDataFrame(poubelles_loc[, list(long, lat)], data = poubelles_loc, proj4string = CRS("+proj=longlat +datum=WGS84 +no_defs +ellps=WGS84 +towgs84=0,0,0"))
poubelles_loc_sp_over = sp::over(poubelles_loc_sp, arrondissements_poly)


poubelles_loc = cbind(poubelles_loc, poubelles_loc_sp_over$c_arr)
setnames(poubelles_loc, "V2", "C_AR")

poubelles_arrondissement = poubelles_loc[, list(nb_poub = .N), keyby = C_AR]



# Combine -----------------------------------------------------------------

hab_arrondissements = readRDS(file.path(varglobale$dir$datas, "hab_arrondissements.RDS"))

data = NULL

# + arrondissement
# + surface
data = arrondissements[, list(C_AR, C_ARINSEE, L_AR, L_AROFF, SURFACE, PERIMETRE)]

# + nb habitant
data = merge(data, hab_arrondissements, by = c("C_AR"))

# + nb de poubelle
data = merge(data, poubelles_arrondissement, by = c("C_AR"))


data[, `:=` (
  
  surface_nb_hab  = SURFACE / nb_hab,
  nb_poub_nb_hab  = nb_poub / nb_hab,
  surface_nb_poub = SURFACE / nb_poub
  
)]

saveRDS(data, file.path(varglobale$dir$datas, "data_arrondissements_enrichis.RDS"))
data = readRDS(file.path(varglobale$dir$datas, "data_arrondissements_enrichis.RDS"))


# Enrichissement GeoJSON --------------------------------------------------


geojson = geojsonio::geojson_read(file.path(varglobale$dir$opendata, "GeoJson", "arrondissements_osm_paris.geojson"))

for(i in 1:20) {
  geojson$features[[i]]$properties$c_arr = i
  geojson$features[[i]]$properties$l_aroff = data[C_AR == i, L_AROFF]
  geojson$features[[i]]$properties$surface = data[C_AR == i, SURFACE]
  geojson$features[[i]]$properties$perimetre = data[C_AR == i, PERIMETRE]
  geojson$features[[i]]$properties$nb_hab = data[C_AR == i, nb_hab]
  geojson$features[[i]]$properties$nb_poub = data[C_AR == i, nb_poub]
  geojson$features[[i]]$properties$surface_nb_hab = data[C_AR == i, surface_nb_hab]
  geojson$features[[i]]$properties$nb_poub_nb_hab = data[C_AR == i, nb_poub_nb_hab]
  geojson$features[[i]]$properties$surface_nb_poub = data[C_AR == i, surface_nb_poub]
  # geojson$features[[i]]$geometry$coordinates = geojson$features[[i]]$geometry$coordinates[[1]]
}

cat(geojsonio::as.json(geojson), file = file.path(varglobale$dir$opendata, "GeoJson", "arrondissement_paris_enrichis.geojson"))



# Tonnage des dechets -----------------------------------------------------


tonnages_des_dechets_bacs_jaunes = readRDS(file.path(varglobale$dir$datas, "tonnages_des_dechets_bacs_jaunes.RDS"))

tonnage_tout        = tonnages_des_dechets_bacs_jaunes[arrondissement == "Tout Paris", tonnage, keyby = mois_id]
tonnage_tout_annuel = tonnages_des_dechets_bacs_jaunes[arrondissement != "Tout Paris", list(tonnage = sum(tonnage)), keyby = arrondissement]
tonnage_tout_annuel[, c_arr := as.numeric(gsub(pattern = "^750",  replacement = "", arrondissement))]
tonnage_tout_annuel = tonnage_tout_annuel[data[, list(C_AR, nb_hab)], on = c("c_arr" = "C_AR")]
tonnage_tout_annuel[, kg_hab := tonnage*1000/nb_hab]
setorder(tonnage_tout_annuel, c_arr)

tonnage_tout$mois_pretty = month.abb

tonnage_tout_chartist = list(
  hidden = list(
    labels = tonnage_tout$mois_pretty,
    series = list(
      tonnage_tout$tonnage
    )
  ),
  display = list(
    labels = tonnage_tout_annuel$c_arr,
    series = list(
      tonnage_tout_annuel$kg_hab
    )
  )
)

tonnage_tout_json = jsonlite::toJSON(tonnage_tout_chartist)

cat(tonnage_tout_json, file = file.path(varglobale$dir$opendata, "Json", "tonnage_dechets_tout_paris.json"))


# Dans ma rue -------------------------------------------------------------

dans_ma_rue  = readRDS(file.path(varglobale$dir$datas, "dans_ma_rue.RDS"))
tmp = dans_ma_rue[, .N, SOUSTYPE]
setorder(tmp, N)

dans_ma_rue_decos = dans_ma_rue[SOUSTYPE %like% "Meubles et éléments de décoration" & `ANNEE DECLARATION` == 2016, .N, ARRONDISSEMENT]
setorder(dans_ma_rue_decos, -N)

dans_ma_rue_decos_chartist = list(
  hidden = list(
    series = list(
      dans_ma_rue_decos$N
    )
  ),
  display = list(
    labels = dans_ma_rue_decos$ARRONDISSEMENT,
    series = list(
      dans_ma_rue_decos$N
    )
  )
)

dans_ma_rue_decos_chartist_json = jsonlite::toJSON(dans_ma_rue_decos_chartist)

cat(dans_ma_rue_decos_chartist_json, file = file.path(varglobale$dir$opendata, "Json", "dans_ma_rue_decos_chartist.json"))





# Google trend ------------------------------------------------------------

data_google_trend = readRDS(file.path(varglobale$dir$datas, "google_trend.RDS"))
data_google_trend_mois = data_google_trend[, list(moy_trend = mean(trend)), keyby = Mois_id]
data_google_trend_mois[, pretty_mois := format(as.Date(Mois_id), "%b/%y")]

data_google_trend_mois_chartist = list(
  hidden = list(
    labels = data_google_trend_mois$pretty_mois,
    series = list(
      data_google_trend_mois$moy_trend
    )
  ),
  hidden = list(
    labels = data_google_trend_mois$pretty_mois,
    series = list(
      data_google_trend_mois$moy_trend
    )
  )
)

data_google_trend_mois_chartist_json = jsonlite::toJSON(data_google_trend_mois_chartist)

cat(data_google_trend_mois_chartist_json, file = file.path(varglobale$dir$opendata, "Json", "data_google_trend_mois_chartist.json"))


