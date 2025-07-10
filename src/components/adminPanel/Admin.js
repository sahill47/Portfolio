import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  container: {
    marginTop: "2em",
  },
  card: {
    marginBottom: "1em",
  },
  deleteButton: {
    marginTop: "1em",
    backgroundColor: "#f44336",
    color: "white",
    '&:hover': {
      backgroundColor: "#d32f2f",
    },
  },
});

const AdminPanel = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire("Deleted!", "Message has been deleted.", "success");
        fetchMessages(); // Refresh the list
      } else {
        Swal.fire("Error!", "Failed to delete the message.", "error");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Admin Panel: View Messages
      </Typography>
      {messages.map((message) => (
        <Card key={message._id} className={classes.card}>
          <CardContent>
            <Typography variant="h6">Name: {message.name}</Typography>
            <Typography variant="body1">Email: {message.email}</Typography>
            <Typography variant="body2">Message: {message.message}</Typography>
            <Typography variant="caption">Date: {new Date(message.date).toLocaleString()}</Typography>
            <Button
              className={classes.deleteButton}
              onClick={() => deleteMessage(message._id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AdminPanel;
