
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "./components/Navbar";
import AllRoutes from './Routes/AllRoutes';



function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <AllRoutes />
    </ChakraProvider>
  );
}

export default App;
