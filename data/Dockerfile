FROM postgres
ENV POSTGRES_DB fte
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD not_postgres
COPY init.sql /docker-entrypoint-initdb.d/
