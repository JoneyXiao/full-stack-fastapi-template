import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { Footer } from "@/components/Common/Footer"
import { AppNavbar } from "@/components/Nav"
import { isLoggedIn } from "@/hooks/useAuth"

// Public routes that don't require authentication
const publicRoutes = ["/resources", "/resources/"]

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async ({ location }) => {
    // Check if current route or its parent is a public route
    const isPublicRoute = publicRoutes.some(
      (route) =>
        location.pathname === route || location.pathname.startsWith(route),
    )

    if (!isPublicRoute && !isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar />
      <main className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
