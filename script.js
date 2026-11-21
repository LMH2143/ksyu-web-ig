(() => {
  'use strict';
  const translations = {
    ru: {
      title: 'Ksyu — книга, красота, русский, пилатес',
      description: 'Моя книга Discipline, полировка волос, индивидуальные уроки русского, пилатес 1:1 и SMM-портфолио — все ссылки Ksyu в одном месте.',
      ogDescription: 'Discipline · Полировка волос · Russian with Ksyu · Пилатес 1:1 · SMM-портфолио',
      portfolioCategory: 'СОЦИАЛЬНЫЕ СЕТИ', portfolioTitle: 'SMM-портфолио', portfolioNote: 'Кейсы и услуги · PDF на русском',
      portfolioLabel: 'SMM-портфолио Ksyu — открыть PDF на русском в новой вкладке', portfolioAlt: 'Превью SMM-портфолио Ksyu',
      languageLabel: 'Выбор языка', linksLabel: 'Ссылки Ksyu',
      bookCategory: 'МОЯ КНИГА', hairCategory: 'КРАСОТА', russianCategory: 'РУССКИЙ ЯЗЫК', pilatesCategory: 'ДВИЖЕНИЕ',
      hairTitle: 'Записаться за полировку волос', hairNote: 'Напишите мне в Instagram',
      russianNote: 'Индивидуальные уроки', pilatesTitle: 'Пилатес 1:1', pilatesNote: 'Бесплатное пробное занятие',
      bookLabel: 'Моя книга Discipline — открыть на Amazon, в новой вкладке',
      hairLabel: 'Записаться за полировку волос — открыть Instagram, в новой вкладке',
      russianLabel: 'Russian with Ksyu — индивидуальные уроки русского, в новой вкладке',
      pilatesLabel: 'Пилатес 1:1 — бесплатное пробное занятие. Скопировать сообщение и открыть чат с Ksyu в Instagram, в новой вкладке',
      bookAlt: 'Обложка книги Discipline', hairAlt: 'Длинные светлые волосы', russianAlt: 'Ksyu, преподаватель русского языка', pilatesAlt: 'Опора — пилатес с Ксенией Савицкой',
      pilatesHint: 'Pilates: вставьте готовое сообщение в Direct',
      messageLabel: 'Сообщение на русском для бесплатного пробного занятия',
      manualCopy: 'Выделите текст выше и скопируйте его вручную. Затем вставьте в чат Instagram.',
      copy: 'Скопировать сообщение', copied: 'Скопировано',
      copySuccess: 'Сообщение скопировано. Вставьте его в Direct и нажмите «Отправить».',
      copyFailure: 'Не удалось скопировать сообщение автоматически.'
    },
    en: {
      title: 'Ksyu — book, beauty, Russian, Pilates',
      description: 'My book Discipline, hair polishing, private Russian lessons, Pilates 1:1 and SMM portfolio — all Ksyu’s links in one place.',
      ogDescription: 'Discipline · Hair polishing · Russian with Ksyu · Pilates 1:1 · SMM portfolio',
      portfolioCategory: 'SOCIAL MEDIA', portfolioTitle: 'SMM portfolio', portfolioNote: 'Work & services · PDF in English',
      portfolioLabel: 'Ksyu’s SMM portfolio — open the English PDF in a new tab', portfolioAlt: 'Ksyu’s SMM portfolio preview',
      languageLabel: 'Choose language', linksLabel: 'Ksyu’s links',
      bookCategory: 'MY BOOK', hairCategory: 'BEAUTY', russianCategory: 'RUSSIAN LANGUAGE', pilatesCategory: 'MOVEMENT',
      hairTitle: 'Book a hair polishing appointment', hairNote: 'Message me on Instagram',
      russianNote: 'Private lessons', pilatesTitle: 'Pilates 1:1', pilatesNote: 'Free trial session',
      bookLabel: 'My book Discipline — open on Amazon in a new tab',
      hairLabel: 'Book a hair polishing appointment — open Instagram in a new tab',
      russianLabel: 'Russian with Ksyu — private Russian lessons, opens in a new tab',
      pilatesLabel: 'Pilates 1:1 — free trial session. Copy the Russian message and open Ksyu’s Instagram chat in a new tab',
      bookAlt: 'Discipline book cover', hairAlt: 'Long blonde hair', russianAlt: 'Ksyu, Russian teacher', pilatesAlt: 'Pilates with Ksenia Savitskaya',
      pilatesHint: 'Pilates: paste the ready-made Russian message in Direct',
      messageLabel: 'Russian message for a free trial session',
      manualCopy: 'Select the text above and copy it manually. Then paste it into the Instagram chat.',
      copy: 'Copy message', copied: 'Copied',
      copySuccess: 'Message copied. Paste it into Direct and tap “Send”.',
      copyFailure: 'The message could not be copied automatically.'
    }
  };
  let language = 'ru';
  let copyResult = null;
  const languageButtons = document.querySelectorAll('[data-language]');
  const portfolioCard = document.querySelector('.portfolio-card');

  function updateCopyText() {
    if (!copyButton || !status) return;
    const words = translations[language];
    copyButton.textContent = copyResult === true ? words.copied : words.copy;
    status.textContent = copyResult === null ? '' : copyResult ? words.copySuccess : words.copyFailure;
  }

  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'ru';
    const words = translations[language];
    document.documentElement.lang = language;
    document.title = words.title;
    document.querySelector('meta[name="description"]').content = words.description;
    document.querySelector('meta[property="og:title"]').content = words.title;
    document.querySelector('meta[property="og:description"]').content = words.ogDescription;
    document.querySelector('.language-switch').setAttribute('aria-label', words.languageLabel);
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = words[element.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      element.setAttribute('aria-label', words[element.dataset.i18nAria]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      element.alt = words[element.dataset.i18nAlt];
    });
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    if (portfolioCard) {
      portfolioCard.href = `assets/ksyu-smm-portfolio-${language}.pdf`;
      portfolioCard.hreflang = language;
    }
    updateCopyText();
    try { localStorage.setItem('ksyu-language', language); } catch (_) {}
  }

  const field = document.querySelector('#message-text');
  const help = document.querySelector('#pilates-message');
  const status = document.querySelector('.message-status');
  const manual = document.querySelector('.manual-copy');
  const copyButton = document.querySelector('.copy-message');
  const card = document.querySelector('.pilates-card');
  // Keep the message itself in Russian, as requested, in both interface languages.
  field?.setAttribute('lang', 'ru');
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('ksyu-language'); } catch (_) {}
  setLanguage(savedLanguage);
  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  if (!field || !help || !status || !manual || !copyButton || !card) return;

  function showResult(copied) {
    manual.hidden = copied;
    copyResult = copied;
    updateCopyText();
    if (!copied) help.open = true;
  }

  function copyMessage() {
    // Initiate directly within the click handler for Safari's user activation.
    if (navigator.clipboard && window.isSecureContext) {
      try {
        navigator.clipboard.writeText(field.value).then(() => showResult(true), () => showResult(false));
      } catch (_) { showResult(false); }
      return;
    }
    // A readable fallback is always available when clipboard access is blocked.
    const temporary = document.createElement('textarea');
    temporary.value = field.value;
    temporary.readOnly = true;
    temporary.style.cssText = 'position:fixed;left:-9999px;top:0;font-size:16px';
    document.body.appendChild(temporary);
    temporary.select();
    temporary.setSelectionRange(0, temporary.value.length);
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) {}
    temporary.remove();
    showResult(copied);
  }

  copyButton.addEventListener('click', copyMessage);
  card.addEventListener('click', event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    copyMessage();
    // Preserve the native link action: open Instagram without waiting on copying.
  });
})();
