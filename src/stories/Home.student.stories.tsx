import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import StudentHome from "../components/Home.Student";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";

const queryClient = new QueryClient();

const meta = {
  title: "Home/Student",
  component: StudentHome,
  decorators: [
    (Story) => (
      <>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Layout name="temp">
                <Story />
              </Layout>
            </BrowserRouter>
          </QueryClientProvider>
        </RecoilRoot>
      </>
    ),
  ],
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasExam: Story = {};
