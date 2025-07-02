# 🎨 GUIA DE CUSTOMIZAÇÃO

## 🎯 Personalizar Cores

### Alterar Paleta Principal
No arquivo `styles.css`, procure por:
```css
/* =================================================
   CONFIGURAÇÕES GLOBAIS
================================================= */
```

E altere as cores:
```css
/* SUAS CORES AQUI */
--primary: #cab485;     /* Dourado principal */
--secondary: #d4c299;   /* Dourado claro */
--background: #0e1720;  /* Fundo escuro */
--text: #ffffff;        /* Texto branco */
```

### Exemplos de Paletas
```css
/* AZUL TECNOLÓGICO */
--primary: #00d4ff;
--secondary: #0099cc;
--background: #0a0e1a;

/* ROXO PREMIUM */
--primary: #8b5cf6;
--secondary: #a78bfa;
--background: #1a1625;

/* VERDE SUCESSO */
--primary: #10b981;
--secondary: #34d399;
--background: #0f1419;

/* LARANJA VIBRANTE */
--primary: #f59e0b;
--secondary: #fbbf24;
--background: #1c1917;
```

---

## 📝 Alterar Textos

### Título Principal
No `index.html`, procure:
```html
<h1 class="glitch-title">SEU TÍTULO AQUI</h1>
```

### Subtítulo
```html
<p class="subtitle-matrix">Seu subtítulo aqui</p>
```

### Quote de Abertura
```html
<div class="quote-text">
    "Sua mensagem inspiradora aqui..."
</div>
```

### Nome do Autor
```html
<div class="author-name">Seu Nome</div>
<div class="author-tagline">"Sua frase de assinatura"</div>
```

### Instagram
```html
<a href="https://instagram.com/seuusuario" target="_blank">
    📱 @seuusuario
</a>
```

---

## 🎬 Customizar Capítulos

### Adicionar Novo Capítulo
1. **Copie uma seção existente:**
```html
<section class="story-scene error-world" id="world-9">
    <div class="chapter-portal">
        <div class="portal-frame">
            <div class="chapter-header">
                <div class="error-number">08</div>
                <h2 class="chapter-title">Seu Novo Capítulo</h2>
                <div class="chapter-subtitle">Subtítulo do capítulo</div>
                <div class="dimensional-quote">"Quote inspiradora"</div>
            </div>
            
            <div class="content-matrix">
                <!-- Seu conteúdo aqui -->
            </div>
        </div>
    </div>
</section>
```

2. **Atualize a navegação no `script.js`:**
```javascript
const chapters = [
    { name: 'Início', id: 'world-0' },
    { name: '1º Erro', id: 'world-1' },
    // ... outros capítulos
    { name: '8º Erro', id: 'world-9' },  // SEU NOVO
    { name: 'Final', id: 'world-8' }
];
```

3. **Adicione botão na navegação mobile:**
```html
<div class="nav-item" data-world="9">8º Erro</div>
```

---

## 🖼️ Personalizar Ícones

### Alterar Emoji dos Capítulos
No `index.html`, procure:
```html
<div class="section-icon-3d">📉</div>  <!-- Altere aqui -->
```

### Sugestões de Ícones:
- 📊 📈 📉 💰 🎯 🚀 ⚡ 💡 🔥 💎
- ⭐ 🏆 🎪 🎭 🎨 🎬 🎮 🔮 💫 ✨

### Alterar Ícone de Navegação
```html
<div class="nav-center">🎯</div>  <!-- Ícone central -->
<div class="nav-planet active" data-world="0">🏠</div>  <!-- Home -->
```

---

## 🎵 Adicionar Música/Sons (Opcional)

### Música de Fundo
No final do `index.html`:
```html
<audio id="backgroundMusic" loop>
    <source src="sua-musica.mp3" type="audio/mpeg">
</audio>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('backgroundMusic');
    music.volume = 0.1; // Volume baixo
    
    // Auto-play após primeira interação
    document.addEventListener('click', () => {
        music.play();
    }, { once: true });
});
</script>
```

### Sons de Clique
```javascript
function playClickSound() {
    const audio = new Audio('click-sound.mp3');
    audio.volume = 0.3;
    audio.play();
}

// Adicionar aos botões
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', playClickSound);
});
```

---

## 📱 Customizar Mobile

### Alterar Cores do Theme
No `manifest.json`:
```json
{
    "background_color": "#000000",  // Cor de fundo
    "theme_color": "#cab485"        // Cor do tema
}
```

### Nome do App
```json
{
    "name": "Seu Nome Completo Aqui",
    "short_name": "Nome Curto"
}
```

---

## 🎨 Efeitos Visuais Extras

### Partículas Personalizadas
No `script.js`, função `createFloatingParticles()`:
```javascript
// Alterar cor das partículas
particle.style.background = '#sua-cor-aqui';

// Alterar tamanho
particle.style.width = '8px';
particle.style.height = '8px';

// Alterar velocidade
const duration = 20000; // 20 segundos (mais lento)
```

### Cursor Personalizado
```css
.custom-cursor {
    background: #sua-cor;  /* Sua cor */
    width: 30px;           /* Tamanho */
    height: 30px;
    border: 2px solid #outra-cor;  /* Borda */
}
```

---

## 📊 Analytics Personalizados

### Google Analytics 4
No `index.html`, antes de `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### Hotjar (Heatmaps)
```html
<!-- Hotjar -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:SEU_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

---

## 🔗 CTAs e Conversão

### Botão de WhatsApp
```html
<a href="https://wa.me/5511999999999?text=Oi,%20vi%20seu%20ebook%20interativo!" 
   class="whatsapp-btn" target="_blank">
    💬 Falar no WhatsApp
</a>
```

### Formulário de Captura
```html
<div class="lead-capture">
    <h3>Receba Mais Conteúdos</h3>
    <form action="sua-url-de-captura" method="post">
        <input type="email" placeholder="Seu melhor email" required>
        <button type="submit">QUERO RECEBER</button>
    </form>
</div>
```

### Link para Vendas
```html
<a href="sua-pagina-de-vendas.com" class="cta-venda">
    🚀 QUERO APRENDER MAIS
</a>
```

---

## 🛠️ Ferramentas Úteis

### Geradores de Gradiente
- https://cssgradient.io/
- https://uigradients.com/

### Paletas de Cores
- https://coolors.co/
- https://colorhunt.co/

### Ícones e Emojis
- https://emojipedia.org/
- https://fontawesome.com/

### Fontes do Google
- https://fonts.google.com/

---

## 💡 Dicas Finais

1. **Teste sempre no mobile** após mudanças
2. **Faça backup** antes de grandes alterações
3. **Use o console do navegador** (F12) para debug
4. **Teste em vários navegadores** (Chrome, Safari, Firefox)
5. **Mantenha as animações suaves** para não cansar o usuário

**🎉 Agora é só soltar a criatividade e personalizar seu ebook! 🎉**
