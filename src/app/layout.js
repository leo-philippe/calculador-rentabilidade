import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Calculadora de Rentabilidade</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="icon"
          href="https://vivendodeleilao.com.br/wp-content/uploads/2024/09/cropped-financie-o-seu-sonho-2-32x32.png"
          sizes="32x32"
        ></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
