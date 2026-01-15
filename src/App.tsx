import {
  createClient,
  Environment,
  KameleoonProvider,
} from "@kameleoon/react-sdk";

import "./App.css";
import Counter from "./Counter";

const client = createClient({
  siteCode: "kph24vouhu",
  configuration: {
    updateInterval: 60,
    environment: Environment.Production,
  },
});

function App() {
  return (
    <KameleoonProvider client={client}>
      <Counter />
    </KameleoonProvider>
  );
}

export default App;
