import { makeApp } from "./app";
const PORT = process.env.PORT || 8000;

makeApp().listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/graphiql`);
});
