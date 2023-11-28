import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  TextField,Stack, TextStyle
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const [text, setText] = useState(''); 
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();

  const generateProduct = async () => {
    const response = await fetch('/admin/api/2023-04/script_tags.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': 'shptka_ea4272a3c320e0d802ccec6729796813'
      },
      body: JSON.stringify({
        script_tag: {
          event: 'onload',
          src: `data:text/javascript;charset=utf-8,${encodeURIComponent(text)}`
        }
      })
    });

    if (!response.ok) {
      console.error('Failed to create script tag');
    }

    submit({}, { replace: true, method: "POST" });
  };

  return (
    <Page>
      <ui-title-bar title="Remix app template">
        <button variant="primary" onClick={() => window.open('https://saas-popup.variux.io/', '_blank')}>
          App SAAS Popup
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <Text
              fontWeight="bold"
              >Add Script</Text>
              <TextField
                value={text}
                onChange={setText}
                multiline={5}
                style={{ marginBottom: '10px' }}
              />
              <Button
                onClick={generateProduct}
                textAlign="left"
                primary
              >
                Add Script 
              </Button>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
