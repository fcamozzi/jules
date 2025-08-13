# Guia de Deploy no Google Cloud Run

Este documento fornece um guia passo a passo para fazer o deploy desta aplicação no Google Cloud Run, usando o Google Cloud SQL como banco de dados.

## Arquitetura

A arquitetura de produção consiste em três componentes principais:
1.  **Backend (Django):** Um serviço no Cloud Run que executa a API do backend.
2.  **Frontend (React):** Um serviço no Cloud Run que serve a interface do usuário estática.
3.  **Banco de Dados (PostgreSQL):** Uma instância no Google Cloud SQL que armazena os dados da aplicação.

## Pré-requisitos

Antes de começar, você precisa ter:
1.  A ferramenta de linha de comando `gcloud` instalada e configurada.
2.  O Docker instalado em sua máquina local.
3.  Um projeto no Google Cloud com o faturamento ativado.
4.  As APIs do Cloud Run, Cloud Build, Artifact Registry e Cloud SQL ativadas no seu projeto.

Substitua `[PROJECT_ID]` em todos os comandos pelo ID do seu projeto no Google Cloud.

---

### Passo 1: Configurar o Banco de Dados (Cloud SQL)

O banco de dados `SQLite` usado no desenvolvimento não é adequado para produção. Você deve criar uma instância de PostgreSQL no Cloud SQL.

1.  **Crie a instância do Cloud SQL:**
    ```sh
    gcloud sql instances create NOME_DA_SUA_INSTANCIA --database-version=POSTGRES_13 --region=SUA_REGIAO --root-password=SENHA_FORTE_DO_ROOT
    ```
2.  **Crie um banco de dados para a aplicação:**
    ```sh
    gcloud sql databases create NOME_DO_SEU_DB --instance=NOME_DA_SUA_INSTANCIA
    ```
3.  **Crie um usuário para a aplicação:**
    ```sh
    gcloud sql users create NOME_DO_USUARIO --instance=NOME_DA_SUA_INSTANCIA --password=SENHA_FORTE_DO_USUARIO
    ```
4.  **Obtenha o Nome de Conexão da Instância**. Você o encontrará na página de detalhes da instância no Console do Google Cloud. Ele se parece com `[PROJECT_ID]:[REGION]:[INSTANCE_NAME]`.

---

### Passo 2: Construir e Enviar as Imagens dos Containers

Você precisa construir as imagens do Docker para o backend e o frontend e enviá-las para o Google Artifact Registry.

1.  **Crie um repositório no Artifact Registry:**
    ```sh
    gcloud artifacts repositories create NOME_DO_REPOSITORIO --repository-format=docker --location=SUA_REGIAO
    ```
2.  **Configure o Docker para autenticar com o gcloud:**
    ```sh
    gcloud auth configure-docker SUA_REGIAO-docker.pkg.dev
    ```
3.  **Construa, Tagueie e Envie a Imagem do Backend:**
    ```sh
    # Navegue até o diretório /backend
    cd backend

    # Construa a imagem
    docker build -t backend-image .

    # Tagueie a imagem
    docker tag backend-image SUA_REGIAO-docker.pkg.dev/[PROJECT_ID]/NOME_DO_REPOSITORIO/backend-image:latest

    # Envie a imagem
    docker push SUA_REGIAO-docker.pkg.dev/[PROJECT_ID]/NOME_DO_REPOSITORIO/backend-image:latest

    # Volte para a raiz
    cd ..
    ```
4.  **Construa, Tagueie e Envie a Imagem do Frontend:**
    ```sh
    # Navegue até o diretório /frontend
    cd frontend

    # Construa a imagem
    docker build -t frontend-image .

    # Tagueie a imagem
    docker tag frontend-image SUA_REGIAO-docker.pkg.dev/[PROJECT_ID]/NOME_DO_REPOSITORIO/frontend-image:latest

    # Envie a imagem
    docker push SUA_REGIAO-docker.pkg.dev/[PROJECT_ID]/NOME_DO_REPOSITORIO/frontend-image:latest
    ```

---

### Passo 3: Deploy dos Serviços no Cloud Run

1.  **Deploy do Backend:**
    Execute o comando `gcloud run deploy` substituindo as variáveis. Crie uma `SECRET_KEY` forte e segura.
    ```sh
    gcloud run deploy backend-service \
      --image=SUA_REGIAO-docker.pkg.dev/[PROJECT_ID]/NOME_DO_REPOSITORIO/backend-image:latest \
      --platform=managed \
      --region=SUA_REGIAO \
      --allow-unauthenticated \
      --add-cloudsql-instances=[NOME_DE_CONEXAO_DA_INSTANCIA] \
      --set-env-vars="SECRET_KEY=SUA_SECRET_KEY_FORTE,DATABASE_URL=postgresql://NOME_DO_USUARIO:SENHA_FORTE_DO_USUARIO@/NOME_DO_SEU_DB?host=/cloudsql/[NOME_DE_CONEXAO_DA_INSTANCIA]"
    ```
    Após o deploy, o Cloud Run fornecerá uma URL para o seu serviço de backend. Anote-a.

2.  **Deploy do Frontend:**
    O frontend precisa saber a URL do backend para fazer as chamadas de API.
    ```sh
    gcloud run deploy frontend-service \
      --image=SUA_REGIAO-docker.pkg.dev/[PROJECT_ID]/NOME_DO_REPOSITORIO/frontend-image:latest \
      --platform=managed \
      --region=SUA_REGIAO \
      --allow-unauthenticated \
      --set-env-vars="REACT_APP_API_URL=URL_DO_SEU_BACKEND_SERVICE"
    ```
    **Nota:** Para que `REACT_APP_API_URL` funcione, o código do frontend precisaria ser ajustado para usar esta variável de ambiente ao fazer chamadas com `axios`. Atualmente, ele usa um proxy, que é apenas para desenvolvimento. Este é um próximo passo recomendado para aprimorar a aplicação.

---

### Passo 4: Acessar a Aplicação

Após o deploy do `frontend-service`, o Cloud Run fornecerá uma URL pública. Acesse essa URL no seu navegador para ver sua aplicação funcionando!
