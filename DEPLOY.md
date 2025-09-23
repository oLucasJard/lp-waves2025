# Instruções de Deploy no Vercel

## Problemas Resolvidos

✅ **Erro "No Output Directory named 'public' found"**
- Criado diretório `public` com todos os arquivos estáticos
- Configurado `vercel.json` para usar `public` como diretório de saída
- Atualizado `package.json` com configurações do Vercel

## Arquivos Criados/Modificados

### 1. `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "public"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "outputDirectory": "public",
  "installCommand": "npm install",
  "buildCommand": "npm run build"
}
```

### 2. `package.json` - Atualizações
- Adicionado script `copy-assets` que executa `build.cjs`
- Adicionada configuração `vercel.outputDirectory: "public"`
- Script de build agora copia todos os arquivos para `public`

### 3. `build.cjs`
- Script Node.js que copia todos os arquivos necessários para `public`
- Compatível com Windows e Linux
- Remove e recria o diretório `public` a cada build

### 4. `.vercelignore`
- Ignora arquivos desnecessários no deploy
- Inclui `node_modules`, logs, arquivos de ambiente, etc.

## Como Fazer o Deploy

### Opção 1: Deploy via Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

### Opção 2: Deploy via GitHub
1. Conecte seu repositório ao Vercel
2. O Vercel detectará automaticamente as configurações
3. O build será executado automaticamente

### Opção 3: Deploy via Dashboard Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório
4. As configurações serão detectadas automaticamente

## Estrutura Final

```
projeto/
├── public/                 # ← Diretório de saída para Vercel
│   ├── index.html
│   ├── favicon.png
│   ├── *.jpg
│   ├── assets/
│   └── src/
├── vercel.json            # ← Configuração do Vercel
├── build.cjs              # ← Script de build
├── .vercelignore          # ← Arquivos ignorados
└── package.json           # ← Configurações atualizadas
```

## Comandos de Build

```bash
# Build local (teste)
npm run build

# Verificar estrutura
ls -la public/

# Deploy
vercel --prod
```

## Verificação

Após o deploy, verifique se:
- ✅ Site carrega corretamente
- ✅ Imagens são exibidas
- ✅ CSS é aplicado
- ✅ JavaScript funciona
- ✅ Links funcionam

## Troubleshooting

Se ainda houver problemas:

1. **Verificar logs do Vercel**: Dashboard → Project → Functions/Logs
2. **Testar build local**: `npm run build`
3. **Verificar estrutura**: `ls -la public/`
4. **Limpar cache**: Vercel Dashboard → Settings → Clear Cache

## Suporte

Para mais informações, consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [Vercel Static Build](https://vercel.com/docs/build-step#static-builds)
