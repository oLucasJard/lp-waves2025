const fs = require('fs');
const path = require('path');

// Função para copiar arquivos recursivamente
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Limpar diretório public se existir
if (fs.existsSync('public')) {
  fs.rmSync('public', { recursive: true, force: true });
}

// Criar diretório public
fs.mkdirSync('public', { recursive: true });

// Copiar arquivos principais
const filesToCopy = [
  'index.html',
  'favicon.png'
];

// Copiar arquivos JPG
const jpgFiles = fs.readdirSync('.').filter(file => file.endsWith('.jpg'));
filesToCopy.push(...jpgFiles);

// Copiar arquivos de vídeo
const videoFiles = fs.readdirSync('.').filter(file => 
  file.endsWith('.mp4') || 
  file.endsWith('.mov') || 
  file.endsWith('.avi') || 
  file.endsWith('.webm')
);
filesToCopy.push(...videoFiles);

// Copiar arquivos
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('public', file));
    console.log(`Copiado: ${file}`);
  }
});

// Copiar diretórios
const dirsToCopy = ['assets', 'src'];
dirsToCopy.forEach(dir => {
  if (fs.existsSync(dir)) {
    copyRecursive(dir, path.join('public', dir));
    console.log(`Copiado diretório: ${dir}`);
  }
});

console.log('Build concluído com sucesso!');
