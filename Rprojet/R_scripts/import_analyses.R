
#   -----------------------------------------------------------------------
#
#   Import des données et premières analyses
#
#   -----------------------------------------------------------------------



# Import des données OPEN DATA PARIS --------------------------------------


# mobilier proprete paris 2011 --------------------------------------------

mobilier_environnement = fread(file.path(varglobale$dir$opendata, "OpenDataParis", "mobilierenvironnementparis2011.csv"))

mobilier_environnement[,  c("lat", "long") := geomXYToLatLong(geom_x_y)]
mobilier_environnement[, `:=` (
  geom_x_y = NULL,
  geom = NULL
)]

mobilier_environnement[, .N, keyby = list(`Type Mobilier`, `Libelle Mobilier`)]

saveRDS(mobilier_environnement, file = file.path(varglobale$dir$datas, "mobilier_environnement.RDS"))



# mobilier environnement paris 2011 ---------------------------------------

# Emplacement des colonnes à verre

mobilier_proprete = fread(file.path(varglobale$dir$opendata, "OpenDataParis", "mobilierpropreteparis2011.csv"))
str(mobilier_proprete)
mobilier_proprete[,  c("long", "lat") := geomXYToLatLong(geom_x_y)]
mobilier_proprete[, `:=` (
  geom_x_y = NULL,
  geom = NULL
)]

saveRDS(mobilier_proprete, file.path(varglobale$dir$datas, "mobilier_proprete.RDS"))
mobilier_proprete = readRDS(file.path(varglobale$dir$datas, "mobilier_proprete.RDS"))


# Tri mobile --------------------------------------------------------------

# Remorque aménagée

tri_mobile = fread(file.path(varglobale$dir$opendata, "OpenDataParis", "tri-mobile0.csv"))
str(tri_mobile)
tri_mobile[,  c("long", "lat") := geomXYToLatLong(XY)]
tri_mobile[, `:=` (
  XY = NULL
)]

saveRDS(tri_mobile, file.path(varglobale$dir$datas, "tri_mobile.RDS"))
tri_mobile = readRDS(file.path(varglobale$dir$datas, "tri_mobile.RDS"))


# tonnages_des_dechets_bacs_jaunes ----------------------------------------


tonnages_des_dechets_bacs_jaunes = fread(file.path(varglobale$dir$opendata, "OpenDataParis", "tonnages_des_dechets_bacs_jaunes.csv"))
str(tonnages_des_dechets_bacs_jaunes)
col_num = colnames(tonnages_des_dechets_bacs_jaunes)[colnames(tonnages_des_dechets_bacs_jaunes) %like% "11"]

tonnages_des_dechets_bacs_jaunes[,  c(col_num) := lapply(.SD, function(col) {
  col = gsub(pattern = " ", replacement = "", col)
  col = gsub(pattern = ",", replacement = ".", col)
  as.numeric(col)
}), .SDcols = col_num]

str(tonnages_des_dechets_bacs_jaunes)

tonnages_des_dechets_bacs_jaunes[, `:=` (
  `Total arrondissement 2011` = NULL
)]

tonnages_des_dechets_bacs_jaunes = melt.data.table(tonnages_des_dechets_bacs_jaunes, id.vars = c("Granularité"))
setnames(tonnages_des_dechets_bacs_jaunes, c("arrondissement", "mois_id", "tonnage"))


dic_mois_id = data.table(
  abbr = c("janv-11", "févr-11", "mars-11", "avr-11", "mai-11", "juin-11", 
    "juil-11", "août-11", "sept-11", "oct-11", "nov-11", "déc-11"),
  dates = seq.Date(as.Date("2011-01-01"), as.Date("2011-12-01"), by = "month")
)

tonnages_des_dechets_bacs_jaunes[, mois_id := dic_mois_id$dates[match(mois_id, dic_mois_id$abbr)]]

saveRDS(tonnages_des_dechets_bacs_jaunes, file.path(varglobale$dir$datas, "tonnages_des_dechets_bacs_jaunes.RDS"))
tonnages_des_dechets_bacs_jaunes = readRDS(file.path(varglobale$dir$datas, "tonnages_des_dechets_bacs_jaunes.RDS"))


# Arrondissements ---------------------------------------------------------

arrondissements = fread(file.path(varglobale$dir$opendata, "OpenDataParis", "arrondissements.csv"))
str(arrondissements)

arrondissements[, c("long", "lat") := geomXYToLatLong(`Geometry X Y`)]
arrondissements[, `Geometry X Y` := NULL]

saveRDS(arrondissements, file.path(varglobale$dir$datas, "arrondissements.RDS"))


# Habitants arrondissements -----------------------------------------------

hab_arrondissements = data.table(
  C_AR = 1:20,
  nb_hab = c(16865, 21442, 35761, 27162, 60965, 44106,
             56519, 38902, 60148, 93078, 153110, 145249,
             183966, 142521, 237636, 168208, 171945, 200440,
             188712, 197004)
)
saveRDS(hab_arrondissements, file.path(varglobale$dir$datas, "hab_arrondissements.RDS"))



# Dans ma rue -------------------------------------------------------------


dans_ma_rue = fread(file.path(varglobale$dir$opendata, "OpenDataParis", "dans-ma-rue.csv"))
str(dans_ma_rue)
dans_ma_rue[,  c("long", "lat") := geomXYToLatLong(geo_point_2d)]
dans_ma_rue[, DATEDECL := as.Date(DATEDECL)]
dans_ma_rue[, `:=` (
  geo_shape    = NULL,
  geo_point_2d = NULL
)]


View(dans_ma_rue[, .N, keyby = list(TYPE, SOUSTYPE)])

saveRDS(dans_ma_rue, file.path(varglobale$dir$datas, "dans_ma_rue.RDS"))



# Import des données OPEN DATA INSEE ---------------------------------------



# Ensemble ----------------------------------------------------------------

# ensemble = xlsx::read.xlsx(file.path(varglobale$dir$opendata, "OpenDataInsee", "ensemble.xls"), sheetIndex = 3, startRow = 8, )
# str(ensemble)



# Import de google trend --------------------------------------------------


data_google_trend = fread(file.path(varglobale$dir$opendata, "GoogleTrend", "multiTimeline.csv"))
setnames(data_google_trend, 2, "trend")
data_google_trend[, Mois_id := format(as.Date(Semaine), "%Y-%m-01")]

saveRDS(data_google_trend, file.path(varglobale$dir$datas, "google_trend.RDS"))



