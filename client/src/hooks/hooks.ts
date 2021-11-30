import { useLocation as useWouterLocation } from "wouter";

export const useSearchLocation = () => {
  const [location, setLocation] = useWouterLocation();
  return [location, setLocation, window.location.search];
};

export const useSearchQuery = () => {
  const [, , query] = useSearchLocation();
  return new URLSearchParams(query as string);
};
