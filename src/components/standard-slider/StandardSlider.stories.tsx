import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import StandardSlider from "./StandardSlider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Sliders/StandardSlider",
  component: StandardSlider,
} as ComponentMeta<typeof StandardSlider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StandardSlider> = (args) => (
  <StandardSlider {...args}>
    <StandardSlider.Item width="200px">aaaaaa</StandardSlider.Item>
  </StandardSlider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
