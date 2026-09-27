function decodeBase64(text) {
  if (typeof text !== 'string') throw new Error('Invalid Base64')
  const value = text.trim().replace(/^data:[^,]*;base64,/i, '').replace(/\s/g, '')
  if (!value || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) {
    throw new Error('Invalid Base64')
  }
  const unpadded = value.replace(/=+$/, '')
  if (unpadded.length % 4 === 1 || (value.includes('=') && value.length % 4 !== 0)) {
    throw new Error('Invalid Base64')
  }
  const bytes = Buffer.from(value, 'base64')
  if (bytes.toString('base64').replace(/=+$/, '') !== unpadded) {
    throw new Error('Invalid Base64')
  }
  return bytes
}

function decodeFileText(text) {
  if (typeof text !== 'string') throw new Error('Invalid file text')
  if (!text.startsWith('Filename: ')) {
    return { bytes: decodeBase64(text) }
  }

  const newline = text.indexOf('\n')
  if (newline === -1) throw new Error('Missing file content')
  const name = JSON.parse(text.slice('Filename: '.length, newline).trim())
  if (typeof name !== 'string' || !name.trim()) throw new Error('Invalid filename')
  // Treat the header as a filename, never as a directory or absolute path.
  const filename = name.split(/[\\/]/).pop().replace(/[<>:"|?*\x00-\x1f]/g, '_').replace(/[. ]+$/, '')
  const content = text.slice(newline + 1)
  return {
    filename: filename || 'decoded-file.bin',
    bytes: content.trim() ? decodeBase64(content) : Buffer.alloc(0)
  }
}

module.exports = { decodeBase64, decodeFileText }
