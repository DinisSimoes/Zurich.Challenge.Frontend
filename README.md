# Zurich Insurance Challenge – Frontend

Aplicação Web desenvolvida em Angular 21 responsável pela visualização e análise estatística das apólices de seguro calculadas pela API em .NET.

O frontend foi projetado com foco em organização modular, tipagem forte e integração desacoplada com a camada de domínio do backend, garantindo consistência contratual e facilidade de evolução.

> Status do Projeto:
> 🟢 Integração com API v1
> 🟢 Estrutura modular por feature
> 🟢 Containerização com Docker
> 🟢 Pronto para deploy em ambiente cloud



## 🏗️ Arquitetura e Decisões Técnicas

Para garantir a manutenibilidade típica de projetos Enterprise, a aplicação foi estruturada seguindo o padrão **Feature-Based Structure**, separando claramente as responsabilidades:

* **Core Layer:** Centraliza serviços singleton e lógica de comunicação HTTP.
* **Feature Layer:** Módulos isolados por domínio de negócio (`report` e `insurances`), contendo componentes e modelos tipados.

## 🔎 Alinhamento Arquitetural com o Backend

A aplicação foi construída respeitando o contrato da API versionada (/api/v1), mantendo tipagem forte nos modelos consumidos.

Essa abordagem garante:

- Consistência entre domínio e interface
- Baixo acoplamento entre camadas
- Evolução segura da API com versionamento explícito e contrato tipado
- Clareza na separação de responsabilidades

### Diferenciais de Implementação
* **Standalone Components:** Redução de boilerplate e melhor performance no Tree-shaking.
* **Type Safety:** Interfaces rigorosas para os contratos da API .NET, garantindo que o front-end reflita exatamente o domínio do back-end.
* **UI/UX com PrimeNG:** Utilização da biblioteca PrimeNG 21 e chart.js para componentes de alta fidelidade e acessibilidade.



## 📊 Representação das Regras de Negócio

A aplicação reflete visualmente os cálculos complexos realizados pelo motor do back-end, incluindo:
* **Cálculo Dinâmico:** Visualização do Prêmio Comercial (Margem de Segurança 3% e Lucro 5%).
* **Dashboard Analítico:** Médias aritméticas de valores de veículos e prêmios.
* **Gestão de Dados:** Listagem paginada de seguros cadastrados com persistência em banco de dados relacional.



## 🌐 Integração com API (.NET Core)

A aplicação está configurada para se comunicar com o endpoint de API v1.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/v1/insurances/report` | Recupera as médias estatísticas (JSON) |
| `GET` | `/api/v1/insurances` | Lista apólices com suporte a paginação |



## 🐳 Containerização (Docker)

O projeto utiliza **Multi-stage Build** para garantir que a imagem final contenha apenas os artefatos de produção, servidos por um servidor **Nginx** otimizado.

```dockerfile
# Stage 1: Build (Node 22)
# Stage 2: Serve (Nginx Alpine)
```

Para rodar executar o comando

```bash
docker compose up --build
```

A aplicação estará disponível em: http://localhost:8080

## 🚀 Como Executar Localmente
Pré-requisitos
Node.js: 20.x ou superior

Angular CLI: 21.x

Back-end: Certifique-se que a API .NET está rodando na porta configurada em environment.ts.

### Instalação
Clone o repositório.

Instale as dependências:

```Bash
npm install
```
Inicie o servidor:

```Bash
ng serve -o
```

Acesse: http://localhost:4200

## 🔮 Roadmap de Evolução
Como foco principal foi a entrega do MVP funcional, as seguintes melhorias estão mapeadas para futuras versões:

[ ] Interceptadores HTTP: Tratamento global de erros e exibição de Loaders automáticos.

[ ] Autenticação: Integração com JWT (Identity Server).

[ ] Testes: Cobertura de testes unitários com Jest para os serviços de cálculo.

[ ] Observabilidade: Logs de performance para monitoramento no Azure App Service.

👨‍💻 Autor
Dinis Simões - Desenvolvedor com foco em Clean Architecture e boas práticas.
