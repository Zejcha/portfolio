# 🚀 DProject Portfolio

Profesjonalne portfolio do prezentacji realizacji webowych. Zbudowane w React z TypeScript, stylowane Tailwind CSS i animowane Framer Motion.

## ✨ Funkcje

- 🎨 **Nowoczesny design** - Ciemny motyw z gradientami i efektami poświaty
- 🌍 **Wielojęzyczność** - Obsługa języka polskiego i angielskiego
- 📱 **Responsywność** - Pełna responsywność na wszystkich urządzeniach
- ⚡ **Animacje** - Płynne animacje dzięki Framer Motion
- 🖼️ **Galeria projektów** - Interaktywne karty z podglądem zdjęć
- 📋 **Modal kontaktowy** - Kopiowanie adresu e-mail jednym kliknięciem
- 🔒 **Polityka prywatności** - Wbudowany modal z treścią RODO
- 🔝 **Nawigacja** - Płynne przewijanie i przycisk "do góry"

## 🛠️ Technologie

- **React 19** - Biblioteka UI
- **TypeScript** - Typowanie statyczne
- **Vite** - Bundler i dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animacje
- **Lucide React** - Ikony

## 📦 Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/Zejcha/portfolio.git
cd portfolio

# Instalacja zależności
npm install

# Uruchomienie dev server
npm run dev

# Budowanie produkcyjne
npm run build

# Podgląd buildu
npm run preview
```

## 🚀 Deployment na GitHub Pages

### Automatyczny (GitHub Actions)
1. Push do brancha `main` automatycznie uruchomi deployment
2. Workflow znajduje się w `.github/workflows/deploy.yml`
3. Strona będzie dostępna pod: `https://zejcha.github.io/portfolio/`

### Manualny (gh-pages)
```bash
# Budowanie i deployment jednym poleceniem
npm run deploy
```

## ⚙️ Konfiguracja

### Zmiana nazwy repozytorium
Jeśli chcesz użyć innej nazwy repozytorium, zmień:

1. **vite.config.ts** - wartość `base`
```typescript
base: '/twoja-nazwa-repo/'
```

2. **package.json** - wartość `homepage`
```json
"homepage": "https://twojlogin.github.io/twoja-nazwa-repo"
```

3. **index.html** - zaktualizuj URL-e w meta tagach

### Personalizacja treści
- Projekty: edytuj tablicę `projects` w `src/App.tsx`
- Tłumaczenia: edytuj obiekt `translations` w `src/App.tsx`
- Logo i obrazki: zamień pliki w folderze `public/`

## 📁 Struktura projektu

```
portfolio/
├── public/
│   ├── logo.png           # Logo główne
│   ├── 404.html           # Strona dla GitHub Pages SPA
│   └── projects/          # Zdjęcia projektów
├── src/
│   ├── App.tsx            # Główny komponent
│   ├── main.tsx           # Entry point
│   ├── index.css          # Style globalne (Tailwind)
│   └── App.css            # Dodatkowe style
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── index.html             # Template HTML z SEO
├── vite.config.ts         # Konfiguracja Vite
├── tailwind.config.js     # Konfiguracja Tailwind
└── package.json
```

## 📄 Licencja

Ten projekt jest prywatny i stanowi portfolio DProject.

## 📬 Kontakt

- **Email**: dpdominik@int.pl
- **GitHub**: [@Zejcha](https://github.com/Zejcha)
- **Facebook**: [DProject](https://www.facebook.com/profile.php?id=61585143951145)

---

© 2025 DProject. Zbudowane z ❤️ używając React & Tailwind CSS.
