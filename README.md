# Movie App <a name="topo"></a>

- [Descrição geral](#descricao-geral)
- [Componentes](#componentes)
- [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento)
  - [compose.yml](#compose-yml)
  - [e2e](#e2e)
  - [app](#app)
  - [api](#api)
    - [swagger](#swagger)
  - [.github/workflows/deploy.yml e infra](#github-workflows-deploy-yml-e-infra)

## Descrição geral <a name="descricao-geral"></a>
  Esta é uma aplicação desenvolvida como resposta a um desafio de código.

  São funcionalidades da mesma:
  * Apresentar uma lista de filmes carregada a partir de uma api que consulta
    uma base própria;
  * Tal lista não deve apresentar mais que 10 filmes por vez;
  * Se houverem mais que 10 filmes na base, a tela deve mostrar um
    componente de paginação permitindo que todos os filmes sejam visualizados
    ao acessar as respectivas páginas onde se encontram;
  * O comportamento de paginação deve ser implementado no backend (não deve
    simular a paginação no frontend com todos os dados tendo sido carregados
    de uma única vez a partir daquele);
  * A tela principal deve possuir um botão que permita atualizar a base
    própria a partir de um sistema remoto (inicialmente ghibli-api, mas em
    função de sua instabilidade, foi usado como alterativa o tmdb.com)

  [Topo](#topo)

## Componentes <a name="componentes"></a>

  * Frontend:
    - ReactJS (18.x, usando create-react-app);
    - Biblioteca nativa, fetch, para requisições http para a api do backend;
    - Testing Library (padrão da versão utilizada pelo create-react-app);
    - MSW (0.49.x): biblioteca para mock de requisições http;
  * Backend:
    - NodeJS (18.12.1): plataforma;
    - Express (4.x): framework para tratamento de requisições http;
    - Knex (2.x): biblioteca para facilitar tratamento de interações com a base
      de dados e gerenciamento de migrações;
    - Pg (8.x): driver de acesso a base de dados;
    - Dotenv (16.x): biblioteca para facilitar a inicialização de variáveis de
      ambiente requeridas pelo backend;
    - Jest (29.x): framework de testes;
    - MSW (0.49.x): biblioteca para mock de requisições http;
    - Supertest (6.x): biblioteca para teste de requisições http;
    - Nodemon (2.x): monitor de alteração de código e reload automático.
    - PostgreSQL (15.x): gerenciador de banco de dados
  * Ambiente de desenvolvimento
    - Docker (20.x): gerenciamento dos containeres com os módulos da solução:
      frontend(app)/backend(api)/db, além de outros serviços/containeres
      utilizados no processo: adminer (cliente web para postgresql) e e2e
      (usando uma imagem cypress para testes de ponta a ponta)
  * Ambiente de deploy:
    - Criada uma instância de vm no google cloud platform com docker instalado;
    - Usado um arquivo docker compose específico contendo 3 serviços:
      1. nginx: para deploy da build do frontend;
      2. node: para deploy da build do backend;
      3. db: para rodar uma instância do postgresql requerida pelo backend.
  * CI/CD:
    - Github actions com apenas um workflow contendo todos os passos para
      realizar o build e deploy da solução;

  [Topo](#topo)

## Fluxo de desenvolvimento <a name="fluxo-de-desenvolvimento"></a>

  Após clonar o repositório e entrar no diretório raiz do projeto é possível
  visualizar os seguintes componentes:
  ```
    .
    ├── .github/workflows/deploy.yml
    ├── api/
    ├── app/
    ├── e2e/
    ├── infra/
    ├── compose.yml
    └── README.md
  ```
  A função de cada um será explicada, não necessariamente na ordem apresentada.

  [Topo](#topo)

### compose.yml <a name="compose-yml"></a>

  Começando pelo arquivo `compose.yml` que contem a definição da pilha completa
  do ambiente de desenvolvimento. Estando no mesmo diretório que ele é possível
  executar o seguinte comando para levantar um ambiente totalmente funcional:
  ```
    docker compose down --volumes --remove-orphans && docker compose up --detach
  ```

  Tal ação criará cinco containers/serviços:
  - app, módulo do frontend;
  - api, módulo do backend;
  - db, instância do gerenciador de banco de dados postgres usado pelo backend;
  - adminer, um cliente web para acessar a instância do banco citado;
  - e2e, um container com o cypress configurado e pronto para rodar testes de
    ponta a ponta.

  [Topo](#topo)

### e2e <a name="e2e"></a>

  Passando para o diretório `e2e` é possível observar a seguinte estrutura de
  arquivos e pastas:
  ```
    ./e2e
    ├── cypress
    │   ├── e2e
    │   │   ├── helpers.js
    │   │   ├── helpers.runner.js
    │   │   ├── list-movies.cy.js
    │   │   ├── paginated-list.cy.js
    │   │   └── smoke.cy.js
    │   ├── screenshots
    │   └── videos
    ├── .env.example
    ├── cypress.config.js
    └── package.json
  ```
  Sob o caminho `e2e/cypress/e2e` se fazem notar arquivos com extensão `.cy.js`,
  que se tratam das definições de testes propriamente ditas.

  O arquivo `smoke.cy.js` está aqui, como o nome sugere, para realizar um teste
  do funcionamento saudável do framework e da suíte de testes.

  Os demais arquivos de mesma extensão se referem às funcionalidades
  implementadas até então, com uma visão de alto nível da aplicação como um
  todo.

  Rodando o comando:
  ```
    docker compose exec e2e bash -c "yarn test"
  ```
  Todos os testes existentes no caminho citado serão executados.
  > **_ATENÇÃO_**
  > Esse container depende da existência de um arquivo de variáveis de ambiente (`e2e/.env`).
  > Se ele não foi criado o docker lembrará que isso precisa ser feito.
  > Uma forma simples é usar o arquivo `e2e/.env.example` como modelo.

  Importante notar a presença de alguns elementes nesta secção: `screenshots` e
  `videos`. Eles podem não estar disponíveis assim que o repositório for clonado
  ou que os containeres terem sido levantados, mas fatalmente serão criados após
  a primeira execução dos testes. Como o nome sugere, um deles guarda as capturas
  de tela (dos testes que falharem) e a gravação dos vídeos das suítes (arquivos
  `.cy.js`) executadas (com ou sem sucesso).

  Outra presença notável são os arquivos `helpers.js` e `helpers.runner.js`. Eles
  auxiliam na execução de ações outras dos quais os testes dependem. Exemplo, o
  arquivo `helpers.js` possui algumas funções para `cleanDatabase`,
  `getTitleOfFirstCurrentMovies` e outras que podem ser chamadas executando o
  comando:
  ```
    docker compose exec e2e bash -c "npm run helpers cleanDatabase"
  ```
  Isso pode ser feito via api do cypress de forma a tornar os cenários de testes
  idempotentes (sempre têm os mesmos resultados para entradas conhecidas).

  [Topo](#topo)

### app <a name="app"></a>

  Como citado, `app` mantêm dos arquivos referentes ao frontend da solução,
  tendo sido criado pelo gerador `create-react-app`.

  Em função do engessamento promovido por essa ferramenta (trade-offs a parte),
  algumas decisões foram tomadas a despeito de uma melhor legibilidade e
  organização.

  Observando a estrutura de pastas sob o diretório citado, pode-se verificar
  alguns pontos a considerar:
  ```
    ./app
    ├── package.json
    ├── public
    │   └── index.html
    └── src
        ├── App.js
        ├── components
        │   └── MovieListPage.js
        ├── index.js
        ├── services
        │   ├── RetrieveMoviesService.js
        │   └── UpdateBaseService.js
        ├── setupProxy.js
        ├── setupTests.integration.js
        ├── setupTests.js
        └── __tests__
            ├── integration
            │   ├── mocks
            │   │   ├── handlers.js
            │   │   └── server.js
            │   └── services
            │       ├── RetrieveMoviesService.test.js
            │       └── UpdateBaseService.test.js
            └── unit
                ├── components
                │   └── MovieListPage.test.js
                └── Smoke.test.js
  ```
  * Foi criado o subdiretório `__tests__` de `src` com os diretórios `unit` e
    `integration` que sugerem os locais dessas categorias de testes, ambas
    reproduzindo as estruturas de pastas dos arquivos aos quais estão
    relacionados;
  * Para os testes de integração se observa a existência de arquivos de mock da
    api que serve aos serviços utilizados pelos componentes de interface de
    usuário que podem ser checados pelos testes de unidade. Para ambos se
    verifica a existência de um arquivo de configuração exclusivo,
    `setupTests.integration.js` e `setupTests.js`, respectivamente, bem como
    scripts para disparar a execução dos mesmos, `test:integration` e `test:unit`.
    Porém na pasta referente a este último nota-se a presença de `Smoke.test.js`,
    que, novamente, tem o objetivo de assegurar que a suíte de testes está
    saudável, restringindo as falhas à ação humana;
  * Vale salientar a presença do arquivo `setupProxy.js` que permite que as chamadas
    a api pelo frontend possam ser abstraídas e permanescerem transparentes sob
    o caminho `/api/*` da própria aplicação cliente (inclusive pelo uso de um
    ambiente de desenvolvimento em uma máquina remota, como foi o caso desse projeto
    ao utilizar uma instância de vm do google cloud platform);
  * Por se tratar de uma aplicação bem simples, foram criados apenas duas tipos de
    objetos: `services`, para aqueles que realizam comunicação com a api; e, `components`,
    que representam a aparência e o comportamento dos elementos em tela;
  * Finalmente, o módulo pode ser acessado pelo navegador pelo endereço `*:14000`,
    onde `*` pode ser `localhost` ou o ip da máquina onde o ambiente está rodando.

  [Topo](#topo)

### api <a name="api"></a>

  Chegando ao diretório `api`, é apresentada a estrutura reproduzida abaixo:
  ```
    ./api
    ├── package.json
    ├── .env.example
    ├── src
    │   ├── app.js
    │   ├── controllers
    │   │   ├── retrieve-movies.js
    │   │   └── update-base.js
    │   ├── database
    │   │   ├── index.js
    │   │   ├── migrations
    │   │   │   ├── 20221116082000_create_table_movie.js
    │   │   │   └── 20221130121100_alter_table_movie.js
    │   │   └── seeds
    │   │       ├── development
    │   │       │   └── 001_movie.js
    │   │       ├── production
    │   │       └── test
    │   ├── index.js
    │   ├── infra
    │   │   └── http-request
    │   │       └── adapters
    │   │           ├── axios.js
    │   │           └── https.js
    │   ├── knexfile.js
    │   ├── repositories
    │   │   ├── get-movies.js
    │   │   ├── remove-already-existing.js
    │   │   └── save-movies.js
    │   ├── routers
    │   │   └── movie.js
    │   ├── services
    │   │   └── get-movies
    │   │       ├── adapters
    │   │       │   ├── ghibli.js
    │   │       │   └── tmdb.js
    │   │       └── index.js
    │   ├── schemas-swagger.json
    │   └── usecases
    │       ├── retrieve-movies.js
    │       └── update-base.js
    └── tests
        ├── e2e
        │   └── app.test.js
        ├── integration
        │   ├── repositories
        │   │   ├── get-movies.test.js
        │   │   ├── helpers.js
        │   │   └── save-movies.test.js
        │   └── services
        │       └── get-movies
        │           └── adapters
        │               ├── ghibli.test.js
        │               ├── helpers.js
        │               └── tmdb.test.js
        └── unit
            └── usecases
                └── update-base.test.js
  ```
  Nela vale destacar:
  * Por se tratar de um projeto construído sem gerador de código, como ocorreu com
    o `app`, houve mais liberdade e controle na definição da estrutura de componentes.
    Há uma pasta `tests`, no mesmo nível da pasta `src`, que como o nome sugere
    e se espera guarda os três níveis de checagem mais conhecidos da literatura,
    a saber: `unit`, relativos a regras de negócio inerentes a aplicação, sem nenhuma
    dependência externa; `integration`, verifica protocolos e interfaces de comunicação
    com elementos externos com a fronteira da aplicação (apis de terceiros, banco
    de dados, sistema de arquivos, etc); e, por fim, `e2e`, checa se o conjunto da
    obra se comunica de forma adequada quando do ponto de vista de seus clientes
    (quando uma rota da api é chamada, se as dependências externas são afetadas e
    o resultado experado é alcançado);
  * O projeto foi estruturado usando uma perspectiva de `desenvolvimento guiado por
    testes`, particularmente, do método popularizado por _Steve Freeman_ e _Nat Pryce_,
    em sua obra _Growing Object-Oriented Software, Guided by Tests_, onde um teste
    de alto nível (e2e) é definido com os requisitos da funcionalidade pretendida,
    e sucessivos testes de mais baixo nível (integration e unit) são definidos
    para construir os componentes que se ligam para formar a solução do cenário
    descrito na big picture. Aqui é feito uma adaptação, onde os componentes
    internos da solução são implementados usando um métodos `test-last`, ou seja,
    o teste de mais alto nível guia a completude da funcionalidade, mas a cobertura
    das unidades que a compõem é realizada depois que a mesma já se encontra
    estabelecida. Dessa forma se ganha com a rápida entrega da solução, sem abrir
    mão da qualidade, mas se cria uma dívida técnica que pode ser paga com segurança
    devido a existência dos testes de alto nível. Essa abordagem permitiu chegar à
    estrutura que pode ser observada na listagem já apresentada que caminha para
    uma arquitetura hexagonal/limpa:
    1. `usecases`: guarda o coração do sistema, as regras de negócio fundamentais,
      para elas são reservados testes de unidade;
    2. `services`: guarda integrações para api de terceiros, possue regras de
      tratamento dos dados recuperados e portanto deveriam ser testados por unidades,
      e apenas os protocolos e interfaces deveriam ser testados via integração,
      mas essa melhoria ficou como dívida técnica;
    3. `repositories`: guarda a lógica de acesso a base de dados e o tratamento deles,
      aqui, novamente, o tratamento deveria ser tratado via testes de unidade e o protocolo
      de comunicação com testes de integração, mas isso ficou para uma refatoração futura;
    4. `controllers`: guarda a lógica de tratamento das entradas de dados da api,
      em cenários mais complexos isso deve ser feito em testes de unidade, mais uma vez
      essa ação foi procrastinada pois os mesmos estão duplamente cobertos pelos testes
      de ponta-a-ponta da solução como um todo bem como pelos testes de ponta-a-ponta
      da api, isolada do cliente;
    5. `routers`: guarda delegators que realizam a ligação entre o componente que
      junta todas as peças e é o ponto de entrada a api, `src/index.js` e os `controllers`,
      e assim como classes de transporte de informação, dtos, não existe valor em serem
      testadas por unidade, ficando a cargo dos testes de ponta-a-ponta cobrirem seu correto
      funcionamento;
    6. por fim, `infra`, `database` e `knexfile.js` deveriam estar todas sob o mesmo teto,
       mas esta atividade também foi adiada para um segundo momento.
  > **_ATENÇÃO_**
  > Assim como o container `e2e`, este também depende da existência de um arquivo de variáveis de ambiente (`api/.env`).
  > Mas diferente daquele, aqui o docker não te lembrará disso, a api simplesmente não funcionará direito ou simplesmente não rodará pois as variáveis lá definidas são requeridas pela aplicação.
  > Novamente, uma forma simples é usar o arquivo `api/.env.example` como modelo.

  [Topo](#topo)

#### swagger <a name="swagger"></a>

  A documentação swagger da api pode ser acessada [aqui](http://34.125.47.242/api/docs/).

  [Topo](#topo)

### .github/workflows/deploy.yml e infra <a name="github-workflows-deploy-yml-e-infra"></a>

  Para concluir chegamos ao arquivo de build/deploy da aplicação.

  A ideia inicial é ter um esquema de iaac (infra-structure as a code), que ainda está no horizonte mas para um segundo momento de maneira mais profunda, para o momento foi criada uma instância de vm no google cloud platform onde a aplicação é implantada após os processos de build dos módulos da mesma. No cenário atual essa pipeline funciona da seguinte forma:
  - `build`:
    1. os arquivos são clonados do repositório sempre que um push é feito para a branch `main` ou para branches que sigam o padrão `*/*` à exceção de branches com padrão `docs/*`;
    2. o setup do ambiente de node é efetuado;
    3. é realizado a build do módulo de frontend;
    4. é criado um artefato de implantação sufixado com a hash do commit que marca o evento de disparo da pipeline;
    5. o artefato é guardado para posterior utilização pelo próximo job;
    6. o mesmo procedimento é realizado para o módulo de backend, assim como para os artefatos de infra da implantação;
    7. quando da construção do artefato referente à infra, são utilizadas algumas `secrets` cadastradas no github tains como: `senha do banco de dados`, `ambiente do node` e `chave da api do tmdb`;
  - `deploy`:
    1. os artefatos guardados no job anterior são recuperados;
    2. os artefatos recuperados são copiados e extraídos na máquina de implantação (para tanto são utilizadas `secrets` cadastradas no github, tais como: `endereço da máquina de implantação`, `porta do serviço ssh rodando na máquina de implantação`, `usuário utilizado na chamada ssh para a máquina de implantação`, `chave de acesso via ssh a máquina de implantação`);
  - `release`:
    1. os links simbólicos utilizados para buscar as versões atuais da solução na máquina de implantação são redirecionados para apontar para as versões recém implantadas;
    2. o comando docker compose para reiniciar a solução (app, api e db) é executado na máquina de implantação;
  - `clean`: é realizado um procedimento para remover os artefatos copiados para a máquina de implantação, bem como deixar na mesma máquina apenas as últimas 5 releases.
  Ainda, o arquivo `infra/compose.yml` guarda toda a configuração necessária para realizar o procedimento descrito no segundo item de `release`. Já o arquivo `infra/etc_nginx_conf.d_default.conf` mantém versionado algumas configurações para o nginx utilizado na máquina de implantação.
  
  O link para a aplicação implantada está [aqui](http://34.125.47.242/).

  [Topo](#topo)
