import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./Homepage/Dashboard";
import HomePage from "./Navbar/Navbar";
import Menu from "./Menu/Menu";
import BeverageCard from "./Menu/BeverageCard/BeverageCard";
import ComboCard from "./Menu/comboCard/ComboCard";
import DessertCard from "./Menu/DessertsCard/DessertCard";
import PizzaMania from "./Menu/PizzaMania/PizzaMania";
import PizzaCard from "./Menu/PizzaCard/PizzaCard";
import SideCard from "./Menu/GarlicBread/SideCard";
import AddCart from "./Add-To-Cart/AddCart";
import Trackorder from "./TrackOrder/Trackorder";
import OrderHistory from "./OrderHIstory/OrderHistory";
import UserContext from "./userContext/UserContext";
import { ScrollContext } from "./userContext/ScrollContext";
import CheeseBurst from "./CheeseBurst/CheeseBurst";
import Search from "./Search/Search";
import CheeseVolcano from "./Menu/CheeseVolcano/CheeseVolcano";
import Cheesiken from "./Menu/Cheesiken/Cheesiken";
import Chicken from "./Menu/Chicken Fiesta/Chicken Fiesta";

const UserRouting = () => {
  return (
    <UserContext>
      <ScrollContext>
        <Routes>
          <Route element={<HomePage />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />}>
              <Route path="beverage" element={<BeverageCard />} />
              <Route path="combo" element={<ComboCard />} />
              <Route path="desserts" element={<DessertCard />} />
              <Route path="pizzaMania" element={<PizzaMania />} />
              <Route path="pizza" element={<PizzaCard />} />
              <Route path="Garlic Bread" element={<SideCard />} />
              <Route path="Cheese Volcano" element={<CheeseVolcano />} />
              <Route path="Cheesiken" element={<Cheesiken />} />
              <Route path="Chicken Fiesta" element={<Chicken />} />
            </Route>
            <Route path="/cart" element={<AddCart />} />
            <Route path="/track" element={<Trackorder />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/cheeseburst" element={<CheeseBurst />} />

            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </ScrollContext>
    </UserContext>
  );
};

export default UserRouting;
