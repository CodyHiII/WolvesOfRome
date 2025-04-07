'use client';
import { store, persistor } from '../store/createStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import 'react-toastify/dist/ReactToastify.css';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  console.log(process.env.NEXT_PUBLIC_CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WagmiConfig config={config}>{children}</WagmiConfig>
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
