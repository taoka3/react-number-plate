# React Number Plate

Japanese license plate input component for React.

日本のナンバープレート入力フィールドコンポーネント（React版）

## Features

- ✅ 4つのカラーテーマ（白、緑、黄、黒）
- ✅ 地域選択ドロップダウン（北海道から九州まで全地域対応）
- ✅ 分類番号入力（3桁）
- ✅ ひらがな入力（1文字）
- ✅ ナンバー入力（自動フォーマット: ・や-を挿入）
- ✅ 無効化対応（disabled）
- ✅ 必須入力対応（required）
- ✅ TypeScript対応

## Installation

```bash
npm install react-number-plate
```

## Usage

### React

```tsx
import { NumberPlate } from 'react-number-plate';
import 'react-number-plate/style.css';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');

  return (
    <NumberPlate
      value={value}
      onChange={setValue}
      color="white" // 'white' | 'green' | 'yellow' | 'black'
      disabled={false}
      required={false}
    />
  );
}
```

### Next.js (App Router)

```tsx
'use client';

import { NumberPlate } from 'react-number-plate';
import 'react-number-plate/style.css';
import { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState('');

  return (
    <NumberPlate
      value={value}
      onChange={setValue}
      color="white"
      disabled={false}
      required={false}
    />
  );
}
```

**Note:** This component uses React hooks (`useState`, `useEffect`, `useCallback`), so it must be used in a Client Component in Next.js. Add the `'use client'` directive at the top of your file.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | ナンバープレートの値（例: "品川 300 ぬ 12-34"） |
| `onChange` | `(value: string) => void` | - | 値が変更されたときのコールバック |
| `separate` | `string` | `' '` | 各フィールドの区切り文字 |
| `color` | `'white' \| 'green' \| 'yellow' \| 'black'` | `'white'` | カラーテーマ |
| `disabled` | `boolean` | `false` | 無効化フラグ |
| `required` | `boolean` | `false` | 必須入力フラグ |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Preview built demo
npm run preview
```

## Build Output

The library is built with the following files:

- `dist/react-number-plate.es.js` - ES module format
- `dist/react-number-plate.umd.js` - UMD format for browser usage
- `dist/style.css` - Component styles (includes embedded fonts)
- `dist/index.d.ts` - TypeScript type definitions

**Note:** The CSS file is approximately 12MB due to embedded Japanese fonts. This ensures the component displays correctly without requiring separate font downloads.

## License

MIT
