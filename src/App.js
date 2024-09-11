import { Box, Grommet } from "grommet";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import useRoutePrefix from "./functions/useRoutePrefix";
import { CountryGuesser } from "./country_guesser/countryGuesser";

const theme = {
  global: {
    font: {
      family: "Solway",
    },
  },
  anchor: {
    color: "light-2",
  },
  button: {
    pad: "small",
    border: {
      color: "focus",
      radius: "18px",
      width: "2px"
    },
    color: "white"
  }
};

function App() {
  const [routePrefix] = useRoutePrefix(true);

  return (
    <Grommet theme={theme} full>
      <Box
        background={"brand"}
        direction={"column"}
        style={{ minHeight: "100%" }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path={routePrefix}
              element={<CountryGuesser />}
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </Grommet>
  );
}

export default App;
