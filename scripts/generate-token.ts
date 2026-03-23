/**
 * Generate a unique Ekthesis access token.
 *
 * Usage:
 *   npx ts-node scripts/generate-token.ts "Contact Name"
 *
 * Add the output token to the EKTHESIS_TOKENS env var in Vercel
 * (comma-separated list). Then send the recipient:
 *
 *   https://atnocost.cc/ekthesis?token=<generated-token>
 */

import { randomBytes } from 'crypto'

const contactName = process.argv[2] ?? 'unnamed'
const token = randomBytes(16).toString('hex').slice(0, 12)

console.log(`\nContact:  ${contactName}`)
console.log(`Token:    ${token}`)
console.log(`URL:      https://atnocost.cc/ekthesis?token=${token}`)
console.log(`\nAdd this token to EKTHESIS_TOKENS in your Vercel environment variables.`)
