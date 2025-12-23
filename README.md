# BniBina - Coming Soon Page

Page "Coming Soon" exceptionnelle, moderne et premium pour une entreprise de finitions bâtiment et fourniture de matériaux.

## 🎨 Caractéristiques

- **Design moderne et premium** inspiré des tendances 2024-2025
- **Animations fluides et sophistiquées** (parallax, reveal, morphing)
- **Typographie élégante** avec hiérarchie visuelle claire
- **Micro-interactions engageantes**
- **Mode sombre** avec accents chauds (orange/bois)
- **Responsive design** (mobile-first)

## 🚀 Technologies

- HTML5, CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (GSAP pour animations avancées)
- Tailwind CSS pour styling rapide et cohérent
- SVG pour icônes custom et animations
- Responsive design (mobile-first)

## 📦 Installation

1. Clonez le repository ou téléchargez les fichiers
2. Ouvrez `index.html` dans votre navigateur

Pour un serveur de développement local :

```bash
npm install -g live-server
live-server --port=3000
```

Ou utilisez n'importe quel serveur HTTP local.

## 🎯 Sections

### 1. Navigation (Navbar)
- Design flottant/glassmorphism
- Logo animé au hover
- Navigation avec underline animé
- Bouton Privacy avec effet dégradé
- Animation smooth au scroll

### 2. Section Héro
- Background dégradé dynamique
- Grille géométrique animée
- Image avec effet parallax
- Countdown timer sophistiqué
- Formulaire de notification premium

### 3. Section Services
- Cartes créatives avec animations
- Effets hover sophistiqués
- Icônes SVG animées
- Apparition progressive au scroll

### 4. Section À Propos
- Layout asymétrique élégant
- Forme géométrique animée
- Icônes réseaux sociaux interactives

### 5. Footer
- Design moderne et épuré
- Liens avec underline animé
- Informations de contact stylisées

## 🎨 Palette de couleurs

- **Primary Orange**: `#FF6B35`
- **Secondary Orange**: `#FFB84D`
- **Primary Dark**: `#E55A2B`
- **Dark**: `#2D2D2D`
- **Light**: `#F5F5F5`
- **Accent Wood**: `#8B6F47`
- **Success**: `#10B981`
- **Error**: `#EF4444`
- **Very Dark**: `#1a1a1a`

## 📱 Responsive

- **Mobile**: 320px+
- **Tablette**: 640px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## ⚡ Performance

- Animations CSS optimisées
- Lazy loading des images
- Throttling des événements scroll
- Support de `prefers-reduced-motion`

## ♿ Accessibilité

- Focus states visibles
- Navigation au clavier
- Support des lecteurs d'écran
- Contraste respecté

## 📝 Notes

- Le countdown est configuré pour 30 jours à partir de la date actuelle
- Les animations GSAP nécessitent une connexion internet (CDN)
- Le formulaire simule une soumission (à connecter à votre backend)

## 🔧 Personnalisation

Pour modifier le countdown, éditez la fonction `initCountdown()` dans `script.js` :

```javascript
targetDate.setDate(targetDate.getDate() + 30); // Changez 30 par le nombre de jours souhaité
```

## 📄 Licence

MIT License - Libre d'utilisation

---

Créé avec ❤️ pour BniBina

