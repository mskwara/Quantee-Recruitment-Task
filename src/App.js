import { QueryClient, QueryClientProvider } from "react-query";
import Topbar from "./components/Topbar/Topbar";
import RecipeEditor from "./components/RecipeEditor/RecipeEditor";
import Recipes from "./components/Recipes/Recipes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";
import { useState } from "react";
import StateContext from "./utilities/StateContext";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import muiTheme from "./utilities/theme";
import NotFound from "./components/NotFound/NotFound";

const queryClient = new QueryClient();

const useStyles = makeStyles({
    page: {
        padding: 20,
        display: "flex",
        justifyContent: "center",
    },
});

const App = () => {
    const classes = useStyles();

    const [alertState, setAlertState] = useState({
        timeout: null,
        visible: false,
        content: "",
        type: "",
    });

    const showAlert = (content, type) => {
        clearTimeout(alertState.timeout);
        setAlertState({
            visible: true,
            content,
            type,
            timeout: setTimeout(() => {
                setAlertState({
                    ...alertState,
                    visible: false,
                });
            }, 2000),
        });
    };
    return (
        <QueryClientProvider client={queryClient}>
            <StateContext.Provider
                value={{
                    showAlert,
                }}
            >
                <ThemeProvider theme={muiTheme}>
                    <div className="App">
                        <Router>
                            <Topbar />
                            {alertState.visible && (
                                <Alert
                                    content={alertState.content}
                                    type={alertState.type}
                                />
                            )}
                            <main className={classes.page}>
                                <Switch>
                                    <Route path="/" exact component={Recipes} />
                                    <Route
                                        path="/create-recipe"
                                        component={RecipeEditor}
                                    />
                                    <Route
                                        path="/recipe-editor/:recipeId"
                                        component={RecipeEditor}
                                    />
                                    <Route path="/" component={NotFound} />
                                </Switch>
                            </main>
                        </Router>
                    </div>
                </ThemeProvider>
            </StateContext.Provider>
        </QueryClientProvider>
    );
};

export default App;
