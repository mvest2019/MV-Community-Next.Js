import { NextRequest, NextResponse } from "next/server";

// Map your group IDs to group names here (or fetch from DB/service if needed)
const groupIdToName: Record<string, string> = {
  "9721": "mineral-rights-discussion",
  "9315": "mineral-rights-discussion",
  "9174": "Sans", // Add your mappings here
  // Add more mappings as needed
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle /grpId=xxxx&join-group
  if (pathname.startsWith("/grpId=") && pathname.includes("&join-group")) {
    const grpIdMatch = pathname.match(/grpId=(\d+)/);
    const code = searchParams.get("code");
    const grpId = grpIdMatch ? grpIdMatch[1] : null;
    const groupName = searchParams.get("url") || (grpId ? groupIdToName[grpId] : null);

    if (grpId && groupName) {
      let redirectUrl = `/${groupName}/${grpId}`;
      if (code) redirectUrl += `?code=${code}`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle /join-group?url=Sans&grpId=9174&code=...
  if (pathname === "/join-group") {
    const grpId = searchParams.get("grpId");
    const groupName = searchParams.get("url") || (grpId ? groupIdToName[grpId] : null);
    const code = searchParams.get("code");

    if (grpId && groupName) {
      let redirectUrl = `/${groupName}/${grpId}`;
      if (code) redirectUrl += `?code=${code}`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}