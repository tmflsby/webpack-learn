import { View } from 'ol'
import '../config'

export class KQView extends View {
  constructor(props) {
    super(props);
    this.props = props
  }
}

export const kqView = (options) => new KQView(options)

window.OL.KQView = KQView
window.ol.kqView = kqView
