import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Modal
        onClose={() => {}}
        onSubmit={() => {}}
        title="Test Modal"
        actionLabel="Submit"
      />
      <Component {...pageProps} />
    </Layout>
  );
}
