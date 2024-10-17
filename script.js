//Show loader once
loader.classList.remove("hidden");
setTimeout(() => {
  loader.classList.add("hidden");
}, 1300);
window.scrollTo(0, 0);

const loader = document.querySelector(".loader");
const loader0 = document.querySelector(".loader0");
const navs = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");
const prices = document.querySelectorAll(".priceList");
const price = document.querySelector(".price");
const specialOffer = document.querySelector(".tabbedOpen");
const specialOfferContainer = document.querySelector(".tabbedContainer");
const textarea = document.querySelector(".customMessage textarea");
const aboutUs = document.querySelector(".AboutUs");
const aboutYou = document.querySelector(".AboutYou");

// Remove Prices for About Us and About You on site call
const removePrices = () => {
  if (
    !aboutUs.classList.contains("hidden") ||
    !aboutYou.classList.contains("hidden")
  ) {
    price.classList.add("hidden");
    specialOffer.classList.add("hidden");
  }
};
// Show Page
const showPage = (page) => {
  removePrices();
  const pages = document.querySelectorAll(".page");
  pages.forEach((p) => {
    p.dataset.page === page
      ? p.classList.remove("hidden")
      : p.classList.add("hidden");
    // PriceList config.
    prices.forEach((pL) => {
      if (pL.dataset.page === page) {
        price.classList.remove("hidden");
        specialOffer.classList.remove("hidden");
        pL.classList.remove("hidden");
      } else {
        pL.classList.add("hidden");
      }
    });
  });
};

// Form Submit
const submitted = () => {
  noSubmit.innerHTML = "";
  totalCosts.textContent = 0;
  loader0.classList.remove("hidden");
  setTimeout(() => {
    form.reset();
    loader0.classList.add("hidden");
    aboutYou.classList.add("hidden");
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1300);
    aboutUs.classList.remove("hidden");
    window.scrollTo(0, 0);
    // window.location.href = "AboutUs.html";
  }, 7000);
};

// Reload last opened page
document.addEventListener("DOMContentLoaded", () => {
  const currentHash = window.location.hash.slice(1); // remove "#" from Hash

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  currentHash ? showPage(currentHash) : showPage("AboutUs");
});
// Check Hash in case the user changes it or goes backwards
window.addEventListener("hashchange", () => {
  const currentHash = window.location.hash.slice(1);
  showPage(currentHash); // show page based on hash
});

// Page Navigation
navs.forEach((nav) => {
  nav.addEventListener("click", () => {
    // Remove Prices for About Us and About You
    removePrices();
    // connect targetPage with nav for About US and YOU
    const targetPage = nav.dataset.target;
    // Change Hash in URL
    window.location.hash = targetPage;
    showPage(targetPage);
    window.scrollTo(0, 0);
  });
});

// Open Reading
document.querySelector(".rpBtn").addEventListener("mouseover", (e) => {
  document.querySelectorAll(".info div").forEach((d) => {
    d.classList.add("info-active");
    d.style.opacity = "1";
    d.style.cursor = "pointer";
    document.querySelector(".moonR").style.opacity = "0";
  });
});
document.querySelector(".info").addEventListener("mouseleave", (e) => {
  document.querySelectorAll(".info div").forEach((d) => {
    d.classList.remove("info-active");
    d.style.opacity = "0";
    d.style.cursor = "auto";
    document.querySelector(".moonR").style.opacity = "1";
  });
});

// Reveal Elements on Scroll
const allSections = document.querySelectorAll(".section");
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Slider for Feedbacks - 1.Page-About Us
const slider = () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  const openFeedbacks = document.querySelector(".feedbacks");

  let curSlide = 0;
  const maxSlide = slides.length;

  // smooth scroll to slider
  openFeedbacks.addEventListener("click", () => {
    slider.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector(".infoBox").addEventListener("click", () => {
    document
      .querySelector(".information")
      .scrollIntoView({ behavior: "smooth" });
  });

  // Functions
  const createDots = () => {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Page 2 - About You Formular
const form = document.querySelector(".astroForm");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const noSubmit = document.querySelector(".noSubmit");
const totalCosts = document.getElementById("totalCost");
textarea.addEventListener("focus", () => {
  textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
});

// RegEx for name, birth place, message
const isValidName = (name) => {
  const namePattern = /^[a-zA-Z]{2,}$/;
  return namePattern.test(name);
};
const isValidBirthPlace = (birthPlace) => {
  const birthPlacePattern =
    /^[a-zA-Z\u00C0-\u017F]+\s*,\s*[a-zA-Z\u00C0-\u017F]+$/;
  return birthPlacePattern.test(birthPlace);
};
const isValidMessage = (message) => {
  const wordCount = message.trim().split(/\s+/).length;
  return wordCount >= 3;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {
    geschlecht: form.Geschlecht.value,
    name: form.Name.value,
    email: form.email.value,
    birthDate: form.birthDate.value,
    birthTime: form.birthTime.value,
    birthPlace: form.landAndCity.value,
    status: form.status.value,
    beruf: form.ber.value,
    message: form.message.value,

    partnerDate: form.partnerDate.value,
    partnerTime: form.partnerTime.value,
    partnerLocation: form.partnerLocation.value,

    readings: [],
  };
  const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');
  checkedBoxes.forEach((checkbox) => {
    formData.readings.push(checkbox.value);
  });
  // console.log(formData.geschlecht);
  if (formData.readings.length === 0)
    noSubmit.innerHTML = "Could not send. Search at least one reading.";
  else if (
    formData.readings.includes("Horary") &&
    (formData.message === " " || formData.message === "")
  )
    noSubmit.innerHTML =
      "Could not send. Write your horary question to the messega field.";
  else if (
    formData.readings.includes("Horary") &&
    !isValidMessage(formData.message)
  )
    noSubmit.innerHTML =
      "Could not send. Message field should have at least 3 words.";
  else if (formData.geschlecht === "")
    noSubmit.innerHTML = "Could not send. Gender required.";
  else if (!isValidName(formData.name))
    noSubmit.innerHTML =
      "Could not send. Name should have at least 2 letters and no numbers.";
  else if (!isValidBirthPlace(formData.birthPlace))
    noSubmit.innerHTML =
      "Could not send. Wrong format for birth place. Expected city & country e.g. Berlin, Germany";
  else if (
    (formData.readings.includes("Synastry") ||
      formData.readings.includes("Composite") ||
      formData.readings.includes("Gesamte Beziehungsanalyse")) &&
    !isValidBirthPlace(formData.partnerLocation)
  ) {
    noSubmit.innerHTML =
      "Could not send. Wrong format for partner birth place. Expected city & country e.g. Berlin, Germany";
  } else {
    if (
      formData.readings.includes("Synastry") ||
      formData.readings.includes("Composite") ||
      formData.readings.includes("Gesamte Beziehungsanalyse")
    ) {
      const clientInfo = `Mein Name ist ${formData.name} (${formData.geschlecht}). 
  Ich bin am ${formData.birthDate} in ${formData.birthPlace} um ${formData.birthTime} Uhre geboren.
Ich möchte folgende Analyse/n: ${formData.readings}. Mein Beruf ist: ${formData.beruf} und ich bin ${formData.status}. 
Meine Nachricht ist: ${formData.message}. 
Mein/e Partner/in ist am ${formData.partnerDate} um ${formData.partnerTime} Uhr in ${formData.partnerLocation} geboren.
+ Meine Email ist:${formData.email}. Costs: ${totalCosts.textContent} €.
`;
      console.log(clientInfo);
      submitted();
    } else {
      const clientInfo = `Mein Name ist ${formData.name} (${formData.geschlecht}). 
  Ich bin am ${formData.birthDate} in ${formData.birthPlace} um ${formData.birthTime} Uhre geboren.
Ich möchte folgende Analyse/n: ${formData.readings}. Mein Beruf ist: ${formData.beruf} und ich bin ${formData.status}. 
Meine Nachricht ist: ${formData.message} + Meine Email ist:${formData.email}. Costs: ${totalCosts.textContent} €.
`;
      console.log(clientInfo);
      submitted();
    }
  }
});

// CalcPrice
const calculateTotal = () => {
  let total = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      total += parseFloat(checkbox.dataset.price);
    }
  });
  totalCosts.textContent = total.toFixed(2);
};
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", calculateTotal);
});
calculateTotal();

const togglePartnerInfo = () => {
  const compositeCheckbox = document.getElementById("com");
  const synastryCheckbox = document.getElementById("syn");
  const totalAnalysisCheckbox = document.getElementById("gB");
  const partnerInfoFields = document.querySelectorAll(".inp");
  const isChecked =
    compositeCheckbox.checked ||
    synastryCheckbox.checked ||
    totalAnalysisCheckbox.checked;
  partnerInfoFields.forEach((field) => {
    field.disabled = !isChecked;
  });
};
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", togglePartnerInfo);
});
togglePartnerInfo();

///////////////////////////////////////////////

// Reading Pages
// Tabbed component - Page BirthChart and SpecialOffer
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Tabbed component BirthChart Allg.
document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  // Activate tab
  clicked.classList.add("operations__tab--active");
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Tabbed Component Special Offer
const tabs0 = document.querySelectorAll(".operation__tab");
const tabsContainer0 = document.querySelector(".operation__tab-container");
const tabsContent0 = document.querySelectorAll(".operation__content");
const close = document.querySelector(".close");

// Open SpecialOffer + smooth scroll
specialOffer.addEventListener("click", () => {
  specialOfferContainer.classList.toggle("hidden");
  close.classList.toggle("hidden");
  if (!specialOfferContainer.classList.contains("hidden"))
    specialOfferContainer.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  // Get the bounding rectangle of the container
  const rect = specialOfferContainer.getBoundingClientRect();

  // Check if the container is out of the viewport
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    specialOfferContainer.classList.add("hidden"); // Add the 'hidden' class
    close.classList.add("hidden");
  }
});

document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operation__tab");
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs0.forEach((t) => t.classList.remove("operation__tab--active"));
  tabsContent0.forEach((c) => c.classList.remove("operation__content--active"));
  // Activate tab
  clicked.classList.add("operation__tab--active");
  // Activate content area
  document
    .querySelector(`.operation__content--${clicked.dataset.tab}`)
    .classList.add("operation__content--active");
});
