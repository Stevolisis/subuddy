import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

const WalletContextProvider = ({ children }) => {
    const endpoint = "https://api.devnet.solana.com";
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ], []);
    
    return (
        <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
        </ConnectionProvider>
    );
};
export default WalletContextProvider;
