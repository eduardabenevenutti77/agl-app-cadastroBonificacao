# AGL - App de Cadastro de Bonificações

Bem-vindo ao repositório do **AGL - App de Cadastro de Bonificações**! Este aplicativo foi desenvolvido para gerenciar e registrar bonificações de vendas, permitindo um controle eficaz e a visualização das métricas de desempenho.

## Tabela de Conteúdos

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Sobre

O AGL é uma aplicação desenvolvida para facilitar o cadastro e a visualização de bonificações. Com funcionalidades que permitem adicionar, editar e excluir registros, a aplicação também fornece relatórios anuais de vendas, tornando-a uma ferramenta essencial para equipes de vendas.

### Funcionalidades

- **Cadastro de bonificações** fixas e variáveis.
- **Relatório de vendas anual**.
- **Edição e exclusão** de registros.

## Tecnologias Utilizadas

- **Front-end**: React.js, Bootstrap
- **Back-end**: Node.js, Express.js
- **Banco de Dados**: MySQL
- **ORM**: Sequelize
- **Controle de Versão**: Git

## Instalação

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [MySQL](https://www.mysql.com/) instalados em sua máquina.

### Clonando o Repositório

```bash
git clone https://github.com/ZopuBitrix/agl-app-cadastroBonificacao.git
cd agl-app-cadastroBonificacao
```

### Instalação das Dependências

Para instalar as dependências do front-end e back-end, execute os seguintes comandos:

```bash
# No diretório raiz do projeto
npm install

# Acesse o diretório do servidor
cd backend
npm install
```

### Configuração do Banco de Dados

1. **Crie um banco de dados** no MySQL.
   ```sql
   CREATE DATABASE agl_bonificacoes;
   ```

2. **Configure as credenciais** do banco de dados no arquivo `backend/config/config.json`:
   ```json
   {
     "development": {
       "username": "seu_usuario",
       "password": "sua_senha",
       "database": "agl_bonificacoes",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

3. **Migrações**: Execute as migrações para criar as tabelas necessárias.
   ```bash
   cd backend
   npx sequelize-cli db:migrate
   ```

### Executando o Projeto

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

## Como Usar

1. **Acesse o aplicativo** em `http://localhost:3000`.
2. **Utilize a interface** para adicionar, editar ou excluir bonificações.
3. **Visualize relatórios anuais** de vendas na seção apropriada.
4. **Interaja com a interface** para garantir que as funcionalidades estão operando conforme esperado.

### Exemplo de Uso

Após iniciar o aplicativo, você verá a tela inicial onde poderá:

- Cadastrar uma nova bonificação ao clicar em "Adicionar Bonificação".
- Visualizar as bonificações cadastradas em uma lista.
- Editar ou excluir bonificações existentes.

## Estrutura do Projeto

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

## Contribuição

Contribuições são bem-vindas! Para contribuir, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/YourFeature`).
3. Faça suas alterações e commit (`git commit -m 'Add some feature'`).
4. Envie para o repositório remoto (`git push origin feature/YourFeature`).
5. Abra um Pull Request.
---
