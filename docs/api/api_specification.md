# Especificação da API - Gestão-Pet

## 1. Visão Geral da API
A API do sistema Gestão-Pet segue o padrão RESTful e é hospedada no Back4App (Parse Server). Todas as requisições devem ser autenticadas usando o token de sessão, exceto os endpoints de login e cadastro.

**URL Base:** https://parseapi.back4app.com/

**Headers Comuns:**

```http
X-Parse-Application-Id: {APPLICATION_ID}
X-Parse-REST-API-Key: {REST_API_KEY}
X-Parse-Session-Token: {SESSION_TOKEN}  # Para requisições autenticadas
Content-Type: application/json
```

## 2. Autenticação e Autorização

### 2.1. Login de Usuário
**Endpoint:** `POST /login`

**Parâmetros de Requisição:**

```json
{
  "username": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**

```json
{
  "objectId": "USER_ID",
  "username": "usuario@email.com",
  "email": "usuario@email.com",
  "tipo": "tutor",
  "nome": "Maria Silva",
  "sessionToken": "r:session_token_value",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-15T14:30:00.000Z"
}
```

**Resposta de Erro (400):**

```json
{
  "code": 101,
  "error": "Invalid username/password."
}
```

### 2.2. Cadastro de Usuário
**Endpoint:** `POST /users`

**Parâmetros de Requisição:**

```json
{
  "username": "novo@email.com",
  "password": "senha123",
  "email": "novo@email.com",
  "tipo": "tutor",
  "nome": "João Santos"
}
```

**Resposta de Sucesso (201):**

```json
{
  "objectId": "NEW_USER_ID",
  "createdAt": "2023-12-15T15:00:00.000Z",
  "sessionToken": "r:new_session_token"
}
```

### 2.3. Logout
**Endpoint:** `POST /logout`

**Headers:**

```http
X-Parse-Session-Token: {SESSION_TOKEN}
```

**Resposta de Sucesso (200):**

```json
{}
```

## 3. Endpoints de Animais

### 3.1. Listar Animais do Tutor
**Endpoint:** `GET /classes/Animal`

**Query Parameters:**

```http
where={"usuario": {"__type":"Pointer","className":"_User","objectId":"USER_ID"}}
```

**Resposta de Sucesso (200):**

```json
{
  "results": [
    {
      "objectId": "ANIMAL_ID_1",
      "nome": "Rex",
      "especie": "cao",
      "raca": "Vira-lata",
      "data_nascimento": "2020-06-15",
      "peso": 18.5,
      "comorbidades": "Nenhuma",
      "observacoes": "Animal saudável",
      "usuario": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": "USER_ID"
      },
      "createdAt": "2023-10-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T14:30:00.000Z"
    }
  ]
}
```

### 3.2. Buscar Animal por ID
**Endpoint:** `GET /classes/Animal/{ANIMAL_ID}`

**Resposta de Sucesso (200):**

```json
{
  "objectId": "ANIMAL_ID",
  "nome": "Luna",
  "especie": "gato",
  "raca": "Siamesa",
  "data_nascimento": "2021-03-20",
  "peso": 4.2,
  "comorbidades": "Alergia alimentar",
  "observacoes": "Dieta especial",
  "usuario": {
    "__type": "Pointer",
    "className": "_User",
    "objectId": "USER_ID"
  },
  "createdAt": "2023-10-15T09:00:00.000Z",
  "updatedAt": "2023-12-10T16:45:00.000Z"
}
```

### 3.3. Criar Animal (Tutor)
**Endpoint:** `POST /classes/Animal`

**Parâmetros de Requisição:**

```json
{
  "nome": "Thor",
  "especie": "cao",
  "raca": "Labrador",
  "data_nascimento": "2019-08-10",
  "peso": 25.0,
  "comorbidades": "Problema articular",
  "observacoes": "Cuidado com escadas",
  "usuario": {
    "__type": "Pointer",
    "className": "_User",
    "objectId": "USER_ID"
  }
}
```

**Resposta de Sucesso (201):**

```json
{
  "objectId": "NEW_ANIMAL_ID",
  "createdAt": "2023-12-15T16:00:00.000Z"
}
```

### 3.4. Atualizar Animal (Tutor)
**Endpoint:** `PUT /classes/Animal/{ANIMAL_ID}`

**Parâmetros de Requisição:**

```json
{
  "peso": 26.5,
  "observacoes": "Peso atualizado na última consulta"
}
```

**Resposta de Sucesso (200):**

```json
{
  "updatedAt": "2023-12-15T16:30:00.000Z"
}
```

### 3.5. Pesquisar Animais (Servidor)
**Endpoint:** `GET /classes/Animal`

**Query Parameters:**

```http
where={"$or":[{"nome":{"$regex":"REX","$options":"i"}},{"usuario.nome":{"$regex":"MARIA","$options":"i"}}]}
include=usuario
```

**Resposta de Sucesso (200):**

```json
{
  "results": [
    {
      "objectId": "ANIMAL_ID",
      "nome": "Rex",
      "especie": "cao",
      "raca": "Vira-lata",
      "usuario": {
        "objectId": "USER_ID",
        "nome": "Maria Silva",
        "email": "maria@email.com",
        "tipo": "tutor"
      },
      "createdAt": "2023-10-01T10:00:00.000Z"
    }
  ]
}
```

## 4. Endpoints de Consultas

### 4.1. Listar Consultas do Animal
**Endpoint:** `GET /classes/Consulta`

**Query Parameters:**

```http
where={"animal": {"__type":"Pointer","className":"Animal","objectId":"ANIMAL_ID"}}
order=-data_consulta
include=usuario
```

**Resposta de Sucesso (200):**

```json
{
  "results": [
    {
      "objectId": "CONSULTA_ID",
      "data_consulta": "2023-12-15",
      "procedimentos": "Consulta de rotina, aplicação de vacina V8",
      "vacinas_aplicadas": "V8",
      "observacoes": "Animal saudável, peso ideal",
      "prescricao": "Retorno em 6 meses",
      "animal": {
        "__type": "Pointer",
        "className": "Animal",
        "objectId": "ANIMAL_ID"
      },
      "usuario": {
        "objectId": "SERVIDOR_ID",
        "nome": "Dr. João Silva",
        "tipo": "servidor"
      },
      "data_registro": "2023-12-15T14:00:00.000Z",
      "createdAt": "2023-12-15T14:00:00.000Z"
    }
  ]
}
```

### 4.2. Registrar Consulta (Servidor)
**Endpoint:** `POST /classes/Consulta`

**Parâmetros de Requisição:**

```json
{
  "data_consulta": "2023-12-15",
  "procedimentos": "Consulta de rotina, limpeza de ouvidos, aplicação de vacina",
  "vacinas_aplicadas": "V8, Raiva",
  "observacoes": "Animal apresentou pequena irritação no ouvido direito",
  "prescricao": "Usar limpa ouvidos 2x por semana por 15 dias",
  "animal": {
    "__type": "Pointer",
    "className": "Animal",
    "objectId": "ANIMAL_ID"
  },
  "usuario": {
    "__type": "Pointer",
    "className": "_User",
    "objectId": "SERVIDOR_ID"
  },
  "data_registro": "2023-12-15T14:00:00.000Z"
}
```

**Resposta de Sucesso (201):**

```json
{
  "objectId": "NEW_CONSULTA_ID",
  "createdAt": "2023-12-15T14:00:00.000Z"
}
```

### 4.3. Buscar Consulta por ID
**Endpoint:** `GET /classes/Consulta/{CONSULTA_ID}`

**Query Parameters:**

```http
include=animal,usuario
```

**Resposta de Sucesso (200):**

```json
{
  "objectId": "CONSULTA_ID",
  "data_consulta": "2023-12-15",
  "procedimentos": "Consulta de emergência",
  "vacinas_aplicadas": "",
  "observacoes": "Animal apresentou vômitos, diagnosticado com gastrite",
  "prescricao": "Dieta leve por 3 dias, medicamento X 1x ao dia",
  "animal": {
    "objectId": "ANIMAL_ID",
    "nome": "Rex",
    "especie": "cao"
  },
  "usuario": {
    "objectId": "SERVIDOR_ID",
    "nome": "Dra. Ana Santos",
    "tipo": "servidor"
  },
  "data_registro": "2023-12-15T14:00:00.000Z",
  "createdAt": "2023-12-15T14:00:00.000Z"
}
```

## 5. Endpoints de Usuários

### 5.1. Buscar Usuário por ID
**Endpoint:** `GET /users/{USER_ID}`

**Resposta de Sucesso (200):**

```json
{
  "objectId": "USER_ID",
  "username": "usuario@email.com",
  "email": "usuario@email.com",
  "tipo": "tutor",
  "nome": "Maria Silva",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-15T14:30:00.000Z"
}
```

### 5.2. Atualizar Perfil do Usuário
**Endpoint:** `PUT /users/{USER_ID}`

**Parâmetros de Requisição:**

```json
{
  "nome": "Maria Silva Santos",
  "email": "novo_email@email.com"
}
```

**Resposta de Sucesso (200):**

```json
{
  "updatedAt": "2023-12-15T17:00:00.000Z"
}
```

## 6. Regras de Autorização

### 6.1. Permissões por Tipo de Usuário

**Tutor:**

- ✅ Ler seus próprios dados de usuário
- ✅ Criar, ler, atualizar e excluir seus próprios animais
- ✅ Ler consultas de seus animais
- ❌ Criar ou modificar consultas
- ❌ Acessar dados de outros usuários

**Servidor:**

- ✅ Ler dados de todos os usuários
- ✅ Ler dados de todos os animais
- ✅ Criar, ler e atualizar consultas de qualquer animal
- ✅ Criar animais (vinculando ao tutor correto)
- ❌ Modificar dados de usuários
- ❌ Excluir animais

### 6.2. Validações no Cloud Code

```javascript
// Exemplo de validação para criação de consulta
Parse.Cloud.beforeSave("Consulta", (request) => {
  const user = request.user;
  const consulta = request.object;
  
  if (!user) {
    throw new Parse.Error(101, "Usuário não autenticado");
  }
  
  if (user.get("tipo") !== "servidor") {
    throw new Parse.Error(119, "Apenas servidores podem registrar consultas");
  }
  
  if (!consulta.get("animal")) {
    throw new Parse.Error(102, "Animal é obrigatório");
  }
  
  // Define automaticamente o servidor que está registrando
  consulta.set("usuario", user);
  consulta.set("data_registro", new Date());
});

// Validação para acesso a animais
Parse.Cloud.beforeFind("Animal", (request) => {
  const user = request.user;
  
  if (!user) {
    throw new Parse.Error(101, "Usuário não autenticado");
  }
  
  // Servidores podem ver todos os animais
  if (user.get("tipo") === "servidor") {
    return;
  }
  
  // Tutores só podem ver seus próprios animais
  const query = request.query;
  query.equalTo("usuario", user);
});
```

## 7. Códigos de Erro

| Código | Descrição                 | Ação Recomendada                |
|--------|---------------------------|---------------------------------|
| 101    | Invalid username/password | Verificar credenciais           |
| 102    | Invalid query             | Verificar parâmetros da query   |
| 119    | Forbidden operation       | Usuário não tem permissão       |
| 201    | Missing required field    | Preencher campo obrigatório     |
| 202    | Email already taken       | Usar outro email                |
| 209    | Invalid session token     | Fazer login novamente           |

## 8. Exemplos Completos

### 8.1. Fluxo Completo: Login → Listar Animais → Registrar Consulta

1. **Login:**

```bash
curl -X POST \  
    -H "X-Parse-Application-Id: YOUR_APP_ID" \
    -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"username":"servidor@prefeitura.gov.br","password":"senha123"}' \
    https://parseapi.back4app.com/login
```

2. **Listar Animais (Servidor):**

```bash
curl -X GET \   
    -H "X-Parse-Application-Id: YOUR_APP_ID" \   
    -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \   
    -H "X-Parse-Session-Token: r:session_token" \
    "https://parseapi.back4app.com/classes/Animal?where=%7B%22nome%22%3A%7B%22%24regex%22%3A%22Rex%22%2C%22%24options%22%3A%22i%22%7D%7D&include=usuario"
```

3. **Registrar Consulta:**

```bash
curl -X POST \   
    -H "X-Parse-Application-Id: YOUR_APP_ID" \   
    -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \   
    -H "X-Parse-Session-Token: r:session_token" \   
    -H "Content-Type: application/json" \   
    -d '{
        "data_consulta": "2023-12-15",
        "procedimentos": "Consulta de rotina e vacinação",
        "vacinas_aplicadas": "V8",
        "observacoes": "Animal saudável",
        "animal": {
        "__type": "Pointer",
        "className": "Animal",
        "objectId": "ANIMAL_ID"
        }
    }' \   
    https://parseapi.back4app.com/classes/Consulta
```

### 8.2. Fluxo Completo: Tutor Visualizando Histórico

1. **Login do Tutor:**

```bash
curl -X POST   
    -H "X-Parse-Application-Id: YOUR_APP_ID"   
    -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY"   
    -H "Content-Type: application/json"   
    -d '{"username":"tutor@email.com","password":"senha123"}'   
    https://parseapi.back4app.com/login
```

2. **Listar Animais do Tutor:**

```bash
curl -X GET   
    -H "X-Parse-Application-Id: YOUR_APP_ID"   
    -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY"   
    -H "X-Parse-Session-Token: r:session_token"   
    "https://parseapi.back4app.com/classes/Animal"
```

3. **Buscar Histórico do Animal:**

```bash
curl -X GET   
    -H "X-Parse-Application-Id: YOUR_APP_ID"   
    -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY"   
    -H "X-Parse-Session-Token: r:session_token"   
    "https://parseapi.back4app.com/classes/Consulta?where=%7B%22animal%22%3A%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Animal%22%2C%22objectId%22%3A%22ANIMAL_ID%22%7D%7D&order=-data_consulta&include=usuario"
```

## 9. Considerações de Performance

### 9.1. Otimizações Recomendadas
- Use `include` para evitar múltiplas requisições
- Use `select` para buscar apenas campos necessários
- Use `limit` e `skip` para paginação
- Use índices no Back4App para campos de busca frequentes

### 9.2. Limites do Back4App
- Máximo de 100 objetos por query (usar paginação)
- Máximo de 2MB por resposta
- Rate limiting: 30 requests/segundo por usuário
