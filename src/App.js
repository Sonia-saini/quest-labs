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
      mode:"no-cors",
      headers: {
        "Content-Type": "applicaltion/json",
      },
      body: JSON.stringify({
        usecase: "GPT_MEDITATION_CREATOR",
        userInput: input1,
      }),
    }).then((res) => res.json())
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
      <ElevenLabsComponent props={data}/>
      <p>
        {" "}
        \n\nStart by having the user focus on their breath. Take slow, deep
        breaths in and out through the nose. Focus on each inhalation and
        exhalation, allowing your body to relax with each breath. As you
        breathe, picture a calming color or scene that brings you peace and joy;
        allow yourself to be surrounded by this image as you continue to take
        deep breaths in and out. \n\nNext, try a simple body scan meditation
        where you bring awareness to different parts of your body one at a time
        while focusing on breathing deeply into those areas. Start from your
        feet up towards the head noticing any tension or tightness present
        without judgment but simply observing it for what it is before releasing
        it with each exhale until all of your body feels relaxed and comfortable
        again. \n\nFinally, imagine yourself in an ideal situation free from
        whatever issues are causing nervousness today - whether that be work
        related stress or something else entirely - picturing yourself doing
        something enjoyable such as going for a walk outside or taking some time
        off just for yourself can help create positive emotions which will
        eventually replace negative ones over time if practiced regularly
        enough!
      </p>
    </div>
  );
}

export default App;
