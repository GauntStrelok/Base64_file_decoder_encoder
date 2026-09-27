const form = document.getElementById('text-form')
const input = document.getElementById('base64-input')
const saveButton = document.getElementById('save-file')
const status = document.getElementById('conversion-status')

input.addEventListener('input', () => {
  saveButton.disabled = !input.value.trim()
  status.textContent = ''
})

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (saveButton.disabled) return
  saveButton.disabled = true
  input.disabled = true
  status.textContent = 'Preparing file...'

  try {
    const result = await window.fileConverter.saveDecodedFile(input.value)
    if (result.status === 'saved') status.textContent = 'File saved successfully.'
    else if (result.status === 'canceled') status.textContent = 'Save canceled.'
    else status.textContent = result.message
  } catch {
    status.textContent = 'Could not save the file. Please try again.'
  } finally {
    input.disabled = false
    saveButton.disabled = !input.value.trim()
  }
})
