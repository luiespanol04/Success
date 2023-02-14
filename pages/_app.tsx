import { WagmiConfig } from 'wagmi';
import dynamic from 'next/dynamic';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Toaster } from 'react-hot-toast';
import { chains } from '@/constants/provider';
import { wagmiClient } from '@/constants/client';
import { chainSelected } from '@/constants/chain';

import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

import InternaLayout from '@/components/Layaout/Layaout';

const myCustomThem: any = {
  blurs: {
    modalOverlay: '...',
  },
  colors: {
    connectButtonBackground: '#000000',
    accentColor: '#ffffff',
    accentColorForeground: '#000000',
    actionButtonBorder: '#000000',
    actionButtonBorderMobile: 'e8e8e8',
    actionButtonSecondaryBackground: '#000000',
    closeButton: '#000000',
    closeButtonBackground: '#ffffff',
    connectButtonBackgroundError: '#000000',
    connectButtonInnerBackground: '#000000',
    connectButtonText: '#000000',
    connectButtonTextError: '#000000',
    connectionIndicator: '#000000',
    downloadBottomCardBackground: '#000000',
    downloadTopCardBackground: '#000000',
    error: '#000000',
    generalBorder: '#000000',
    generalBorderDim: '#000000',
    menuItemBackground: '#908e8e',
    modalBackdrop: '...',
    modalBackground: '#000000',
    modalBorder: '#ffffff',
    modalText: '#ffffff',
    modalTextDim: '#ffffff',
    modalTextSecondary: '#ffffff',
    standby: '#ffffff',
  },
  radii: {
    actionButton: '8px',
    connectButton: '8px',
    menuButton: '8px',
    modal: '8px',
    modalMobile: '8px',
  },
};
function App({ Component, pageProps }: AppProps) {
  const testnetOrMainnet = process.env.NEXT_PUBLIC_MAINNET_TESTNET;

  return (
    <SWRConfig
      value={{
        refreshInterval: 86400,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          initialChain={chainSelected[Number(testnetOrMainnet || 1)]}
          theme={myCustomThem}>
          <InternaLayout>
            <Component {...pageProps} />
          </InternaLayout>
        </RainbowKitProvider>
        <Toaster />
      </WagmiConfig>
    </SWRConfig>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });