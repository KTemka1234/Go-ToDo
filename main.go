package main

import (
	"context"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Todo struct {
	ID        bson.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Completed bool          `json:"completed"`
	Body      string        `json:"body"`
}

var collection *mongo.Collection

func main() {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.SetPrefix("[Go-ToDo] ")

	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	if MONGODB_URI == "" {
		log.Fatal("MONGODB_URI is not set")
	}

	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Failed to disconnect from MongoDB: %v", err)
		}
	}()

	if err := client.Ping(context.Background(), nil); err != nil {
		log.Fatalf("Failed to ping context: %v", err)
	}

	log.Println("Connected to MongoDB")

	collection = client.Database("gotodo_db").Collection("todos")

	app := fiber.New()

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "3000"
	}
	log.Fatal(app.Listen(":" + PORT))
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	return c.Status(200).JSON(todos)
}

func createTodo(c *fiber.Ctx) error {
	todo := new(Todo)
	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "ToDo body is required"})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insertResult.InsertedID.(bson.ObjectID)
	return c.Status(201).JSON(todo)
}

func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := bson.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}
	result := collection.FindOneAndUpdate(context.Background(), filter, update)

	if result.Err() != nil {
		return c.Status(404).JSON(fiber.Map{"error": "No such todo ID"})
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := bson.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	filter := bson.M{"_id": objectID}
	result := collection.FindOneAndDelete(context.Background(), filter)

	if result.Err() != nil {
		return c.Status(404).JSON(fiber.Map{"error": "No such todo ID"})
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
