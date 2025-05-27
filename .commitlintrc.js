module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos permitidos conforme manual de contribuição
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'docs', // Documentação
        'style', // Formatação (sem mudança de lógica)
        'refactor', // Refatoração de código
        'perf', // Melhoria de performance
        'test', // Adição ou correção de testes
        'build', // Mudanças no build ou dependências
        'ci', // Mudanças na integração contínua
        'cd', // Mudanças na entrega contínua
        'improve', // Melhorias gerais
        'revert', // Reverter mudanças anteriores
        'chore', // Mudanças de build, dependências externas, etc
      ],
    ],

    // Escopos
    'scope-enum': [
      1,
      'always',
      [
        'auth', // Autenticação
        'cnpj', // Validação e consulta de CNPJ
        'thesis', // Teses tributárias
        'questionnaire', // Questionários
        'report', // Relatórios
        'ui', // Interface do usuário
        'api', // APIs
        'db', // Banco de dados
        'config', // Configurações
        'deps', // Dependências
        'workflow', // GitHub Actions
        'docs', // Documentação
      ],
    ],

    // Configurações de formato
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 50],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Configurações do corpo da mensagem
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],

    // Configurações do footer
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },

  // Configurações específicas do projeto
  prompt: {
    questions: {
      type: {
        description: 'Selecione o tipo de mudança que você está commitando:',
        enum: {
          feat: {
            description: 'Uma nova funcionalidade',
            title: 'Features',
          },
          fix: {
            description: 'Uma correção de bug',
            title: 'Bug Fixes',
          },
          docs: {
            description: 'Mudanças apenas na documentação',
            title: 'Documentation',
          },
          style: {
            description:
              'Mudanças que não afetam o significado do código (espaços em branco, formatação, etc)',
            title: 'Styles',
          },
          refactor: {
            description:
              'Uma mudança de código que não corrige um bug nem adiciona uma funcionalidade',
            title: 'Code Refactoring',
          },
          perf: {
            description: 'Uma mudança de código que melhora a performance',
            title: 'Performance Improvements',
          },
          test: {
            description: 'Adicionando testes ausentes ou corrigindo testes existentes',
            title: 'Tests',
          },
          build: {
            description: 'Mudanças que afetam o sistema de build ou dependências externas',
            title: 'Builds',
          },
          ci: {
            description: 'Mudanças nos arquivos e scripts de configuração de CI',
            title: 'Continuous Integrations',
          },
          improve: {
            description: 'Melhorias gerais no código',
            title: 'Improvements',
          },
          revert: {
            description: 'Reverte um commit anterior',
            title: 'Reverts',
          },
          chore: {
            description: 'Mudanças de build, dependências externas, etc',
            title: 'Chores',
          },
        },
      },
      scope: {
        description: 'Qual é o escopo desta mudança (ex: cnpj, auth, ui):',
      },
      subject: {
        description: 'Escreva uma descrição curta e imperativa da mudança:',
      },
      body: {
        description: 'Forneça uma descrição mais longa da mudança (opcional):',
      },
      isBreaking: {
        description: 'Existem mudanças que quebram a compatibilidade? (opcional)',
      },
      breakingBody: {
        description:
          'Um commit BREAKING CHANGE requer um corpo. Por favor, insira uma descrição mais longa do próprio commit (opcional):',
      },
      breaking: {
        description: 'Descreva as mudanças que quebram a compatibilidade (opcional):',
      },
      isIssueAffected: {
        description: 'Esta mudança afeta alguma issue aberta? (opcional)',
      },
      issuesBody: {
        description:
          'Se as issues são fechadas, o commit requer um corpo. Por favor, insira uma descrição mais longa do próprio commit (opcional):',
      },
      issues: {
        description: "Adicione referências de issues (ex: 'fix #123', 're #123') (opcional):",
      },
    },
  },
};
