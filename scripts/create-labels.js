#!/usr/bin/env node

/**
 * Script para criar labels padronizadas no GitHub
 *
 * Como usar:
 * 1. Instale as dependências: npm install @octokit/rest
 * 2. Configure um token de acesso pessoal do GitHub com permissões de repo
 * 3. Execute: GITHUB_TOKEN=seu_token_aqui node create-labels.js owner/repo
 */

const { Octokit } = require('@octokit/rest');

// Verifique se o token está definido
if (!process.env.GITHUB_TOKEN) {
  console.error('⛔ GITHUB_TOKEN não definido. Configure a variável de ambiente GITHUB_TOKEN.');
  process.exit(1);
}

// Verifique se o repositório foi especificado
if (process.argv.length < 3) {
  console.error('⛔ Repositório não especificado. Use: node create-labels.js owner/repo');
  process.exit(1);
}

const [owner, repo] = process.argv[2].split('/');
if (!owner || !repo) {
  console.error('⛔ Formato de repositório inválido. Use: owner/repo');
  process.exit(1);
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Definição das labels padronizadas
const labels = [
  // Tipos de Issue
  {
    name: 'bug',
    description: 'Algo não está funcionando conforme esperado',
    color: 'e11d21',
  },
  {
    name: 'enhancement',
    description: 'Nova funcionalidade ou solicitação de melhoria',
    color: '0052cc',
  },
  {
    name: 'documentation',
    description: 'Melhorias ou adições à documentação',
    color: '0075ca',
  },
  {
    name: 'refactor',
    description: 'Refatoração de código existente sem alteração de comportamento',
    color: 'fbca04',
  },
  {
    name: 'test',
    description: 'Adição ou melhoria de testes',
    color: 'd4c5f9',
  },
  {
    name: 'chore',
    description: 'Alterações em processos de build ou ferramentas auxiliares',
    color: 'bfdadc',
  },

  // Prioridades
  {
    name: 'priority: low',
    description: 'Baixa prioridade - pode ser tratado futuramente',
    color: 'c2e0c6',
  },
  {
    name: 'priority: medium',
    description: 'Prioridade média - deve ser tratado em breve',
    color: 'fbca04',
  },
  {
    name: 'priority: high',
    description: 'Alta prioridade - deve ser tratado o mais rápido possível',
    color: 'eb6420',
  },
  {
    name: 'priority: critical',
    description: 'Prioridade crítica - bloqueador ou problema emergencial',
    color: 'e11d21',
  },

  // Status
  {
    name: 'status: ready',
    description: 'Pronto para ser trabalhado',
    color: '0e8a16',
  },
  {
    name: 'status: in-progress',
    description: 'Trabalho em andamento',
    color: '1d76db',
  },
  {
    name: 'status: review-needed',
    description: 'Pronto para revisão',
    color: 'fbca04',
  },
  {
    name: 'status: blocked',
    description: 'Bloqueado por uma dependência externa',
    color: 'd93f0b',
  },
  {
    name: 'status: duplicate',
    description: 'Este problema ou PR já existe',
    color: 'cfd3d7',
  },
  {
    name: 'status: invalid',
    description: 'Não é mais relevante',
    color: 'e4e669',
  },
  {
    name: 'status: wontfix',
    description: 'Não será trabalhado',
    color: 'ffffff',
  },

  // Escopo
  {
    name: 'scope: frontend',
    description: 'Relacionado à interface do usuário',
    color: 'c5def5',
  },
  {
    name: 'scope: backend',
    description: 'Relacionado à lógica de negócios ou APIs',
    color: 'd4c5f9',
  },
  {
    name: 'scope: infrastructure',
    description: 'Relacionado à infraestrutura, CI/CD, configurações',
    color: 'bfd4f2',
  },

  // Triagem
  {
    name: 'triage',
    description: 'Necessita triagem',
    color: 'd4c5f9',
  },
  {
    name: 'good first issue',
    description: 'Bom para contribuidores de primeira viagem',
    color: '7057ff',
  },
  {
    name: 'help wanted',
    description: 'Precisa de ajuda adicional',
    color: '008672',
  },
];

/**
 * Cria ou atualiza as labels no repositório
 */
async function createLabels() {
  console.warn(`🏷️ Configurando labels para ${owner}/${repo}...`);

  try {
    // Busca as labels existentes
    const { data: existingLabels } = await octokit.issues.listLabelsForRepo({
      owner,
      repo,
      per_page: 100,
    });

    const existingLabelNames = existingLabels.map(label => label.name);

    // Cria ou atualiza cada label
    for (const label of labels) {
      try {
        if (existingLabelNames.includes(label.name)) {
          // Atualiza a label existente
          await octokit.issues.updateLabel({
            owner,
            repo,
            name: label.name,
            description: label.description,
            color: label.color,
          });
          console.warn(`✅ Label atualizada: ${label.name}`);
        } else {
          // Cria nova label
          await octokit.issues.createLabel({
            owner,
            repo,
            name: label.name,
            description: label.description,
            color: label.color,
          });
          console.warn(`✅ Label criada: ${label.name}`);
        }
      } catch (error) {
        console.error(`❌ Erro ao processar label ${label.name}:`, error.message);
      }
    }

    console.warn('🎉 Configuração de labels concluída!');
  } catch (error) {
    console.error('❌ Erro ao configurar labels:', error.message);
    process.exit(1);
  }
}

createLabels();
