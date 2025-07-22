This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
cafe-arz-ticketing-system
├─ app
│  ├─ dashboard
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  └─ tickets
│  │     ├─ list
│  │     │  └─ page.tsx
│  │     └─ new
│  │        └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ ButtonField.tsx
│  └─ layout
│     ├─ DashboardLayout.tsx
│     ├─ Header.tsx
│     ├─ MobileDrawer.tsx
│     └─ Sidebar.tsx
├─ configs
│  ├─ index.ts
│  └─ menu-items.ts
├─ eslint.config.mjs
├─ lib
│  └─ icons.tsx
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ fonts
│  │     ├─ fontiran.css
│  │     ├─ style.css
│  │     ├─ woff
│  │     │  ├─ IRANYekanX-Bold.woff
│  │     │  └─ IRANYekanX-Regular.woff
│  │     └─ woff2
│  │        ├─ IRANYekanX-Bold.woff2
│  │        └─ IRANYekanX-Regular.woff2
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ theme
│  ├─ theme.ts
│  └─ ThemeProvider.tsx
└─ tsconfig.json

```
```
cafe-arz-ticketing-system
├─ app
│  ├─ dashboard
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  ├─ tickets
│  │  │  ├─ list
│  │  │  │  └─ page.tsx
│  │  │  └─ new
│  │  │     └─ page.tsx
│  │  └─ [...not-found]
│  │     └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ ButtonField.tsx
│  └─ layout
│     ├─ DashboardLayout.tsx
│     ├─ Header.tsx
│     ├─ MobileDrawer.tsx
│     ├─ sidebar
│     │  ├─ ChildMenuItem.tsx
│     │  ├─ MenuItemIcon.tsx
│     │  ├─ MenuItemText.tsx
│     │  └─ ParentMenuItem.tsx
│     ├─ Sidebar.tsx
│     └─ SidebarStyles.ts
├─ configs
│  ├─ index.ts
│  └─ menu-items.ts
├─ eslint.config.mjs
├─ lib
│  └─ icons.tsx
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ fonts
│  │     ├─ fontiran.css
│  │     ├─ style.css
│  │     ├─ woff
│  │     │  ├─ IRANYekanX-Bold.woff
│  │     │  └─ IRANYekanX-Regular.woff
│  │     └─ woff2
│  │        ├─ IRANYekanX-Bold.woff2
│  │        └─ IRANYekanX-Regular.woff2
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ theme
│  ├─ theme.ts
│  └─ ThemeProvider.tsx
└─ tsconfig.json

```