# Sistema Lapisco RH Front-End - Plataforma Web de Gestão

## PARA DESENVOLVEDORES
### React + TypeScript + Vite

### Instruções de como trabalhar em uma issue

#### A. Criar uma nova branch
Ao realizar o desenvolvimento de uma nova atividade, crie uma nova branch para trabalhar nessa atividade separadamente. Ramifique-a a partir da branch *develop*, nomeando-a com a convenção `{label}/{issue_number}-{tag}`:

- Acessa a *develop*: `git checkout develop`
- Atualiza o seu repositório local com as modificações remotas: `git pull origin develop`
- Cria a branch da issue: `git checkout -b {label}/{issue_number}-{tag}`
- Atualiza o repositório remoto com a nova branch: `git push origin {label}/{issue_number}-{tag}`

#### B. Modificar o repositório local
Tenha certeza que você está trabalhando na branch da sua issue e faça modificações apenas nela:
- Verifica em que branch você está: `git branch`

Após certificar-se de que está na sua branch, você pode iniciar a codificação. Ao finalizar alguma parte da sua atividade, recomenda-se que seja feito um *commit*. 
- Adiciona os arquivos que foram alterados e farão parte do _commit_: `git add arquivo1 arquivo2 arquivoN` (ou `git add -A` para todos arquivos modificados)
- Realiza o commit com sua mensagem: `git commit -m "[#issue_number] Mensagem clara e direta do que se trata o commit"`

#### C. Atualizar a sua branch remotamente
Caso tenha terminado de codificar naquele dia ou se quiser realizar um backup, suba os seus _commits_ para o Github. Se houver outro dev trabalhando na mesma branch, atualize as modificações feitas por ele no seu repositório local antes:
- Atualizar localmente as alterações feitas na sua branch: `git pull origin {label}/{issue_number}-{tag}`
- Subir os _commits_ realizados para a sua branch remota: `git push origin {label}/{issue_number}-{tag}`

#### D. Atualizar a sua branch local com as modificações remotas da develop
Antes de atualizar a branch _develop_ com as alterações que você fez, é necessário verificar se foram feitas mudanças na _develop_ e atualizá-las localmente. Esse processo também é necessário se alguém tiver subido algo para a _develop_ que será necessário para a sua issue:

- Acessa a *develop*: `git checkout develop`
- Atualiza o seu repositório local com as modificações remotas: `git pull origin develop`
- Volta para a sua branch: `git checkout {label}/{issue_number}-{tag}`

Se tiverem novas modificações na _develop_:
- Faz o merge da develop na sua branch: `git merge develop`
- Resolver localmente quaisquer conflitos que aparecerem e então commitar

#### E. Atualizar a branch develop com as mudanças feitas na sua branch
Após finalizar as modificações necessárias para a *issue*:
- Certifique-se de que a aplicação está funcionando: `yarn start` e teste as alterações feitas
- Verifique se as alterações realmente estão cumprindo o que foi pedido na *issue*

Com a aplicação funcionando, após realizar o merge, atualize a sua branch remota e faça o Pull Request para a _develop_:
- Subir os _commits_ realizados para a sua branch remota: `git push origin {label}/{issue_number}-{tag}`
- Faça o [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) para a _develop_
- Associe a sua _issue_ ao PR
- Caso necessário, atribua um revisor para o seu PR. Se não for necessário, finalize o PR para que as alterações sejam feitas na develop

### Instruções sobre o significado das labels

#### Tipo de Tarefa:

##### - bug:
  Para problemas ou bugs no código.
##### - feature:
  Para novas funcionalidades que serão adicionadas.
##### - improvement:
  Para melhorias em recursos já existentes.
##### - documentation:
  Para questões relacionadas à documentação.
##### - merge:
  Para fazer o merge entre branchs antes de enviar para a develop.
