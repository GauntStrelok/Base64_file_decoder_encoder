(() => {
  const root = document.documentElement
  let theme = 'light'
  try {
    if (localStorage.getItem('theme') === 'dark') theme = 'dark'
  } catch {
    // The toggle still works when storage is unavailable.
  }
  root.dataset.theme = theme

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle')
    const updateLabel = () => {
      toggle.textContent = root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    }
    updateLabel()
    toggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
      updateLabel()
      try {
        localStorage.setItem('theme', root.dataset.theme)
      } catch {
        // Keep the current page usable without persistent storage.
      }
    })
  })
})()
