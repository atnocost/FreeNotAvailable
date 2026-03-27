import { redirect } from 'next/navigation'

export default async function BriefPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  /* Middleware already validated the token to reach this page.
     Redirect to the static HTML served from public/ CDN. */
  if (token) {
    redirect('/_sn_brief.html')
  }

  return null
}
