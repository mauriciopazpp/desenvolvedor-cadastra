# Desafio Desenvolvedor Cadastra

## Introdução

Este projeto foi desenvolvido como parte do desafio para a vaga de Desenvolvedor Front-end na Cadastra. Nele, demonstro habilidades avançadas em HTML5, CSS3 e Typescript, além de conhecimentos sólidos no consumo de APIs e na construção de interfaces responsivas e otimizadas com tecnologias robustas como o React. O projeto reflete a minha capacidade de organizar e estruturar um ambiente de desenvolvimento moderno, utilizando as melhores práticas de engenharia de software.

## Instalação

Certifique-se de ter o Node.js (versão 14 ou superior) instalado em sua máquina. Para instalar as dependências do projeto, execute:

```bash
npm install
```
## Execução

#### Ambiente de Desenvolvimento

Para rodar o ambiente de desenvolvimento, use:

```bash
npm run start
```

Nota:

Este comando inicia dois servidores:
- Front-end: A aplicação roda na porta 3000 (acesse em http://localhost:3000).
- API JSON: O servidor JSON é iniciado na porta 5000, disponibilizando os produtos em http://localhost:5000/products

A API JSON simula um servidor de produtos para testar o consumo de dados pela aplicação.

#### Build Final

Para gerar o build final da aplicação, execute:

```bash
npm run build
```

Este comando criará a pasta dist contendo os arquivos finais da aplicação. Para visualizar a loja com o build final, abra o arquivo index.html presente na pasta dist.

Atenção: É necessário que o servidor da API esteja rodando para buscar os produtos. Para isso, execute:

```bash
npm run server
```

## Decisões e Considerações de Desenvolvimento

##### Página de Mockup:
Inicialmente, criei uma página de mockup para centralizar a criação de todos os componentes que seriam utilizados no projeto. Essa abordagem me permitiu ganhar tempo e reduzir o risco de modificar componentes já consolidados. Em um ambiente de produção real, essa página seria desativada (ou até removida), similar à estratégia que eu uso em sistemas como Adobe Commerce, onde eu geralmente incluo via script de deploy o codigo para desabilitar o modulo que cria a página de mockup.

##### Remoção do Gulp:
Removi o Gulp do projeto devido à redundância de funcionalidades, uma vez que o Webpack já oferece todas as ferramentas necessárias para a construção e otimização dos assets. Essa decisão simplifica o fluxo de trabalho e resulta em uma build mais limpa e eficiente. O Webpack já oferece um conjunto robusto de ferramentas, como minificação de arquivos e live-reloading, que substituem a necessidade do Gulp.

##### Oportunidades de Melhoria:
Embora existam diversas melhorias que poderiam ser implementadas — como a otimização de imagens via Webpack, a redução do tamanho do bundle JavaScript, e outras técnicas de performance — optei por manter o setup atual. Acredito que essas otimizações estão fora do escopo do desafio e da vaga, permitindo uma entrega mais focada e objetiva.

### Contato
- Nome: Mauricio Paz Pacheco
- Email: mauriciopazdev@gmail.com
- LinkedIn: linkedin.com/in/m-paz
- Site: mauriciopazpp.github.io

