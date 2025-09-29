# Documentação de Requisitos - Gestão-Pet
## 1. Requisitos Funcionais

### 1.1. Módulo de Autenticação e Usuários
**RF001 - Cadastro de Usuários**
- O sistema deve permitir o cadastro de novos usuários (tutores e servidores públicos)
- Deve ser possível selecionar o tipo de usuário durante o cadastro
- Cada usuário deve ter um email e senha únicos
**RF002 - Login no Sistema**
- O sistema deve permitir login com email e senha
- Deve diferenciar o acesso por tipo de usuário (tutor/servidor)
- Deve manter a sessão do usuário ativa durante o uso
**RF003 - Gestão de Perfil**
- Usuários devem poder visualizar seus dados cadastrais
- Tutores devem poder editar suas informações pessoais

### 1.2. Módulo de Gestão de Animais (Tutor)
**RF004 - Cadastro de Animais por Tutor**
- Tutores devem poder cadastrar novos animais em seu perfil
- Cada animal deve ter: nome, espécie, raça, data de nascimento aproximada
- Tutores devem poder editar informações de seus animais

**RF005 - Visualização de Animais**
- Tutores devem visualizar lista de seus animais cadastrados
- Deve ser possível visualizar dados completos de cada animal
- Deve mostrar data da última consulta e próxima vacina
**RF006 - Histórico de Consultas (Tutor)**
- Tutores devem visualizar histórico completo de consultas de cada animal
- Deve mostrar data, procedimentos realizados e observações
- Deve exibir-  vacinas aplicadas e datas de vencimento

### 1.3. Módulo de Gestão de Animais (Servidor)
**RF007 - Pesquisa de Animais**
- Servidores devem poder pesquisar animais por nome do tutor
- Deve retornar lista de animais vinculados ao tutor encontrado
- Deve permitir acesso rápido aos dados do animal

**RF008 - Cadastro de Animais por Servidor**
- Servidores devem poder cadastrar novos animais no sistema
- Deve ser possível vincular animal a tutor existente
- Deve seguir mesma estrutura de dados do cadastro por tutor

**RF009 - Registro de Consultas**
- Servidores devem poder registrar novas consultas para qualquer animal
- Cada consulta deve conter: data, procedimentos, vacinas, observações
- Deve ser possível visualizar histórico de consultas do animal

### 1.4. Módulo de Relatórios e Consultas
**RF010 - Acesso Multiplataforma**
- O sistema deve estar acessível via web para tutores e servidores
- Deve ter versão mobile otimizada para tutores
- A interface deve ser responsiva em diferentes dispositivos

## 2. Requisitos Não Funcionais
### 2.1. Desempenho
**RNF001 - Tempo de Resposta**
- O sistema deve responder em até 2 segundos para 95% das requisições
- Consultas ao banco de dados não devem exceder 500ms
- A interface deve carregar em até 3 segundos em conexão 3G

**RNF002 - Disponibilidade**
- O sistema deve estar disponível 99% do tempo em horário comercial (8h-18h)
- Tempo de inatividade planejado não deve exceder 4 horas mensais
- Deve ter backup automático diário dos dados

### 2.2. Segurança
**RNF003 - Controle de Acesso**
- Cada tutor só pode visualizar e editar seus próprios animais
- Servidores podem acessar todos os animais do sistema
- Dados sensíveis devem ser criptografados em trânsito e em repouso

**RNF004 - Autenticação**
- Senhas devem ser armazenadas usando hash bcrypt
- Sessões devem expirar após 24 horas de inatividade
- Deve haver limite de tentativas de login (5 tentativas)

### 2.3. Usabilidade
**RNF005 - Interface Intuitiva**
- A interface deve ser fácil de usar para usuários leigos em tecnologia
- Deve seguir padrões de design material design
- Navegação deve ser consistente entre web e mobile

**RNF006 - Acessibilidade**
- Deve suportar zoom até 200% sem quebra de layout
- Cores devem ter contraste mínimo de 4.5:1 para texto
- Deve ser navegável via teclado na versão web

### 2.4. Manutenibilidade
**RNF007 - Arquitetura Modular**
- O código deve ser organizado em módulos independentes
- Deve permitir adição de novas funcionalidades sem reestruturação completa
- Documentação técnica deve estar sempre atualizada

**RNF008 - Logs e Monitoramento**
- Deve registrar logs de atividades importantes
- Deve monitorar performance e gerar alertas para problemas
- Logs devem ser mantidos por 90 dias

## 3. Regras de Negócio
### 3.1. Gestão de Usuário
**RN001 - Tipo de Usuário**- 
- Um usuário pode ser "tutor" ou "servidor"
- O tipo é definido no cadastro e não pode ser alterado
- Servidores não têm perfil visível para tutores

**RN002 - Propriedade de Animais**
- Um animal pertence a um único tutor
- Um tutor pode ter múltiplos animais
- Servidores podem visualizar todos os animais, mas não são donos

### 3.3. Dados e Privacidade
**RN003 - Visibilidade de Dados**
- Tutores veem apenas seus próprios animais
- Servidores veem todos os animais do sistema
- Dados de contato do tutor são visíveis apenas para servidores

**RN004 - Registro de Consultas**
- Apenas servidores podem registrar consultas
- Cada consulta fica vinculada permanentemente ao animal
- Histórico não pode ser editado após salvo

**RN005 - Informações Armazenadas**
- Não armazena fotos de animais ou tutores
- Foco exclusivo em dados de saúde veterinária
- Dados mínimos necessários: nome, espécie, histórico médico

## 4. Histórias de Usuário
### 4.1. Histórias do Tutor
**HU001 - Visualização de Histórico de Vacinas**
- **Como** tutor
- **Quero** visualizar as datas das últimas vacinas aplicadas
- **Para que** eu possa saber quando vacinar meu animal novamente
- **Critérios de aceitação:**
    - Deve mostrar vacina, data de aplicação e data de vencimento
    - Deve destacar vacinas próximas do vencimento
    - Deve permitir filtrar por animal específico

**HU002 - Acompanhamento de Consultas**
- **Como** tutor
- **Quero** visualizar o que foi feito nas últimas consultas
- **Para que** eu possa seguir as recomendações veterinárias
- **Critérios de aceitação:**
    - Deve mostrar data, procedimentos e observações
    - Deve exibir nome do servidor que realizou a consulta
    - Deve estar ordenado por data (mais recente primeiro)

**HU003 - Gestão de Múltiplos Animais**
- **Como** tutor com vários animais
- **Quero** gerenciar informações de cada animal separadamente
- **Para que** eu não misture os históricos médicos
- **Critérios de aceitação:**
    - Deve permitir cadastrar novos animais
    - Deve permitir editar informações existentes
    - Deve mostrar lista clara com todos os animais

### 4.2. Histórias do Servidor
**HU004 - Cadastro de Novos Animais**
- **Como** servidor público
- **Quero** cadastrar animais atendidos pela primeira vez
- **Para que** eles tenham histórico no sistema
- **Critérios de aceitação:**
    - Deve permitir vincular animal a tutor existente
    - Deve validar dados obrigatórios (nome, espécie)
    - Deve confirmar cadastro com mensagem de sucesso

**HU005 - Pesquisa Eficiente**
- **Como** servidor público
- **Quero** encontrar rapidamente animais já cadastrados
- **Para que** eu possa registrar novas consultas
- **Critérios de aceitação:**
    - Deve permitir busca por nome do tutor
    - Deve mostrar resultados enquanto digita
    - Deve permitir cadastrar novo animal se não encontrado

**HU006 - Registro Completo de Consultas**
- **Como** servidor público
- **Quero** registrar todos os procedimentos realizados
- **Para que** o tutor tenha informações completas
- **Critérios de aceitação:**
    - Deve permitir registrar data, procedimentos, vacinas
    - Deve salvar automaticamente data e responsável
    - Deve confirmar registro com mensagem de sucesso

## 5. Perfis de Usuários
### 5.1. Tutor/Dono de Animal
**Características Demográficas:**
- Idade: 18-70 anos
- Localização: Fortaleza e região metropolitana
- Escolaridade: Variada (ensino fundamental a superior)
- Familiaridade com tecnologia: Básica a intermediária

**Necessidades e Objetivos:**
- Acompanhar saúde de seus animais de estimação
- Ter acesso fácil a informações de consultas passadas
- Saber datas de vacinação e procedimentos necessários
- Evitar perda de informações importantes

**Comportamento no Sistema:**
- Acesso principalmente via mobile
- Uso esporádico (após consultas veterinárias)
- Necessidade de interface simples e intuitiva

### 5.2. Servidor Público/Veterinário
**Características Demográficas:**
- Idade: 25-60 anos
- Formação: Técnica ou superior em área relacionada
- Local de trabalho: Unidades veterinárias públicas
- Familiaridade com tecnologia: Intermediária a avançada

**Necessidades e Objetivos:**
- Registrar atendimentos de forma eficiente
- Acessar histórico completo dos animais
- Reduzir papelada e duplicação de informações
- Melhorar qualidade do serviço público

**Comportamento no Sistema:**
- Acesso principalmente via desktop durante expediente
- Uso frequente e intensivo
- Necessidade de funcionalidades avançadas de busca

## 6. Diagramas de Fluxo
### 6.1. Fluxo Principal do Sistema
![](/images/app-userflow.png)

### 6.2. Legenda dos Elementos
![](/images/legenda-userflow.png)

### 6.3. Fluxos Detalhados
#### **Fluxo de Autenticação:**
1. Usuário acessa sistema e seleciona tipo (tutor/servidor)
2. Sistema verifica se tem cadastro
3. Se não tem, redireciona para cadastro
4. Se tem, faz login e redireciona para dashboard apropriado

#### **Fluxo do Tutor:**
1. Acessa lista de seus animais
2. Seleciona animal específico ou adiciona novo
3. Visualiza histórico de consultas e procedimentos
4. Gerencia dados do animal (editar/remover)

#### **Fluxo do Servidor:**
1. Pesquisa animal por nome do tutor
2. Visualiza animais encontrados
3. Seleciona animal para registro de consulta
4. Preenche dados da consulta e salva

## 7. Protótipos Relacionados
Cada requisito funcional possui protótipos correspondentes disponíveis na pasta ../prototypes/:
- **RF001-RF003:** Login e Cadastro
- **RF004-RF006:** Meus Pets e Cadastro Animal
- **RF007-RF009:** Pesquisa e Registro Consulta
- **RF010:** Versão Mobile de todas as funcionalidades
