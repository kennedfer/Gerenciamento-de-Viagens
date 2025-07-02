# Logistica Terrestre - ADM - MASA

![Java](https://img.shields.io/badge/Java-17-blue?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-green?style=flat-square&logo=springboot)
![Preact](https://img.shields.io/badge/Preact-UI-lightblue?style=flat-square&logo=preact)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)

> Sistema completo para controle de viagens com backend robusto e frontend leve e moderno.

---

## Principais Funcionalidades

Exportação para Excel  
Paginação e filtros  
Rate limiting por IP  
Feedbacks de sucesso/erro  
Testes automatizados  
Swagger UI integrado

---

## Tecnologias Utilizadas

### Backend `(/backend)`
- Java 17 + Spring Boot
- Swagger / OpenAPI
- JPA + Repositórios personalizados
- Filtros para CORS e RateLimit
- Gradle

### Frontend `(/frontend)`
- Preact + TypeScript
- Vite
- CSS Modules
- Hooks personalizados
- Estrutura modular por feature
- Exportação para Excel

---

## Estrutura de Pastas

```bash
/backend
  ├── application      # Lógica de aplicação
  ├── domain           # Modelos e repositórios
  ├── infraestructure  # Configurações e adaptadores
  ├── controller       # APIs REST
  ├── shared/exception # Tratamento de erros
  └── test             # Testes JUnit

/frontend
  ├── components       # UI isolada
  ├── features/trips   # Módulo de viagens
  ├── hooks            # Lógica reutilizável
  ├── pages            # Páginas principais
  ├── layouts          # Layout base
  └── utils            # Funções auxiliares
```

## Docker

```bash
# Subir ambos os serviços
docker-compose up --build
```

## Como Rodar Localmente
Backend
```
cd backend
./gradlew bootRun
```
Frontend
```
cd frontend
npm install
npm run dev
```
Desenvolvido com 💙 por @kennedfer
