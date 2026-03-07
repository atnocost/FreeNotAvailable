import test from 'node:test'
import assert from 'node:assert/strict'
import process from 'node:process'
import { readFile } from 'node:fs/promises'

async function read(path) {
  return readFile(`${process.cwd()}/${path}`, 'utf8')
}

test('FINExME gallery uses the approved sunset and dusk silhouette captions', async () => {
  const source = await read('components/sections/FineXMeSection.tsx')

  assert.match(
    source,
    /src: '\/images\/dusk-silhouette-two\.avif', alt: '[^']+', caption: 'Sunset'/,
  )
  assert.match(
    source,
    /src: '\/images\/fine-by-me-sunset\.webp', alt: '[^']+', caption: 'Dusk silhouette'/,
  )
  assert.doesNotMatch(
    source,
    /src: '\/images\/crouching-smoke\.avif', alt: '[^']+', caption: 'Smoke'/,
  )
})

test('timeline uses the dedicated Zodiac Killer still instead of the red bokeh portrait', async () => {
  const source = await read('app/timeline/timelineData.ts')

  assert.match(
    source,
    /title: 'ZODIAC KILLER'[\s\S]*?image: 'zodiac-killer-still\.avif'/,
  )
  assert.doesNotMatch(
    source,
    /title: 'ZODIAC KILLER'[\s\S]*?image: 'red-bokeh-portrait\.avif'/,
  )
})

test('image optimizer knows how to rebuild the Zodiac Killer still', async () => {
  const source = await read('scripts/optimize-images.mjs')

  assert.match(
    source,
    /'zodiac-killer-still\.png': 'zodiac-killer-still'/,
  )
})
