## Requisitos funcionais

- O dono de pet deve ser capaz de acessar os dados de seus animais.
- O dono de pet deve ser capaz de acessar o histórico médico de seus animais.
- O dono de pet deve ser capaz de acessar registros de consultas de seus animais.
- O dono de pet deve conseguir registrar e editar animais pertencentes a sua casa.

- O servidor público deve ser capaz de abrir um registro de consulta e inserir procedimentos realizados para qualquer pet registrado no sistema.
- O servidor público deve ser capaz de cadastrar novos animais no sistema.
- O servidor público deve ser capaz de pesquisar pelos donos de animais cadastrados no sistema e visualizar seus pets.

- Todos os usuários devem conseguir acessar o sistema por meio de seus aparelhos móveis ou na web.

## Requisitos não funcionais

- O sistema deve garantir que cada dono de pet só consiga visualizar e editar dados de seus próprios animais.

- O sistema deve estar disponível pelo menos 99% do tempo em horário comercial.

- O tempo de resposta para consultas e listagens não deve ultrapassar 2 segundos em condições normais de uso.

- A interface deve ser intuitiva e responsiva, permitindo acesso tanto em desktop quanto em dispositivos móveis.

- A identidade visual da aplicação deve consistir em cores que não sejam chamativas e não sobrecarregue o usuário com muitas informações nas telas.

- O sistema deve oferecer mensagens de erro claras e orientações para o usuário corrigir problemas.

- O sistema deve ser desenvolvido com arquitetura modular, de forma a permitir fácil evolução e correção de falhas.

- O sistema deve permitir a inclusão de novos módulos (ex.: propagandas de campanhas na cidade) sem necessidade de grandes reestruturações.


## Regras de negócio

- Quando um usuário que é dono de pet deseja cadastrar um novo animal, aquele registro deve ser visível tanto para o dono como para o servidor público que buscar pelo animal no sistema. O mesmo vale para a ação de remover um animal, este não será mais vísível para o servidor.

- Os usuários que trabalham usando o sistema não devem ter um perfil que pode ser vistos pelos donos de pet. Porém, os servidores públicos devem poder visualizar os perfis dos donos de pet.

- Para encontrar um animal registrado, o servidor público deve pesquisar somente pelo nome do seu dono e acessar os animais cadastrados sob aquele usuário.

- Os dados dos animais que devem ser visíveis tanto para seu dono quanto para o servidor público são apenas aqueles que podem influenciar em um diagnóstico e são úteis para seu acompanhamento veterinário.

- O sistema não armazena o registro fotográfico de animais ou seus donos, o seu foco é totalmente voltado para o cuidado veterinário dos animais da cidade. 

- Para o bom funcionamento do sistema e segurança dos usuários, apenas informações essenciais para o cadastro são armazenadas. Para os donos de pet: nome, e-mail, senha, animais. Para os servidores públicos: e-mail, senha.

## Histórias de usuário

- Como dono de pet, quero conferir o tempo no qual tomaram as últimas vacinas, para saber quando devo vaciná-los novamente.

- Como dono de pet, quero visualizar o que foi feito nas últimas consultas realizadas, para notar o que devo fazer para cuidar da saúde do meu pet.

- Como dono de pet, quero armazenar todos os dados que são repassados numa consulta sobre a saúde do meu animal, para que possa prover o tratamento necessário.

- Como dono de pet, quero registrar e salvar informações de cada animal que tenho em casa, para que eu não perca os dados de nenhuma consulta e procedimento veterinário que for realizado.

- Como dono de pet, quero editar ou remover informações sobre meus animais, para que nenhum erro seja levado em conta ao cuidar de sua saúde.

- Como servidor público, quero criar registros de animais que são consultados pela primeira vez, para que ele não deixe de realizar nem repita nenhum procedimento.

- Como servidor público, quero encontrar facilmente contas de donos de pet, para acessar os dados de seus animais.

- Como servidor público, quero visualizar as últimas vacinas recebidas por um animal, para vaciná-lo com o que falta em seu quadro.

- Como servidor público, no registro dos animais no sistema quero editar o peso, comorbidades e tratamentos que devem receber, para que o seus donos não percam de vista essas informações sobre o pet.

## Perfis de usuários

### Dono de pet
- Pessoa que cuida de animais e deseja acessar serviços oferecidos pela prefeitura.
- Objetivos: Consultar dados e histórico médico dos animais, acessar informações repassadas em consultas, registrar e atualizar informações de seus pets.

### Servidor público (funcionário da prefeitura)
- Profissional responsável por registrar, atualizar e consultar dados relacionados aos animais atendidos.
- Objetivos: Cadastrar novos animais no sistema, registrar consultas, procedimentos realizados e prescrições de tratamento, pesquisar animais já cadastrados.