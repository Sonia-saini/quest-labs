import "./App.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import ElevenLabsComponent from "./Component/Text_Speech";
function App() {
  const [inputvalue, setInputvalue] = useState({
    feeling: "",
    work: "",
    issue: "",
  });
  const [data, setdata] = useState("");
  let handeOnchange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputvalue, [name]: value });
  };
  let searchdata = (inputvalue) => {
    console.log(inputvalue, "input");
    let input1 = `feeling ${inputvalue.feeling} right now, they currently are ${inputvalue.work} and facing ${inputvalue.issue} issues today`;
    fetch("https://gpt-api.richexplorer.com/api/general", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "applicaltion/json",
      },
      body: JSON.stringify({
        usecase: "GPT_MEDITATION_CREATOR",
        userInput: input1,
      }),
    })
      .then((res) => setdata(res?.generatedText))
      .catch((err) => console.log(err));
  };
  console.log(inputvalue, data);
  return (
    <div className="App">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Search Meditation Response
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Box>
                <FormControl id="feeling" isRequired>
                  <FormLabel>How are they feeling right now?</FormLabel>
                  <Input
                    type="text"
                    name="feeling"
                    value={inputvalue.feeling}
                    onChange={handeOnchange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="What do they do?" isRequired>
                  <FormLabel>What do they do?</FormLabel>
                  <Input
                    type="text"
                    name="work"
                    value={inputvalue.work}
                    onChange={handeOnchange}
                  />
                </FormControl>
              </Box>

              <FormControl
                id="What are the issues they are facing today?"
                isRequired
              >
                <FormLabel>
                  What are the issues they are facing today?
                </FormLabel>
                <Input
                  type="text"
                  name="issue"
                  value={inputvalue.value}
                  onChange={handeOnchange}
                />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => searchdata(inputvalue)}
                >
                  Get a Meditation Response
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <ElevenLabsComponent props={data} />
      <p>{data}</p>
    </div>
  );
}

export default App;
