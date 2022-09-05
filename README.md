# axios-tauri-adapter

An adapter to use the Tauri HTTP api with Axios on the UI side.

I have tested simple GET, POST requests but not requests containing buffer, binary.

# Installation

```shell
yarn add @ismailkarsli/axios-tauri-adapter
# or
npm install @ismailkarsli/axios-tauri-adapter
```

# Usage

```js
import axios from "axios";
import axiosTauriAdapter from "axios-tauri-adapter";
const client = axios.create({ adapter: axiosTauriAdapter });
```
