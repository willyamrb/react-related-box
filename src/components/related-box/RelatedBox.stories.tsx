import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RelatedBox from "./RelatedBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "RelatedBox",
  component: RelatedBox,
} as ComponentMeta<typeof RelatedBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const SimpleData: ComponentStory<typeof RelatedBox> = (args) => {
  const allData = ["will", "mathew", "john", "maria"];

  const [query, setQuery] = useState("");

  const filteredData = allData.filter((name) => name.startsWith(query));

  return (
    <RelatedBox {...args}>
      <RelatedBox.InputText
        placeholder="Type something..."
        onChange={(v) => setQuery(v)}
      />
      <RelatedBox.SuggestionsBox
        data={filteredData}
        onSelectItem={(i) => console.log(i)}
        renderItem={(v) => <div style={{ padding: "5px 0px" }}>{v}</div>}
      />
    </RelatedBox>
  );
};

const ComplexData: ComponentStory<typeof RelatedBox> = (args) => {
  const allData = [
    {
      name: "will",
      age: 22,
    },
    {
      name: "mathew",
      age: 44,
    },
    {
      name: "john",
      age: 16,
    },
    {
      name: "maria",
      age: 29,
    },
  ];

  const [query, setQuery] = useState("");

  const filteredData = allData.filter((person) =>
    person.name.startsWith(query)
  );

  return (
    <RelatedBox {...args}>
      <RelatedBox.InputText
        placeholder="Type something..."
        onChange={(v) => setQuery(v)}
      />
      <RelatedBox.SuggestionsBox
        data={filteredData}
        onSelectItem={(i) => console.log(i)}
        renderItem={(v) => <div style={{ padding: "5px 0px" }}>{v.name}</div>}
      />
    </RelatedBox>
  );
};

export const Default = SimpleData.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  clearOnSelect: false,
};

export const ArrayOfObjects = ComplexData.bind({});
ArrayOfObjects.args = {
  clearOnSelect: false,
  objectKeyValue: "name",
};
