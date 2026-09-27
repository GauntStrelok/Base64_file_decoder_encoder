const fileForm = document.getElementById('file-form')
const fileInput = document.getElementById('file-input')
const convertButton = document.getElementById('convert')
const status = document.getElementById('conversion-status')
const result = document.getElementById('conversion-result')
const output = document.getElementById('base64-output')
const copyButton = document.getElementById('copy-text')

async function copyText() {
  if (!output.value || copyButton.disabled) return
  copyButton.disabled = true
  convertButton.disabled = true
  fileInput.disabled = true
  status.textContent = 'Copying to clipboard...'

  try {
    await navigator.clipboard.writeText(output.value)
    status.textContent = 'Text copied to clipboard.'
  } catch {
    status.textContent = 'Copying failed. Try Copy text again or copy the text from the box below.'
  } finally {
    copyButton.disabled = false
    convertButton.disabled = false
    fileInput.disabled = false
  }
}

copyButton.addEventListener('click', copyText)

fileInput.addEventListener('change', () => {
  const hasFile = fileInput.files.length > 0
  convertButton.hidden = !hasFile
  convertButton.disabled = !hasFile
  result.hidden = true
  output.value = ''
  status.textContent = ''
})

fileForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const file = fileInput.files[0]
  if (!file || convertButton.disabled) return

  const reader = new FileReader()
  convertButton.disabled = true
  fileInput.disabled = true
  result.hidden = true
  output.value = ''
  status.textContent = 'Converting…'

  reader.addEventListener('load', async () => {
    const base64 = reader.result.slice(reader.result.indexOf(',') + 1)
    output.value = `Filename: ${JSON.stringify(file.name)}\n${base64}`
    result.hidden = false
    await copyText()
  })

  reader.addEventListener('error', () => {
    status.textContent = 'Could not read this file. Please try again.'
    convertButton.disabled = false
    fileInput.disabled = false
  })

  reader.readAsDataURL(file)
})
