import Head from 'next/head';

export default function InternaLayout({ children }: any) {
  return (
    <div
      style={{
        height: '100vh',
      }}>
      <Head>
        <title>Capital City</title>
        <meta name="description" content="Capital City" />
        <link rel="d" href="/d.ico" />
      </Head>
      {children}
    </div>
  );
}
