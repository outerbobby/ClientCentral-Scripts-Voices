import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import ClientList from "@/pages/clients";
import ClientDetail from "@/pages/clients/[id]";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ClientList} />
      <Route path="/clients" component={ClientList} />
      <Route path="/clients/:id" component={ClientDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
