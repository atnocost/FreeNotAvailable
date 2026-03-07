import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join } from 'path'

const ASSETS_DIR = './assets'
const OUTPUT_DIR = './public/images'
const AVIF_QUALITY = 75
const WEBP_QUALITY = 82

// Map asset filenames to semantic names
const IMAGE_MAP = {
  'owm-000.png': 'hero-cover',
  'owm-003.png': 'bmw-dusk',
  'owm-004.png': 'fine-by-me-still',
  'owm-005.png': 'red-portrait',
  'owm-006.png': 'dusk-silhouette-two',
  'owm-007.png': 'pilgrim-card',
  'owm-008.png': 'ante-doorway',
  'owm-009.png': 'jacket-portrait',
  'owm-010.png': 'sn-street-1',
  'owm-011.png': 'sn-architecture',
  'owm-012.png': 'sn-scene',
  'owm-013.png': 'seated-pendant',
  'owm-014.png': 'owjv-birmingham',
  'owm-017.png': 'finexme-backcover',
  'owm-019.png': 'sinenoctis-backcover',
  'owm-020.png': 'logotype-finexme',
  'owm-021.png': 'logotype-sinenoctis',
  'owm-022.png': 'logotype-sinenoctis-alt',
  'owm-023.png': 'logotype-otherland',
  'owm-024.png': 'logotype-neverdyin',
  'owm-025.png': 'logotype-sexsymbol',
  'owm-026.png': 'logotype-free',
  'owm-027.png': 'bmw-red-wheel',
  'owm-028.png': 'jacket-closeup',
  'pdf1-000.png': 'owjv-cherub',
  'pdf1-001.png': 'finexme-cover',
  'pdf1-002.png': 'crouching-smoke',
  'pdf1-005.png': 'red-bokeh-portrait',
  'pdf1-006.png': 'bokeh-night',
  'zodiac-killer-still.png': 'zodiac-killer-still',
}

// These are logos/logotypes that should be kept as PNG (transparency)
const KEEP_AS_PNG = [
  'logotype-finexme', 'logotype-sinenoctis', 'logotype-sinenoctis-alt',
  'logotype-otherland', 'logotype-neverdyin', 'logotype-sexsymbol',
  'logotype-free', 'owjv-cherub',
]

async function optimizeImage(inputPath, outputName) {
  const img = sharp(inputPath)
  const metadata = await img.metadata()

  if (KEEP_AS_PNG.includes(outputName)) {
    // Logos: resize to max 800px wide, keep PNG for transparency
    const resized = img.resize({ width: 800, withoutEnlargement: true })
    await resized.png({ quality: 90 }).toFile(join(OUTPUT_DIR, `${outputName}.png`))
    console.log(`  PNG: ${outputName}.png`)
    return
  }

  // Photos: generate AVIF at primary size
  const primaryWidth = Math.min(1920, metadata.width || 1920)
  await img.clone()
    .resize({ width: primaryWidth, withoutEnlargement: true })
    .avif({ quality: AVIF_QUALITY, effort: 6 })
    .toFile(join(OUTPUT_DIR, `${outputName}.avif`))
  console.log(`  AVIF: ${outputName}.avif (${primaryWidth}px)`)

  // WebP fallback
  await img.clone()
    .resize({ width: primaryWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(join(OUTPUT_DIR, `${outputName}.webp`))
  console.log(`  WebP: ${outputName}.webp`)

  // Mobile size
  const mobileWidth = Math.min(828, metadata.width || 828)
  await img.clone()
    .resize({ width: mobileWidth, withoutEnlargement: true })
    .avif({ quality: 70, effort: 6 })
    .toFile(join(OUTPUT_DIR, `${outputName}-mobile.avif`))
  console.log(`  AVIF mobile: ${outputName}-mobile.avif (${mobileWidth}px)`)
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(ASSETS_DIR)
  let processed = 0

  for (const file of files) {
    const outputName = IMAGE_MAP[file]
    if (!outputName) continue

    const inputPath = join(ASSETS_DIR, file)
    console.log(`Processing: ${file} → ${outputName}`)

    try {
      await optimizeImage(inputPath, outputName)
      processed++
    } catch (err) {
      console.error(`  ERROR: ${err.message}`)
    }
  }

  console.log(`\nDone. Processed ${processed} images.`)
}

main().catch(console.error)
