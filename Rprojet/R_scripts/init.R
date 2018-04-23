
#   -----------------------------------------------------------------------
#
#   Init
#
#   -----------------------------------------------------------------------


library(data.table)
library(xlsx)
library(sp)
library(leaflet)
library(geojsonR)
library(geojsonio)
library(jsonlite)

varglobale = list()
varglobale$dir = list()
varglobale$dir$base = getwd()
varglobale$dir$r_scripts = file.path(varglobale$dir$base, "R_scripts")
varglobale$dir$datas = file.path(varglobale$dir$base, "R_datas")
varglobale$dir$opendata = file.path(varglobale$dir$base, "..", "Datas")
varglobale$dir$r_fun = file.path(varglobale$dir$base, "..", "R_fun")


invisible(lapply(list.files(varglobale$dir$r_fun, pattern = "*.fun.R", full.names = T), source, echo = T))
