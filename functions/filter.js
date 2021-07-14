import { formatNumber, formatPrice } from '~/modules/js-module-numberFormat'
const maxLengthDisplay = 2

export default {
  functionFilterInitVar (structure) {
    const tmp = {}
    Object.keys(structure).forEach((dt) => {
      tmp[dt] = structure[dt].prototype.value
    })
    return tmp
  },
  functionFilterTranslateFilter (dt, proto, options, lang) {
    switch (proto.type) {
      case 'select':
        if (Array.isArray(proto.value)) {
          if (dt.length > maxLengthDisplay) {
            const tmp = JSON.parse(JSON.stringify(dt)).slice(maxLengthDisplay)
            return tmp.toString().replace(/,/g, ', ') + (dt.length - tmp.length === 0 ? '' : (', ' + (dt.length - tmp.length) + '+'))
          } else {
            return dt.toString().replace(/,/g, ', ')
          }
        }
        return options ? options.label[dt][lang] : dt
      case 'range-number':
        if (dt.start || dt.end) {
          if (dt.start && dt.end) {
            return formatNumber(dt.start) + ' - ' + formatNumber(dt.end)
          } else if (dt.start) {
            return ' > ' + formatNumber(dt.start)
          } else if (dt.end) {
            return ' < ' + formatNumber(dt.end)
          }
        }
        return ''
      case 'range-price':
        if (dt.start || dt.end) {
          if (dt.start && dt.end) {
            return formatPrice(dt.start) + ' - ' + formatPrice(dt.end)
          } else if (dt.start) {
            return ' > ' + formatPrice(dt.start)
          } else if (dt.end) {
            return ' < ' + formatPrice(dt.end)
          }
        }
        return ''
      default:
        return options ? options.label[dt][lang] : dt
    }
  }
}
