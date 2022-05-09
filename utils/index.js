export const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
export const shortMonth = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Ags',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]
export const fullMonth = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
export const _numberFormat = (number, decimals, decPoint, thousandSep) => {
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandSep === 'undefined' ? ',' : thousandSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''

  const toFixedFix = (n, prec) => {
    const k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
  }
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }

  const result = s.join(dec)
  return result
}

export const _formatDateTime = (date, type) => {
  date = new Date(date)
  if (
    typeof date !== 'undefined' &&
    date !== 'null' &&
    date !== null &&
    date !== '' &&
    date !== '-'
  ) {
    let bln = fullMonth
    if (type === 'short') {
      bln = shortMonth
    }
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate().toString()
    const year = d.getFullYear()

    month = bln[month - 1]
    if (day.length < 2) day = '0' + day
    return [day, month, year].join(' ')
  }
  return date
}
