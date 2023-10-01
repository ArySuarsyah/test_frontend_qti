import "@/styles/globals.css";
import { Provider } from "react-redux";
// import { persistor, store } from "../redux/store";
import { persistor,store } from "./redux/store";
import withRedux from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";

function App({ Component, pageProps }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </PersistGate>
  );
}
const makeStore = () => store;
export default withRedux(makeStore)(App);
