import i18next from 'i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: '/locale/{{lng}}.json'
    }
  });

var searchParams = new URLSearchParams(window.location.search);
if (searchParams.has("lang")) {
  await i18next.changeLanguage(searchParams.get("lang"))

  document.getElementById('i18n-mark').innerHTML = i18next.t('mark');
  document.getElementById('i18n-file').innerHTML = i18next.t('file');
  document.getElementById('i18n-options').innerHTML = i18next.t('options');
  document.getElementById('i18n-color').innerHTML = i18next.t('color');
  document.getElementById('i18n-markOptions').innerHTML = i18next.t('markOptions');
  document.getElementById('i18n-fontSize').innerHTML = i18next.t('fontSize');
  document.getElementById('i18n-lineSpacing').innerHTML = i18next.t('lineSpacing');
  document.getElementById('i18n-markRepetition').innerHTML = i18next.t('markRepetition');
  document.getElementById('i18n-sourceCode').innerHTML = i18next.t('sourceCode');

}

