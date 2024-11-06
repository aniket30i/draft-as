# draft-as

A React project using Vite as the build tool. This project uses `draft-js` for rich text editing and `eslint` for linting.

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or higher is recommended).


### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aniket30i/draft-as.git

2. **Navigate to project dir:** 
  ```bash
  cd draft-as

```

3. **Installation of dependencies**

  ```bash
  npm install
```

4. **Changes to the VITE config file (for errors)**
```bash
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    "global.setImmediate": "function(callback) { setTimeout(callback, 0); }",
  },
});
```
5. **Import setImmediate the Top of main.jsx(for errors)**
```bash
if (typeof setImmediate === "undefined") {
  var setImmediate = function (callback) {
    setTimeout(callback, 0);
  };
}
```
6. **Run the project**
```bash
npm run dev

```
