## App de Cadastro de Bonificações 🚀🪙

Bem-vindo ao repositório do **App de Cadastro de Bonificações**! Este aplicativo foi desenvolvido para gerenciar e registrar bonificações de vendas, permitindo um controle eficaz e a visualização das métricas de desempenho.

### Tabela de Conteúdos

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)

### Sobre

O App de Cadastro de Bonificações é uma aplicação desenvolvida para facilitar o cadastro e a visualização de bonificações. Com funcionalidades que permitem adicionar, editar e excluir registros, a aplicação também fornece relatórios anuais de vendas, tornando-a uma ferramenta essencial para equipes de vendas.

### Funcionalidades

- **Cadastro de bonificações** fixas e variáveis.
- **Relatório de vendas anual**.
- **Edição e exclusão** de registros.

#### Tecnologias Utilizadas

- **Front-end**: React.js
- **Back-end**: Node.js, Express.js
- **Banco de Dados**: MySQL
- **ORM**: Sequelize
- **Controle de Versão**: Git

### Instalação

#### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [MySQL](https://www.mysql.com/) instalados em sua máquina.

#### Instalação das Dependências

Para instalar as dependências do front-end e back-end, execute os seguintes comandos:

```bash
# No diretório raiz do projeto
npm install
```

#### Executando o Projeto

Para iniciar o servidor back-end, execute:

```bash
# No diretório backend
npm start
```

Para iniciar o front-end, execute:

```bash
# No diretório raiz do projeto
cd frontend
npm start
```

### Como Usar

1. **Acesse o aplicativo** em `http://localhost:3000`.
2. **Utilize a interface** para adicionar, editar ou excluir bonificações.
3. **Visualize relatórios anuais** de vendas na seção apropriada.
4. **Interaja com a interface** para garantir que as funcionalidades estão operando conforme esperado.

### Estrutura do Projeto

```plaintext
agl-app-cadastroBonificacao/
│
├── backend/                  # Código do servidor
│   ├── config/               # Configurações do banco de dados
│   ├── controllers/          # Controladores da aplicação
│   ├── models/               # Modelos do Sequelize
│   ├── routes/               # Rotas da API
│   ├── migrations/           # Arquivos de migração
│   └── server.js             # Inicialização do servidor
│
├── frontend/                 # Código do front-end
│   ├── public/               # Arquivos públicos
│   ├── src/                  # Arquivos de origem do React
│   │   ├── components/       # Componentes React
│   │   ├── App.js            # Componente principal
│   │   └── index.js          # Ponto de entrada
│   └── package.json          # Dependências do front-end
│
└── README.md                 # Documentação do projeto
```

---
