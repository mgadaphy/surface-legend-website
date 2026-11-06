/* Admin root layout (Payload CMS 3.92). Based on the file Payload generates. */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { Lato, Playfair_Display } from "next/font/google";
import React from "react";
import { iconMaskUri, NAV_ICONS } from "@/components/admin/icons";
import { importMap } from "./admin/importMap.js";
import "./custom.css";

// Same typefaces as the public website.
const body = Lato({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const display = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

/** Fonts and the menu icons (drawn from the website's icon set). Payload renders <html>, so these go in a style tag. */
const adminStyle = [
  `:root{--font-body:${body.style.fontFamily};--sl-display:${display.style.fontFamily};}`,
  ...Object.entries(NAV_ICONS).map(([id, icon]) => `#${id}{--sl-nav-icon:${iconMaskUri(icon)};}`),
].join("\n");

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <style dangerouslySetInnerHTML={{ __html: adminStyle }} />
    {children}
  </RootLayout>
);

export default Layout;
