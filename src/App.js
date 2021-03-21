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
import ErrorPage from "./components/ErrorPage/ErrorPage";
import notFoundIcon from "./assets/notFoundIcon.svg";

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
        // data necessary to display an alert
        timeout: null,
        visible: false,
        content: "",
        type: "",
    });

    const showAlert = (content, type) => {
        clearTimeout(alertState.timeout); // clear timeout assigned to previous alert
        setAlertState({
            // set new alert data
            visible: true,
            content,
            type,
            timeout: setTimeout(() => {
                // after 2 seconds alert will disappear
                setAlertState({
                    ...alertState,
                    visible: false,
                });
            }, 2000),
        });
    };
    return (
        <QueryClientProvider client={queryClient}>
            <StateContext.Provider // provides function to display alert in the child components
                value={{
                    showAlert,
                }}
            >
                <ThemeProvider theme={muiTheme}>
                    <div className="App">
                        <Router>
                            <Topbar />
                            {alertState.visible && ( // if alert is visible, then show it
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
                                    <Route path="/">
                                        <ErrorPage
                                            code={404}
                                            message="Page not found..."
                                            icon={notFoundIcon}
                                        />
                                    </Route>
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
