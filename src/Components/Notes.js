import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Card from "../Notecard/Card";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);
  return (
    <Container>
      <Grid container>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} lg={4} md={6}>
            <Card note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Notes;
