import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import styles from "./App.module.scss";
import Topbar from "./components/Topbar/Topbar";
import RecipeEditor from "./components/RecipeEditor/RecipeEditor";
import Recipes from "./components/Recipes/Recipes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from "./components/Alert/Alert";
import { useState } from "react";
import StateContext from "./utilities/StateContext";

const queryClient = new QueryClient();

function App() {
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
            <Router>
                <StateContext.Provider
                    value={{
                        showAlert,
                    }}
                >
                    <div className="App">
                        <Topbar />
                        {alertState.visible && (
                            <Alert
                                content={alertState.content}
                                type={alertState.type}
                            />
                        )}
                        <main className={styles.page}>
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
                            </Switch>
                        </main>
                    </div>
                </StateContext.Provider>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
