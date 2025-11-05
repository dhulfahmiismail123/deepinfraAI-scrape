# DeepInfra AI Scrape

## Deskripsi

Library untuk berinteraksi dengan API DeepInfra (api.deepinfra.com) menggunakan [Impit](https://www.npmjs.com/package/impit) sebagai HTTP client. Fungsi utama `deepinfraAI` mengirim pesan ke AI model dan mengembalikan respons teks penuh (atau JSON jika diformat). Mendukung konfigurasi default untuk kemudahan, serta opsi custom untuk model AI dan format respons.

## Kompatibilitas

| Operating System | Architecture | libc implementation | Prebuilt binaries available |
|--|--|--|--|
| Linux | x86_64 | glibc | ✅ |
| Linux | x86_64 | musl | ✅ |
| Linux | arm64 | glibc | ✅ |
| Linux | arm64 | musl | ✅ |
| macOS | x86_64 | N/A | ✅ |
| Windows | x86_64 | N/A | ✅ |
| macOS | arm64 | N/A | ✅ |
| Windows | arm64 | N/A | ✅ |

## Instalasi

1. Pastikan Node.js ≥ v18 terinstall.
2. Install dependencies:
   ```bash
   // npm
   npm install https://github.com/dhulfahmiismail123/deepinfraAI-scrape.git
   
   // pnpm
   pnpm add https://github.com/dhulfahmiismail123/deepinfraAI-scrape.git
   ```

## Penggunaan

### 1. Penggunaan Default (Tanpa Opsi)

Dengan default, fungsi pakai:
- Model: `"Qwen/Qwen3-30B-A3B"`
- Response Format: `{ type: "none" }`
- Browser Impersonation: `"chrome"`

**Contoh:**
```javascript
import deepinfraAI from 'deepinfraAI-scrape';

const response = await deepinfraAI("1 tambah 1 berapa?");
console.log(response);  // Output: "1 + 1 = 2" (atau respons AI serupa)
```

### 2. Penggunaan dengan Opsi Custom

Anda bisa override opsi untuk `deepinfraAIOptions` (AI config) dan `impitOptions` (HTTP client config).

#### Opsi DeepInfra AI (`deepinfraAIOptions`)
- `model` (string): Model AI, e.g., `
"Qwen/Qwen3-30B-A3B",
"Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo",
"deepseek-ai/DeepSeek-R1-0528-Turbo",
"deepseek-ai/DeepSeek-V3-0324-Turbo"
"deepseek-ai/DeepSeek-V3.1",
"moonshotai/Kimi-K2-Instruct",
"meta-llama/Llama-4-Maverick-17B-128E-Instruct-Turbo"`.
- `response_format` (object): Format respons, e.g., `{ type: "none" }` atau `{ type: "json_object" }`.

#### Opsi Impit (`impitOptions`)
- `browser` (string): Browser impersonation, e.g., `"chrome"` atau `"firefox"`.
- Opsi lain dari Impit: `proxyUrl` (string), `ignoreTlsErrors` (boolean) – lihat [docs Impit](https://www.npmjs.com/package/impit).

**Contoh Custom:**
```javascript
import deepinfraAI from 'deepinfraAI-scrape';

const customResponse = await deepinfraAI(
  "Ceritakan tentang AI",  // Pesan user
  {
    model: "Qwen/Qwen3-30B-A3B",  // Custom model
    response_format: { type: "json_object" }  // Custom format (akan return JSON parsed)
  },
  {
    browser: "firefox",        // Custom browser
    // proxyUrl: "http://proxy:8080",  // Optional proxy
    // ignoreTlsErrors: true           // Optional skip TLS
  }
);
console.log(customResponse);
```

### Opsi Default Lengkap

| Parameter | Default Value | Deskripsi |
|-----------|---------------|-----------|
| **deepinfraAIOptions.model** | `"Qwen/Qwen3-30B-A3B"` | Model AI utama. |
| **deepinfraAIOptions.response_format** | `{ type: "none" }` | Format respons (none untuk teks biasa, json_object untuk JSON). |
| **impitOptions.browser** | `"chrome"` | Impersonasi browser. |

## Kontribusi

Fork repo, buat PR, atau buka issue untuk bug/fitur baru.

## Lisensi

MIT License. Lihat [LICENSE](LICENSE) untuk detail.

---

Dibuat dengan ❤️ untuk kemudahan akses AI. Pertanyaan? Buka issue!