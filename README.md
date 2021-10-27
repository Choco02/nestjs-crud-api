# Uma API com CRUD simples de pessoas feita em [NestJS](https://nestjs.com/) e [Prisma](https://www.prisma.io/)

# Como rodar o projeto
* Clone ou baixe o projeto
* Instale as dependências com `npm i` ou `yarn`
* Inicie o projeto em modo de desenvolvimento com `npm run start:dev` ou `yarn start:dev`

## Modo de uso

```
GET /pessoas
```
* Retorna todos os usuários da Db (*SELECT * FROM pessoas*) 

```
POST /pessoas
```
* Cria um novo usuário em *pessoas*
*Recebe um body com seguintes parâmetros `name`, `email`, `phone` e uma `image`.
Tudo enviado com *Content-Type multpart/formdata**

```
DELETE /pessoas/:id
```
* Deleta um usuário da Db usando seu *id*

```
PATCH /pessoas/:id
```
* Alterar algum dado de usuário pesquisando por seu *id*

Foi criado um arquivo html para demonstrar o consumo da API visualmente em um frontend simples, estão implementados os métodos **Create**, **Read** e **Delete**, ainda não foi feito o **Update**. Para visualizar a demonstração inicie o servidor do nest e verifique se está executando em localhost na porta 3000, depois é só abrir o arquivo html, clicando mesmo.
É possível testar todas as rotas da API usando algum software como [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/) ou algum online como [reqbin](https://reqbin.com/), caso escolha o online, expor seu localhost usando softwares como [Ngrok](https://ngrok.com/) pode ser útil.
