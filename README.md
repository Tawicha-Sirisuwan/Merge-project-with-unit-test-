
# 🔀 Merge Arrays (TypeScript + Unit Test)

โปรเจกต์นี้สาธิตการรวมอาร์เรย์ 3 ชุด โดย:
- `arr1`, `arr2`: เรียงจากน้อยไปมาก (ascending)
- `arr3`: เรียงจากมากไปน้อย (descending)

เป้าหมายคือรวมทั้งหมดให้เรียงจากน้อยไปมาก โดย **ไม่ใช้ `sort()`**

---

## 🛠️ วิธีติดตั้งและใช้งาน (Setup Dependency and Execute Code & Test)

### ✅ 1. ติดตั้งโปรเจกต์
```bash
mkdir Typescript-project-with-unit-test
cd Typescript-project-with-unit-test
npm init -y
```

### 📦 2. ติดตั้ง Dependencies
```bash
npm install --save-dev typescript jest ts-jest @types/jest
npx ts-jest config:init
```

### ⚙️ 3. ตั้งค่าโปรเจกต์

#### package.json
```json
{
  "name": "typescript-project-with-unit-test",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "jest"                    
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/jest": "^30.0.0",
    "@types/node": "^24.1.0",
    "jest": "^30.0.5",
    "ts-jest": "^29.4.0",
    "typescript": "^5.8.3"
  }
}

```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["jest", "node"],
    "skipLibCheck": true
  },
  "include": ["src", "test"]
}

```

---

## ▶️ 4. Compile และ Run

```bash
npx tsc
node dist/src/index.js
```

**ผลลัพธ์:**
```bash
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## ✅ 5. Unit Test ด้วย Jest

### เงื่อนไขการทดสอบ:
- ✅ รวม array ได้ถูกต้อง → `[1,2,3,4,5,6,7,8,9]`
- ✅ จัดการกรณี array ว่าง
- ✅ รองรับเลขติดลบ


### คำสั่งทดสอบ:
```bash
npm test
```

**ผลลัพธ์:**
```bash
PASS  tests/merge.test.ts
✓ merges ascending + ascending + descending correctly
✓ handles empty arrays
✓ handles negative numbers
```
<img width="476" height="283" alt="image" src="https://github.com/user-attachments/assets/66ffbdbc-8d0f-4320-89bd-a063e27b3c77" />
---

## 📁 โครงสร้างโปรเจกต์

```
.
├── src/
│   ├── index.ts
│   └── merge.ts
├── tests/
│   └── merge.test.ts
├── package.json
├── tsconfig.json
└── jest.config.js
```

---

## 🔸 โค้ดทั้งหมด

### `src/merge.ts`
```ts
export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[]
): number[] {
  const c3 = [...collection_3].reverse(); 
  return mergeTwo(mergeTwo(collection_1, collection_2), c3);
}

function mergeTwo(a: number[], b: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      result.push(a[i++]);
    } else {
      result.push(b[j++]);
    }
  }
  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);
  return result;
}
```

### `src/index.ts`
```ts
import { merge } from "./merge";

const result = merge([1, 3, 5], [2, 4, 6], [9, 7, 0]);
console.log("merge result:", result);
```

### `tests/merge.test.ts`
```ts
import { merge } from "../src/merge";

describe("merge()", () => {
  it("merges ascending + ascending + descending", () => {
    const c1 = [1, 3, 5];
    const c2 = [2, 4, 6];
    const c3 = [9, 8, 7]; 

    const result = merge(c1, c2, c3);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("handles empty arrays", () => {
    expect(merge([], [], [])).toEqual([]);
    expect(merge([1], [], [])).toEqual([1]);
    expect(merge([], [], [3, 2, 1])).toEqual([1, 2, 3]);
  });

  it("handles negative numbers", () => {
    expect(merge([-10, -5], [0], [2, 1])).toEqual([-10, -5, 0, 1, 2]);
  });
});
```
---


