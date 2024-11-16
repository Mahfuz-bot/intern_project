import { headers } from "next/headers"
import { UserAgentProvider } from "@/components/providers/userAgentProvider"
import { UserAgent } from "@/views/userAgent"

export default function UserAgentPage() {
  const userAgent = headers().get("user-agent") || "Unknown user agent"

  return (
    <UserAgentProvider userAgent={userAgent}>
      <UserAgent />
    </UserAgentProvider>
  )
}
