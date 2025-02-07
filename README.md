# Desafio Front-end - CRUD Clientes

## Tabelas de conteúdos

- [Overview](#overview)
  - [Links](#links)
  - [Getting started](#getting-started)
- [Author](#author)


## Overview

O desafio consiste em desenvolver o front-end de um crud de clientes:


#### Funcionalidades

1. Adicionar Cliente:
    - [x] Criar um formulário para adicionar novos clientes.
    - [x] Cada cliente deve ter os campos conforme protótipo.
    - [x] Ao submeter o formulário, o cliente deve ser salvo no localStorage.

2. Listar Clientes:
    - [x] Exibir uma lista de clientes cadastrados.
    - [x] A lista deve mostrar os campos conforme protótipo.

3. Editar Cliente:
    - [x] Permitir a edição dos dados de um cliente.
    - [x] Ao salvar as alterações, os dados atualizados devem ser armazenados no localStorage.
4. Excluir Cliente:
    - [x] Permitir a exclusão de um cliente da lista.
    - [x] Ao confirmar a exclusão, remover o cliente do localStorage.

### Links

- [Remote repository](https://github.com/thaliszambarda/crud-customers)

### Getting started

Você pode utilizar a aplicação caso queira construí-la em sua máquina:

#### Prerequisites

Certifique-se de que sua máquina possui Node 20+ instalado e o gerenciador de
pacotes `npm`.

Certifique-se de ter instalado a extensão do ESlint.

Certifique-se de criar um .env seguindo o exemplo do .env.example com as informações corretas.

#### Installation

Clone o repositório do projeto para sua máquina.

Using HTTPS:

```bash
https://github.com/thaliszambarda/crud-customers.git
```

Using GitHub CLI:

```bash
gh repo clone thalizamabrda/crud-customers
```

Navegue para o diretório recém-baixado:

```bash
cd crud-customers
```

Instale as dependências do projeto utilizando `npm`:

```bash
npm install
```

#### Development

Para executar o projeto em modo de desenvolvimento, execute o comando:

```bash
npm run dev
```

Isso irá iniciar o servidor de desenvolvimento no endereço
`http://localhost:5173`. Abra seu navegador e cole o endereço para visualizar a
aplicação.

#### Building for Production

Para construir o projeto para produção, execute o comando:

```bash
npm run build
```

Isso irá gerar uma versão otimizada e minificada da aplicação na pasta `dist`.

#### Running in Production Mode

Após a construção do projeto, você pode iniciar um servidor em modo de produção
executando o comando:

```bash
npm run preview
```

Isso irá iniciar o servidor de produção no mesmo endereço
`http://localhost:4173`. Abra seu navegador e cole o endereço para visualizar a
aplicação otimizada.


## Author

- GitHub - [trelcray](https://github.com/thaliszambarda)

- LinkedIn - [Thalis Zambarda](https://www.linkedin.com/in/thalis-zambarda/)
