FROM python:3.10-slim-bullseye

WORKDIR /api

COPY ./req.txt /api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

ADD . .

EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
