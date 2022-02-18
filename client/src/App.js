import "./App.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItem, Checkbox, TextField } from "@mui/material";
import axios from "axios";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LinearProgress from "@mui/material/LinearProgress";

const tiers = [
  {
    title: "New Task",
  },
  {
    title: "In Progress",
  },
  {
    title: "Completed",
  },
  {
    title: "Archived",
  },
];

function App() {

  const inprogOpenChange = (i) => {
    // console.log(i);
    const newarr = inprogOpen.map((obj, index) => {
      return i === index ? !obj : obj;
    });
    setInProgOpen(newarr);
  };

  const compOpenChange = (i) => {
    // console.log(i);
    const newarr = compOpen.map((obj, index) => {
      return i === index ? !obj : obj;
    });
    setCompOpen(newarr);
  };

  const archOpenChange = (i) => {
    // console.log(i);
    const newarr = archOpen.map((obj, index) => {
      return i === index ? !obj : obj;
    });
    setArchOpen(newarr);
  };

  const [checked, setChecked] = useState([1]);

  const getInProgTasks = () => {
    axios.get("http://localhost:5000/api/task/inprogress").then((res) => {
      // console.log(res);
      setInprogressTasks(res.data);
      setInProgOpen(new Array(res.data.length).fill(false));
      setInprogLoad(true);
    });
  };

  const getCompTasks = () => {
    axios.get("http://localhost:5000/api/task/completed").then((res) => {
      // console.log(res);
      setCompletedTasks(res.data);
      setCompOpen(new Array(res.data.length).fill(false));
      setCompLoad(true);
    });
  };

  const getArchTasks = () => {
    axios.get("http://localhost:5000/api/task/archived").then((res) => {
      // console.log(res);
      setArchivedTasks(res.data);
      setArchOpen(new Array(res.data.length).fill(false));
      setArchLoad(true);
    });
  };

  const addTask = (obj) => {
    setInprogLoad(false);
    axios.post("http://localhost:5000/api/task", {
      title:newTaskTitle,
      description:newTaskDesc,
      subtasks:newTaskSubtasks
    })
    .then((res) => {
      setNewTaskDesc('')
      setNewTaskSubtasks('')
      setNewTaskTitle('')
      getInProgTasks();
    })
  }

  const handleToggle = (temp) => () => {
    setInprogLoad(false);
    axios
      .post("http://localhost:5000/api/complete", {
        _id: temp._id,
        status: !temp.completed,
      })
      .then((res) => {
        // console.log(res);
        // setInprogressTasks(res.data);
        getInProgTasks();
        getCompTasks();
        getArchTasks();
        setInprogLoad(true);
      });
  };

  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  const [inprogLoad, setInprogLoad] = useState(false);
  const [compLoad, setCompLoad] = useState(false);
  const [archLoad, setArchLoad] = useState(false);

  const [inprogOpen, setInProgOpen] = useState();
  const [compOpen, setCompOpen] = useState();
  const [archOpen, setArchOpen] = useState();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskSubtasks, setNewTaskSubtasks] = useState('');

  const handleChangeTitle = (event) => {
    setNewTaskTitle(event.target.value);
  };
  const handleChangeDesc = (event) => {
    setNewTaskDesc(event.target.value);
  };
  const handleChangeSubtasks = (event) => {
    setNewTaskSubtasks(event.target.value);
  };

  useEffect(() => {
    getInProgTasks();
    getCompTasks();
    getArchTasks();
  }, []);

  return (
    <div>
      {inprogLoad && compLoad && archLoad ? (
        <Container
          sx={{
            mt: 3,
          }}
          component="main"
        >
          {console.log(inprogOpen)}
          {console.log(compOpen)}
          {console.log(archOpen)}
          {console.log(inprogressTasks)}
          {console.log(completedTasks)}
          {console.log(archivedTasks)}
          <Grid container spacing={5} alignItems="flex-start">
            <Grid item key="newtask" xs={12} md={3}>
              <Card>
                <CardHeader
                  title="New Task"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      Note : Fill Out subtasks in the format "Subtask 1, Subtask
                      2, .." and click on Add Button when all subtasks added
                    </Typography>
                  </Box>

                  <Box>
                    <TextField
                      label="Title"
                      variant="outlined"
                      value={newTaskTitle}
                      onChange={handleChangeTitle}
                      sx={{
                        m: 1,
                      }}
                    />
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={newTaskDesc}
                      onChange={handleChangeDesc}
                      sx={{
                        m: 1,
                      }}
                    />
                    <TextField
                      label="Subtasks"
                      variant="outlined"
                      value={newTaskSubtasks}
                      onChange={handleChangeSubtasks}
                      sx={{
                        m: 1,
                      }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" onClick={addTask}>
                    Add
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item key="newtask" xs={12} md={3}>
              <Card>
                <CardHeader
                  title="Tasks in Progress"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  ></Box>
                  {inprogressTasks.map((obj, index) => {
                    return (
                      <List>
                        <ListItemButton onClick={() => inprogOpenChange(index)}>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText primary={obj.title} />
                          {inprogOpen[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={inprogOpen[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            dense
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            {obj.subTasks.map((subObj, index) => {
                              const labelId = `checkbox-list-secondary-label-${index}`;
                              return (
                                <ListItem
                                  key={index}
                                  secondaryAction={
                                    <Checkbox
                                      edge="end"
                                      onChange={handleToggle(subObj)}
                                      checked={subObj.completed}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  }
                                  disablePadding
                                >
                                  <ListItemButton>
                                    <ListItemText
                                      id={labelId}
                                      primary={`${subObj.title}`}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </List>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>

            <Grid item key="comptask" xs={12} md={3}>
              <Card>
                <CardHeader
                  title="Completed Tasks"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  ></Box>
                  {completedTasks.map((obj, index) => {
                    return (
                      <List>
                        <ListItemButton onClick={() => compOpenChange(index)}>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText primary={obj.title} />
                          {compOpen[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={compOpen[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            dense
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            {obj.subTasks.map((subObj, index) => {
                              const labelId = `checkbox-list-secondary-label-${index}`;
                              return (
                                <ListItem key={index} disablePadding>
                                  <ListItemButton>
                                    <ListItemText
                                      id={labelId}
                                      primary={`${subObj.title}`}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </List>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>

            <Grid item key="archtask" xs={12} md={3}>
              <Card>
                <CardHeader
                  title="Archived Tasks"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  ></Box>
                  {archivedTasks.map((obj, index) => {
                    return (
                      <List>
                        <ListItemButton onClick={() => archOpenChange(index)}>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText primary={obj.title} />
                          {archOpen[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={archOpen[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            dense
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            {obj.subTasks.map((subObj, index) => {
                              const labelId = `checkbox-list-secondary-label-${index}`;
                              return (
                                <ListItem
                                  key={index}
                                  secondaryAction={
                                    <Checkbox
                                      edge="end"
                                      onChange={handleToggle(subObj)}
                                      checked={subObj.completed}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  }
                                  disablePadding
                                >
                                  <ListItemButton>
                                    <ListItemText
                                      id={labelId}
                                      primary={`${subObj.title}`}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </List>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </>
      )}
    </div>
  );
}

export default App;
