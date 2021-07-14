const dictionary = {
  required: {
    id: 'isian belum diisi',
    eng: 'input should not be empty'
  },
  email: {
    id: 'isian harus berupa email',
    eng: 'input should be a valid email'
  },
  max: {
    id: 'isian melebihi batas maksimum',
    eng: 'input exceed maximum value'
  },
  min: {
    id: 'isian kurang dari batas minimum',
    eng: 'input less than minimum value'
  },
  minLength: {
    id: 'isian terlalu pendek',
    eng: 'input too short'
  },
  maxLength: {
    id: 'isian terlalu panjang',
    eng: 'input too long'
  },
  numeric: {
    id: 'isian harus berupa angka',
    eng: 'input must be number'
  },
  unique: {
    id: 'isian telah digunakan',
    eng: 'input allready used'
  },
  unknown: {
    id: 'isian tidak valid',
    eng: 'input not valid'
  }
}

const translate = (msg, name, lang) => {
  lang = lang || 'id'

  const rslt = dictionary[msg] ? dictionary[msg][lang] : dictionary.unknown[lang]
  if (lang === 'id') {
    return rslt ? (name ? rslt.replace('isian', name) : rslt) : msg
  } else {
    return rslt ? (name ? rslt.replace('input', name) : rslt) : msg
  }
}

export default translate
