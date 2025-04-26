FROM golang:1.24

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY .air.toml main.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /go-todo-api ./main.go

EXPOSE 3000

CMD [ "/go-todo-api" ]
