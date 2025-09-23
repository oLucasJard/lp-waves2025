# Opções para Usar Vídeo do Google Drive

## 🎥 **Opção 1: Download Direto (Recomendado)**

### Como fazer:
1. **Acesse seu Google Drive**
2. **Clique com botão direito** no vídeo
3. **Selecione "Download"**
4. **Renomeie o arquivo** para `VIDEO-HERO.mp4` (ou .mov)
5. **Coloque na raiz do projeto** (mesma pasta do index.html)
6. **Execute o build**: `npm run build`

### Vantagens:
- ✅ Funciona offline
- ✅ Carregamento rápido
- ✅ Controle total
- ✅ Sem dependências externas

---

## 🌐 **Opção 2: Link Direto do Google Drive**

### Como fazer:
1. **Acesse seu Google Drive**
2. **Clique com botão direito** no vídeo
3. **Selecione "Obter link"**
4. **Altere para "Qualquer pessoa com o link"**
5. **Copie o link** (exemplo: `https://drive.google.com/file/d/1ABC123.../view`)
6. **Converta para link direto**:
   - Substitua `/view` por `/uc?export=download`
   - Ou use: `https://drive.google.com/uc?export=download&id=ID_DO_ARQUIVO`

### Atualizar o HTML:
```html
<video id="heroVideo" class="hero-video" autoplay loop playsinline muted>
    <source src="https://drive.google.com/uc?export=download&id=SEU_ID_AQUI" type="video/mp4">
    <!-- Fallback será exibido automaticamente se não carregar -->
</video>
```

### Vantagens:
- ✅ Não ocupa espaço no projeto
- ✅ Fácil de atualizar
- ⚠️ Depende da conexão com internet
- ⚠️ Pode ter limitações de acesso

---

## 📺 **Opção 3: YouTube (Alternativa)**

### Como fazer:
1. **Faça upload** do vídeo no YouTube
2. **Configure como "Não listado"** ou "Público"
3. **Copie o ID do vídeo** (exemplo: `dQw4w9WgXcQ`)
4. **Use o player do YouTube**:

```html
<div class="video-hero-container">
    <iframe 
        id="heroVideo" 
        class="hero-video youtube-video"
        src="https://www.youtube.com/embed/SEU_ID_AQUI?autoplay=1&loop=1&playlist=SEU_ID_AQUI&mute=1&controls=0&showinfo=0&rel=0"
        frameborder="0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
    </iframe>
</div>
```

### Vantagens:
- ✅ Streaming otimizado
- ✅ Compatibilidade universal
- ✅ Controles avançados
- ⚠️ Depende do YouTube
- ⚠️ Pode ter anúncios

---

## 🎬 **Opção 4: Vimeo (Alternativa Premium)**

### Como fazer:
1. **Faça upload** no Vimeo
2. **Configure como "Não listado"**
3. **Copie o ID do vídeo**
4. **Use o player do Vimeo**:

```html
<div class="video-hero-container">
    <iframe 
        id="heroVideo" 
        class="hero-video vimeo-video"
        src="https://player.vimeo.com/video/SEU_ID_AQUI?autoplay=1&loop=1&muted=1&controls=0"
        frameborder="0" 
        allow="autoplay; fullscreen" 
        allowfullscreen>
    </iframe>
</div>
```

### Vantagens:
- ✅ Qualidade superior
- ✅ Sem anúncios
- ✅ Controles profissionais
- ⚠️ Requer conta Vimeo
- ⚠️ Depende da conexão

---

## 🔧 **Implementação Rápida**

### Para usar qualquer opção, atualize o arquivo `index.html`:

```html
<!-- Substitua esta seção -->
<video id="heroVideo" class="hero-video" autoplay loop playsinline muted>
    <source src="SEU_VIDEO_AQUI.mp4" type="video/mp4">
    <source src="SEU_VIDEO_AQUI.webm" type="video/webm">
    <!-- Fallback será exibido automaticamente -->
</video>
```

### Para YouTube/Vimeo, substitua por:
```html
<iframe 
    id="heroVideo" 
    class="hero-video"
    src="SEU_LINK_AQUI"
    frameborder="0" 
    allow="autoplay; encrypted-media" 
    allowfullscreen>
</iframe>
```

---

## 🎯 **Recomendação**

**Para melhor performance e confiabilidade, recomendo a Opção 1 (Download Direto):**

1. **Baixe o vídeo** do Google Drive
2. **Converta para MP4** (se necessário)
3. **Otimize o tamanho** (máximo 10MB)
4. **Coloque na raiz** do projeto
5. **Execute o build**

### Ferramentas úteis:
- **Conversão**: [CloudConvert](https://cloudconvert.com)
- **Compressão**: [HandBrake](https://handbrake.fr)
- **Otimização**: [FFmpeg](https://ffmpeg.org)

---

## 🚀 **Próximos Passos**

1. **Escolha uma opção** acima
2. **Implemente a solução**
3. **Teste localmente**: `npm run dev`
4. **Faça o build**: `npm run build`
5. **Deploy no Vercel**

O sistema de fallback garantirá que o site funcione mesmo se o vídeo não carregar!
