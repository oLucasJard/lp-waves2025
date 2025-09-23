const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

try {
  // Executar o script de build
  console.log('📦 Executando npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verificar se o diretório public foi criado
  if (fs.existsSync('public')) {
    console.log('✅ Diretório public criado com sucesso!');
    
    // Listar conteúdo do diretório public
    const files = fs.readdirSync('public');
    console.log('📁 Arquivos no diretório public:', files);
    
    // Verificar se index.html existe
    if (fs.existsSync('public/index.html')) {
      console.log('✅ index.html encontrado!');
    } else {
      console.log('❌ index.html não encontrado!');
      process.exit(1);
    }
    
  } else {
    console.log('❌ Diretório public não foi criado!');
    process.exit(1);
  }
  
  console.log('🎉 Build concluído com sucesso!');
  
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
