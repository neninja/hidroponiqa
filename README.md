# HidroponiQA

[![emojicom](https://img.shields.io/badge/emojicom-%F0%9F%90%9B%20%F0%9F%86%95%20%F0%9F%92%AF%20%F0%9F%91%AE%20%F0%9F%86%98%20%F0%9F%92%A4-%23fff)](http://neni.dev/emojicom)

Testes automatizados do [Hidroponica](https://github.com/neninja/hidroponica). Todos os testes necessitam do sistema sendo executado localmente em ambiente *local*/*staging* com o *seeder* padrão.

![NPM start](./docs/peek.gif)

## Desenvolvimento

## Ambiente

```sh
npm i
```

## Execução

- `npm start` desenvolvimento/debug dos testes 
- `npm test` utilização dos testes para validar o sistema

> Apesar de termos o comando `npm run update-snapshots`, para atualizar os screenshots é melhor apagar manualmente e rodar novamente os testes para recriá-los. Isso evita atualizar todas as capturas de maneira equivocada

### Linting

```sh
npm run format
```
