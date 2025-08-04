# 🎭 playwright-mark
Este repositório contém uma base de estudo e exemplos práticos para criação de testes end‑to‑end utilizando Playwright com TypeScript. Foi criado no curso [Playwright Express](https://www.udemy.com/course/playwright-express).

## 📝 Sobre a aplicação
A aplicação testada é uma lista de tarefas (To-Do List) com frontend e backend integrados. Ela permite ao usuário:
- Criar, excluir e marcar/desmarcar tarefas como concluídas
- Executar essas ações tanto via interface gráfica (web) quanto diretamente pela API

## 🚀 Tecnologias
- Playwright Test (test runner oficial) com TypeScript

## 📁 Estrutura do projeto
```bash
.
├── apps/                # Front e back da aplicação
├── tests/               # Casos de teste (page.spec.ts, login.spec.ts etc.)
├── playwright.config.ts # Configuração do Playwright
├── package.json         # Dependências e scripts
├── .env                 # Variáveis de ambiente (ex.: base URL, credenciais)
├── .gitignore
├── LICENSE              # Licença MIT
└── README.md
```

## ⚙️ Pré‑requisitos
- Node.js (recomenda-se versão LTS)
- npm ou yarn
- Git

## 🏗️ Instalação e execução
Clone o repositório
```bash
git clone https://github.com/adrianwilker/playwright-mark.git
cd playwright-mark
```

Instale as dependências
```bash
npm install
# ou
yarn install
```

Instale os navegadores
```bash
npx playwright install
```

Execute a aplicação
```bash
yarn dev:all
```

Execute os testes
```bash
npx playwright test
```

Execute em modo visual ou debug
```bash
npx playwright test --headed
npx playwright test --debug
```

Gere e visualize relatórios de teste
```bash
npx playwright show-report
```

## Testes
### ✅ Testes de Cadastro
1. Deve poder cadastrar uma nova tarefa: verifica se uma nova tarefa pode ser criada com sucesso e aparece na lista
2. Deve exibir erro ao cadastrar tarefa duplicada: valida a exibição de uma mensagem de erro ao tentar criar uma tarefa com nome já existente.
3. Não deve permitir tarefa com nome em branco: verifica se o campo de nome da tarefa é obrigatório e exibe a mensagem de validação correta.
4. Deve incrementar em 1 o contador de tarefas ao criar uma nova tarefa: garante que o contador de tarefas aumente após adicionar uma nova.

### 🔄 Testes de Atualização
5. Deve marcar uma tarefa como concluída: verifica se uma tarefa pode ser marcada como concluída.
6. Deve incrementar em 1 o contador de tarefas concluídas ao concluir uma tarefa: garante que o contador de tarefas concluídas aumente corretamente.
7. Deve desmarcar uma tarefa como concluída: verifica se uma tarefa pode ser marcada como "não concluída" novamente.
8. Deve decrementar em 1 o contador de tarefas concluídas ao desmarcar uma tarefa: garante que o contador de tarefas concluídas seja decrementado corretamente.
9. Deve exibir modal de warning ao tentar marcar como concluída uma tarefa que já foi excluída: testa se o sistema exibe um aviso ao tentar concluir uma tarefa que não existe mais.

### 🗑️ Testes de Exclusão
10. Deve remover uma tarefa da lista: verifica se a tarefa é removida corretamente da interface.
11. Deve decrementar em 1 o contador ao remover uma tarefa: garante que o contador de tarefas seja atualizado corretamente após exclusão.
