import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import styles from "./App.module.scss";
import Topbar from "./components/Topbar/Topbar";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Recipes from "./components/Recipes/Recipes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="App">
                    <Topbar />
                    <main className={styles.page}>
                        <Switch>
                            <Route path="/" exact>
                                <Recipes />
                            </Route>
                            <Route path="/create-recipe">
                                <CreateRecipe />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
