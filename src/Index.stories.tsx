import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";
import { Button } from "@wds-ui/button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Marbella/Tooltip",
  argTypes: {},
};
export default meta;

type Story = StoryObj;

export const Primary: Story = (args: any) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
Primary.args = {
  primary: true,
  disabled: false,
  text: "Primary",
};
