function fillGhostParade() {
  const container = document.getElementById('ghostParade');
  if (!container) return;
  const ghostWidth = 40; 
  const count = Math.max(1, Math.floor(container.clientWidth / ghostWidth));

  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = '👻';
    container.appendChild(span);
  }
}

fillGhostParade();
window.addEventListener('resize', fillGhostParade);


const mainHeader = document.querySelector('.main-header');

if (mainHeader) {
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes neonPulse {
      from {
        box-shadow: 0 0 6px var(--neon-green), 0 0 12px rgba(57, 255, 20, 0.4);
      }
      to {
        box-shadow: 0 0 18px var(--neon-green), 0 0 36px rgba(57, 255, 20, 0.55);
      }
    }
  `;
  document.head.appendChild(styleSheet);

  
  mainHeader.style.boxShadow = '0 0 8px rgba(57, 255, 20, 0.25)';
  mainHeader.style.transition = 'box-shadow 0.3s ease';

  mainHeader.addEventListener('mouseenter', () => {
    mainHeader.style.animation = 'neonPulse 1s infinite alternate ease-in-out';
  });

  mainHeader.addEventListener('mouseleave', () => {
    mainHeader.style.animation = 'none';
    
    mainHeader.style.boxShadow = '0 0 8px rgba(57, 255, 20, 0.25)';
  });
}

/* Email */

const emailIcon = document.getElementById('openEmailModal');
const emailOverlay = document.getElementById('emailModalOverlay');
const emailModal = document.getElementById('emailModal');
const closeModal = document.getElementById('closeEmailModal');
const emailForm = document.getElementById('emailForm');
const emailStatus = document.getElementById('emailStatus');

function openEmailModal() {
  if (!emailOverlay) return;
  emailOverlay.hidden = false;
  emailOverlay.classList.add('is-open');
  const senderInput = document.getElementById('senderEmail');
  if (senderInput) senderInput.focus();
}

function closeEmailModal() {
  if (!emailOverlay) return;
  emailOverlay.hidden = true;
  emailOverlay.classList.remove('is-open');
  if (emailStatus) {
    emailStatus.hidden = true;
    emailStatus.textContent = '';
  }
}

if (emailIcon && emailOverlay && emailModal && closeModal) {
  emailIcon.addEventListener('click', (e) => {
    e.preventDefault();
    openEmailModal();
  });

  closeModal.addEventListener('click', closeEmailModal);

  emailOverlay.addEventListener('click', (e) => {
    if (e.target === emailOverlay) closeEmailModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && emailOverlay.classList.contains('is-open')) {
      closeEmailModal();
    }
  });
}

if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sender = document.getElementById('senderEmail');
    const message = document.getElementById('emailMessage');
    if (!sender?.value.trim() || !message?.value.trim()) return;

    if (emailStatus) {
      emailStatus.hidden = false;
      emailStatus.textContent = 'Mail sent to support@spookyroots.com!';
    }

    emailForm.reset();
  });
}

/* Shop cards */
const plants = [
  {
    name: "Vampire Vine",
    blurb: "An aggressive, iron-spiked climber that hunts by heat and heartbeat. Requires minimal watering, but even the smallest disturbance can trigger a violent strike. Keep silent, keep your distance, and never mistake stillness for sleep.",
    price: "$24.99",
    id: "plant-066"
  },
  {
    name: "Banshee Bonsai",
    blurb: "Emits a faint, high-pitched wail when thirsty. Keep consistently hydrated—its cries can shatter nearby glass.",
    price: "$45.00",
    id: "plant-103"
  },
  {
    name: "Zombie Succulent",
    blurb: "Impossible to kill. Seriously. We tried. It just keeps coming back from the dead. Keep it fed, keep it contained, and whatever you do, don't leave it unattended for 48 hours.",
    price: "$12.99",
    id: "plant-013"
  },
  {
    name: "Phantom Fern",
    blurb: "Glows faintly in the dark and occasionally vanishes from its pot. Do not disturb the empty container. It will return when it is ready.",
    price: "$19.99",
    id: "plant-069"
  },
  {
    name: "Echoing Orchid",
    blurb: "Repeats the last sound it hears three hours later. If it whispers your name, nobody else is in the room.",
    price: "$29.99",
    id: "plant-112"
  },
  {
    name: "Widow's Weave",
    blurb: "Spins razor-thin metallic threads that shimmer like spiderwebs in the moonlight. Keep your fingers clear — it loves collecting loose ends.",
    price: "$34.99",
    id: "plant-117"
  },
  {
    name: "The Watcher's Bulb",
    blurb: "Its glossy central bud tracks body heat wherever you go. Perfect for a quiet corner — as long as you don't mind being watched.",
    price: "$39.99",
    id: "plant-084"
  },
  {
    name: "Frostbite Ivy",
    blurb: "Covered in everlasting frost, this icy vine chills any room it enters by five degrees. Best kept away from your morning coffee.",
    price: "$22.99",
    id: "plant-404"
  },
  {
    name: "Screaming Mandrake Root",
    blurb: "Screams loud enough to shatter glass when disturbed. Best kept away from curious gardeners.",
    price: "$49.99",
    id: "plant-001",
    soldOut: true
  },
  {
    name: "Corpse-Root Claws",
    blurb: "Grows bony claws that reach for anything hanging nearby. Excellent for dramatic décor, but keep your curtains well out of reach.",
    price: "$39.99",
    id: "plant-777"
  },
  {
    name: "Chime-Choke Orchid",
    blurb: "Its delicate bells sing when the room falls silent. Make a sudden noise, though, and it might fill your home with a rather unforgettable cloud of spores.",
    price: "$32.99",
    id: "plant-202"
  },
  {
    name: "Void Tendril (Lunar)",
    blurb: "Cold white beacons pulse along its coiled arms when anything warm moves nearby. The lights do not attract insects — they attract attention. Keep it away from mirrors and sleeping guests.",
    price: "$34.99",
    id: "plant-903"
  },
  {
    name: "Void Tendril (Violet)",
    blurb: "Soft violet lures that hum after dark, like a distant choir under the floorboards. The sound is harmless. Following it is not. Best displayed in rooms you do not need to enter at night.",
    price: "$36.99",
    id: "plant-904"
  },
  {
    name: "Celestial Nullbell Lantern",
    blurb: "Needs no sunlight and barely any water, but its lanterns go dark when disturbed. Any bugs that wander into its shadows might come back somewhere else.",
    price: "$27.99",
    id: "plant-834"
  },
  {
    name: "Celestial Whisperthorn Seedling",
    blurb: "Its star-covered leaves whisper in familiar voices after dark. Handle with care — you might forget why you came into the room.",
    price: "$24.99",
    id: "plant-888"
  }
];

plants.sort((a, b) => a.name.localeCompare(b.name));

function renderPlantCards() {
  const grid = document.getElementById("plantGrid");
if (!grid) return; // not on the home page

grid.innerHTML = plants.map((plant) => `
  <div class="plant-card${plant.soldOut ? " is-sold-out" : ""}">
    <h3>${plant.name}</h3>
    <p>${plant.blurb}</p>
    <span class="price">${plant.price}</span>
    <div class="card-actions">
      ${
        plant.soldOut
          ? `<button type="button" class="card-btn sold-out-btn" disabled>Sold out</button>`
          : `<button type="button" class="card-btn">Buy</button>`
      }
      <a href="monsters.html#${plant.id}" class="info-link">More info</a>
    </div>
  </div>
`).join("");


// Inside your catalog rendering or event listener for .card-btn:
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('card-btn')) {
    e.preventDefault();

    if (!window.isWaiverApproved) {
      showSystemAlert("Access Denied: Waiver not yet approved. Please complete and sign Section C verification.");
      
      // Auto-scroll user to the signature form
      const sigForm = document.querySelector('.signature-form');
      
      if (sigForm) {
        sigForm.scrollIntoView({ behavior: 'smooth' });
      }
    } 
    
  }
});


}

function setupWaiverSigning() {
  const signBtn = document.getElementById('signBtn');
  if (!signBtn) return;

  const applicantSig = document.getElementById('applicant-sig');
  const sigDate = document.getElementById('sig-date');
  const clearanceNum = document.getElementById('clearance-number');
  const stampSpan = document.querySelector('.stamp-box .stamp-approved');

  // Track global waiver clearance state for Buy buttons
  window.isWaiverApproved = false;

  signBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const sigVal = applicantSig.value.trim();
    const dateVal = sigDate.value.trim();
    const clearVal = clearanceNum.value.trim();

    // Check if any required fields are empty
    if (!sigVal || !dateVal || !clearVal) {
      showSystemAlert("Waiver incomplete: Applicant Signature, Date, and 12-digit Clearing Number are required.");
      

      if (stampSpan) {
        stampSpan.textContent = "[ REJECTED: INCOMPLETE ]";
        stampSpan.style.color = "#ff4d4d";
      }
      window.isWaiverApproved = false;
      return;
    }

    // Optional: Basic length check for the 12-digit code
    if (clearVal.length < 12) {
      alert("Invalid Clearance Number: Code must be at least 12 characters long.");
      return;
    }

    // Successful approval
    window.isWaiverApproved = true;

    if (stampSpan) {
      stampSpan.textContent = "[ APPROVED / SEALED ]";
      stampSpan.style.color = "#00ffcc";
    }

    // Lock input fields to simulate an official sealed document
    applicantSig.disabled = true;
    sigDate.disabled = true;
    clearanceNum.disabled = true;
    signBtn.disabled = true;
    signBtn.textContent = "Waiver Sealed";

    alert("Psychological Clearance verified and Waiver officially signed.");
  });
  
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderPlantCards();
    setupWaiverSigning();
  });
} else {
  renderPlantCards();
  setupWaiverSigning();
}

document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    // Show button when user scrolls down 300px
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    // Smooth scroll back to top on click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const authBtn = document.getElementById('authCompendiumBtn');
  const authOutput = document.getElementById('authTerminalOutput');

  if (authBtn && authOutput) {
    authBtn.addEventListener('click', () => {
      // Disable button while "scanning"
      authBtn.disabled = true;
      authOutput.style.color = '#7df9ff';
      authOutput.textContent = 'SCANNING BIOMETRIC SIGNATURE...';

      // Step 1: Scan delay
      setTimeout(() => {
        authOutput.textContent = 'VERIFYING DEFENSE DEPT LEVEL 5 CLEARANCE...';
      }, 1000);

      // Step 2: Access Denied failure message
      setTimeout(() => {
        authOutput.style.color = '#ff4d4d';
        authOutput.textContent = '❌ ACCESS DENIED: Clearance Level insufficient.';
        
        // Glitch shake effect on the box
        authBtn.classList.add('btn-glitch');
        
        // Reset button after 3 seconds so they can try again
        setTimeout(() => {
          authBtn.disabled = false;
          authBtn.classList.remove('btn-glitch');
        }, 3000);
      }, 2200);
    });
  }
});

// SEARCH CARD
const sortSelect = document.getElementById('sortSelect');

if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === 'name-asc') {
      plants.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'name-desc') {
      plants.sort((a, b) => b.name.localeCompare(a.name));
    } else if (value === 'price-asc') {
      plants.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (value === 'price-desc') {
      plants.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    renderPlantCards();
  });
}

// SEARCH MONSTER DETAIL CARD

function sortDetailCardsAlphabetically(ascending = true) {
  const container = document.querySelector('main.main-content');
  if (!container) return;

  const cards = Array.from(
    container.querySelectorAll('.monster-detail-card')
  ).filter((card) => {
    if (!card.querySelector('.monster-info h2')) return false;
    if (card.classList.contains('restricted-specimen')) return false;
    return true;
  });

  if (!cards.length) return;

  const anchor = cards[cards.length - 1].nextSibling;

  cards.sort((cardA, cardB) => {
    const titleA = cardA.querySelector('.monster-info h2').textContent.trim();
    const titleB = cardB.querySelector('.monster-info h2').textContent.trim();

    return ascending
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  cards.forEach((card) => container.insertBefore(card, anchor));
}


const monsterSort = document.getElementById('monsterSortSelect');
if (monsterSort) {
  monsterSort.addEventListener('change', (e) => {
    const v = e.target.value;
    if (v === 'name-asc') sortDetailCardsAlphabetically(true);
    if (v === 'name-desc') sortDetailCardsAlphabetically(false);
  });

  if (monsterSort.value === 'name-asc') {
    sortDetailCardsAlphabetically(true);
  }
}

// WIN95 ALERT

function showSystemAlert(message) {
  let overlay = document.getElementById('systemAlertOverlay');
  
  // If the alert modal doesn't exist in the HTML yet, create it dynamically
  if (!overlay) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div id="systemAlertOverlay" class="win95-overlay">
        <div class="win95-modal" role="dialog" aria-modal="true">
          <div class="win95-header">
            <span class="win95-title">⚠️ SPOOKY ROOTS SYSTEM NOTICE</span>
            <button type="button" class="win95-close-btn" id="closeSystemAlert">X</button>
          </div>
          <div class="win95-body">
            <p id="systemAlertMessage" style="margin: 0 0 12px 0; color: #000; font-family: monospace; font-size: 0.95rem; line-height: 1.4;"></p>
            <button type="button" class="win95-send-btn" id="systemAlertOkBtn">OK</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
    overlay = document.getElementById('systemAlertOverlay');

    const closeAlert = () => {
      overlay.hidden = true;
      overlay.classList.remove('is-open');
    };

    document.getElementById('closeSystemAlert').addEventListener('click', closeAlert);
    document.getElementById('systemAlertOkBtn').addEventListener('click', closeAlert);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAlert();
    });
  }

  // Set the message and open the modal
  document.getElementById('systemAlertMessage').textContent = message;
  overlay.hidden = false;
  overlay.classList.add('is-open');
}