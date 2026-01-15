import { useEffect } from 'react';
import {
  useInitialize,
  useData,
  useVisitorCode,
  useFeatureFlag,
  CustomData,
  createClient,
  KameleoonProvider,
  KameleoonProviderSSR,
  SDKParameters,
} from '@kameleoon/react-sdk';

// --- Create KameleoonClient ---
// --- SDKParameters ---
const sdkParameters: SDKParameters = {
  siteCode: 'my_site_code',
};

const client = createClient(sdkParameters);

// --- Usage Example ---
function MyComponentWrapper(): JSX.Element {
  return (
    <KameleoonProvider client={client}>
      <MyComponent />
    </KameleoonProvider>
  );
}

// --- Usage Example with SSR (for example NEXT.js) ---
function MyComponentSSRWrapper(): JSX.Element {
  return (
    <KameleoonProviderSSR sdkParameters={sdkParameters}>
      <MyComponent />
    </KameleoonProviderSSR>
  );
}

function MyComponent(): JSX.Element {
  const { initialize } = useInitialize();
  const { addData } = useData();
  const { getVisitorCode } = useVisitorCode();
  const { getVariation } = useFeatureFlag();

  async function init(): Promise<void> {
    // - Initialize KameleoonClient
    await initialize();

    // - Get visitor code
    const visitorCode = getVisitorCode();

    // - Add associated data
    addData(visitorCode, new CustomData(0, 'my_value'));

    // -- Obtain feature flag variation
    const variation = getVariation({
      visitorCode,
      featureKey: 'my_feature_key',
      track: false,
    });

    // -- Obtain feature flag variation key
    const variationKey = variation.key;

    // -- Obtain feature flag variables from the variation
    const variables = variation.variables;

    const variable = variables.get("balls_amount");
    const variableValue = variable?.value || 0;

    console.log(variationKey);
    console.log(variableValue);
  }

  useEffect(() => {
    init();
  }, []);

  return <div>MyComponent</div>;
}
