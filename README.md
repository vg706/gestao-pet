# gestao-pet

Uma aplicação multiplataforma para gestão e acompanhamento de atendimento veterinário.
---
## Contexto do problema

Tendo em vista o atendimento público prestado a cães e gatos na cidade de fortaleza, o registro e acompanhamento de animais após a realização da inserção de microchip neles só está disponível aos gestores e servidores que prestam os serviços veterinários na cidade. Por meio desse registro, é possível manter os dados do tutor, histórico de saúde e vacinas, porém, os **próprios tutores não conseguem acessar tais informações.**

Logo, o problema que surge se baseia na **falta de transparência de informações para acompanhamento da saúde dos animais por seus tutores.**
A solução é voltada para facilitar o acompanhamento de atendimentos e histórico de saúde animal em fortaleza.


### Equipe de desenvolvimento

Caio Henrique Felix da Silveira
Emmanuel de Oliveira e Silva
Layza Larissa dos Santos
Thiago da Silva Tavares
Vinicius Gabriel da Justa Ximenes
William Julian Lemos de Holanda


### Objetivos do sistema

Garantir que tutores consigam acompanhar a saúde de seus animais e procedimentos realizados pelos serviços veterinários da prefeitura. Possibilitar que os servidores públicos consigam encontrar,registrar animais e suas consultas realizadas.

### Escopo

Cadastrar usuários: tutores e servidores.
Registrar animais (servidor).
Adicionar animal ao perfil (tutor).
Visualizar dados do animal (servidor/tutor).
Visualizar consultas e procedimentos realizados (servidor/tutor).
Pesquisar por animais registrados (servidor).
Registrar consultas (servidor).

### Diagrama de arquitetura
![Fluxo de login/cadastro, acompanhamento do animal pelo tutor e consulta pelo servidor em atendimento](https://github.com/[vg706]/[gestao-pet]/blob/[dev]/app-userflow.jpg?raw=true)

### Cronograma Etapa N2
**Outubro – Semana 1**
	- Planejamento e SetupRevisar
    - fluxos e definir MVP final. 
    - Configurar repositórios separados (web e mobile). 
    - Criar classes no Back4App (User, Animal, Consulta). 
    - Setup inicial web (frontend) e mobile (React Native/Flutter).
**Outubro – Semana 2**
	Login e Cadastro 
    - Implementar autenticação no web e mobile. 
    - Diferenciar gestor/tutor via campo role. 
    - Garantir persistência de sessão. 
    - Testes iniciais em navegador e simulador.
**Outubro – Semana 3**
	Fluxo Tutor – Parte 1 
    - Web: adicionar, editar e remover animal. 
    - Mobile: tela “meus pets” e adicionar animal. 
    - Banco: garantir relacionamento Tutor → Animais. 
    - Testes CRUD tutor em ambos.
**Outubro – Semana 4**
	Fluxo Tutor – Parte 2 
    - Web: histórico de consultas e detalhes do animal. 
    - Mobile: detalhes do animal e histórico. 
    - Integração tutor com consultas (versão inicial).
**Novembro – Semana 5**
	Fluxo Gestor – Parte 1 
    - Web: implementar pesquisa de animal e permitir criar registro caso não exista. 
    - Mobile: criar tela de pesquisa de animal, com opção de cadastro quando não encontrado. 
    - Banco: ajustar permissões para que o gestor tenha acesso a todos os animais.
**Novembro – Semana 6**
	Fluxo Gestor – Parte 2 
    - Web: implementar registro de consulta vinculada a um animal. 
    - Mobile: criar tela de registro de consulta, salvando dados no Back4App. 
    - Integração: validar que consultas cadastradas pelo gestor aparecem no histórico do tutor.
**Novembro – Semana 7**
	Design e Usabilidade 
    - Web: ajustar layout, responsividade e experiência de uso. 
    - Mobile: implementar navegação/tab bar e feedback visual (loading, mensagens de erro, confirmações). 
    - Testes em diferentes navegadores e dispositivos móveis.
**Novembro – Semana 8**
	Finalização e Documentação 
    - Testes ponta a ponta em web e mobile. 
    - Correções finais de bugs. 
    - Revisão de código e organização dos repositórios. 
    - Documentar fluxos, classes e instruções de uso.

### Tecnologias

**Web:**
Javascript
Node.js
Back4App

**iOS**
Swift
SwiftUI
CoreData