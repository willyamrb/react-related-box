# React Related Box

A React Component to help with complex search inputs

## Info

This library has made to help you to implement search inputs, it can be used to show suggestions while users are typing.

Also is important to mention that React Related Box is highly typed!

## Install

```shell
npm install react-related-box
or
yarn add react-related-box
```

## Getting started

### RelatedBox component

This is the base component of this library, inside every RelatedBox component needs to be 2 other components, the RelatedBox.InputText and RelatedBox.SuggestionsBox, they complete the search input structure to work as expected.

If one of these componenets is not declared inside RelatedBox componenet it will result an error, they are not opitional, they are required.

```jsx
import React from "react";
import { RelatedBox } from "react-related-box";

export default function MyComponent() {
  const allData = ["will", "mathew", "john", "maria"];
  const [query, setQuery] = useState("");
  const filteredData = allData.filter((name) => name.startsWith(query));

  return (
    <RelatedBox>
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
}
```

#### RelatedBox.InputText component props

RelatedBox.InputText contains all properties from normal JSX input component but with some additionals

| property    | required | type                                                      | default | description                                                                                       |
| :---------- | :------- | :-------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------ |
| typeDelay   | ❌       | number                                                    | 1200    | This property refers to the delay when user types something, if you do not want delay put it to 0 |
| customInput | ❌       | React.ReactElement<InputHTMLAttributes<HTMLInputElement>> | none    | If you want a custom text input you can use this property to create a custom input                |

#### RelatedBox.SuggestionsBox component props

RelatedBox.SuggestionsBox contains all properties from normal JSX div component but with some additionals

| property   | required | type                                                              | default | description                                                                                                                                                                                 |
| :--------- | :------- | :---------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data       | ✅       | any[]                                                             | none    | This property refers to suggestions availables                                                                                                                                              |
| maxItems   | ❌       | number                                                            | 4       | This property refers to the max items from property data that will be presented as suggestions                                                                                              |
| renderItem | ❌       | (value: any) => React.ReactElement<RelatedBoxSuggestionItemProps> | none    | This property refers to the component of each suggestion item, it return a property value that represent a item from data property, that way you can specify each property you want to use. |
