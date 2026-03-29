const CONTENT = {
  nickname: "Jaana",
  myDob: "20/07/2002",
  herDob: "06/08/2002",
  imageBasePath: "images/"
};

const PHOTO_LIBRARY = [
  {
    url: `${CONTENT.imageBasePath}IMG-20230912-WA0026.jpg`,
    caption: "The smile that turns every ordinary day into something special."
  },
  {
    url: `${CONTENT.imageBasePath}IMG-20240219-WA0029.jpg`,
    caption: "A tiny moment with you that still feels like magic."
  },
  {
    url: `${CONTENT.imageBasePath}IMG-20240219-WA0030.jpg`,
    caption: "The kind of memory my heart never gets tired of replaying."
  },
  {
    url: `${CONTENT.imageBasePath}IMG-20260327-WA0015.jpg`,
    caption: "Us, glowing softly in our own little universe."
  },
  {
    url: `${CONTENT.imageBasePath}IMG20230129205236.jpg`,
    caption: "One look from you, and the whole world feels lighter."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20230517_210602.jpg`,
    caption: "Proof that love can feel warm, gentle, and unforgettable."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20230517_210605.jpg`,
    caption: "A memory wrapped in softness, laughter, and a little bit of forever."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20230517_210614.jpg`,
    caption: "Every frame with you feels like a chapter worth keeping."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20230916_215240.jpg`,
    caption: "The kind of love that makes ordinary moments shine."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20230916_215351.jpg`,
    caption: "Just us, making the world feel kinder somehow."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20230916_224205.jpg`,
    caption: "A little snapshot of the comfort I always find in you."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20231003_153657.jpg`,
    caption: "A beautiful pause in time that still feels close to my heart."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20231003_153702.jpg`,
    caption: "You make even the quietest moments feel unforgettable."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20231003_153705.jpg`,
    caption: "Love looks a lot like this: simple, warm, and us."
  },
  {
    url: `${CONTENT.imageBasePath}IMG_20231003_164800.jpg`,
    caption: "Another memory I would choose again in every lifetime."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-1005215625.jpg`,
    caption: "A sweet little glimpse of the happiness you bring me."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-1159747189.jpg`,
    caption: "Even one second with you can stay with me for years."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-1190964848.jpg`,
    caption: "You turn tiny moments into the most precious memories."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-1341028699.jpg`,
    caption: "Wherever you are, that place instantly feels softer."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-1549967649.jpg`,
    caption: "My favorite kind of memory is the one that has you in it."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-1818672628.jpg`,
    caption: "Still one of those moments that makes my heart quietly smile."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-2044343581.jpg`,
    caption: "A love story can live beautifully inside one single photo."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-2100438492.jpg`,
    caption: "One more reason I keep falling for you in the smallest ways."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-337810661.jpg`,
    caption: "Some memories do not fade, because they were made with you."
  },
  {
    url: `${CONTENT.imageBasePath}Snapchat-55864453.jpg`,
    caption: "A gentle reminder that my favorite place is always with you."
  }
];

const PROFILE_PHOTO = `${CONTENT.imageBasePath}IMG20230129205236.jpg`;

const QUIZ_QUESTIONS = [
  {
    id: "dateNight",
    prompt: "Idea of a perfect date night?",
    options: [
      {
        label: "A candlelit dinner with soft music",
        value: "a candlelit dinner with soft music"
      },
      {
        label: "A cozy movie night wrapped in blankets",
        value: "a cozy movie night wrapped in blankets"
      },
      {
        label: "A late-night drive under the stars",
        value: "a late-night drive under the stars"
      }
    ]
  },
  {
    id: "loveLanguage",
    prompt: "Primary love language?",
    options: [
      {
        label: "Little thoughtful surprises",
        value: "little thoughtful surprises"
      },
      {
        label: "Long heartfelt conversations",
        value: "long heartfelt conversations"
      },
      {
        label: "Warm hugs and constant cuddles",
        value: "warm hugs and constant cuddles"
      }
    ]
  },
  {
    id: "mostLoved",
    prompt: "When do you feel most loved?",
    options: [
      {
        label: "When we spend quiet time together",
        value: "when we spend quiet time together"
      },
      {
        label: "When I listen to every little thing you say",
        value: "when I listen to every little thing you say"
      },
      {
        label: "When I remind you how special you are",
        value: "when I remind you how special you are"
      }
    ]
  }
];

const state = {
  step: 0,
  answers: {},
  visibleGalleryIndexes: [],
  galleryTimer: null,
  isSecretOpen: false,
  activeMemoryIndex: null
};

const app = document.getElementById("app");
const heartsBackground = document.getElementById("hearts-background");
const heartsForeground = document.getElementById("hearts-foreground");

document.addEventListener("DOMContentLoaded", () => {
  seedFloatingHearts();
  prepareGallery();
  renderStep();
});

document.addEventListener("click", (event) => {
  if (state.activeMemoryIndex !== null) {
    if (event.target.closest("[data-action='close-memory']")) {
      state.activeMemoryIndex = null;
      renderStep({ animate: false });
      return;
    }

    if (event.target.closest("[data-memory-card]")) {
      return;
    }

    if (event.target.closest(".memory-lightbox")) {
      state.activeMemoryIndex = null;
      renderStep({ animate: false });
      return;
    }
  }

  const trigger = event.target.closest("[data-action]");

  if (!trigger) {
    return;
  }

  const { action } = trigger.dataset;

  if (action === "goto-step") {
    const nextStep = Number(trigger.dataset.step);
    transitionToStep(nextStep);
    return;
  }

  if (action === "select-answer") {
    state.answers[trigger.dataset.question] = trigger.dataset.answer;
    renderStep({ animate: false });
    return;
  }

  if (action === "open-letter") {
    state.isSecretOpen = true;
    renderStep();
    return;
  }

  if (action === "restart") {
    restartJourney();
    return;
  }

  if (action === "open-memory") {
    state.activeMemoryIndex = Number(trigger.dataset.photoIndex);
    renderStep({ animate: false });
    return;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.activeMemoryIndex !== null) {
    state.activeMemoryIndex = null;
    renderStep({ animate: false });
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopGalleryRotation();
    return;
  }

  if (state.step === 1) {
    startGalleryRotation();
  }
});

window.addEventListener("beforeunload", stopGalleryRotation);

function renderStep({ animate = true } = {}) {
  app.innerHTML = getStepTemplate();

  const panel = app.querySelector(".step-panel");

  if (panel) {
    if (!animate) {
      panel.classList.add("instant", "is-visible");
    } else {
      requestAnimationFrame(() => {
        panel.classList.add("is-visible");
      });
    }
  }

  initializeInteractiveElements();
}

function transitionToStep(nextStep) {
  if (Number.isNaN(nextStep) || nextStep === state.step) {
    return;
  }

  stopGalleryRotation();

  const currentPanel = app.querySelector(".step-panel");

  const finishTransition = () => {
    state.step = nextStep;

    if (state.step === 1 && state.visibleGalleryIndexes.length !== 4) {
      prepareGallery();
    }

    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!currentPanel) {
    finishTransition();
    return;
  }

  currentPanel.classList.remove("is-visible");
  currentPanel.classList.add("is-leaving");
  window.setTimeout(finishTransition, 240);
}

function initializeInteractiveElements() {
  renderIcons();
  wireImageFallbacks();

  if (state.step === 1) {
    startGalleryRotation();
  } else {
    stopGalleryRotation();
  }
}

function renderIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function getStepTemplate() {
  switch (state.step) {
    case 0:
      return renderIntroStep();
    case 1:
      return renderGalleryStep();
    case 2:
      return renderQuizStep();
    case 3:
      return renderSecretStep();
    case 4:
      return renderPromiseStep();
    default:
      return renderIntroStep();
  }
}

function renderIntroStep() {
  return `
    <section class="step-panel grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div class="space-y-5">
        <div class="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-500">
          <i data-lucide="sparkles" class="h-4 w-4"></i>
          Step 1 of 5
        </div>

        <div class="floating-bounce inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 to-pink-100 text-rose-500 shadow-[0_18px_38px_rgba(251,113,133,0.22)]">
          <i data-lucide="heart" class="h-12 w-12 fill-current"></i>
        </div>

        <div class="space-y-4">
          <h2 class="font-romantic text-5xl leading-none text-rose-700 sm:text-6xl">Hi ${CONTENT.nickname}...</h2>
          <p class="max-w-2xl text-base leading-8 text-rose-800/80 sm:text-lg">
            2002 is a special year because it is the year we were both born. Somehow, two hearts started in the
            same year and still found their way into the same little story. This is our soft, silly, beautiful world.
          </p>
        </div>

        <button
          type="button"
          data-action="goto-step"
          data-step="1"
          class="journey-btn main-journey-button inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_30px_rgba(244,63,94,0.22)]"
        >
          <span>Enter Our World</span>
          <i data-lucide="star" class="h-4 w-4"></i>
        </button>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article class="rounded-[1.7rem] border border-white/80 bg-white/75 p-6 shadow-lg shadow-rose-100/70 backdrop-blur">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-rose-400">My Birthday</p>
          <h3 class="mt-3 font-romantic text-4xl text-rose-700">20 July 2002</h3>
          <p class="mt-3 text-sm leading-7 text-rose-900/70">
            A day that quietly started one half of this 2002 love story.
          </p>
          <div class="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm text-rose-500">
            <i data-lucide="calendar-days" class="h-4 w-4"></i>
            <span>${CONTENT.myDob}</span>
          </div>
        </article>

        <article class="rounded-[1.7rem] border border-white/80 bg-white/75 p-6 shadow-lg shadow-rose-100/70 backdrop-blur">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-rose-400">Jaana's Birthday</p>
          <h3 class="mt-3 font-romantic text-4xl text-rose-700">06 August 2002</h3>
          <p class="mt-3 text-sm leading-7 text-rose-900/70">
            The day the universe decided it needed your smile in it.
          </p>
          <div class="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm text-rose-500">
            <i data-lucide="gift" class="h-4 w-4"></i>
            <span>${CONTENT.herDob}</span>
          </div>
        </article>

        <article class="sm:col-span-2 rounded-[1.7rem] border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-pink-50 p-6 shadow-lg shadow-rose-100/60">
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-500">
              <i data-lucide="quote" class="h-5 w-5"></i>
            </span>
            <p class="max-w-2xl text-base leading-7 text-rose-900/75">
              If 2002 gave us anything truly perfect, it was the chance that one day our hearts would meet.
            </p>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderGalleryStep() {
  if (state.visibleGalleryIndexes.length !== 4) {
    prepareGallery();
  }

  const galleryItems = state.visibleGalleryIndexes.map((photoIndex, slotIndex) => {
    const photo = PHOTO_LIBRARY[photoIndex];

    return `
      <figure
        class="gallery-card group border border-white/80"
        data-slot="${slotIndex}"
      >
        <button
          type="button"
          class="gallery-open-button"
          data-action="open-memory"
          data-photo-index="${photoIndex}"
          aria-label="Open this memory"
        ></button>
        <img
          src="${photo.url}"
          alt="${photo.caption}"
          class="gallery-image h-44 sm:h-56"
          data-photo-index="${photoIndex}"
          data-fallback-label="${photo.caption}"
          data-fallback-subtext="Add your real photo inside journey-of-love/images/"
          loading="lazy"
        >
        <figcaption class="gallery-caption">
          <span class="inline-flex max-w-full rounded-full border border-white/60 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            ${photo.caption}
          </span>
        </figcaption>
      </figure>
    `;
  }).join("");

  return `
    <section class="step-panel grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
      <div class="space-y-5">
        <div class="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-500">
          <i data-lucide="camera" class="h-4 w-4"></i>
          Step 2 of 5
        </div>

        <div class="space-y-4">
          <h2 class="font-romantic text-4xl text-rose-700 sm:text-5xl">Our favorite frames</h2>
          <p class="max-w-xl text-base leading-8 text-rose-900/75">
            These are not just photographs, my love, they are tiny pieces of us. Every few moments, one memory drifts
            away and another returns, like love softly turning its pages just to remind me how beautiful you are.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
            <p class="text-xs uppercase tracking-[0.24em] text-rose-400">A Little Poem</p>
            <p class="mt-2 text-sm leading-7 text-rose-900/70">
              In every picture, I find a reason to fall for you all over again.
            </p>
          </div>
          <div class="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
            <p class="text-xs uppercase tracking-[0.24em] text-rose-400">For You</p>
            <p class="mt-2 text-sm leading-7 text-rose-900/70">
              No matter which memory appears next, it always leads me back to your smile.
            </p>
          </div>
        </div>

        <button
          type="button"
          data-action="goto-step"
          data-step="2"
          class="journey-btn main-journey-button inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_30px_rgba(244,63,94,0.22)]"
        >
          <span>Next Chapter</span>
          <i data-lucide="sparkles" class="h-4 w-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        ${galleryItems}
      </div>

      ${renderMemoryLightbox()}
    </section>
  `;
}

function renderMemoryLightbox() {
  if (state.activeMemoryIndex === null) {
    return "";
  }

  const photo = PHOTO_LIBRARY[state.activeMemoryIndex];

  if (!photo) {
    return "";
  }

  return `
    <div class="memory-lightbox" data-action="close-memory" role="dialog" aria-modal="true" aria-label="Memory preview">
      <div class="memory-lightbox-card" data-memory-card="true">
        <button
          type="button"
          data-action="close-memory"
          class="memory-lightbox-close journey-btn inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-lg"
          aria-label="Close memory preview"
        >
          <i data-lucide="x" class="h-5 w-5"></i>
        </button>

        <img
          src="${photo.url}"
          alt="${photo.caption}"
          class="memory-lightbox-image"
          data-fallback-label="${photo.caption}"
          data-fallback-subtext="Add your real photo inside journey-of-love/images/"
        >

        <div class="space-y-3 p-5 sm:p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.26em] text-rose-400">Our Memory</p>
          <p class="font-romantic text-3xl text-rose-700 sm:text-4xl">A moment I never want to forget</p>
          <p class="text-sm leading-7 text-rose-900/75 sm:text-base">
            ${photo.caption}
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderQuizStep() {
  const answeredCount = QUIZ_QUESTIONS.filter((question) => state.answers[question.id]).length;
  const hearts = QUIZ_QUESTIONS.map((question) => {
    const activeClass = state.answers[question.id] ? "active" : "";

    return `
      <div class="rounded-full border border-white/80 bg-white/80 p-3 shadow-sm">
        <i data-lucide="heart" class="tracker-heart ${activeClass} h-7 w-7 sm:h-8 sm:w-8"></i>
      </div>
    `;
  }).join("");

  const questionsMarkup = QUIZ_QUESTIONS.map((question, questionIndex) => {
    const selectedAnswer = state.answers[question.id];

    const optionsMarkup = question.options.map((option) => {
      const isSelected = selectedAnswer === option.value;

      return `
        <button
          type="button"
          data-action="select-answer"
          data-question="${question.id}"
          data-answer="${option.value}"
          class="quiz-option ${isSelected ? "is-selected" : ""} flex w-full items-center justify-between gap-4 rounded-[1.4rem] border px-4 py-4 text-left ${isSelected ? "border-rose-300 text-rose-900" : "border-rose-100 bg-white/85 text-rose-900/80"}"
          aria-pressed="${isSelected}"
        >
          <span class="text-sm font-medium leading-7 sm:text-base">${option.label}</span>
          <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-300"}">
            <i data-lucide="${isSelected ? "check" : "heart"}" class="h-4 w-4"></i>
          </span>
        </button>
      `;
    }).join("");

    return `
      <article class="rounded-[1.7rem] border border-white/80 bg-white/75 p-5 shadow-lg shadow-rose-100/50">
        <div class="mb-4 flex items-center gap-3">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-500">
            0${questionIndex + 1}
          </span>
          <h3 class="text-lg font-semibold text-rose-900">${question.prompt}</h3>
        </div>
        <div class="grid gap-3">
          ${optionsMarkup}
        </div>
      </article>
    `;
  }).join("");

  return `
    <section class="step-panel space-y-8">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-500">
        <i data-lucide="sparkles" class="h-4 w-4"></i>
            Step 3 of 5
          </div>
          <div>
            <h2 class="font-romantic text-4xl text-rose-700 sm:text-5xl">A tiny quiz about your heart</h2>
            <p class="mt-3 max-w-3xl text-base leading-8 text-rose-900/75">
              Pick the answers that feel most like you. Each answer fills one more heart, and only then can your love
              be officially locked in.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          ${hearts}
        </div>
      </div>

      <div class="grid gap-5 xl:grid-cols-3">
        ${questionsMarkup}
      </div>

      <div class="flex flex-col gap-3 rounded-[1.7rem] border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-pink-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-rose-400">Hearts filled</p>
          <p class="mt-1 text-base text-rose-900/75">${answeredCount} / ${QUIZ_QUESTIONS.length} answers chosen</p>
        </div>

        <button
          type="button"
          data-action="goto-step"
          data-step="3"
          class="journey-btn main-journey-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold ${answeredCount === QUIZ_QUESTIONS.length ? "bg-rose-500 text-white shadow-[0_18px_30px_rgba(244,63,94,0.22)]" : "border border-rose-200 bg-white text-rose-300"}"
          ${answeredCount === QUIZ_QUESTIONS.length ? "" : "disabled"}
        >
          <span>Lock in My Love</span>
          <i data-lucide="heart" class="h-4 w-4 ${answeredCount === QUIZ_QUESTIONS.length ? "fill-current" : ""}"></i>
        </button>
      </div>
    </section>
  `;
}

function renderSecretStep() {
  return `
    <section class="step-panel mx-auto max-w-3xl text-center">
      <div class="space-y-6 rounded-[2rem] border border-white/80 bg-gradient-to-b from-white/90 to-rose-50/90 px-6 py-8 shadow-[0_24px_52px_rgba(225,29,72,0.12)] sm:px-10 sm:py-10">
        <div class="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-500">
          <i data-lucide="mail" class="h-4 w-4"></i>
          Step 4 of 5
        </div>

        <div class="space-y-4">
          <h2 class="font-romantic text-4xl text-rose-700 sm:text-5xl">The secret message</h2>
          <p class="mx-auto max-w-2xl text-base leading-8 text-rose-900/75">
            There is one letter here that only opens when you are ready to see what my heart has been holding onto.
          </p>
        </div>

        ${state.isSecretOpen ? renderOpenedLetter() : renderClosedLetter()}
      </div>
    </section>
  `;
}

function renderClosedLetter() {
  return `
    <div class="space-y-5">
      <button
        type="button"
        data-action="open-letter"
        class="letter-button floating-bounce mx-auto inline-flex h-36 w-36 items-center justify-center rounded-[2rem] bg-white text-rose-500"
        aria-label="Open the secret message"
      >
        <i data-lucide="mail" class="h-16 w-16"></i>
      </button>
      <p class="text-base font-medium text-rose-500">Click the envelope to open your letter.</p>
    </div>
  `;
}

function renderOpenedLetter() {
  return `
    <div class="space-y-6">
      <div class="quote-reveal rounded-[1.8rem] border border-rose-100/80 p-6 text-left sm:p-8">
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
          <i data-lucide="quote" class="h-6 w-6"></i>
        </div>
        <p class="text-lg leading-9 text-rose-900/85 sm:text-xl">
          "My dearest Jaan, no matter what this life brings, my heart will always find its way back to you. Even in the little moments when I seem upset, please know that beneath it all is a love so deep, so stubborn, and so forever yours."
        </p>
      </div>

      <button
        type="button"
        data-action="goto-step"
        data-step="4"
        class="journey-btn main-journey-button inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_30px_rgba(244,63,94,0.22)]"
      >
        <span>Final Destination</span>
          <i data-lucide="star" class="h-4 w-4"></i>
      </button>
    </div>
  `;
}

function renderPromiseStep() {
  const dateNight = state.answers.dateNight || "a quiet little night with me";
  const loveLanguage = state.answers.loveLanguage || "all the ways love can stay gentle";
  const mostLoved = state.answers.mostLoved || "when our hearts stay close";

  return `
    <section class="step-panel mx-auto max-w-4xl">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div class="soft-pulse rounded-full">
            <img
              src="${PROFILE_PHOTO}"
              alt="A photo of us together"
              class="promise-photo h-52 w-52 rounded-full object-cover sm:h-64 sm:w-64"
              data-fallback-label="Us, always"
              data-fallback-subtext="Add your chosen portrait photo inside journey-of-love/images/"
            >
          </div>
        </div>

        <div class="space-y-5">
          <div class="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-500">
          <i data-lucide="heart" class="h-4 w-4"></i>
            Step 5 of 5
          </div>

          <div>
            <h2 class="font-romantic text-4xl text-rose-700 sm:text-5xl">2002 Promise</h2>
            <p class="mt-4 text-base leading-8 text-rose-900/80 sm:text-lg">
              I know you love ${dateNight}, and that ${loveLanguage} make you feel whole. I know you feel most loved
              ${mostLoved}. So this is my promise: I will keep showing up with softness, patience, and a love that
              chooses you again and again, because our little 2002 story is one of the sweetest things life ever gave me.
            </p>
          </div>

          <div class="rounded-[1.6rem] border border-white/80 bg-white/75 p-5 shadow-lg shadow-rose-100/60">
            <p class="text-sm uppercase tracking-[0.22em] text-rose-400">Always true</p>
            <p class="mt-2 text-base leading-8 text-rose-900/75">
              Whatever chapter comes next, I want it to still feel like us: warm, honest, playful, and deeply in love.
            </p>
          </div>

          <div class="space-y-4">
            <p class="font-romantic text-4xl text-rose-700">Yours Always</p>
            <button
              type="button"
              data-action="restart"
              class="journey-btn main-journey-button inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_30px_rgba(244,63,94,0.22)]"
            >
              <span>Restart Our Journey</span>
              <i data-lucide="refresh-cw" class="h-4 w-4"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function prepareGallery() {
  const indexes = Array.from({ length: PHOTO_LIBRARY.length }, (_, index) => index);
  state.visibleGalleryIndexes = shuffle(indexes).slice(0, 4);
}

function startGalleryRotation() {
  stopGalleryRotation();
  state.galleryTimer = window.setInterval(rotateGalleryPhoto, 3000);
}

function stopGalleryRotation() {
  if (state.galleryTimer) {
    window.clearInterval(state.galleryTimer);
    state.galleryTimer = null;
  }
}

function rotateGalleryPhoto() {
  if (state.step !== 1) {
    stopGalleryRotation();
    return;
  }

  const slotToReplace = randomNumber(0, state.visibleGalleryIndexes.length - 1);
  const currentGalleryIndexes = [...state.visibleGalleryIndexes];
  const availableIndexes = Array.from({ length: PHOTO_LIBRARY.length }, (_, index) => index)
    .filter((index) => !currentGalleryIndexes.includes(index));

  if (!availableIndexes.length) {
    return;
  }

  const nextPhotoIndex = availableIndexes[randomNumber(0, availableIndexes.length - 1)];
  const card = app.querySelector(`[data-slot="${slotToReplace}"]`);

  if (!card) {
    return;
  }

  card.classList.add("is-swapping");

  window.setTimeout(() => {
    state.visibleGalleryIndexes[slotToReplace] = nextPhotoIndex;
    updateGalleryCard(card, nextPhotoIndex);
    card.classList.remove("is-swapping");
  }, 450);
}

function updateGalleryCard(card, photoIndex) {
  const photo = PHOTO_LIBRARY[photoIndex];
  const image = card.querySelector("img");
  const caption = card.querySelector(".gallery-caption span");

  if (!image || !caption) {
    return;
  }

  image.dataset.photoIndex = String(photoIndex);
  image.dataset.fallbackApplied = "false";
  image.dataset.fallbackLabel = photo.caption;
  image.alt = photo.caption;
  image.classList.remove("fallback-image");
  image.src = photo.url;
  caption.textContent = photo.caption;

  attachImageFallback(
    image,
    photo.caption,
    "Add your real photo inside journey-of-love/images/"
  );
}

function restartJourney() {
  state.answers = {};
  state.isSecretOpen = false;
  state.activeMemoryIndex = null;
  prepareGallery();
  transitionToStep(0);
}

function seedFloatingHearts() {
  heartsBackground.innerHTML = buildHeartLayerMarkup(90, "back-heart");
  heartsForeground.innerHTML = buildHeartLayerMarkup(54, "front-heart");
}

function buildHeartLayerMarkup(heartCount, layerClass) {
  return Array.from({ length: heartCount }, () => {
    const size = `${randomNumber(14, 34)}px`;
    const left = `${randomNumber(2, 96)}%`;
    const duration = `${randomNumber(12, 24)}s`;
    const delay = `${randomNumber(-18, 0)}s`;
    const opacity = layerClass === "front-heart"
      ? (Math.random() * 0.22 + 0.38).toFixed(2)
      : (Math.random() * 0.28 + 0.24).toFixed(2);
    const sway = `${randomNumber(10, 28)}px`;
    const swayDuration = `${randomNumber(3, 7)}s`;
    const adjustedSize = layerClass === "front-heart"
      ? `${randomNumber(18, 42)}px`
      : size;

    return `
      <span
        class="floating-heart ${layerClass}"
        style="
          --heart-size: ${adjustedSize};
          --heart-left: ${left};
          --float-duration: ${duration};
          --float-delay: ${delay};
          --heart-opacity: ${opacity};
          --sway-distance: ${sway};
          --sway-duration: ${swayDuration};
        "
      ></span>
    `;
  }).join("");
}

function wireImageFallbacks() {
  const images = app.querySelectorAll("img[data-fallback-label]");

  images.forEach((image) => {
    attachImageFallback(
      image,
      image.dataset.fallbackLabel,
      image.dataset.fallbackSubtext || "Add a photo inside the images folder"
    );
  });
}

function attachImageFallback(image, label, subtext) {
  image.onerror = () => {
    if (image.dataset.fallbackApplied === "true") {
      return;
    }

    image.dataset.fallbackApplied = "true";
    image.src = buildFallbackImage(label, subtext);
    image.alt = `${label} placeholder artwork`;
    image.classList.add("fallback-image");
  };

  if (image.complete && image.naturalWidth === 0) {
    image.onerror();
  }
}

function buildFallbackImage(title, subtitle) {
  const safeTitle = escapeForXml(title);
  const safeSubtitle = escapeForXml(subtitle);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#ffe4e6" />
          <stop offset="100%" stop-color="#fff1f2" />
        </linearGradient>
        <linearGradient id="card" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#fb7185" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#f472b6" stop-opacity="0.14" />
        </linearGradient>
      </defs>
      <rect width="900" height="700" fill="url(#bg)" rx="36" />
      <circle cx="160" cy="120" r="84" fill="#fecdd3" opacity="0.75" />
      <circle cx="760" cy="120" r="68" fill="#fbcfe8" opacity="0.7" />
      <circle cx="740" cy="560" r="98" fill="#fecdd3" opacity="0.55" />
      <rect x="90" y="120" width="720" height="460" rx="36" fill="url(#card)" stroke="#ffffff" stroke-opacity="0.8" />
      <text x="450" y="292" text-anchor="middle" fill="#9f1239" font-family="Arial, sans-serif" font-size="42" font-weight="700">
        Journey of Love
      </text>
      <text x="450" y="356" text-anchor="middle" fill="#be123c" font-family="Arial, sans-serif" font-size="28">
        ${safeTitle}
      </text>
      <text x="450" y="418" text-anchor="middle" fill="#881337" font-family="Arial, sans-serif" font-size="22" opacity="0.82">
        ${safeSubtitle}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeForXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
