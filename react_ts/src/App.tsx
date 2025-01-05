import React, {useRef, useState, useEffect} from "react";
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    Badge,
    Container,
    Stack,
    TextField,
    StyledEngineProvider,
    CssBaseline,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    Box

} from "@mui/material";

import {TodoItem} from "./TodoItem.ts";
import {Mail} from "@mui/icons-material";
import Papa from "papaparse";
import VisibilityControl from "./VisibilityControl.tsx";

function App() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [showCompleted, setShowCompleted] = useState(true)
    const newItemText = useRef<string>("");

    useEffect(() => {
        const fetchTodoItems = async () => {
            try {
                const response = await fetch('/todos.csv'); // Path to your CSV file
                const csvData = await response.text();

                Papa.parse(csvData, {
                    header: true,
                    complete: (results) => {
                        const items: TodoItem[] = results.data.map((item: any) => ({
                            task: item.action,
                            done: item.done === 'true'
                        }));
                        setTodoItems(items);
                    }
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTodoItems();
    }, []);


    const createNewTodo = () => {
        if (newItemText.current === "") return;
        if (!todoItems.find((item) => item.task === newItemText.current)) {
            setTodoItems([...todoItems, {task: newItemText.current, done: false}]);
            newItemText.current = "";
        }
    };

    const doneTasks = () => todoItems.filter((item) => !item.done).length

    if (loading) {
        return <div>Loading todo items...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const toggleTodo = (todo: TodoItem) => {
        setTodoItems(prevState =>
            prevState.map(item => item.task === todo.task ? {...item, done: !item.done} : item)
        );
    }

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline enableColorScheme/>

            <Container maxWidth='md'>
                <AppBar position="static" className="min-w-[450px] max-w=[750px]">
                    <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Container sx={{textAlign: 'center'}}>
                            <Typography variant="h2">Todo List</Typography>
                        </Container>
                        <Badge badgeContent={doneTasks()}>
                            <Mail/>
                        </Badge>
                    </Toolbar>
                </AppBar>
                <Box className="min-w-[450px] max-w=[750px] my-[5px]">
                    <Box>
                        <Paper>
                            <Stack direction="row" spacing={0.5} sx={{justifyContent: 'center', padding: '15px 0'}}>
                                <TextField
                                    id="outlined-basic"
                                    label="Enter new todo"
                                    variant="outlined"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        newItemText.current = event.target.value;
                                    }}
                                />
                                <Button variant="contained" className="min-w-[150px]"
                                        onClick={() => {
                                            createNewTodo();
                                        }}>Add</Button>
                            </Stack>
                        </Paper>
                    </Box>


                    <Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task</TableCell>
                                        <TableCell align="right">Completed</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {todoItems
                                        .filter(item => showCompleted ? true : !item.done)
                                        .map((item) => (
                                            <TableRow
                                                key={item.task}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">{item.task}</TableCell>
                                                <TableCell align="right">
                                                    <Checkbox checked={item.done}
                                                              onChange={() => toggleTodo(item)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <VisibilityControl showCompleted={showCompleted} callback={setShowCompleted}/>

                    </Box>
                </Box>
            </Container>

        </StyledEngineProvider>
    )
}

export default App
