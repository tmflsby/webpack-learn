import { Map } from 'ol'
import '../config'

export class KQMap extends Map {
  constructor(props) {
    super(props);
    this.props = props
  }
}

export const kqMap = (options) => new KQMap(options)

window.OL.KQMap = KQMap
window.ol.kqMap = kqMap
