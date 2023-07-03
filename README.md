## 🚀 Tecnologias

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [uuid](https://github.com/uuidjs/uuid)

#### Integração Google Sheets e HubSpot CRM

- Este projeto consiste na integração entre as plataformas Google Sheets e HubSpot CRM. Essa
  integração possibilita a obtenção dos dados de contato de uma planilha do Google Sheets e a
  inserção dessas informações como contatos no HubSpot CRM.

- Possue os seguintes campos: Nome da Empresa, Nome Completo, Email, Telefone, Website.

#

## ❓ Como utilizar

- Deve colocar o ID da planilha e o Token do HubSpot no campo: spreadsheetId e accessToken.

### Como instalar

```bash
$ yarn
```

### ❓ credentials.json

Salve o arquivo de chaves gerado na api do google cloud com o nome credentials.json.

### Como inicializar localmente

```bash
func host start
```

### Descrição

A API de noticias tem como funcionalidades o cadastros de autoes e suas noticias.
