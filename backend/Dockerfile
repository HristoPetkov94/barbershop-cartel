### STAGE 1: Build ###
FROM maven:3.6.0-jdk-13-alpine AS build
RUN mkdir -p /workspace
WORKDIR /workspace

COPY pom.xml /workspace
COPY src /workspace/src
COPY .git /workspace/.git

RUN mvn -f pom.xml -DskipTests clean package

### STAGE 2: Run ###
FROM openjdk:13-alpine
ENV TZ Europe/Sofia
RUN apk update && \
    apk add --no-cache tzdata
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
