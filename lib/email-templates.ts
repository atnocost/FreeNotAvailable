const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://atnocost.cc'

/* ── Shared styles ── */
const bg = '#0a0a0a'
const cardBg = '#0e0e0e'
const cardBorder = '#1c1c1c'
const textPrimary = '#e8e4dc'
const textBody = '#b8b4ac'
const textMuted = '#888'
const textDim = '#555'
const textFaint = '#444'
const textGhost = '#333'
const mono = "'SF Mono', 'Menlo', 'Courier New', monospace"
const serif = "'Georgia', 'Times New Roman', serif"

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>OTHER WORLD</title>
  <!--[if mso]>
  <style>table,td{font-family:Georgia,serif;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:${bg};font-family:${serif};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};">
    <tr>
      <td align="center" style="padding:60px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="font-family:${mono};font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${textFaint};text-align:center;padding-bottom:40px;">
              OTHER WORLD
            </td>
          </tr>
          <!-- Content card -->
          <tr>
            <td style="background:${cardBg};border:1px solid ${cardBorder};padding:50px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="font-family:${mono};font-size:9px;letter-spacing:2px;color:${textGhost};">
                    <a href="${BASE_URL}" style="color:${textGhost};text-decoration:none;">ATNOCOST.CC</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:${mono};font-size:8px;letter-spacing:1px;color:#222;padding-top:8px;text-align:center;">
                    <a href="${BASE_URL}/unsubscribe?email={{email}}" style="color:#222;text-decoration:underline;">unsubscribe</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function moonCell(name: string, img: string, active: boolean): string {
  const size = active ? 64 : 44
  const opacity = active ? '1' : '0.3'
  const nameColor = active ? textMuted : textFaint
  return `<td align="center" style="padding:0 8px;opacity:${opacity};">
    <img src="${BASE_URL}/images/${img}" alt="${name}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:50%;display:block;margin:0 auto 8px auto;" />
    <span style="font-family:${mono};font-size:7px;letter-spacing:2px;color:${nameColor};text-transform:uppercase;">${name}</span>
    ${active ? `<br/><span style="font-family:${mono};font-size:8px;letter-spacing:2px;color:${textBody};">&uarr;</span>` : ''}
  </td>`
}

function unlockItem(text: string, num?: string): string {
  const prefix = num ? `<span style="color:${textMuted};">${num}</span> &mdash; ` : ''
  return `<tr>
    <td style="font-family:${mono};font-size:9px;letter-spacing:1px;color:${textDim};padding:6px 0 6px 18px;line-height:1.6;position:relative;">
      <span style="color:${textGhost};margin-right:6px;">&mdash;</span>${prefix}${text}
    </td>
  </tr>`
}

/* ── EMAIL 1: Welcome ── */
export function email1Welcome(email: string): { subject: string; html: string } {
  const content = `
    <!-- Quote -->
    <p style="font-family:${serif};font-style:italic;font-size:17px;line-height:1.7;color:${textBody};margin:0 0 6px 0;">
      &ldquo;u very special , extraordinary...&rdquo;
    </p>
    <p style="font-family:${mono};font-size:10px;letter-spacing:2px;color:${textDim};margin:0 0 36px 0;">
      &mdash; wc
    </p>

    <!-- Hero line -->
    <p style="font-family:${serif};font-size:20px;line-height:1.5;color:${textPrimary};margin:0 0 48px 0;">
      u made it, hope it feels like something.
    </p>

    <!-- Lunar nav -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${cardBorder};background:${bg};margin-bottom:48px;">
      <tr>
        <td style="padding:40px 20px 12px;text-align:center;">
          <p style="font-family:${mono};font-size:9px;letter-spacing:4px;text-transform:uppercase;color:${textFaint};margin:0 0 28px 0;">u are here</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              ${moonCell('OWJV', 'moon-owjv.png', false)}
              ${moonCell('FINExME', 'moon-finexme.png', false)}
              ${moonCell('SINE NOCTIS', 'moon-sinenoctis.png', true)}
              ${moonCell('SN2', 'moon-sn2.png', false)}
              ${moonCell('OTHERLAND', 'moon-otherland.png', false)}
              ${moonCell('SEX SYMBOL', 'moon-sexsymbol.png', false)}
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="border-top:1px solid #1a1a1a;padding-top:24px;"></td></tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${unlockItem('the origin. FINE BY ME filmed during a tornado watch.', '001')}
            ${unlockItem('FINExME digital booklet.', '002')}
            ${unlockItem('BENE, the manuscript.', '003')}
            ${unlockItem('first access to all SINE NOCTIS drops.')}
          </table>
        </td>
      </tr>
    </table>

    <!-- Signature -->
    <p style="font-family:${mono};font-size:11px;letter-spacing:2px;color:${textDim};margin:0;">
      &mdash; FREE
    </p>
  `
  return {
    subject: 'you made it',
    html: layout(content).replace('{{email}}', encodeURIComponent(email)),
  }
}

/* ── EMAIL 2: Origin Story ── */
export function email2Origin(email: string): { subject: string; html: string } {
  const reportBg = '#d0d0d0'
  const reportWhite = '#ffffff'
  const reportRed = '#cc0000'
  const reportText = '#222'
  const reportBorder = '#888'
  const reportLabel = '#ececec'
  const reportFont = "Arial, Helvetica, sans-serif"

  function reportRow(label: string, value: string): string {
    return `<tr>
      <td style="font-family:${reportFont};font-size:12px;font-weight:bold;background:${reportLabel};border:1px solid ${reportBorder};padding:5px 8px;width:46%;">${label}</td>
      <td style="font-family:${reportFont};font-size:12px;border:1px solid ${reportBorder};padding:5px 8px;color:${reportText};">${value}</td>
    </tr>`
  }

  const content = `
    <!-- Meta -->
    <p style="font-family:${mono};font-size:10px;letter-spacing:2px;color:${textFaint};margin:0 0 32px 0;">
      SINE NOCTIS / visit 001
    </p>

    <!-- Copy -->
    <p style="font-family:${serif};font-size:17px;line-height:1.8;color:${textBody};margin:0 0 40px 0;">
      June 2021, a tornado watch was declared. FINE BY ME was filmed the same day.
    </p>

    <!-- Tornado loop -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#050505;border:1px solid #1a1a1a;padding:0;text-align:center;line-height:0;">
          <img src="${BASE_URL}/images/tornado-loop.gif" alt="June 2021 — tornado watch" width="540" style="width:100%;max-width:540px;display:block;margin:0 auto;" />
        </td>
      </tr>
    </table>

    <!-- look at the sky -->
    <p style="font-family:${serif};font-size:18px;color:${textPrimary};letter-spacing:1px;margin:0 0 40px 0;">
      look at the sky.
    </p>

    <!-- Tornado Report — embedded artifact -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:${reportBg};padding:14px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${reportWhite};padding:16px;">
            <!-- Title -->
            <tr>
              <td colspan="2" style="padding-bottom:10px;">
                <p style="font-family:${reportFont};font-size:15px;font-weight:bold;color:${reportRed};margin:0 0 2px 0;">Tornado &mdash; Other World</p>
                <p style="font-family:${reportFont};font-size:13px;color:${reportText};margin:0;">Wayne County</p>
              </td>
            </tr>
            <!-- Data table -->
            <tr>
              <td style="padding-bottom:12px;" colspan="2">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${reportRow('Date', 'June 20, 2021')}
                  ${reportRow('Time (Local)', '9:23 PM &ndash; 9:27 PM EDT')}
                  ${reportRow('EF Rating', 'EF-1')}
                  ${reportRow('Est. Peak Winds', '90 mph')}
                  ${reportRow('Path Length', '2.7 miles')}
                  ${reportRow('Max Width', '125 yards')}
                  ${reportRow('Injuries/Deaths', '0/0')}
                </table>
              </td>
            </tr>
            <!-- Summary -->
            <tr>
              <td colspan="2" style="padding-bottom:14px;">
                <p style="font-family:${reportFont};font-size:12px;font-weight:bold;background:${reportLabel};border:1px solid ${reportBorder};border-bottom:none;padding:5px 8px;margin:0;">Summary:</p>
                <p style="font-family:${reportFont};font-size:11px;line-height:1.58;color:#111;border:1px solid ${reportBorder};padding:7px 8px;margin:0;">The tornado touched down south of The Bridge and The River, tracking ENE through the production area. At least five parked vehicles sustained damage, with one engine compartment fully flooded. Numerous trees were shaken and partially uprooted along the storm&rsquo;s path. Notably, crew member Worst Choice was nearly displaced by violent winds while attempting to secure lighting equipment on set. As conditions deteriorated, the sky underwent a dramatic visual transformation &mdash; shifting through vivid shades of pink and amber before settling into a deep, cool blue punctuated by subtle lightning flickers. A surging wall of rain subsequently moved across the area, forcing an immediate halt to first-day production activities.</p>
              </td>
            </tr>
            <!-- Track Map -->
            <tr>
              <td colspan="2" style="padding-bottom:10px;">
                <p style="font-family:${reportFont};font-size:14px;font-weight:bold;text-align:center;text-decoration:underline;margin:0 0 5px 0;">Track Map</p>
                <img src="${BASE_URL}/images/tornado-track-map.png" alt="Tornado track map" width="500" style="width:100%;max-width:500px;display:block;margin:0 auto;border:2px solid #777;" />
              </td>
            </tr>
            <!-- Velocity -->
            <tr>
              <td colspan="2" style="padding-bottom:6px;">
                <p style="font-family:${reportFont};font-size:13px;font-weight:bold;text-align:center;text-decoration:underline;margin:0 0 3px 0;">Radar Velocity Image at 9:25 PM EDT</p>
                <p style="font-family:${reportFont};font-size:10px;text-align:center;color:#111;margin:0 0 6px 0;line-height:1.45;">Inbound velocities (green) located next to outbound velocities (red)<br/>is indicative of rotation within the storm (black circle).</p>
                <img src="${BASE_URL}/images/tornado-velocity.png" alt="Radar velocity" width="500" style="width:100%;max-width:500px;display:block;margin:0 auto;border:2px solid #666;" />
              </td>
            </tr>
            <!-- Reflectivity -->
            <tr>
              <td colspan="2" style="padding-top:8px;">
                <img src="${BASE_URL}/images/tornado-reflectivity.png" alt="Radar reflectivity" width="500" style="width:100%;max-width:500px;display:block;margin:0 auto;border:2px solid #666;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Interactive link -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
      <tr>
        <td style="text-align:center;padding:16px 0;">
          <a href="${BASE_URL}/archive/tornado-report" style="font-family:${mono};font-size:9px;letter-spacing:2px;color:${textDim};text-decoration:underline;">VIEW INTERACTIVE REPORT</a>
        </td>
      </tr>
    </table>

    <!-- Album promo loop -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
      <tr>
        <td style="background:#050505;border:1px solid #1a1a1a;padding:0;text-align:center;line-height:0;">
          <img src="${BASE_URL}/images/promo-loop.gif" alt="FINExME promo" width="540" style="width:100%;max-width:540px;display:block;margin:0 auto;" />
        </td>
      </tr>
    </table>

    <!-- Closing -->
    <p style="font-family:${serif};font-size:18px;color:${textPrimary};letter-spacing:1px;margin:0;">
      nothing stops the visit.
    </p>
  `
  return {
    subject: 'SINE NOCTIS / visit 001',
    html: layout(content).replace('{{email}}', encodeURIComponent(email)),
  }
}

/* ── EMAIL 3: Manuscript + Downloads ── */
export function email3Manuscript(email: string): { subject: string; html: string } {
  function downloadBlock(title: string, subtitle: string, href: string): string {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${cardBorder};margin-bottom:16px;">
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <a href="${href}" style="text-decoration:none;">
                  <p style="font-family:${mono};font-size:12px;letter-spacing:2px;color:${textPrimary};margin:0 0 4px 0;">${title}</p>
                  <p style="font-family:${mono};font-size:9px;letter-spacing:2px;color:${textFaint};text-transform:uppercase;margin:0;">${subtitle}</p>
                </a>
              </td>
              <td width="40" style="text-align:right;">
                <a href="${href}" style="font-family:${mono};font-size:18px;color:${textGhost};text-decoration:none;">&darr;</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`
  }

  const content = `
    <!-- Meta -->
    <p style="font-family:${mono};font-size:10px;letter-spacing:2px;color:${textFaint};margin:0 0 32px 0;">
      SINE NOCTIS / visit 002
    </p>

    <!-- Setting -->
    <p style="font-family:${serif};font-style:italic;font-size:17px;line-height:1.9;color:${textBody};margin:0 0 48px 0;">
      setting: somewhere cold, but it should be hot. FREE is Prometheus, bringing fire where there is none. his companion is Mnemosyne &mdash; memory itself. their fire is the only proof the cold was ever interrupted.
    </p>

    <!-- Downloads -->
    ${downloadBlock('BENE', 'manuscript &mdash; fine by me', `${BASE_URL}/downloads/bene-manuscript.pdf`)}
    ${downloadBlock('FINExME', 'digital booklet &mdash; interactive', `${BASE_URL}/archive/finexme-booklet`)}
    ${downloadBlock('FINExME', 'digital booklet &mdash; pdf', `${BASE_URL}/downloads/finexme-booklet.pdf`)}

    <!-- Closing -->
    <p style="font-family:${serif};font-size:15px;color:#666;font-style:italic;margin:40px 0 0 0;">
      visit FREE again in chapter ii.
    </p>
  `
  return {
    subject: 'SINE NOCTIS / visit 002',
    html: layout(content).replace('{{email}}', encodeURIComponent(email)),
  }
}

export const EMAIL_TEMPLATES = [
  { id: 1, delay: 0, generate: email1Welcome },
  { id: 2, delay: 3, generate: email2Origin },
  { id: 3, delay: 7, generate: email3Manuscript },
] as const
