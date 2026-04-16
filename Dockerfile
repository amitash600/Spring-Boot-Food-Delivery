FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java","-Xms128m","-Xmx256m","-jar","app.jar"]