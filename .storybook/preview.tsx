import React from "react";
import type { Preview } from "@storybook/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "../src/styles/global.css";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </BrowserRouter>
      </RecoilRoot>
    ),
  ],
};

export default preview;
