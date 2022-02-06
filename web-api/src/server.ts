import "dotenv/config";
import App from "./app";
import validateEnv from "./utils/validateEnv";
import Routes from "./interfaces/routes.interface";
import ProblemRoute from "./routes/problem.route";
import CustomerRoute from './routes/customer.route';

validateEnv();

const problem = new ProblemRoute();
const customer = new CustomerRoute();

const routes: Routes[] = [problem, customer];
const app = new App(routes);

app.listen();
