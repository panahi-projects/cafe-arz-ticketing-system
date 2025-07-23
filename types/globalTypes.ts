export type AbsoluteUrl = `http${"s" | ""}://${string}`;
export type RelativeUrl = `/${string}`;
export type UrlString = AbsoluteUrl | RelativeUrl;

export interface MetaData {
  // Basic SEO
  canonicalUrl?: UrlString;
  robots?: string;
  author?: string;
  publisher?: string;

  // Open Graph (Facebook, LinkedIn, etc.)
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: UrlString;
  ogImage?: UrlString;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogSiteName?: string;
  ogLocale?: string;

  // Twitter Card
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: RelativeUrl;
  twitterImageAlt?: string;

  // Additional metadata
  viewport?: string;
  themeColor?: string;
  manifest?: RelativeUrl;
  favicon?: RelativeUrl;
  appleTouchIcon?: RelativeUrl;
  msapplicationTileImage?: RelativeUrl;

  // Structured data (could be stringified JSON-LD)
  schema?: string | object;
}

export interface GlobalConfigs {
  main: {
    appName: string;
    title: string;
    titleTemplate: string;
    description?: string;
    keywords?: string[];
    logo?: RelativeUrl;
    textLogo?: RelativeUrl;
    darkLogo?: RelativeUrl;
    metaData?: MetaData;
  };
}
