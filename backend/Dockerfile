# Etapa de build
FROM gradle:8.14-jdk17 AS build
WORKDIR /app

# Copia tudo (incluindo o wrapper e gradle/)
COPY . .

RUN ls

RUN gradle build -x test

# Etapa de execução
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
