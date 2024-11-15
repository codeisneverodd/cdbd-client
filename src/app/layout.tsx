import StoreProvider from "@/redux/StoreProvider";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import "../styles/reset.css";
import "../styles/variables.css";
import "./globals.css";
// import SideBar from "@/components/layout/SideBar";
// import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CDBD",
  description: "글로벌 에디터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/uxo3crq.css" />
        </head>
        <body className={inter.className}>
          <AppRouterCacheProvider
          // options={{ enableCssLayer: true }}
          >
            <CssBaseline />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
