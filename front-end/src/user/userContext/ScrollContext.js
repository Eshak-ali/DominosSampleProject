import React, { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ScrollNavigation = createContext();

const menuRoutes = [
  "/user/menu/pizza",
  "/user/menu/combo",
  "/user/menu/desserts",
  "/user/menu/Garlic Bread",
  "/user/menu/beverage",
  "/user/menu/pizzaMania",
  "/user/menu/Cheese Volcano",
  "/user/menu/cheesiken",
  "/user/menu/Chicken Fiesta",
];

export const ScrollContext = ({ children }) => {
  const navigate = useNavigate();
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const previousPosition = useRef(0);
  const [cooldown, setCooldown] = useState(false); // Cooldown to prevent rapid navigation

  // Determine the current route index
  const getCurrentRouteIndex = () => {
    const currentPath = window.location.pathname;
    return menuRoutes.indexOf(currentPath);
  };

  // Debounced scroll handler
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Scroll direction detection
  const handleScroll = debounce(() => {
    const topPosition = window.scrollY;
    setIsScrollingDown(topPosition > previousPosition.current);
    previousPosition.current = topPosition;
  }, 300); // Reduced debounce delay for smoother detection

  // Automatic navigation based on scroll direction
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentIndex = getCurrentRouteIndex();

        entries.forEach((entry) => {
          if (cooldown) return; // Prevent navigation if in cooldown

          if (entry.target === bottomRef.current && entry.isIntersecting) {
            if (isScrollingDown && currentIndex < menuRoutes.length - 1) {
              // Navigate to the next route
              setCooldown(true); // Activate cooldown
              navigate(menuRoutes[currentIndex + 1]);
              setTimeout(() => setCooldown(false), 1500); // 1.5s cooldown
            }
            if (isScrollingDown && currentIndex === menuRoutes.length - 1) {
              // Navigate to the next route
              setCooldown(true); // Activate cooldown
              navigate(menuRoutes[0]);
              setTimeout(() => setCooldown(false), 1500); // 1.5s cooldown
            }
          }

          if (entry.target === topRef.current && entry.isIntersecting) {
            if (!isScrollingDown && currentIndex > 0) {
              // Navigate to the previous route
              setCooldown(true); // Activate cooldown
              navigate(menuRoutes[currentIndex - 1]);
              setTimeout(() => setCooldown(false), 1500); // 1.5s cooldown
            }
          }
        });
      },
      { threshold: 0.8 } // Increase threshold for more precise intersection
    );

    if (topRef.current) observer.observe(topRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      if (topRef.current) observer.unobserve(topRef.current);
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [isScrollingDown, navigate, cooldown]);

  // Attach scroll event listener for direction detection
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollNavigation.Provider value={{ topRef, bottomRef }}>
      {children}
    </ScrollNavigation.Provider>
  );
};
