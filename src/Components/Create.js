import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TextField from "@material-ui/core/TextField";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };
  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a new Notes
      </Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          variant="outlined"
          color="primary"
          // maxRows={5}
          placeholder="hello there"
          label="Note title"
          required
          fullWidth
          error={titleError}
          // multiline
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          variant="outlined"
          color="primary"
          placeholder="hello there"
          label="Details"
          multiline
          rows={4}
          required
          fullWidth
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note a Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="education"
              control={<Radio />}
              label="Education"
            />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={() => console.log("you clicked me")}
          // startIcon={<ArrowLeftIcon />}
          endIcon={<ArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      {/* Icons */}
    </Container>
  );
}

export default Create;
