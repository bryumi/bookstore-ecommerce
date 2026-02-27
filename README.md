# 📚 Livraria booklovers - E-commerce de Livros

Um e-commerce moderno e elegante de livros desenvolvido com Next.js 14, React 18 e Tailwind CSS.

## ✨ Características

- **Catálogo de Livros**: Navegue por uma seleção curada de livros
- **Busca e Filtros**: Pesquise por título/autor e filtre por categoria
- **Carrinho de Compras**: Adicione livros, ajuste quantidades e gerencie seu carrinho
- **Sistema de Pedidos**: Finalize compras e acompanhe o status dos pedidos
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Persistência de Dados**: Carrinho e pedidos salvos no localStorage
- **Animações Suaves**: Transições e animações elegantes em toda a aplicação

## 🎨 Design

O projeto utiliza uma paleta de cores sofisticada:

- **Cream** (#FAF7F0): Fundo principal
- **Charcoal** (#2C2C2C): Texto principal
- **Burgundy** (#6B2D3E): Cor primária/destaque
- **Gold** (#D4AF37): Acentos especiais
- **Sage** (#8B9D83): Status e confirmações

Tipografia elegante:

- **Crimson Pro**: Fonte display para títulos
- **Lora**: Fonte body para leitura
- **Work Sans**: Fonte sans-serif para UI

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Navegue até a pasta do projeto:

```bash
cd bookstore-ecommerce
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
bookstore-ecommerce/
├── app/
│   ├── cart/
│   │   └── page.tsx          # Página do carrinho
│   ├── orders/
│   │   └── page.tsx          # Página de pedidos
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Página inicial (catálogo)
├── components/
│   ├── BookCard.tsx          # Card de livro
│   ├── Footer.tsx            # Rodapé
│   └── Header.tsx            # Cabeçalho
├── lib/
│   └── store-context.tsx     # Context API para estado global
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca para interfaces
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utility-first
- **Context API**: Gerenciamento de estado
- **localStorage**: Persistência de dados do lado do cliente

## 📦 Funcionalidades Principais

### Página Inicial (Catálogo)

- Grid responsivo de livros
- Busca em tempo real
- Filtros por categoria
- Informações detalhadas de cada livro
- Avaliações com estrelas
- Botão "Adicionar ao Carrinho" com feedback visual

### Carrinho de Compras

- Visualização de todos os itens
- Controle de quantidade (+/-)
- Remoção de itens
- Cálculo automático de totais
- Resumo do pedido
- Botão de finalização

### Página de Pedidos

- Histórico completo de pedidos
- Status visual (Processando, Enviado, Entregue)
- Timeline de acompanhamento
- Detalhes de cada pedido
- Data e hora de criação

## 🎯 Melhorias Futuras

- Integração com API de pagamento
- Sistema de autenticação de usuários
- Avaliações e comentários de livros
- Wishlist/Lista de desejos
- Recomendações personalizadas
- Cupons de desconto
- Sistema de newsletter
- Integração com gateway de pagamento real

## 📝 Licença

Este projeto é um exemplo educacional e está disponível para uso livre.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ usando Next.js, React e Tailwind CSS.
