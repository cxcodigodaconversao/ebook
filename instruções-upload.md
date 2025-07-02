# 📋 INSTRUÇÕES PASSO A PASSO - UPLOAD PARA GITHUB PAGES

## 🎯 ARQUIVOS NECESSÁRIOS
Você precisará destes 4 arquivos principais:
- ✅ `index.html` - Página principal
- ✅ `styles.css` - Estilos e design
- ✅ `script.js` - Interatividade
- ✅ `manifest.json` - PWA (opcional)

---

## 🚀 PARTE 1: CRIAR CONTA NO GITHUB

### 1.1 Acessar GitHub
1. Abra seu navegador
2. Digite: `github.com`
3. Clique em **"Sign up"** (canto superior direito)

### 1.2 Criar Conta
1. **Username:** Escolha um nome (ex: `evertonrodrigues2024`)
2. **Email:** Seu email válido
3. **Password:** Senha forte
4. Clique **"Create account"**
5. **Verifique seu email** e confirme

---

## 🚀 PARTE 2: CRIAR REPOSITÓRIO

### 2.1 Novo Repositório
1. Após login, clique no botão **"New"** (verde)
2. **Repository name:** `7-erros-invisiveis`
3. **Description:** `Experiência interativa - 7 Erros Invisíveis`
4. ✅ Marque **"Public"**
5. ✅ Marque **"Add a README file"**
6. Clique **"Create repository"**

### 2.2 Confirmação
✅ Você verá uma página com o nome do repositório
✅ URL será algo como: `github.com/seuusuario/7-erros-invisiveis`

---

## 🚀 PARTE 3: UPLOAD DOS ARQUIVOS

### 3.1 Preparar Arquivos
1. **Baixe todos os arquivos** que te enviei
2. **Renomeie** o arquivo HTML principal para `index.html`
3. Certifique-se que os nomes são exatamente:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `manifest.json`

### 3.2 Upload no GitHub
1. No seu repositório, clique **"uploading an existing file"**
2. **Arraste TODOS os 4 arquivos** para a área indicada
   - Ou clique "choose your files" e selecione
3. Aguarde o upload (barras de progresso)
4. Na caixa "Commit changes":
   - **Título:** `Adicionar ebook interativo`
   - **Descrição:** `Upload inicial dos arquivos do projeto`
5. Clique **"Commit changes"**

### 3.3 Verificar Upload
✅ Você deve ver os 4 arquivos listados
✅ Cada arquivo deve mostrar "just now" ou horário recente

---

## 🚀 PARTE 4: ATIVAR GITHUB PAGES

### 4.1 Acessar Configurações
1. No repositório, clique na aba **"Settings"**
2. **Role a página para baixo** até encontrar **"Pages"** no menu lateral esquerdo
3. Clique em **"Pages"**

### 4.2 Configurar Pages
1. **Source:** Selecione **"Deploy from a branch"**
2. **Branch:** Selecione **"main"**
3. **Folder:** Deixe **"/ (root)"**
4. Clique **"Save"**

### 4.3 Aguardar Ativação
⏰ **Tempo:** 5-10 minutos para processar
📍 **Status:** Aparecerá uma caixa verde com o link
🔗 **Seu link:** `https://seuusuario.github.io/7-erros-invisiveis`

---

## 🎉 PARTE 5: TESTAR E COMPARTILHAR

### 5.1 Verificar Funcionamento
1. **Abra o link** em uma nova aba
2. **Teste no mobile:** Abra no celular
3. **Verifique:**
   - ✅ Carregamento da intro
   - ✅ Navegação entre capítulos
   - ✅ Animações funcionando
   - ✅ Botões clicáveis
   - ✅ Scroll suave

### 5.2 Compartilhar
📱 **Instagram:** Poste o link nos stories
🔗 **Bio:** Adicione na bio do Instagram
📧 **Email:** Envie para sua lista
💬 **WhatsApp:** Compartilhe diretamente

---

## 🛠️ PARTE 6: DOMÍNIO PERSONALIZADO (OPCIONAL)

### 6.1 Comprar Domínio
1. **Registro.br** (para .com.br)
2. **GoDaddy** (para .com)
3. **Hostgator** ou outros
4. **Exemplo:** `7errosinvisiveis.com.br`

### 6.2 Configurar no GitHub
1. **Settings > Pages > Custom domain**
2. Digite seu domínio: `seudominio.com.br`
3. Clique **"Save"**

### 6.3 Configurar DNS
No painel do seu domínio:
1. **CNAME:** `seuusuario.github.io`
2. Ou **A records:**
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

---

## 📊 PARTE 7: ANALYTICS (OPCIONAL)

### 7.1 Google Analytics
1. Crie conta em `analytics.google.com`
2. Obtenha seu **GA4 ID**
3. Adicione no final do `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=SEU_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SEU_GA_ID');
</script>
```

### 7.2 Facebook Pixel
1. Acesse **Business Manager**
2. Crie um **Pixel**
3. Adicione o código no `index.html`

---

## 🚨 RESOLUÇÃO DE PROBLEMAS

### ❌ Site não carrega
**Soluções:**
1. Aguarde 10-15 minutos
2. Verifique se os arquivos foram enviados corretamente
3. Certifique-se que o arquivo se chama `index.html`
4. Limpe o cache do navegador (Ctrl+F5)

### ❌ Animações não funcionam
**Soluções:**
1. Verifique se `script.js` foi enviado
2. Teste em modo anônimo/privado
3. Verifique console do navegador (F12)

### ❌ Design quebrado
**Soluções:**
1. Verifique se `styles.css` foi enviado
2. Confirme que nomes dos arquivos estão corretos
3. Teste em dispositivos diferentes

### ❌ GitHub Pages não ativa
**Soluções:**
1. Repositório deve ser **público**
2. Branch deve ser **main**
3. Aguarde até 30 minutos
4. Tente reativar nas configurações

---

## 📞 SUPORTE

**Dúvidas?**
- 📧 Email: [seu email]
- 📱 Instagram: [@evertonmrodrigues](https://instagram.com/evertonmrodrigues)
- 💬 WhatsApp: [seu whatsapp]

**Links Úteis:**
- 🔗 GitHub: https://github.com
- 📚 Documentação: https://docs.github.com/pages
- 🎯 Seu repositório: `github.com/seuusuario/7-erros-invisiveis`

---

## ✅ CHECKLIST FINAL

**Antes de publicar:**
- [ ] Conta GitHub criada
- [ ] Repositório `7-erros-invisiveis` criado
- [ ] 4 arquivos enviados (index.html, styles.css, script.js, manifest.json)
- [ ] GitHub Pages ativado
- [ ] Site testado no desktop
- [ ] Site testado no mobile
- [ ] Link funcionando
- [ ] Pronto para compartilhar!

**🎉 PARABÉNS! SEU EBOOK INTERATIVO ESTÁ NO AR! 🎉**
