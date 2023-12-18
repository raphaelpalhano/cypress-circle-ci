

## Circle-ci 

![Alt text](hierac-circ.png)

Pipeline: Represents the entirety of the configuration. Available in CircleCI Cloud only.
Workflows: Responsible for organizing multiple jobs.
Jobs: Responsible for running a series of steps that perform commands.
Steps: Run commands (such as installing dependencies or running tests) and shell scripts to do the work7.Investigate the steps of our job

What are obs
CircleCI orbs are shareable packages of configuration elements, including jobs, commands, and executors.

Use orbs to reduce configuration complexity and help you integrate with your software and services stack quickly and easily across many projects.


ref: https://circleci.com/docs/configuration-reference/

dash: https://app.circleci.com/pipelines/circleci/VD7yGLJB1nhvtiFwMqDwVn/DDamVhrev1HzZqt6u4KqQJ

Base: https://github.com/cypress-io/cypress-realworld-app/blob/develop/.circleci/config.yml#L240


project: https://gitlab.com/raphaelpalhano/circle_ci_cypress/


### open orbs

1. Access app.circleci

2. Organization Settings

3. Security: mark option with yes


Definições de etapas
Expressões
A expressão de uma definição de etapa pode ser uma expressão regular ou uma expressão pepino . Os exemplos nesta seção usam expressões pepino. Se você preferir usar expressões regulares, cada grupo de captura da correspondência será passado como argumento para a função de definição da etapa.

Given("I have {int} cukes in my belly", (cukes: number) => {});
Argumentos
As etapas podem ser acompanhadas por strings de documentos ou tabelas de dados, ambos os quais serão passados ​​para a definição do passo como último argumento, conforme mostrado abaixo.

Feature: a feature
  Scenario: a scenario
    Given a table step
      | Cucumber     | Cucumis sativus |
      | Burr Gherkin | Cucumis anguria |
import { Given, DataTable } from "@badeball/cypress-cucumber-preprocessor";

Given(/^a table step$/, (table: DataTable) => {
  const expected = [
    ["Cucumber", "Cucumis sativus"],
    ["Burr Gherkin", "Cucumis anguria"]
  ];
  assert.deepEqual(table.raw(), expected);
});
Veja aqui a DataTableinterface.


Etapas pendentes
Você pode retornar "pending" de uma definição de etapa ou de uma cadeia para marcar uma etapa como pendente. Isso interromperá a execução e o Cypress reportará o teste como "ignorado". Isso geralmente é usado para marcar etapas como "não implementadas" e permite que você comprometa trabalhos inacabados sem interromper o conjunto de testes.

import { When } from "@badeball/cypress-cucumber-preprocessor";

When("a step", () => {
  return "pending";
});
import { When } from "@badeball/cypress-cucumber-preprocessor";

When("a step", () => {
  cy.then(() => {
    return "pending";
  });
});
Etapas ignoradas
Você pode retornar "skipped" de uma definição de etapa ou de uma cadeia para marcar uma etapa como pendente. Isso interromperá a execução e o Cypress reportará o teste como "ignorado". No entanto, isso geralmente é usado para curto-circuitar condicionalmente um teste.

import { When } from "@badeball/cypress-cucumber-preprocessor";

When("a step", () => {
  return "skipped";
});
import { When } from "@badeball/cypress-cucumber-preprocessor";

When("a step", () => {
  cy.then(() => {
    return "skipped";
  });
});
Etapas aninhadas
Você pode invocar outras etapas de uma etapa usando Step(), conforme mostrado abaixo.

import { When, Step } from "@badeball/cypress-cucumber-preprocessor";

When("I fill in the entire form", function () {
  Step(this, 'I fill in "john.doe" for "Username"');
  Step(this, 'I fill in "password" for "Password"');
});
Step() aceita opcionalmente um argumento DataTable ou string.

import {
  When,
  Step,
  DataTable
} from "@badeball/cypress-cucumber-preprocessor";

When("I fill in the entire form", function () {
  Step(
    this,
    "I fill in the value",
    new DataTable([
      ["Field", "Value"],
      ["Username", "john.doe"],
      ["Password", "password"]
    ])
  );
});
Ganchos
Existem três tipos de ganchos, ganchos de execução, ganchos de cenário e ganchos de degrau, cada um explicado abaixo.

Executar ganchos
BeforeAll() e AfterAll() são idênticos ao Cypress' before() e after().

import { BeforeAll } from "@badeball/cypress-cucumber-preprocessor";

BeforeAll(function () {
  // This hook will be executed once at the beginnig of a feature.
});
Ganchos de cenário
Before() e After() são semelhantes ao Cypress' beforeEach() e afterEach(), mas podem ser selecionados para execução condicional com base nas tags de cada cenário, conforme mostrado abaixo. Além disso, falhas nesses ganchos não fazem com que os testes restantes sejam ignorados. Isso é contrário ao Cypress' beforeEach e afterEach.

Observação
Ao contrário de como o pepino-js funciona, esses After() ganchos não são executados se o seu cenário falhar1.

import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(function () {
  // This hook will be executed before all scenarios.
});

Before({ tags: "@foo" }, function () {
  // This hook will be executed before scenarios tagged with @foo.
});

Before({ tags: "@foo and @bar" }, function () {
  // This hook will be executed before scenarios tagged with @foo and @bar.
});

Before({ tags: "@foo or @bar" }, function () {
  // This hook will be executed before scenarios tagged with @foo or @bar.
});

Before(function ({ pickle, gherkinDocument, testCaseStartedId }) {
  // Scenario hooks are invoked with an object containing a bunch of relevant data.
});
Ganchos de passo
BeforeStep() e AfterStep() são ganchos invocados antes e depois de cada etapa, respectivamente. Eles também podem ser selecionados para execução condicional com base nas tags de cada cenário, conforme mostrado abaixo.

Observação
Ao contrário de como o pepino-js funciona, esses AfterStep() ganchos não são executados se sua etapa falhar1.

import { BeforeStep } from "@badeball/cypress-cucumber-preprocessor";

BeforeStep(function (options) {
  // This hook will be executed before all steps.
});

BeforeStep({ tags: "@foo" }, function () {
  // This hook will be executed before steps in scenarios tagged with @foo.
});

BeforeStep({ tags: "@foo and @bar" }, function () {
  // This hook will be executed before steps in scenarios tagged with @foo and @bar.
});

BeforeStep({ tags: "@foo or @bar" }, function () {
  // This hook will be executed before steps in scenarios tagged with @foo or @bar.
});

BeforeStep(function ({ pickle, pickleStep, gherkinDocument, testCaseStartedId, testStepId }) {
  // Step hooks are invoked with an object containing a bunch of relevant data.
});
Pedido de gancho
Você pode especificar uma ordem explícita para os ganchos, se necessário. A ordem padrão é 10000. Os ganchos do tipo Before são executados em ordem crescente, enquanto os ganchos do tipo After são executados em ordem decrescente.

import { Before, BeforeStep, After, AfterStep } from "@badeball/cypress-cucumber-preprocessor";

BeforeAll({ order: 10 }, function () {});
Before({ order: 10 }, function () {});
BeforeStep({ order: 10 }, function () {});
Ganchos nomeados
Tanto os ganchos de cenário quanto os ganchos de etapa podem ser opcionalmente nomeados. Os nomes são exibidos no log de comandos, bem como nos relatórios de mensagens.

import { Before, BeforeStep, After, AfterStep } from "@badeball/cypress-cucumber-preprocessor";

Before({ name: "foo" }, function () {});
BeforeStep({ name: "bar" }, function () {});
After({ name: "baz" }, function () {});
AfterStep({ name: "qux" }, function () {});


Diagnóstico / simulação
Um utilitário de diagnóstico é fornecido para verificar se cada etapa corresponde a uma e somente uma definição de etapa. Isso pode ser executado conforme mostrado abaixo.

$ npx cypress-cucumber-diagnostics


Relatórios JSON
Os relatórios JSON podem ser ativados usando a propriedade json.enabled. O pré-processador usa cosmiconfig, o que significa que você pode colocar opções de configuração no EG. .cypress-cucumber-preprocessorrc.json ou package.json. Um exemplo de configuração é mostrado abaixo.

{
  "json": {
    "enabled": true
  }
}
O relatório é enviado para cucumber-report.json no diretório do projeto, mas pode ser configurado através da propriedade json.output.

Capturas de tela
Capturas de tela são adicionadas automaticamente aos relatórios JSON, incluindo os de testes com falha (a menos que você tenha desativado screenshotOnRunFailure).

Anexos (ambiente do navegador)
Texto, imagens e outros dados podem ser adicionados à saída das mensagens e relatórios JSON com anexos, usando a API do navegador explicada abaixo.

import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";

Given("a step", function() {
  attach("foobar");
});
Por padrão, o texto é salvo com um tipo MIME de texto/sem formatação. Você também pode especificar um tipo MIME diferente.

import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";

Given("a step", function() {
  attach('{ "name": "foobar" }', "application/json");
});
Imagens e outros dados binários podem ser anexados usando um ArrayBuffer. Os dados serão codificados em base64 na saída.

import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";

Given("a step", function() {
  attach(new TextEncoder().encode("foobar").buffer, "text/plain");
});
Se você já possui uma string codificada em base64, pode prefixar seu tipo MIME com base64: para indicar isso.

import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";

Given("a step", function() {
  attach("Zm9vYmFy", "base64:text/plain");
});
Anexos (ambiente de nó)
Semelhante à API do navegador explicada acima, os anexos também podem ser adicionados usando uma API Node. Isso é menos comum e necessário apenas em cenários específicos. Esta API está disponível através da opção onAfterStep em addCucumberPreprocessorPlugin, conforme mostrado abaixo. A API Node imita as opções encontradas na API do navegador.

await addCucumberPreprocessorPlugin(on, config, {
  onAfterStep({ wasLastStep, attach }) {
    attach("foobar");
  }
});
Por padrão, o texto é salvo com um tipo MIME de texto/sem formatação. Você também pode especificar um tipo MIME diferente.

await addCucumberPreprocessorPlugin(on, config, {
  onAfterStep({ wasLastStep, attach }) {
    attach('{ "name": "foobar" }', "application/json");
  }
});
Imagens e outros dados binários podem ser anexados usando um Buffer. Os dados serão codificados em base64 na saída.

await addCucumberPreprocessorPlugin(on, config, {
  onAfterStep({ wasLastStep, attach }) {
    attach(Buffer.from("foobar"), "text/plain");
  }
});
Se você já possui uma string codificada em base64, pode prefixar seu tipo MIME com base64: para indicar isso.

await addCucumberPreprocessorPlugin(on, config, {
  onAfterStep({ wasLastStep, attach }) {
    attach("Zm9vYmFy", "base64:text/plain");
  }
});
Uma wasLastStep opção está disponível se você precisar anexar algo no final do teste.

await addCucumberPreprocessorPlugin(on, config, {
  onAfterStep({ wasLastStep, attach }) {
    if (wasLastStep) {
      attach("foobar");
    }
  }
});


Gestão estadual
Uma definição de etapa pode transferir o estado para uma definição de etapa subsequente armazenando o estado em variáveis ​​de instância, conforme mostrado abaixo.

import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("a step asynchronously assigning to World", function() {
  cy.then(() => {
    this.foo = "bar";
  });
});

Given("a step accessing said assignment synchronously", function() {
  expect(this.foo).to.equal("bar");
});
Observe que se você usar funções de seta, não será possível compartilhar o estado entre as etapas!

ReplicandosetWorldConstructor
Mesmo que setWorldConstructor não esteja implementado, seu comportamento pode ser replicado de perto, como mostrado abaixo.

# cypress/e2e/math.feature
Feature: Replicating setWorldConstructor()
  Scenario: easy maths
    Given a variable set to 1
    When I increment the variable by 1
    Then the variable should contain 2
// cypress/support/e2e.ts
beforeEach(function () {
  const world = {
    variable: 0,

    setTo(number) {
      this.variable = number;
    },

    incrementBy(number) {
      this.variable += number;
    }
  };

  Object.assign(this, world);
});
// cypress/support/step_definitions/steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("a variable set to {int}", function(number) {
  this.setTo(number);
});

When("I increment the variable by {int}", function(number) {
  this.incrementBy(number);
});

Then("the variable should contain {int}", function(number) {
  expect(this.variable).to.equal(number);
});
Texto datilografado
Se você estiver usando TypeScript, poderá obter segurança de tipo e conclusão ideais com base em seu mundo personalizado, definindo o tipo de this em suas funções de etapa:

interface CustomWorld extends Mocha.Context {
  eat(count: number): void;
}

When("I eat {int} cucumbers", function (this: CustomWorld, count: number) {
  this.eat(count);
});
Como alternativa, você pode estender o tipo padrão Mocha.Context usando um arquivo de declaração como mostrado abaixo.

// declarations.d.ts
interface CustomWorld {
  eat(count: number): void;
}

declare namespace Mocha {
  interface Context extends CustomWorld {}
}

// steps.ts
When("I eat {int} cucumbers", function (count: number) {
  this.eat(count);
});



Configuração de teste
Alguns dos Cypress' opções de configuração podem ser substituídas por teste aproveitando tags. Abaixo estão todas as opções de configuração suportadas.

@animationDistanceThreshold(5)
@blockHosts('http://www.foo.com','http://www.bar.com')
@defaultCommandTimeout(5)
@env(foo='bar',baz=5,qux=false)
@execTimeout(5)
@includeShadowDom(true)
@includeShadowDom(false)
@keystrokeDelay(5)
@numTestsKeptInMemory(5)
@pageLoadTimeout(5)
@redirectionLimit(5)
@requestTimeout(5)
@responseTimeout(5)
@retries(5)
@retries(runMode=5)
@retries(openMode=5)
@retries(runMode=5,openMode=10)
@retries(openMode=10,runMode=5)
@screenshotOnRunFailure(true)
@screenshotOnRunFailure(false)
@scrollBehavior('center')
@scrollBehavior('top')
@scrollBehavior('bottom')
@scrollBehavior('nearest')
@slowTestThreshold(5)
@viewportHeight(720)
@viewportWidth(1280)
@waitForAnimations(true)
@waitForAnimations(false)
Feature: a feature
  Scenario: a scenario
    Given a table step