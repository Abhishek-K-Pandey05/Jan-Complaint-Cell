import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Route protection:
//   /dashboard/*      -> any authenticated citizen
//   /admin/*          -> role = admin only
//   /(official)/*     -> role = official or admin
// Role is read from `profiles.role` (Phase 3 schema). Until that table
// exists, unauthenticated users are still redirected to /login; the role
// check below activates as soon as the migration lands.
export async function middleware(request: NextRequest) {
  const { response, user, supabase } = await updateSession(request);
  const path = request.nextUrl.pathname;

  const isDashboard = path.startsWith("/dashboard") && !path.startsWith("/dashboard/public");
  const isAdmin = path.startsWith("/admin");
  const isOfficial = path.startsWith("/official");

  if ((isDashboard || isAdmin || isOfficial) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", path);
    return NextResponse.redirect(url);
  }

  if ((isAdmin || isOfficial) && user && supabase) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role;
      if (isAdmin && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (isOfficial && role !== "official" && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      // If table doesn't exist yet, fallback to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

// Runs on everything except static assets; the function body above decides
// which of those paths actually need an auth/role check.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
