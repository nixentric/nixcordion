"use strict";

/// Ambil semua elemen dengan class "accordion-button"
const accordionButtons = document.querySelectorAll('.accordion-button');

// Loop melalui semua elemen dan tambahkan event listener untuk setiap button
accordionButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Cari parent dari button yang diklik yaitu accordion-header
    const accordionHeader = button.parentElement;
    // Cari sibling dari accordion-header yaitu accordion-panel
    const accordionPanel = accordionHeader.nextElementSibling;
    // Toggle class "active" pada accordion-header dan accordion-panel
    accordionHeader.classList.toggle('active');
    accordionPanel.classList.toggle('active');

    // Jika panel yang di klik adalah child pertama, maka jangan tutup parent
    if (accordionPanel.querySelector('.accordion-panel') !== null) {
      event.stopPropagation();
    } else {
      // Ambil semua elemen dengan class "accordion-panel"
      const accordionPanels = document.querySelectorAll('.accordion-panel');

      // Loop melalui semua elemen dan cek apakah memiliki class "active"
      accordionPanels.forEach(panel => {
        if (panel !== accordionPanel && !panel.contains(accordionPanel) && panel.classList.contains('active')) {
          // Cari sibling dari accordion-panel yaitu accordion-header
          const accordionHeader = panel.previousElementSibling;
          // Hapus class "active" pada accordion-header dan accordion-panel
          accordionHeader.classList.remove('active');
          panel.classList.remove('active');
        }
      });
    }
  });
});

// Ambil semua elemen dengan class "close-button"
const closeButtons = document.querySelectorAll('.close-button');

// Loop melalui semua elemen dan tambahkan event listener untuk setiap button
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Cari parent dari button yang diklik yaitu accordion-header
    const accordionHeader = button.parentElement;
    // Cari sibling dari accordion-header yaitu accordion-panel
    const accordionPanel = accordionHeader.nextElementSibling;
    // Hapus class "active" pada accordion-header dan accordion-panel
    accordionHeader.classList.remove('active');
    accordionPanel.classList.remove('active');
  });
});

// Ambil elemen root
const rootElement = document.documentElement;

// Tambahkan event listener ketika dokumen diklik
rootElement.addEventListener('click', (event) => {
  // Cek apakah yang diklik adalah elemen dengan class "accordion-button" atau "close-button"
  if (event.target.matches('.accordion-button') || event.target.matches('.close-button')) {
    return;
  }

  // Cek apakah yang diklik berada di dalam panel
  if (event.target.closest('.accordion-panel')) {
    return;
  }

  // Cek apakah yang diklik berada di dalam tombol untuk membuka akordion
  if (event.target.matches('.open-accordion')) {
    return;
  }

  // Ambil semua elemen dengan class "accordion-panel"
  const accordionPanels = document.querySelectorAll('.accordion-panel');

  // Loop melalui semua elemen dan cek apakah memiliki class "active"
  const activePanels = Array.from(accordionPanels).filter(panel => panel.classList.contains('active'));

  if (activePanels.length === 0) {
    // Tutup semua panel jika tidak ada yang terbuka
    accordionPanels.forEach(panel => {
    // Cari sibling dari accordion-panel yaitu accordion-header
    const accordionHeader = panel.previousElementSibling;
    // Hapus class "active" pada accordion-header dan accordion-panel
    accordionHeader.classList.remove('active');
    panel.classList.remove('active');
    });
    }

  // Tutup semua panel jika tidak ada yang terbuka
  accordionPanels.forEach(panel => {
    // Cari sibling dari accordion-panel yaitu accordion-header
    const accordionHeader = panel.previousElementSibling;
    // Hapus class "active" pada accordion-header dan accordion-panel
    accordionHeader.classList.remove('active');
    panel.classList.remove('active');
  });
});

// Tombol diluar element accordion
const openAccordionButtons = document.querySelectorAll('.open-accordion');
openAccordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Ambil ID panel dari atribut data-target
    const panelId = button.dataset.target;
    // Cari panel dengan ID tersebut
    const panel = document.getElementById(panelId);
    if (panel) {
      // Toggle class "active" pada panel dan header-nya
      panel.classList.toggle('active');
      panel.previousElementSibling.classList.toggle('active');
    }
  });
});
