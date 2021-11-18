import { BUNDLED_LANGUAGES, Lang } from '../../dist'
import { getHighlighter } from '../index'

test('Nord highlighter highlights simple JavaScript', async () => {
  const highlighter = await getHighlighter({
    theme: 'nord',
    langs: ['js']
  })
  const out = highlighter.codeToHtml(`console.log('shiki');`, { lang: 'js' })
  expect(out).toMatchSnapshot()
})

test('Highlighter loads languages and embedded languages one level deep', async () => {
  const highlighter = await getHighlighter({
    theme: 'nord',
    langs: ['js']
  })

  await highlighter.loadLanguage('vue')
  await highlighter.loadLanguage('php')

  expect(highlighter.getLoadedLanguages()).toEqual(
    expect.arrayContaining([
      'javascript',
      'js',
      'vue',
      'json',
      'haml',
      'vue-html',
      'sass',
      'less',
      'postcss',
      'pug',
      'jade',
      'stylus',
      'styl',
      'coffee',
      'scss',
      'markdown',
      'md',
      'css',
      'typescript',
      'ts',
      'php',
      'xml',
      'sql',
      'html'
    ])
  )
})

test('Highlighter does not load embedded languages when embedded depth to load is zero', async () => {
  const highlighter = await getHighlighter({
    theme: 'nord',
    langs: ['js']
  })

  await highlighter.loadLanguage('vue', 0)
  await highlighter.loadLanguage('php', 0)

  expect(highlighter.getLoadedLanguages()).toEqual(
    expect.arrayContaining(['javascript', 'js', 'vue', 'php'])
  )
})

test('Highlighter can load all languages', async () => {
  const highlighter = await getHighlighter({
    theme: 'nord',
    langs: ['js']
  })

  await highlighter.loadLanguage('abap')

  await Promise.all(
    BUNDLED_LANGUAGES.map(async lang => await highlighter.loadLanguage(lang.id as Lang))
  )

  expect(highlighter.getLoadedLanguages()).toEqual(
    expect.arrayContaining(BUNDLED_LANGUAGES.map(lang => lang.id as Lang))
  )
})
