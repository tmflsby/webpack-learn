import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import '../config'

export class GeoQTileLayer extends TileLayer {
  constructor(props) {
    super(props)
    this.props = props
    this.tileLayerUrl = {
      "ChinaOnlineCommunity": "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
      "ChinaOnlineStreetPurplishBlue": "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      "ChinaOnlineStreetGray": "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
      "ChinaOnlineStreetWarm": "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
      "ChinaOnlineCommunityENG": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer/tile/{z}/{y}/{x}",
      "ChinaOnlineCommunity_Mobile": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer/tile/{z}/{y}/{x}"
    }
    this.className_ = 'ol-geoq-tileLayer'
    this.values_.source = new XYZ({
      url: this.tileLayerUrl[this.props.tileLayerType]
    })
  }
}

export const geoqTileLayer = (options) => new GeoQTileLayer(options)

window.OL.KQTileLayer.GeoQTileLayer = GeoQTileLayer
window.ol.kqTileLayer.geoqTileLayer = geoqTileLayer
