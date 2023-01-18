import "../styles/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
};

export default RootLayout;
