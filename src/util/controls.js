// controls.js module
export default function sanatizeControls (ctl) {
  try {
    if (ctl.input.control._type) {
      return ctl.input.control._type
    } else {
      return 'buttons only'
    }
  } catch {
    // sometimes the data has a goofy value so we just assume buttons only
    return 'buttons only'
  }
}
