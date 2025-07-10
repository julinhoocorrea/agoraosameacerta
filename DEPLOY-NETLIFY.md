# 🚀 COMO CONFIGURAR O NETLIFY

## ✅ **PROJETO ATUALIZADO NO GITHUB**

**🔗 Repositório:** https://github.com/julinhoocorrea/checkdiamond
**✨ Status:** Compatível com Safari + todos os navegadores

---

## 📋 **PASSOS PARA CONFIGURAR NO NETLIFY**

### **1. Acesse o Netlify**
- Vá para: https://app.netlify.com/
- Faça login na sua conta

### **2. Localize o Site**
- Procure pelo site: **checkdiamond** ou **checkdiamond.netlify.app**
- Se não existir, clique em **"Add new site"** → **"Import an existing project"**

### **3. Conecte ao GitHub**
- Selecione **GitHub** como fonte
- Autorize o acesso se necessário
- Escolha o repositório: **julinhoocorrea/checkdiamond**

### **4. Configure o Build**
```
✅ Branch to deploy: main
✅ Build command: bun run build
✅ Publish directory: dist
✅ Site name: checkdiamond (ou outro nome)
```

### **5. Clique em "Deploy Site"**
- O Netlify irá automaticamente:
  - Instalar as dependências
  - Executar o build
  - Publicar o site

---

## ⚙️ **CONFIGURAÇÕES AVANÇADAS (OPCIONAL)**

### **Variáveis de Ambiente**
Se quiser configurar PIX real:
```
VITE_INTER_CLIENT_ID = seu_client_id_inter
VITE_INTER_CLIENT_SECRET = seu_secret_inter
VITE_INTER_PIX_KEY = sua_chave_pix
VITE_4SEND_API_TOKEN = seu_token_4send
```

### **Deploy Hooks**
Para rebuild automático:
- Em **Site configuration** → **Build & deploy** → **Build hooks**
- Crie um hook para deploy manual se necessário

---

## 🧪 **TESTANDO APÓS DEPLOY**

### **1. Acesse o Site**
- URL: https://checkdiamond.netlify.app
- Ou o domínio configurado

### **2. Teste no Safari**
- Abra especificamente no Safari
- Verifique se carrega a tela de login

### **3. Faça Login**
**Admin:**
- Email: `juliocorrea@check2.com.br`
- Senha: `Ju113007?`

### **4. Navegue pelo Sistema**
- ✅ Dashboard deve carregar
- ✅ Menus devem funcionar
- ✅ Gráficos devem aparecer

---

## 🔧 **PROBLEMAS COMUNS**

### **Build Falha**
- Verifique se o Node.js está configurado (versão 18+)
- Em **Site configuration** → **Environment variables**
- Adicione: `NODE_VERSION = 18`

### **Rota 404**
- Já configurado no `netlify.toml`
- Todas as rotas redirecionam para `/index.html`

### **Safari Não Carrega**
- Todas as correções já foram implementadas
- Site deve funcionar no Safari 11+

---

## 📞 **SE PRECISAR DE AJUDA**

1. **Verifique o Deploy Log** no Netlify
2. **Confirme se o repositório** está correto
3. **Teste primeiro localmente**: `bun run build` no projeto

---

## 🎯 **RESULTADO ESPERADO**

Após configurar corretamente:
- ✅ **checkdiamond.netlify.app** funcionando
- ✅ **Safari compatível**
- ✅ **Login funcionando**
- ✅ **Dashboard carregando**

**🚀 SEU SISTEMA ESTARÁ ONLINE E FUNCIONANDO EM TODOS OS NAVEGADORES!**
